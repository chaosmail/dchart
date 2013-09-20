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

function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}

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

    export interface ISvgContainer {
        chart:D3.Selection;
        root:D3.Selection;
        axis:D3.Selection;
        data:D3.Selection;
        label:D3.Selection;
        legend:D3.Selection;
    }

    export interface IFontContainer {
        root:Utils.FontStyle;
        axis:Utils.FontStyle;
        ticks:Utils.FontStyle;
        legend:Utils.FontStyle;
        label:Utils.FontStyle;
        description:Utils.FontStyle;
    }

    export class Chart {

        _svg:ISvgContainer =  {
            chart:null,
            root:null,
            axis:null,
            data:null,
            label:null,
            legend:null
        };

        elem:Element;
        elemId:string;

        marginLeft:number = 50;
        marginRight:number = 10;
        marginTop:number = 20;
        marginBottom:number = 80;

        width:number = 400;
        height:number = 400;
        nettoWidth:number = 340;
        nettoHeight:number = 310;

        showTransition:bool = false;
        transition:Utils.Transition = new Utils.Transition();

        label:string;
        description:string;

        showLegend:bool = true;

        _font:IFontContainer = {
            root: null,
            axis: null,
            ticks: null,
            legend: null,
            label: null,
            description: null
        };

        fontStyle:Utils.FontStyle = new Utils.FontStyle();

        dataSets:DataSet[] = [];

        format:any;

        constructor() {

            this.fontStyle.fontFamily = "sans-serif";
            this.fontStyle.fontSize = 11;
            this.fontStyle.fontWeight = "normal";
            this.fontStyle.stroke = "none";
            this.fontStyle.fill = "black";

            this._font.root = this.fontStyle.clone();
            this._font.legend = this.fontStyle.clone();
            this._font.label = this.fontStyle.clone();
            this._font.description = this.fontStyle.clone();
            this._font.axis = this.fontStyle.clone();
            this._font.ticks = this.fontStyle.clone();

            this._font.label.fontWeight = "bold";
            this._font.label.fontSize += 2;
            this._font.ticks.fontSize -= 2;

            this.setFormat(".2f");
        }

        clear() {

            if (this._svg.root) {
                this._svg.root.remove();
            }
        }

        setFormat(format:string) {

            this.format = d3.format(format);

            return this;
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

            this._svg.root
                .attr("width", this.width)
                .attr("height", this.height)
                .attr("xmlns", "http://www.w3.org/2000/svg");

            this._svg.chart
                .attr("width", this.nettoWidth)
                .attr("height", this.nettoHeight)
                .attr("transform","translate("+ this.marginLeft +", "+ this.marginTop +")");


            this.redrawLabel();
            this.redrawAxis();
            this.redrawData();

            /*
                Apply the FontStyles
             */

            this._svg.chart
                .selectAll('text')
                .fontStyle(this.fontStyle);

            this._svg.chart
                .selectAll(".tick > text")
                .fontStyle(this._font.ticks);

            this._svg.label.select(".label")
                .fontStyle(this._font.label);

            this._svg.label.select(".description")
                .fontStyle(this._font.description);

            var legendDimen = this._svg.legend[0][0].getBBox();
            this._svg.legend.attr("transform", "translate("+ this.marginLeft +"," + (legendDimen.height*0.5) + ")");
        }

        draw() {

            this.nettoWidth = this.width - this.marginLeft - this.marginRight;
            this.nettoHeight = this.height - this.marginTop - this.marginBottom;

            this.clear();

            this._svg.root = d3.select(this.elem)
                         .append("svg")
                         .attr("id", "dchart-" + this.elemId);

            this._svg.chart = this._svg.root.append("g")
                         .attr("class","dchart-container");

            this._svg.axis = this._svg.chart.append("g")
                .attr("class","dchart-container-axis");

            this._svg.data = this._svg.chart.append("g")
                .attr("class","dchart-container-data");

            this._svg.legend = this._svg.root.append("g")
                .attr("class","dchart-container-legend");

            this.drawLegend();
            this.drawLabel();
            this.drawAxis();
            this.drawData();

            this.redraw();
        }

        drawLabel() {

            this._svg.label = this._svg.root.append("g")
                .attr("class","dchart-container-label");

            this._svg.label.append("text")
                .attr("class","label");

            this._svg.label.append("text")
                .attr("class","description");
        }

        redrawLabel() {

            this._svg.label.select(".description")
                .text(this.description)
                .attr("x", this.width * 0.5)
                .attr("y", this.nettoHeight + this.marginBottom - 5)
                .attr("text-anchor", "middle");

            this._svg.label.select(".label")
                .text(this.label)
                .attr("x", this.width * 0.5)
                .attr("y", this.nettoHeight + this.marginBottom - 20)
                .attr("text-anchor", "middle");
        }

        drawLegend() {

            var legendDotRadius = this._font.legend.fontSize * 0.5,
                legendOffsetMin = 10,
                legendOffsetFactor = 0.03,
                legendOffset = this.nettoWidth * legendOffsetFactor > legendOffsetMin ? this.nettoWidth * legendOffsetFactor : legendOffsetMin,
                translateX = 0;

            this.dataSets.forEach((dataset:DataSet,k:number) => {

               var container =
                    this._svg.legend
                        .append("g")
                        .attr("height", legendDotRadius * 2),
                   symbolType = dataset.symbolStyle ? dataset.symbolStyle.type: "circle",
                   symbolPath = d3.svg.symbol().type(symbolType),
                   symbol = container
                    .append("path")
                    .attr("transform", "scale("+ legendDotRadius*0.18 +")")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("d", symbolPath);

                if (dataset.symbolStyle) {
                    symbol.areaStyle(dataset.symbolStyle);
                }
                else if (dataset.areaStyle) {
                    symbol.areaStyle(dataset.areaStyle);
                }
                else {
                    symbol.style("stroke", "none");
                    symbol.style("fill", dataset.lineStyle.stroke);
                    symbol.style("fillOpacity", dataset.lineStyle.strokeOpacity);
                }

                container
                    .append("text")
                    .attr("x", legendDotRadius*1.5)
                    .attr("y", legendDotRadius*0.5)
                    .style("alignment-baseline", "middle")
                    .fontStyle(this._font.legend)
                    .text(dataset.label);

                if (k > 0) {
                    var allLegends = this._svg.legend.selectAll("g"),
                        prevLegend = allLegends[0][k - 1],
                        prevLegendDimen = prevLegend.getBBox();

                    translateX += prevLegendDimen.x + prevLegendDimen.width + legendOffset;
                }

                container.attr("transform", "translate (" + translateX + ")");

            });
        }

        redrawLegend() {

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

            if (value.hasOwnProperty("format")) {
                this.setFormat(value.format);
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

        unique(axis:string = "x") {

            var u = {}, a = [];

            this.dataSets.forEach(function(dataset) {

                var value = dataset.unique(axis);

                for(var i = 0, l = value.length; i < l; ++i){
                    if(u.hasOwnProperty(value[i])) {
                        continue;
                    }
                    a.push(value[i]);
                    u[value[i]] = 1;
                }
            });

            return a;
        }
    }

    export class Chart2D extends Chart {

        xAxis:xAxis;
        yAxis:yAxis;

        constructor() {

            this.xAxis = new xAxis(this);
            this.yAxis = new yAxis(this);

            super();
        }

        setFormat(format:string) {

            this.format = d3.format(format);
            this.xAxis.setFormat(format);
            this.yAxis.setFormat(format);

            return this;
        }

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

            this.xAxis.draw(this._svg.axis, min[0], max[0]);
            this.yAxis.draw(this._svg.axis, min[1], max[1]);
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

        xAxis:xAxis;
        yAxis:yAxis;
        zAxis:zAxis;

        constructor() {
            super();

            this.xAxis = new xAxis(this);
            this.yAxis = new yAxis(this);
            this.zAxis = new zAxis(this);
        }


        setFormat(format:string) {

            this.format = d3.format(format);
            this.xAxis.setFormat(format);
            this.yAxis.setFormat(format);
            this.zAxis.setFormat(format);

            return this;
        }

        getPoint() {
            return new Point3D();
        }

        drawAxis() {
            var min = [this.min("x"),this.min("y"),this.min("z")];
            var max = [this.max("x"),this.max("y"),this.min("z")];

            this.xAxis.draw(this._svg.axis, min[0], max[0]);
            this.yAxis.draw(this._svg.axis, min[1], max[1]);
            this.zAxis.draw(this._svg.axis, min[2], max[2]);
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

                this.svgSymbolContainer[key] = this._svg.data.append("g");
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
                        .attr("transform", "translate("+xScale(dataSet.data[0].x)+","+yScale(dataSet.data[0].y)+") scale(1)")
                        .attr("d", symbol)
                        .transition()
                        .duration(this.transition.duration)
                        .delay((d,i) => this.transition.delay * key)
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

                this.svgLineContainer[key] = this._svg.data
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
                    var totalLength = (<any>path.node()).getTotalLength();

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

                this.svgAreaContainer[key] = this._svg.data
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
                        .delay((d,i) => key*this.transition.delay)
                        .ease(this.transition.ease)
                        .attrTween("d", function() {

                            var data = [],
                                minX = dataSet.min("x"),
                                maxX = dataSet.max("x"),
                                difX = maxX - minX,
                                index = 0;

                            return function(t) {

                                data = dataSet.data.slice(0);

                                // calculate x value in range from minX to maxX
                                var accX = t*difX+minX;

                                // increment
                                while (data[index].x < accX) {
                                    index += 1;
                                }

                                // when first elem, return it
                                if (index === 0) {
                                    // return only first entry in data array
                                    return areaFn[key](data.slice(0,1));
                                }

                                // cut array to the length of the actual elem
                                data = data.slice(0,index+1);

                                // define the interpolateFn
                                var interpolate = d3.interpolate(data[index-1],data[index]);

                                // calculate the t value in range from data[index-1].x to data[index].x
                                var accT = (accX - data[index-1].x) / (data[index].x - data[index-1].x);

                                // replace the last element with the interpolated
                                data.splice(index,1,interpolate(accT));

                                return areaFn[key](data);
                            }
                        });
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

                this.svgRectContainer[key] = this._svg.data
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
                        .attr("y", (d:Point2D) => yScale(d.y))
                        .attr("width", (d:Point2D) => width)
                        .attr("height", (d:Point2D) =>  this.nettoHeight - yScale(d.y));
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
                        .attr("y", (d:Point2D) => yScale(d.y))
                        .attr("height", (d:Point2D) => this.nettoHeight - yScale(d.y));
                }

            });
        }
    }

    export class BarChartHorizontal extends Chart2D {

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

                this.svgRectContainer[key] = this._svg.data
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

                var yTickElems = this.yAxis.svg.selectAll('.tick');
                var yTicks = yTickElems[0].length;

                var start = (this.nettoHeight / (yTicks + 1))*0.5;
                var height = this.nettoHeight / (yTicks + 1) / this.dataSets.length;

                if (!this.showTransition) {

                    group.exit()
                        .remove();

                    group.enter()
                        .append("rect")
                        .areaStyle(dataSet.areaStyle)
                        .attr("x", (d:Point2D) => xScale(0))
                        .attr("y", (d:Point2D) => yScale(d.y) - start + key*height)
                        .attr("width", (d:Point2D) => xScale(d.x))
                        .attr("height", (d:Point2D) => height);
                }
                else {

                    group.exit()
                        .remove();

                    group.enter()
                        .append("rect")
                        .areaStyle(dataSet.areaStyle)
                        .attr("x", (d:Point2D) => xScale(0))
                        .attr("y", (d:Point2D) => yScale(d.y) - start + key*height)
                        .attr("width", (d:Point2D) => 0)
                        .attr("height", height)
                        .transition()
                        .duration(this.transition.duration)
                        .delay((d,i) => i*this.transition.delay)
                        .ease(this.transition.ease)
                        .attr("width", (d:Point2D) => xScale(d.x));
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

                this.svgScatterContainer[key] = this._svg.data
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
        innerRadius:number = 0;
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

                this.svgPieContainer[key] = this._svg.data
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

                var radius = this.nettoHeight > this.nettoWidth ? this.nettoWidth*0.5-this.innerRadius : this.nettoHeight*0.5-this.innerRadius;

                var outerRadius = (key + 1) * radius/this.dataSets.length + this.innerRadius;
                var innerRadius = key * radius/this.dataSets.length + this.innerRadius;

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

                    pieces.append("path")
                        .each((d:any)=> {
                            d._endAngle = d.endAngle;
                            d._formatedValue = this.format(d.value);
                            d.endAngle = d.startAngle;
                        })
                        .attr("d", arc)
                        .areaStyle((d:D3.ArcDescriptor) => d.data.areaStyle)
                        .transition()
                        .duration(this.transition.duration)
                        .delay((d,i) => i*this.transition.delay)
                        .ease(this.transition.ease)
                        .attrTween("d", (d:any) => {
                            var interpolate = d3.interpolate(d.startAngle, d._endAngle);
                            return function(t) {
                                d.endAngle = interpolate(t);
                                return arc(d);
                            };
                        })
                        .each("end", function(d:any) {

                            d3.select(this.parentNode)
                                .append("text")
                                .text(d._formatedValue)
                                .attr("transform", "translate("+arc.centroid(d)+") scale(1)")
                                .style("text-anchor", "middle")
                                .fontStyle(dataSet.fontStyle)
                        });
                }
            });
        }

        drawLegend() {

            var legendDotRadius = this._font.legend.fontSize * 0.5,
                legendOffsetMin = 10,
                legendOffsetFactor = 0.03,
                legendOffset = this.nettoWidth * legendOffsetFactor > legendOffsetMin ? this.nettoWidth * legendOffsetFactor : legendOffsetMin;

            this.dataSets.forEach((dataset:DataSet,j:number) => {

                var translateX = 0,
                    containerDataSet = this._svg.legend.append("g");

                dataset.data.forEach( (data:any,k:number) => {

                    var translateY = j*legendDotRadius* 2 * 1.2,
                        container =
                            containerDataSet
                                .append("g")
                                .attr("height", legendDotRadius * 2),
                        text = data.label ? data.label : dataset.label + " " + k,
                        symbolType = dataset.symbolStyle ? dataset.symbolStyle.type: "circle",
                        symbolPath = d3.svg.symbol().type(symbolType),
                        symbol = container
                            .append("path")
                        .attr("transform", "scale("+ legendDotRadius*0.18 +")")
                            .attr("d", symbolPath)
                            .areaStyle(data.areaStyle);

                    container
                        .append("text")
                        .attr("x", legendDotRadius*1.5)
                        .attr("y", legendDotRadius*0.5)
                        .style("alignment-baseline", "middle")
                        .fontStyle(this._font.legend)
                        .text(text);

                    if (k > 0) {
                        var allLegends = containerDataSet.selectAll("g"),
                            prevLegend = allLegends[0][k - 1],
                            prevLegendDimen = prevLegend.getBBox();

                        translateX += prevLegendDimen.x + prevLegendDimen.width + legendOffset;
                    }

                    container.attr("transform", "translate (" + translateX + ","+ translateY +")");
                });
            });
        }
    }

    export class DoughnutChart extends PieChart {

        innerRadius:number = 10;

        normalize(value:any) {
            super.normalize(value);

            if (value.hasOwnProperty("innerRadius")) {
                this.innerRadius = parseFloat(value.innerRadius);
            }
        }
    }
}