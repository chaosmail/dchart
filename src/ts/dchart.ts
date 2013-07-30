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
        svgLabel:D3.Selection;
        svgDescription:D3.Selection;

        elem:Element;
        elemId:string;

        marginLeft:number = 50;
        marginRight:number = 10;
        marginTop:number = 10;
        marginBottom:number = 80;

        width:number = 400;
        height:number = 400;
        nettoWidth:number = 340;
        nettoHeight:number = 310;

        label:string;
        description:string;

        constructor() {

            var css =  '.dchart-axis path,' +
                       '.dchart-axis line {' +
                       '         fill: none;' +
                       '         stroke: black;' +
                       '         shape-rendering: crispEdges;' +
                       '     }' +
                       ' .dchart-axis .tick line { ' +
                       '         stroke: lightgrey; ' +
                       '         opacity: 0.9; ' +
                       '     } ' +
                       ' .dchart-axis .tick:first-child line { ' +
                       '         stroke: black; ' +
                       '         opacity: 1; ' +
                       '     } ' +
                       ' .dchart-axis text,' +
                       ' .dchart-container-description text,' +
                       ' .dchart-axis-label text {' +
                       '         font-family: sans-serif;' +
                       '         font-size: 11px;' +
                       '     }' +
                       ' .dchart-container-label text {' +
                       '         font-family: sans-serif;' +
                       '         font-size: 13px;' +
                       '         font-weight: bold;' +
                       '     }' ;

            Utils.Doc.css(css);
        }

        clear() {

            if (this.svg) {
                this.svg.remove();
            }
        }

        redraw() {

            this.svg.attr("width", this.width)
                    .attr("height", this.height);

            this.container.attr("width", this.nettoWidth)
                          .attr("height", this.nettoHeight)
                          .attr("transform","translate("+ this.marginLeft +", "+ this.marginTop +")");

            this.svgDescription.text(this.description)
                .attr("x", this.width * 0.5)
                .attr("y", this.height - 20)
                .attr("text-anchor", "middle");

            this.svgLabel.text(this.label)
                .attr("x", this.width * 0.5)
                .attr("y", this.height - 40)
                .attr("text-anchor", "middle");

            this.redrawAxis();
            this.redrawData();
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

            this.svgLabel = this.container.append("g")
                .attr("class","dchart-container-label")
                .append("text");

            this.svgDescription = this.container.append("g")
                .attr("class","dchart-container-description")
                .append("text");


            this.drawAxis();
            this.drawData();

            this.redraw();
        }

        drawAxis() {

        }

        redrawAxis() {

        }

        drawData() {

        }

        redrawData() {

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
                this.width = parseFloat(value.width);
            }

            if (value.hasOwnProperty("height")) {
                this.height = parseFloat(value.height);
            }

            if (value.hasOwnProperty("marginTop")) {
                this.marginTop = parseFloat(value.marginTop);
            }

            if (value.hasOwnProperty("marginLeft")) {
                this.marginLeft = parseFloat(value.marginLeft);
            }

            if (value.hasOwnProperty("marginBottom")) {
                this.marginBottom = parseFloat(value.marginBottom);
            }

            if (value.hasOwnProperty("marginRight")) {
                this.marginRight = parseFloat(value.marginRight);
            }
        }
    }

    export class Chart2D extends Chart {

        dataSets:DataSet2D[] = [];
        xAxis:Axis = new Axis("x");
        yAxis:Axis = new Axis("y");

        constructor() {
            super();

        }

        redraw() {
            this.nettoWidth = this.width - this.marginLeft - this.marginRight;
            this.nettoHeight = this.height - this.marginTop - this.marginBottom;

            this.xAxis.length = this.nettoWidth;
            this.xAxis.height = this.nettoHeight;
            this.yAxis.length = this.nettoHeight;
            this.yAxis.height = this.nettoWidth;

            super.redraw();
        }

        drawAxis() {

            var min = [this.min("x"),this.min("y")];
            var max = [this.max("x"),this.max("y")];

            this.xAxis.draw(this.axisContainer, min[0], max[0]);
            this.yAxis.draw(this.axisContainer, min[1], max[1]);
        }

        redrawAxis() {

            var min = [this.min("x"),this.min("y")];
            var max = [this.max("x"),this.max("y")];

            this.xAxis.redraw(min[0], max[0]);
            this.yAxis.redraw(min[1], max[1]);
        }

        drawData() {

        }

        redrawData() {

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

                    var dataSet = new DataSet2D();
                    dataSet.normalize(config);
                    this.dataSets.push(dataSet);
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

        depth:number = 400;

        xAxis:Axis = new Axis("x");
        yAxis:Axis = new Axis("y");
        zAxis:Axis = new Axis("z");

        constructor() {
            super();

        }

        drawAxis() {
            var min = [this.min("x"),this.min("y"),this.min("z")];
            var max = [this.max("x"),this.max("y"),this.min("z")];

            this.xAxis.draw(this.axisContainer, min[0], max[0]);
            this.yAxis.draw(this.axisContainer, min[1], max[1]);
            this.zAxis.draw(this.axisContainer, min[2], max[2]);
        }

        redrawAxis() {
            var min = [this.min("x"),this.min("y"),this.min("z")];
            var max = [this.max("x"),this.max("y"),this.min("z")];

            this.xAxis.redraw(min[0], max[0]);
            this.yAxis.redraw(min[1], max[1]);
            this.zAxis.redraw(min[2], max[2]);
        }

        drawData() {

        }

        redrawData() {

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

                    var dataSet = new DataSet3D();
                    dataSet.normalize(config);
                    this.dataSets.push(dataSet);
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

            this.nettoWidth = this.width - this.marginLeft - this.marginRight;
            this.nettoHeight = this.height - this.marginTop - this.marginBottom;

            this.xAxis.length = this.nettoWidth;
            this.xAxis.height = this.nettoHeight;
            this.yAxis.length = this.nettoHeight;
            this.yAxis.height = this.nettoWidth;
            this.zAxis.length = this.depth;
            this.zAxis.height = this.depth;
        }
    }

    export class LineChart extends Chart2D {

        svgLineContainer:D3.Selection[] = [];
        svgLine:D3.Selection[] = [];

        constructor(config?:IChart2D) {
            super();

            if (config) {
                this.normalize(config);
                this.draw();
            }

            console.log(this);
        }

        drawData() {

            _.map(this.dataSets, (dataSet:DataSet2D,key:number) => {

                this.svgLineContainer[key] = this.dataContainer
                    .append("g")
                    .attr("class", "dchart-data-set dchart-data-set-" + key);

                this.svgLine[key] = this.svgLineContainer[key].append("path");

            });
        }

        redrawData() {

            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();
            var lineFn = [];

            _.map(this.dataSets, (dataSet:DataSet2D,key:number) => {

                if (dataSet.showLine) {

                    lineFn[key] = d3.svg.line().interpolate(dataSet.interpolate)
                        .x(function(d:Point2D) { return xScale(d.x); })
                        .y(function(d:Point2D) { return yScale(d.y); });

                    this.svgLine[key].attr("d", lineFn[key](dataSet.data))
                        .style("stroke", dataSet.lineStyle.stroke)
                        .style("stroke-width", dataSet.lineStyle.strokeWidth)
                        .style("stroke-opacity", dataSet.lineStyle.strokeOpacity)
                        .style("stroke-linecap", dataSet.lineStyle.strokeLinecap)
                        .style("stroke-dasharray", dataSet.lineStyle.strokeDasharray)
                        .style("fill","none");

                }

                if (dataSet.showDots) {

                    var group = this.svgLineContainer[key].selectAll("circle")
                        .data(dataSet.data, (d:Point2D) => d.x);

                    group.exit()
                         .remove();

                    group.enter()
                        .append("circle")
                        .style("stroke", dataSet.dotStyle.stroke)
                        .style("stroke-width", dataSet.dotStyle.strokeWidth)
                        .style("stroke-opacity", dataSet.dotStyle.strokeOpacity)
                        .style("stroke-linecap", dataSet.dotStyle.strokeLinecap)
                        .style("stroke-dasharray", dataSet.dotStyle.strokeDasharray)
                        .style("fill", dataSet.dotStyle.fill)
                        .style("fill-opacity", dataSet.dotStyle.fillOpacity)
                        .attr("cx", (d:Point2D) => xScale(d.x))
                        .attr("cy", (d:Point2D) => yScale(d.y))
                        .attr("r", (d:Point2D) => dataSet.dotRadius);
                }
            });
        }
    }
}