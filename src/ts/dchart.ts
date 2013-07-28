/// <reference path="../../d.ts/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../../d.ts/DefinitelyTyped/d3/d3.d.ts" />
/// <reference path="point.ts" />
/// <reference path="axis.ts" />
/// <reference path="Utils/utils.ts" />
/// <reference path="Solver/solver.ts" />
"use strict";

module dChart {

    export class DataSet {

        /**
         * Array of Points
         */
        public data:Point[] = [];

        /**
         * DataSet label
         * @type {string}
         */
        label:string = "";

        solver:Solver.ISolver;

        /**
         * Interpolation between the points in the DataSet
         * @type {string}
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
            constructor(public dataSetLabel:string) {

        }

        public Point() {
            return new Point();
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
                else if (value.nodeName.match(/^min$/i)) {
                    //this.solver.min = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^max$/i)) {
                    //this.solver.max = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^step$/i)) {
                    //this.solver.step = parseFloat(value.nodeValue);
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
                else if (value.nodeName.match(/^data$/i)) {
                    this.parseDataAttr(value);
                    return;
                }
            });

            _.map(elem.childNodes, (value) => {

                var point = this.Point();
                point.parse(value);

                this.data.push(point);
            });

        }

        min(axis:string) {
            return 0.0;
        }

        max(axis:string) {
            return 0.0;
        }

        /**
         * Parse the data attribute of the DataSet
         * data="[1,2,3]"
         * data="[{Point},{Point},{Point}]"
         * @param {Node} value Value of the Data Attribute
         */
         parseDataAttr(value:Node) {

            if (value.nodeValue === undefined || value.nodeValue === null || value.nodeValue.trim() === "") {
                return;
            }

            var parsedData = [];

            try {
                parsedData = JSON.parse(value.nodeValue);
            }
            catch (e) {

            }

            // TODO Parse data="[{Point},{Point},{Point}]"

            _.map(parsedData, (value) => {

                var point = this.Point();
                point.normalize(value);

                this.data.push(point);
            });
        }
    }

    export class DataSet2D extends DataSet {

        data:Point2D[] = [];
        solver:Solver.ISolver2D = new Solver.Solver2D();

        public Point() {
            return new Point2D();
        }

        public recalculate() {
            this.data = this.solver.solve();
        }

        min(axis:string) {

            return d3.min(this.data, (d:Point2D) => d[axis]);
        }

        max(axis:string) {

            return d3.max(this.data, (d:Point2D) => d[axis]);
        }
    }

    export class DataSet3D extends DataSet {

        data:Point3D[] = [];
        solver:Solver.ISolver3D = new Solver.Solver3D();

        public Point() {
            return new Point3D();
        }

        public recalculate() {
            this.data = this.solver.solve();
        }

        min(axis:string) {

            return d3.min(this.data, (d:Point3D) => d[axis]);
        }

        max(axis:string) {

            return d3.max(this.data, (d:Point3D) => d[axis]);
        }
    }

    export class Chart {

        chartMarginLeft:Utils.Size = new Utils.Size(10);
        chartMarginRight:Utils.Size = new Utils.Size(10);
        chartMarginTop:Utils.Size = new Utils.Size(10);
        chartMarginBottom:Utils.Size = new Utils.Size(10);

        chartTitle:string;
        chartDescription:string;

        constructor(public chartWidth:Utils.Size = new Utils.Size(400), public chartHeight:Utils.Size = new Utils.Size(400)) {

        }
    }

    export class Chart2D extends Chart {

        public dataSets:DataSet2D[];

        xAxis:Axis = new Axis("x");
        yAxis:Axis = new Axis("y");

        drawAxis() {
            var min = this.min();
            var max = this.max();

            var width = (new Utils.Size(this.chartWidth.value)).sub(this.chartMarginLeft).sub(this.chartMarginRight);
            var height = (new Utils.Size(this.chartHeight.value)).sub(this.chartMarginTop).sub(this.chartMarginBottom);

            this.xAxis.draw(width, min[0], max[0]);
            this.yAxis.draw(height, min[1], max[1]);
        }

        min(axis:string = "x") {
            return d3.min(this.dataSets, (dataSet:DataSet2D) => dataSet.min(axis));
        }

        max(axis:string = "x") {
            return d3.max(this.dataSets, (dataSet:DataSet2D) => dataSet.max(axis));
        }
    }

    export class Chart3D extends Chart {

        public dataSets:DataSet3D[];

        chartDepth:Utils.Size = new Utils.Size(400);

        xAxis:Axis = new Axis("x");
        yAxis:Axis = new Axis("y");
        zAxis:Axis = new Axis("z");

        drawAxis() {
            var min = this.min();
            var max = this.max();

            var width = new Utils.Size(this.chartWidth.value).sub(this.chartMarginLeft).sub(this.chartMarginRight);
            var height = new Utils.Size(this.chartHeight.value).sub(this.chartMarginTop).sub(this.chartMarginBottom);

            this.xAxis.draw(width, min[0], max[0]);
            this.yAxis.draw(height, min[1], max[1]);
            this.zAxis.draw(this.chartDepth, min[2], max[2]);
        }

        min(axis:string = "x") {
            return d3.min(this.dataSets, (dataSet:DataSet3D) => dataSet.min(axis));
        }

        max(axis:string = "x") {
            return d3.max(this.dataSets, (dataSet:DataSet3D) => dataSet.max(axis));
        }
    }
}