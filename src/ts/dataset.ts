/// <reference path="../../d.ts/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../../d.ts/DefinitelyTyped/d3/d3.d.ts" />
/// <reference path="point.ts" />
/// <reference path="Utils/utils.ts" />
/// <reference path="Solver/solver.ts" />

module dChart {

    export interface IDataSetFn extends Solver.ISolver {

        fn:string;
    }

    export interface IDataSet {

        stroke:string;
        strokeWidth:number;
        strokeOpacity:number;
        fill:string;
        fillOpacity:number;
        interpolate:string;
        label:string;
        fn:IDataSetFn;
        data:IPoint[];
    }

    export interface IDataSet2D extends IDataSet {

        data:IPoint2D[];
    }

    export interface IDataSet2DTime extends IDataSet {

        data:IPoint2DTime[];
    }

    export interface IDataSet3D extends IDataSet {

        data:IPoint3D[];
    }

    export interface IDataSet3DTime extends IDataSet {

        data:IPoint3DTime[];
    }

    export class DataSet {

        showDots:bool = true;
        showLine:bool = true;
        dotsRadius:number = 3;

        data:Point[] = [];

        /**
         * DataSet label
         * @type {string}
         */
        label:string = "";

        solver:Solver.ISolver;

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

        /**
         * Line Element, that stores all Attribute Styles
         */
        lineStyle:Utils.LineStyle = new Utils.LineStyle();

        /**
         * Area Element, that stores all Attribute Styles
         */
        areaStyle:Utils.AreaStyle = new Utils.AreaStyle();

        /**
         * Constructor
         * @param dataSetLabel
         */
        constructor() {

        }

        /**
         * Recalculate the Points, if DataSet is a function
         */
        public recalculate() {

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
                    this.lineStyle.stroke = new Utils.Color(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^stroke-width$/i)) {
                    this.lineStyle.strokeWidth = new Utils.Size(parseFloat(value.nodeValue));
                    return;
                }
                else if (value.nodeName.match(/^stroke-opacity$/i)) {
                    this.lineStyle.strokeOpacity = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^fill$/i)) {
                    this.areaStyle.fill = new Utils.Color(value.nodeValue);
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

            if (value.hasOwnProperty("stroke")) {
                this.lineStyle.stroke = new Utils.Color(value.stroke);
            }

            if (value.hasOwnProperty("strokeWidth")) {
                this.lineStyle.strokeWidth = new Utils.Size(parseFloat(value.strokeWidth));
            }

            if (value.hasOwnProperty("strokeOpacity")) {
                this.lineStyle.strokeOpacity = parseFloat(value.strokeOpacity);
            }

            if (value.hasOwnProperty("fill")) {
                this.areaStyle.fill = new Utils.Color(value.fill);
            }

            if (value.hasOwnProperty("fillOpacity")) {
                this.areaStyle.fillOpacity = parseFloat(value.fillOpacity);
            }

            if (value.hasOwnProperty("showDots")) {

                this.showDots = value.showDots;
            }

            if (value.hasOwnProperty("showLine")) {

                this.showLine = value.showLine;
            }

            if (value.hasOwnProperty("dotRadius")) {

                this.dotsRadius = value.dotRadius;
            }
        }

        min(axis:string) {
            return 0.0;
        }

        max(axis:string) {
            return 0.0;
        }
    }

    export class DataSet2D extends DataSet {

        data:Point2D[] = [];
        solver:Solver.ISolver2D = new Solver.Solver2D();

        public recalculate() {
            this.data = this.solver.solve();
        }

        min(axis:string) {

            return d3.min(this.data, (d:Point2D) => d[axis]);
        }

        max(axis:string) {

            return d3.max(this.data, (d:Point2D) => d[axis]);
        }

        normalize(value:any) {
            super.normalize(value);

            if (value.hasOwnProperty("data") && (typeof value.data === "object")) {

                _.map(value.data, (config) => {

                    var p = new Point2D();
                    p.normalize(config);
                    this.data.push(p);
                });
            }

            if (value.hasOwnProperty("dataFn")) {



            }
        }
    }

    export class DataSet3D extends DataSet {

        data:Point3D[] = [];
        solver:Solver.ISolver3D = new Solver.Solver3D();

        public recalculate() {
            this.data = this.solver.solve();
        }

        min(axis:string) {

            return d3.min(this.data, (d:Point3D) => d[axis]);
        }

        max(axis:string) {

            return d3.max(this.data, (d:Point3D) => d[axis]);
        }

        normalize(value:any) {
            super.normalize(value);

            if (value.hasOwnProperty("data")) {

                this.data = [];

                _.map(value.data, (config) => {

                    var p = new Point3D();
                    p.normalize(config);
                    this.data.push(p);
                });
            }

            if (value.hasOwnProperty("dataFn")) {



            }
        }
    }
}