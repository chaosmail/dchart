/// <reference path="../../d.ts/DefinitelyTyped/d3/d3.d.ts" />
/// <reference path="../../lib/d3-styles/dist/d3-styles.d.ts" />
/// <reference path="point.ts" />
/// <reference path="axis.ts" />
/// <reference path="dataset.ts" />
/// <reference path="Utils/style.ts" />
/// <reference path="Utils/transition.ts" />
/// <reference path="Utils/solver.ts" />
/// <reference path="Utils/animation.ts" />
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
        transition:Utils.Transition;
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
        labelContainer:D3.Selection;

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

        showTransition:bool = false;
        transition:Utils.Transition = new Utils.Transition();

        svgLabel:D3.Selection;
        label:string;

        svgDescription:D3.Selection;
        description:string;

        fontStyle:Utils.FontStyle = new Utils.FontStyle();

        dataSets:DataSet[] = [];
        format:any = d3.format("0.2f");

        constructor() {
;
            this.fontStyle.fontFamily = "sans-serif";
            this.fontStyle.fontSize = 11;
            this.fontStyle.fontWeight = "normal";
            this.fontStyle.stroke = "none";
            this.fontStyle.fill = "black";
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

            this.nettoWidth = this.width - this.marginLeft - this.marginRight;
            this.nettoHeight = this.height - this.marginTop - this.marginBottom;

            this.svg
                .attr("width", this.width)
                .attr("height", this.height)
                .attr("xmlns", "http://www.w3.org/2000/svg");

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
                .selectAll('text').fontStyle(this.fontStyle);

            this.svgLabel
                .fontStyle(this.fontStyle)
                .style('font-size', this.fontStyle.fontSize + 2)
                .style('font-weight', "bold");
        }

        draw() {

            this.nettoWidth = this.width - this.marginLeft - this.marginRight;
            this.nettoHeight = this.height - this.marginTop - this.marginBottom;

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

            this.svgLabel = this.labelContainer.append("text");

            this.svgDescription = this.labelContainer.append("text");


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

            if (value.hasOwnProperty("showTransition")) {
                this.showTransition = true;
            }

            if (value.hasOwnProperty("transition")) {

                var transition = new Utils.Transition();
                transition.normalize(value.transition);
                this.transition = transition;

                this.showTransition = true;
            }

            if (value.hasOwnProperty("fontStyle")) {

                var fontStyle = new Utils.FontStyle();
                fontStyle.normalize(value.fontStyle);

                this.fontStyle = fontStyle;
            }

            if (value.hasOwnProperty("dataSets")) {

                this.dataSets = [];

                value.dataSets.forEach((config) => {

                    var dataSet = new DataSet(this);
                    dataSet.normalize(config);
                    this.dataSets.push(dataSet);
                });
            }
        }

        recalculate() {

            this.dataSets.forEach((dataSet:DataSet) => {
                dataSet.calculate();
            });
        }
    }

    export class Chart2D extends Chart {


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

    export class PointChart extends Chart2D {

        svgSymbolContainer:D3.Selection[] = [];

        constructor(config?:IChart2D) {
            super();

            if (config) {
                this.normalize(config);
                this.draw();
            }
        }

        drawData() {

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                this.svgSymbolContainer[key] = this.dataContainer.append("g");
            });
        }

        redrawData() {

            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();

            this.dataSets.forEach((dataSet:DataSet,key:number) => {


                if (!dataSet.showSymbol) {
                    return;
                }

                var group = this.svgSymbolContainer[key]
                    .selectAll("path")
                    .data(dataSet.data, (d:Point2D) => d.x);

                var symbol = d3.svg.symbol().type(dataSet.symbolStyle.type);

                if (!this.showTransition) {

                    group.exit()
                        .remove();

                    group.enter()
                        .append("path")
                        .areaStyle(dataSet.symbolStyle)
                        .attr("transform", (d:Point2D) => "translate("+xScale(d.x)+","+yScale(d.y)+") scale("+dataSet.symbolStyle.size+")")
                        .attr("d", symbol);
                }
                else {

                    // Generate a temporary Line function,
                    // on which the symbols are animated
                    var lineFn = d3.svg.line()
                        .interpolate(dataSet.interpolate)
                        .x(function(d:Point2D) { return xScale(d.x); })
                        .y(function(d:Point2D) { return yScale(d.y); });

                    group.exit()
                        .remove();

                    group.enter()
                        .append("path")
                        .areaStyle(dataSet.symbolStyle)
                        .attr("transform", (d:Point2D) => "translate("+xScale(0)+","+yScale(0)+") scale(1)")
                        .attr("d", symbol)
                        .transition()
                        .duration((d,i) => this.transition.duration * (key+1))
                        .ease(this.transition.ease)
                        .attrTween("transform",
                            (d,i) => Utils.Animation.animateAlongPath(

                                // Draw a temporary Line for each point
                                // only to the last points coordinates
                                this.svgSymbolContainer[key]
                                    .append("path")
                                    .attr("class","animationLine")
                                    .attr("stroke","none")
                                    .attr("fill","none")
                                    .attr("d",lineFn(dataSet.data.slice(0,i+1))
                            )
                        ));

                    // Remove temporary Lines
                    this.svgSymbolContainer[key].selectAll('.animationLine').remove();
                }
            });
        }
    }

    export class LineChart extends PointChart {

        svgLineContainer:D3.Selection[] = [];
        svgLine:D3.Selection[] = [];

        constructor(config?:IChart2D) {
            super();

            if (config) {
                this.normalize(config);
                this.draw();
            }
        }

        drawData() {

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                this.svgLineContainer[key] = this.dataContainer
                    .append("g")
                    .attr("class", "dchart-data-set dchart-data-set-" + key);

                this.svgLine[key] = this.svgLineContainer[key].append("path");
            });

            super.drawData();
        }

        redrawData() {

            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();
            var lineFn = [];

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                if (!dataSet.showLine) {
                    return;
                }

                lineFn[key] = d3.svg.line()
                    .interpolate(dataSet.interpolate)
                    .x(function(d:Point2D) { return xScale(d.x); })
                    .y(function(d:Point2D) { return yScale(d.y); });

                if (!this.showTransition) {

                    this.svgLine[key].attr("d", lineFn[key](dataSet.data))
                        .lineStyle(dataSet.lineStyle)
                        .style("fill","none");
                }
                else {

                    this.svgLine[key]
                        .attr("d", lineFn[key](dataSet.data))
                        .attr("stroke", dataSet.lineStyle.stroke)
                        .attr("stroke-width", dataSet.lineStyle.strokeWidth)
                        .attr("stroke-opacity", dataSet.lineStyle.strokeOpacity)
                        .attr("stroke-linecap", dataSet.lineStyle.strokeLinecap)
                        .style("fill","none");

                    var path = <any>this.svgLine[key];
                    var totalLength = path.node().getTotalLength();

                    this.svgLine[key]
                        .attr("stroke-dasharray", totalLength + " " + totalLength)
                        .attr("stroke-dashoffset", totalLength)
                        .transition()
                        .duration(this.transition.duration)
                        .delay((d,i) => key*this.transition.delay)
                        .attr("stroke-dashoffset", 0)
                        .each("end", function() {
                            // Apply the Dasharray after the Transition
                            d3.select(<any>this).attr("stroke-dasharray", dataSet.lineStyle.strokeDasharray);
                        });
                }
            });

            super.redrawData();
        }
    }

    export class AreaChart extends PointChart {

        svgAreaContainer:D3.Selection[] = [];
        svgArea:D3.Selection[] = [];

        constructor(config?:IChart2D) {
            super();

            if (config) {
                this.normalize(config);
                this.draw();
            }
        }

        drawData() {

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                this.svgAreaContainer[key] = this.dataContainer
                    .append("g")
                    .attr("class", "dchart-data-set dchart-data-set-" + key);

                this.svgArea[key] = this.svgAreaContainer[key].append("path");
            });

            super.drawData();
        }

        redrawData() {

            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();
            var areaFn = [];

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                areaFn[key] = d3.svg.area()
                    .interpolate(dataSet.interpolate)
                    .x(function(d) { return xScale(d.x); })
                    .y0(<any>this.nettoHeight)
                    .y1(function(d) { return yScale(d.y); });

                if (!this.showTransition) {

                    this.svgArea[key].attr("d", areaFn[key](dataSet.data))
                        .areaStyle(dataSet.areaStyle);
                }
                else {

                    this.svgArea[key]
                        .areaStyle(dataSet.areaStyle)
                        .transition()
                        .duration(this.transition.duration)
                        .delay((d,i) => i*this.transition.delay)
                        .ease(this.transition.ease)
                        .attr("d", areaFn[key](dataSet.data));
                }
            });

            super.redrawData();
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
        }

        drawData() {

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                dataSet.showValues = true;

                this.svgRectContainer[key] = this.dataContainer
                    .append("g")
                    .attr("class", "dchart-data-set dchart-data-set-" + key);

            });
        }

        redrawData() {

            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                var group = this.svgRectContainer[key].selectAll("rect")
                    .data(dataSet.data, (d:Point2D) => d.x);

                if (dataSet.data.length === 0) {
                    return;
                }

                var xTickElems = this.xAxis.svg.selectAll('.tick');
                var xTicks = xTickElems[0].length;

                var start = (this.nettoWidth / (xTicks + 1))*0.5;
                var width = this.nettoWidth / (xTicks + 1) / this.dataSets.length;

                if (!this.showTransition) {

                    group.exit()
                        .remove();

                    group.enter()
                        .append("rect")
                        .areaStyle(dataSet.areaStyle)
                        .attr("x", (d:Point2D) => xScale(d.x) - start + key*width)
                        .attr("y", (d:Point2D) => this.nettoHeight - yScale(d.y))
                        .attr("width", (d:Point2D) => width)
                        .attr("height", (d:Point2D) => Math.abs(yScale(d.y)));
                }
                else {

                    group.exit()
                        .remove();

                    group.enter()
                        .append("rect")
                        .areaStyle(dataSet.areaStyle)
                        .attr("x", (d:Point2D) => xScale(d.x) - start + key*width)
                        .attr("y", this.nettoHeight)
                        .attr("width", (d:Point2D) => width)
                        .attr("height", 0)
                        .transition()
                        .duration(this.transition.duration)
                        .delay((d,i) => i*this.transition.delay)
                        .ease(this.transition.ease)
                        .attr("y", (d:Point2D) => this.nettoHeight - yScale(d.y))
                        .attr("height", (d:Point2D) => Math.abs(yScale(d.y)));
                }

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
        }

        drawData() {

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                this.svgScatterContainer[key] = this.dataContainer
                    .append("g")
                    .attr("class", "dchart-data-set dchart-data-set-" + key);

            });
        }

        redrawData() {

            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                var group = this.svgScatterContainer[key].selectAll("path")
                    .data(dataSet.data, (d:Point2D) => d.x);

                var symbol = d3.svg.symbol().type(dataSet.symbolStyle.type);

                if (!this.showTransition) {

                    group.exit()
                        .remove();

                    group.enter()
                        .append("path")
                        .areaStyle(dataSet.symbolStyle)
                        .attr("transform", (d:Point2D) => "translate("+xScale(d.x)+","+yScale(d.y)+") scale("+dataSet.symbolStyle.size+")")
                        .attr("d", symbol);
                }
                else {

                    group.exit()
                        .remove();

                    group.enter()
                        .append("path")
                        .areaStyle(dataSet.symbolStyle)
                        .attr("transform", (d:Point2D) => "translate("+xScale(d.x)+","+yScale(d.y)+") scale(0)")
                        .attr("d", symbol)
                        .transition()
                        .duration(this.transition.duration)
                        .delay((d,i) => i*this.transition.delay)
                        .ease(this.transition.ease)
                        .attr("transform", (d:Point2D) => "translate("+xScale(d.x)+","+yScale(d.y)+") scale("+dataSet.symbolStyle.size+")");
                }

            });
        }
    }

    export class PieChart extends Chart {

        svgPieContainer:D3.Selection[] = [];
        numPoints:number = 0;
        colorScale:any = d3.scale.category20c();

        constructor(config?:IChart) {
            super();

            if (config) {
                this.normalize(config);
                this.draw();
            }
        }

        getPoint() {
            var p = new Point1D();

            p.areaStyle.stroke = "none";
            p.areaStyle.fill = this.colorScale(this.numPoints);

            this.numPoints += 1;

            return p;
        }

        getSolver() {
            return new Utils.Solver1D();
        }

        drawData() {

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                dataSet.showValues = true;

                this.svgPieContainer[key] = this.dataContainer
                    .append("g")
                    .attr("class", "dchart-data-set dchart-data-set-" + key)
                    .attr("transform","translate("+(this.nettoWidth*0.5)+","+(this.nettoHeight*0.5)+")");

            });
        }

        redrawData() {

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                var pie = d3.layout.pie()
                    .sort(null)
                    .value( (d:Point1D) => d.x);

                var radius = this.nettoHeight > this.nettoWidth ? this.nettoWidth*0.5 : this.nettoHeight*0.5;

                var outerRadius = (key + 1) * radius/this.dataSets.length;
                var innerRadius = key * radius/this.dataSets.length;

                var arc = d3.svg.arc()
                    .outerRadius(outerRadius)
                    .innerRadius(innerRadius);

                var pieces = this.svgPieContainer[key]
                    .selectAll("path")
                    .data(pie(dataSet.data))
                    .enter();

                if (!this.showTransition) {
                    pieces.append("path").attr("d", arc)
                        .areaStyle((d:D3.ArcDescriptor) => d.data.areaStyle);
                    pieces.append("text")
                        .text((d:D3.ArcDescriptor) => this.format(d.value))
                        .attr("transform", (d:Point1D) => "translate("+arc.centroid(d)+")")
                        .fontStyle(dataSet.fontStyle)
                        .style("text-anchor", "middle");
                }
                else {
                    pieces.append("path").attr("d", arc.outerRadius(innerRadius))
                        .areaStyle((d:D3.ArcDescriptor) => d.data.areaStyle)
                        .transition()
                        .duration(this.transition.duration)
                        .delay((d,i) => i*this.transition.delay)
                        .attr("d", arc.outerRadius(outerRadius));
                    pieces.append("text")
                        .text((d:D3.ArcDescriptor) => this.format(d.value))
                        .style("text-anchor", "middle")
                        .fontStyle(dataSet.fontStyle)
                        .transition()
                        .duration(this.transition.duration)
                        .delay((d,i) => i*this.transition.delay)
                        .ease(this.transition.ease)
                        .attr("transform", (d:Point1D) => "translate("+arc.centroid(d)+")");
                }
            });
        }
    }
}