/// <reference path="../../d.ts/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../../d.ts/DefinitelyTyped/d3/d3.d.ts" />
/// <reference path="point.ts" />
/// <reference path="Utils/style.ts" />
/// <reference path="Utils/elem.ts" />
/// <reference path="Utils/solver.ts" />
/// <reference path="Utils/loader.ts" />

module dChart {

    export interface IDataSetFn extends Utils.ISolver {

        fn:string;
    }

    export interface IDataSet {

        dot:bool;
        line:bool;
        area:bool;
        lineStyle:Utils.LineStyle;
        areaStyle:Utils.AreaStyle;
        dotStyle:Utils.AreaStyle;
        dotRadius:number;
        dotSymbol:string;
        interpolate:string;
        label:string;
        dataSrc:Utils.IDataSrc;
        dataFn:IDataSetFn;
        data:IPoint[];
    }

    export class DataSet {

        showLine:bool = true;
        showArea:bool = false;
        showDot:bool = false;

        dotRadius:number = 3;

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
         * @type {boolean}
         */
        visible:bool = true;

        lineStyle:Utils.LineStyle = new Utils.LineStyle();
        areaStyle:Utils.AreaStyle = new Utils.AreaStyle();
        dotStyle:Utils.AreaStyle = new Utils.AreaStyle();

        constructor(public chart:Chart) {

        }

        /**
         * Parse the Attributes of the HTML-Element of the DataSet
         * @param {Element} elem The <dataset> HTML-Element
         */
         parse(elem:Element) {

            _.map(elem.attributes, (value) => {

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

            if (value.hasOwnProperty("dotStyle")) {

                var areaStyle = new Utils.AreaStyle();
                areaStyle.normalize(value.dotStyle);
                this.dotStyle = areaStyle;

                this.showDot = true;
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

            if (value.hasOwnProperty("dot")) {

                this.showDot = value.showDots;
            }

            if (value.hasOwnProperty("line")) {

                this.showLine = value.showLine;
            }

            if (value.hasOwnProperty("area")) {

                this.showArea = value.showArea;
            }

            if (value.hasOwnProperty("dotRadius")) {

                this.dotRadius = value.dotRadius;
            }

            if (value.hasOwnProperty("data") && (typeof value.data === "object")) {

                _.map(value.data, (config) => {

                    var p = this.chart.getPoint();
                    p.normalize(config);
                    this.data.push(p);
                });
            }

            if (value.hasOwnProperty("dataFn")) {

                var solver = this.chart.getSolver();
                solver.normalize(value.dataFn);
                var data = solver.solve();

                _.map(data, (val) => {

                    var p = this.chart.getPoint();
                    p.normalize(val);
                    this.data.push(p);

                });
            }

            if (value.hasOwnProperty("dataSrc")) {

                var loader = new Utils.Loader();
                loader.normalize(value.dataSrc);

                loader.getData((data, map)=>{

                    _.map(data, (val) => {

                        var p = this.chart.getPoint();
                        p.map(val,map);
                        this.data.push(p);
                    });

                    this.chart.redraw();
                });
            }
        }

        min(axis:string) {

            return d3.min(this.data, (d:Point) => d[axis]);
        }

        max(axis:string) {

            return d3.max(this.data, (d:Point) => d[axis]);
        }
    }
}