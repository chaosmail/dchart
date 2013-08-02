/// <reference path="../../d.ts/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../../d.ts/DefinitelyTyped/d3/d3.d.ts" />
/// <reference path="point.ts" />
/// <reference path="axis.ts" />
/// <reference path="dataset.ts" />
/// <reference path="Utils/style.ts" />
/// <reference path="Utils/solver.ts" />
"use strict";

module dChart {

    export interface IChart {

        elem:string;
        label:string;
        description:string;
        fontStyle:Utils.FontStyle;
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
    }

    export interface IChart3DAxis {

        x:IAxis;
        y:IAxis;
        z:IAxis;
    }

    export interface IChart3D extends IChart {

        axis: IChart3DAxis;
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
        fontStyle:Utils.FontStyle = new Utils.FontStyle();

        constructor() {
;
        }

        clear() {

            if (this.svg) {
                this.svg.remove();
            }
        }

        getPoint() {
            return new Point();
        }

        getSolver() {
            return new Utils.Solver();
        }

        redraw() {

            this.svg
                .attr("width", this.width)
                .attr("height", this.height);

            this.container
                .attr("width", this.nettoWidth)
                .attr("height", this.nettoHeight)
                .attr("transform","translate("+ this.marginLeft +", "+ this.marginTop +")");

            this.svgDescription
                .text(this.description)
                .attr("x", this.nettoWidth * 0.5)
                .attr("y", this.nettoHeight + this.marginBottom - 5)
                .attr("text-anchor", "middle");

            this.svgLabel
                .text(this.label)
                .attr("x", this.nettoWidth * 0.5)
                .attr("y", this.nettoHeight + this.marginBottom - 20)
                .attr("text-anchor", "middle");

            this.redrawAxis();
            this.redrawData();

            this.container
                .selectAll('text')
                .style('font-family', this.fontStyle.fontFamily)
                .style('font-size', this.fontStyle.fontSize)
                .style('font-weight', this.fontStyle.fontWeight);

            this.svgLabel
                .style('font-size', this.fontStyle.fontSize + 2)
                .style('font-weight', "bold");
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

            if (value.hasOwnProperty("fontStyle")) {

                var fontStyle = new Utils.FontStyle();
                fontStyle.normalize(value.fontStyle);

                this.fontStyle = fontStyle;
            }
        }
    }

    export class Chart2D extends Chart {

        dataSets:DataSet[] = [];
        xAxis:xAxis = new xAxis();
        yAxis:yAxis = new yAxis();

        getPoint() {
            return new Point2D();
        }

        getSolver() {
            return new Utils.Solver2D();
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
            return d3.min(this.dataSets, (dataSet:DataSet) => dataSet.min(axis));
        }

        max(axis:string = "x") {
            return d3.max(this.dataSets, (dataSet:DataSet) => dataSet.max(axis));
        }

        normalize(value:any) {
            super.normalize(value);

            if (value.hasOwnProperty("dataSets")) {

                this.dataSets = [];

                _.map(value.dataSets, (config) => {

                    var dataSet = new DataSet(this);
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

        public dataSets:DataSet[] = [];

        depth:number = 400;

        xAxis:xAxis = new xAxis();
        yAxis:yAxis = new yAxis();
        zAxis:zAxis = new zAxis();

        getPoint() {
            return new Point3D();
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
            return d3.min(this.dataSets, (dataSet:DataSet) => dataSet.min(axis));
        }

        max(axis:string = "x") {
            return d3.max(this.dataSets, (dataSet:DataSet) => dataSet.max(axis));
        }

        normalize(value:any) {
            super.normalize(value);

            if (value.hasOwnProperty("dataSets")) {

                this.dataSets = [];

                _.map(value.dataSets, (config) => {

                    var dataSet = new DataSet(this);
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
        svgSymbolContainer:D3.Selection[] = [];
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

            _.map(this.dataSets, (dataSet:DataSet,key:number) => {

                this.svgLineContainer[key] = this.dataContainer
                    .append("g")
                    .attr("class", "dchart-data-set dchart-data-set-" + key);

                this.svgLine[key] = this.svgLineContainer[key].append("path");

                this.svgSymbolContainer[key] = this.dataContainer
                    .append("g");

            });
        }

        redrawData() {

            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();
            var lineFn = [];

            _.map(this.dataSets, (dataSet:DataSet,key:number) => {

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

                if (dataSet.showSymbol) {

                    var group = this.svgSymbolContainer[key].selectAll("path")
                        .data(dataSet.data, (d:Point2D) => d.x);

                    var symbol = d3.svg.symbol().type(dataSet.symbolStyle.type);

                    group.exit()
                        .remove();

                    group.enter()
                        .append("path")
                        .style("stroke", dataSet.symbolStyle.stroke)
                        .style("stroke-width", dataSet.symbolStyle.strokeWidth)
                        .style("stroke-opacity", dataSet.symbolStyle.strokeOpacity)
                        .style("stroke-linecap", dataSet.symbolStyle.strokeLinecap)
                        .style("stroke-dasharray", dataSet.symbolStyle.strokeDasharray)
                        .style("fill", dataSet.symbolStyle.fill)
                        .style("fill-opacity", dataSet.symbolStyle.fillOpacity)
                        .attr("transform", (d:Point2D) => "translate("+xScale(d.x)+","+yScale(d.y)+") scale("+dataSet.symbolStyle.size+")")
                        .attr("d", symbol);


                }
            });
        }
    }

    export class BarChart extends Chart2D {

        svgRectContainer:D3.Selection[] = [];

        constructor(config?:IChart2D) {
            super();

            if (config) {
                this.normalize(config);
                this.draw();
            }

            console.log(this);
        }

        drawData() {

            _.map(this.dataSets, (dataSet:DataSet,key:number) => {

                this.svgRectContainer[key] = this.dataContainer
                    .append("g")
                    .attr("class", "dchart-data-set dchart-data-set-" + key);

            });
        }

        redrawData() {

            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();

            _.map(this.dataSets, (dataSet:DataSet,key:number) => {

                var group = this.svgRectContainer[key].selectAll("rect")
                    .data(dataSet.data, (d:Point2D) => d.x);

                if (dataSet.data.length === 0) {
                    return;
                }

                var xTickElems = this.xAxis.svg.selectAll('.tick');
                var xTicks = xTickElems[0].length;

                var start = (this.nettoWidth / (xTicks + 1))*0.5;
                var width = this.nettoWidth / (xTicks + 1) / this.dataSets.length;

                group.exit()
                    .remove();

                group.enter()
                    .append("rect")
                    .style("stroke", dataSet.areaStyle.stroke)
                    .style("stroke-width", dataSet.areaStyle.strokeWidth)
                    .style("stroke-opacity", dataSet.areaStyle.strokeOpacity)
                    .style("stroke-linecap", dataSet.areaStyle.strokeLinecap)
                    .style("stroke-dasharray", dataSet.areaStyle.strokeDasharray)
                    .style("fill", dataSet.areaStyle.fill)
                    .style("fill-opacity", dataSet.areaStyle.fillOpacity)
                    .attr("x", (d:Point2D) => xScale(d.x) - start + key*width)
                    .attr("y", (d:Point2D) => this.nettoHeight - yScale(d.y))
                    .attr("width", (d:Point2D) => width)
                    .attr("height", (d:Point2D) => Math.abs(yScale(d.y)));

            });
        }
    }

    export class ScatterChart extends Chart2D {

        svgScatterContainer:D3.Selection[] = [];

        constructor(config?:IChart2D) {
            super();

            if (config) {
                this.normalize(config);
                this.draw();
            }

            console.log(this);
        }

        drawData() {

            _.map(this.dataSets, (dataSet:DataSet,key:number) => {

                this.svgScatterContainer[key] = this.dataContainer
                    .append("g")
                    .attr("class", "dchart-data-set dchart-data-set-" + key);

            });
        }

        redrawData() {

            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();

            _.map(this.dataSets, (dataSet:DataSet,key:number) => {

                var group = this.svgScatterContainer[key].selectAll("path")
                    .data(dataSet.data, (d:Point2D) => d.x);

                var symbol = d3.svg.symbol().type(dataSet.symbolStyle.type);

                group.exit()
                    .remove();

                group.enter()
                    .append("path")
                    .style("stroke", dataSet.symbolStyle.stroke)
                    .style("stroke-width", dataSet.symbolStyle.strokeWidth)
                    .style("stroke-opacity", dataSet.symbolStyle.strokeOpacity)
                    .style("stroke-linecap", dataSet.symbolStyle.strokeLinecap)
                    .style("stroke-dasharray", dataSet.symbolStyle.strokeDasharray)
                    .style("fill", dataSet.symbolStyle.fill)
                    .style("fill-opacity", dataSet.symbolStyle.fillOpacity)
                    .attr("transform", (d:Point2D) => "translate("+xScale(d.x)+","+yScale(d.y)+") scale("+dataSet.symbolStyle.size+")")
                    .attr("d", symbol);

            });
        }
    }
}