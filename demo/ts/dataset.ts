/// <reference path="references.ts" />

module dChart {

    export interface IDataSetFn extends Utils.ISolver {

        fn:string;
    }

    export interface IDataSet {

        lineStyle:Utils.LineStyle;
        areaStyle:Utils.AreaStyle;
        symbolStyle:Utils.SymbolStyle;
        fontStyle:Utils.FontStyle;
        interpolate:string;
        label:string;
        dataSrc:Utils.IDataSrc;
        dataFn:IDataSetFn;
        data:IPoint[];
    }

    export class DataSet {

        showLine:boolean = true;
        showArea:boolean = false;
        showSymbol:boolean = false;
        showValues:boolean = false;
        showLegend:boolean = false;

        solver:Utils.Solver;

        data:any[] = [];

        /**
         * DataSet label
         * @type {string}
         */
        label:string = "";

        /**
         * Interpolation between the points in the DataSet
         * linear           piecewise linear segments, as in a polyline.
         * linear-closed    close the linear segments to form a polygon.
         * step             alternate between horizontal and vertical segments, as in a step function.
         * step-before      alternate between vertical and horizontal segments, as in a step function.
         * step-after       alternate between horizontal and vertical segments, as in a step function.
         * basis            a B-spline, with control point duplication on the ends.
         * basis-open       an open B-spline; may not intersect the start or end.
         * basis-closed     a closed B-spline, as in a loop.
         * bundle           equivalent to basis, except the tension parameter is used to straighten the spline.
         * cardinal         a Cardinal spline, with control point duplication on the ends.
         * cardinal-open    an open Cardinal spline; may not intersect the start or end, but will intersect other control points.
         * cardinal-closed  a closed Cardinal spline, as in a loop.
         * monotone         cubic interpolation that preserves monotonicity in y.
         * @type {string}
         * @see https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-line_interpolate
         */
        interpolate:string = "linear";

        /**
         * Visibility of the DataSet
         * @type {booleanean}
         */
        visible:boolean = true;

        lineStyle:Utils.LineStyle = new Utils.LineStyle();
        areaStyle:Utils.AreaStyle;
        symbolStyle:Utils.SymbolStyle;
        fontStyle:Utils.FontStyle = new Utils.FontStyle();

        constructor(public chart:any) {

            this.fontStyle.stroke = "none";
            this.fontStyle.fill = "black";
        }

        /**
         * Parse the Attributes of the HTML-Element of the DataSet
         * @param {Element} elem The <dataset> HTML-Element
         */
         parse(elem:Element) {

            d3.map(elem.attributes).forEach((value:any) => {

                if (value.nodeName.match(/^label$/i)) {
                    this.label = value.nodeValue;
                    return;
                }
                else if (value.nodeName.match(/^interpolate$/i)) {
                    this.interpolate = value.nodeValue;
                    return;
                }
                else if (value.nodeName.match(/^stroke$/i)) {
                    this.lineStyle.stroke = Utils.Elem.getColor(value);
                    return;
                }
                else if (value.nodeName.match(/^stroke-width$/i)) {
                    this.lineStyle.strokeWidth = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^stroke-opacity$/i)) {
                    this.lineStyle.strokeOpacity = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^fill$/i)) {
                    this.areaStyle.fill = Utils.Elem.getColor(value);
                    return;
                }
                else if (value.nodeName.match(/^fill-opacity$/i)) {
                    this.areaStyle.fillOpacity = parseFloat(value.nodeValue);
                    return;
                }
            });
        }

        normalize(value:any) {

            if (value.hasOwnProperty("interpolate")) {
                this.interpolate = value.interpolate;
            }

            if (value.hasOwnProperty("label")) {
                this.label = value.label;
                this.showLegend = true;
            }

            if (value.hasOwnProperty("showLegend")) {

                this.showLegend = value.showLegend;
            }


            if (value.hasOwnProperty("showSymbol")) {

                this.showSymbol = value.showSymbol;
            }

            if (value.hasOwnProperty("showLine")) {

                this.showLine = value.showLine;
            }

            if (value.hasOwnProperty("symbolStyle")) {

                var symbolStyle = new Utils.SymbolStyle();
                symbolStyle.normalize(value.symbolStyle);
                this.symbolStyle = symbolStyle;

                this.showSymbol = true;
            }

            if (value.hasOwnProperty("lineStyle")) {

                var lineStyle = new Utils.LineStyle();
                lineStyle.normalize(value.lineStyle);
                this.lineStyle = lineStyle;

                this.showLine = true;
            }

            if (value.hasOwnProperty("areaStyle")) {

                var areaStyle = new Utils.AreaStyle();
                areaStyle.normalize(value.areaStyle);
                this.areaStyle = areaStyle;

                this.showArea = true;
            }

            if (value.hasOwnProperty("fontStyle")) {

                var fontStyle = new Utils.FontStyle();
                fontStyle.normalize(value.fontStyle);
                this.fontStyle = fontStyle;

                this.showValues = true;
            }

            if (value.hasOwnProperty("data") && (typeof value.data === "object")) {

                value.data.forEach((config) => {

                    var p = this.chart.getPoint();
                    p.normalize(config);

                    // TODO
                    // Check if Data exists, update if x exists, else insert
                    this.data.push(p);
                });
            }

            if (value.hasOwnProperty("dataFn")) {

                var solver = this.chart.getSolver();
                solver.normalize(value.dataFn);
                this.solver = solver;

                this.calculate();
            }

            if (value.hasOwnProperty("dataSrc")) {

                var filter = [];

                if (value.dataSrc.hasOwnProperty("filter")) {

                    d3.map(value.dataSrc.filter).forEach(function(k,f) {
                        filter[k] = new Utils.Filter();
                        filter[k].normalize(f);
                    });
                }

                var loader = new Utils.Loader();
                loader.normalize(value.dataSrc);

                loader.getData((data, map)=>{

                    data.forEach((val) => {

                        if (filter.length) {

                            var stop = false;

                            filter.forEach(function(f) {
                                if (f.not(val)) {
                                    stop = true;
                                }
                            });

                            if (stop) {
                                return;
                            }
                        }

                        var p = this.chart.getPoint();
                        p.map(val,map);

                        // TODO
                        // Check if Data exists, update if x exists, else insert
                        this.data.push(p);
                    });

                    this.chart.draw();
                });
            }
        }

        update(value:any) {
            this.normalize(value);
        }

        updateData(value:any) {
            this.normalize({data:value});
        }


        clear() {
            this.data = [];
        }

        calculate() {

            if (this.solver) {

                this.clear();

                var data = this.solver.solve();

                data.forEach((val) => {

                    var p = this.chart.getPoint();
                    p.normalize(val);
                    this.data.push(p);
                });
            }
        }

        min(axis:string) {

            return d3.min(this.data, (d:Point) => d[axis]);
        }

        max(axis:string) {

            return d3.max(this.data, (d:Point) => d[axis]);
        }

        unique(axis:string) {

            var u = {}, a = [];

            this.data.forEach(function(value) {

                if(u.hasOwnProperty(value[axis])) {
                    return;
                }

                a.push(value[axis]);
                u[value[axis]] = 1;

            });

            return a;
        }
    }
}