/// <reference path="../../d.ts/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../../d.ts/DefinitelyTyped/d3/d3.d.ts" />
/// <reference path="point.ts" />
/// <reference path="axis.ts" />
/// <reference path="dataset.ts" />
/// <reference path="Utils/utils.ts" />
/// <reference path="Solver/solver.ts" />
"use strict";

module dChart {

    export interface IChart {

        elem:string;
        label:string;
        description:string;
        width:number;
        height:number;
        marginTop:number;
        marginLeft:number;
        marginBottom:number;
        marginRight:number;
        dataSets:IDataSet[];
    }

    export interface IChart2DAxis {

        x:IAxis;
        y:IAxis;
    }

    export interface IChart2D extends IChart {

        axis:IChart2DAxis;
        dataSets:IDataSet2D[];
    }

    export interface IChart3DAxis {

        x:IAxis;
        y:IAxis;
        z:IAxis;
    }

    export interface IChart3D extends IChart {

        axis: IChart3DAxis;
        dataSets:IDataSet3D[];
    }

    export class Chart {

        svg:D3.Selection;
        container:D3.Selection;
        axisContainer:D3.Selection;
        dataContainer:D3.Selection;
        labelContainer:D3.Selection;
        descriptionContainer:D3.Selection;

        elem:Element;
        elemId:string;

        marginLeft:Utils.Size = new Utils.Size(10);
        marginRight:Utils.Size = new Utils.Size(10);
        marginTop:Utils.Size = new Utils.Size(10);
        marginBottom:Utils.Size = new Utils.Size(10);

        width:Utils.Size = new Utils.Size(400);
        height:Utils.Size = new Utils.Size(400);
        nettoWidth:Utils.Size = new Utils.Size(380);
        nettoHeight:Utils.Size = new Utils.Size(380);

        label:string;
        description:string;

        constructor(config?:IChart) {

            var css =  '.dchart-axis path,' +
                       '.dchart-axis line {' +
                       '         fill: none;' +
                       '         stroke: black;' +
                       '         shape-rendering: crispEdges;' +
                       '     }' +
                       ' .dchart-axis text,' +
                       ' .dchart-axis-label text {' +
                       '         font-family: sans-serif;' +
                       '         font-size: 11px;' +
                       '     }';

            Utils.Doc.css(css);
        }

        clear() {

            if (this.svg) {
                this.svg.remove();
            }
        }

        redraw() {

            this.svg.attr("width", this.width.value)
                    .attr("height", this.height.value);

            this.container.attr("width", this.nettoWidth.value)
                          .attr("height", this.nettoHeight.value)
                          .attr("transform","translate("+ this.marginLeft.value +", "+ this.marginTop.value +")");

            this.drawAxis();
            this.drawData();
        }

        draw() {

            this.clear();

            this.svg = d3.select(this.elem)
                         .append("svg")
                         .attr("id", "dchart-" + this.elemId);

            this.container = this.svg.append("g")
                         .attr("class","dchart-container");

            this.axisContainer = this.container.append("g")
                .attr("class","dchart-container-axis");

            this.dataContainer = this.container.append("g")
                .attr("class","dchart-container-data");

            this.labelContainer = this.container.append("g")
                .attr("class","dchart-container-label");

            this.descriptionContainer = this.container.append("g")
                .attr("class","dchart-container-description");

            this.redraw();
        }

        drawAxis() {

        }

        drawData() {

        }

        normalize(value:any) {

            if (value.hasOwnProperty("elem")) {
                this.elemId = value.elem;
                this.elem = document.getElementById(value.elem);
            }

            if (value.hasOwnProperty("label")) {
                this.label = value.label;
            }

            if (value.hasOwnProperty("description")) {
                this.description = value.description;
            }

            if (value.hasOwnProperty("width")) {
                this.width = new Utils.Size(parseFloat(value.width));
            }

            if (value.hasOwnProperty("height")) {
                this.height = new Utils.Size(parseFloat(value.height));
            }

            if (value.hasOwnProperty("marginTop")) {
                this.marginTop = new Utils.Size(parseFloat(value.marginTop));
            }

            if (value.hasOwnProperty("marginLeft")) {
                this.marginLeft = new Utils.Size(parseFloat(value.marginLeft));
            }

            if (value.hasOwnProperty("marginBottom")) {
                this.marginBottom = new Utils.Size(parseFloat(value.marginBottom));
            }

            if (value.hasOwnProperty("marginRight")) {
                this.marginRight = new Utils.Size(parseFloat(value.marginRight));
            }
        }
    }

    export class Chart2D extends Chart {

        dataSets:DataSet2D[] = [];
        xAxis:Axis = new Axis("x");
        yAxis:Axis = new Axis("y");

        constructor(config?:IChart2D) {
            super(config);

            this.nettoWidth = (new Utils.Size(this.width.value)).sub(this.marginLeft).sub(this.marginRight);
            this.nettoHeight = (new Utils.Size(this.height.value)).sub(this.marginTop).sub(this.marginBottom);

            this.xAxis.length = this.nettoWidth;
            this.xAxis.height = this.nettoHeight;
            this.yAxis.length = this.nettoHeight;
            this.yAxis.height = this.nettoWidth;

        }

        drawAxis() {

            var min = [this.min("x"),this.min("y")];
            var max = [this.max("x"),this.max("y")];

            this.xAxis.draw(this.axisContainer, min[0], max[0]);
            this.yAxis.draw(this.axisContainer, min[1], max[1]);
        }

        drawData() {

        }

        min(axis:string = "x") {
            return d3.min(this.dataSets, (dataSet:DataSet2D) => dataSet.min(axis));
        }

        max(axis:string = "x") {
            return d3.max(this.dataSets, (dataSet:DataSet2D) => dataSet.max(axis));
        }

        normalize(value:any) {
            super.normalize(value);

            if (value.hasOwnProperty("dataSets")) {

                this.dataSets = [];

                _.map(value.dataSets, (config) => {

                    this.dataSets.push(new DataSet2D(config));
                });
            }

            if (value.hasOwnProperty("axis")) {

                var axis = value.axis;

                if (axis.hasOwnProperty("x")) {

                    this.xAxis.normalize(axis.x)
                }

                if (axis.hasOwnProperty("y")) {

                    this.yAxis.normalize(axis.y)
                }
            }
        }
    }

    export class Chart3D extends Chart {

        public dataSets:DataSet3D[] = [];

        depth:Utils.Size = new Utils.Size(400);

        xAxis:Axis = new Axis("x");
        yAxis:Axis = new Axis("y");
        zAxis:Axis = new Axis("z");

        constructor(config?:IChart3D) {
            super(config);

            this.nettoWidth = new Utils.Size(this.width.value).sub(this.marginLeft).sub(this.marginRight);
            this.nettoHeight = new Utils.Size(this.height.value).sub(this.marginTop).sub(this.marginBottom);

            this.xAxis.length = this.nettoWidth;
            this.xAxis.height = this.nettoHeight;
            this.yAxis.length = this.nettoHeight;
            this.yAxis.height = this.nettoWidth;
            this.zAxis.length = this.depth;
            this.zAxis.height = this.depth;
        }

        drawAxis() {
            var min = [this.min("x"),this.min("y"),this.min("z")];
            var max = [this.max("x"),this.max("y"),this.min("z")];

            this.xAxis.draw(this.axisContainer, min[0], max[0]);
            this.yAxis.draw(this.axisContainer, min[1], max[1]);
            this.zAxis.draw(this.axisContainer, min[2], max[2]);
        }

        drawData() {

        }

        min(axis:string = "x") {
            return d3.min(this.dataSets, (dataSet:DataSet3D) => dataSet.min(axis));
        }

        max(axis:string = "x") {
            return d3.max(this.dataSets, (dataSet:DataSet3D) => dataSet.max(axis));
        }

        normalize(value:any) {
            super.normalize(value);

            if (value.hasOwnProperty("dataSets")) {

                this.dataSets = [];

                _.map(value.dataSets, (config) => {

                    this.dataSets.push(new DataSet3D(config));
                });
            }

            if (value.hasOwnProperty("axis")) {

                var axis = value.axis;

                if (axis.hasOwnProperty("x")) {

                    this.xAxis.normalize(axis.x)
                }

                if (axis.hasOwnProperty("y")) {

                    this.yAxis.normalize(axis.y)
                }

                if (axis.hasOwnProperty("z")) {

                    this.zAxis.normalize(axis.z)
                }
            }
        }
    }

    export class LineChart extends Chart2D {

        constructor(config?:IChart2D) {
            super(config);

            if (config) {
                this.normalize(config);
                this.draw();
            }

            console.log(this);
        }
    }
}