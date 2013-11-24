/// <reference path="references.ts" />

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
        marginBottom:number = 60;

        width:number = 400;
        height:number = 400;
        nettoWidth:number = 340;
        nettoHeight:number = 310;

        showTransition:boolean = false;
        transition:Utils.Transition = new Utils.Transition();

        label:string;
        description:string;

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

            this.initializeFonts();
            this.initializeFormat();
        }

        clear() {

            if (this._svg.root) {
                this._svg.root.remove();
            }
        }

        initializeFormat() {

            this.setFormat(".2f");
        }

        initializeFonts() {

            this.fontStyle.fontFamily = this.fontStyle.fontFamily || "sans-serif";
            this.fontStyle.fontSize = this.fontStyle.fontSize || 11;
            this.fontStyle.fontWeight = this.fontStyle.fontWeight || "normal";
            this.fontStyle.stroke = this.fontStyle.stroke || "none";
            this.fontStyle.fill = this.fontStyle.fill || "black";

            this._font.root = this.fontStyle.clone();
            this._font.legend = this.fontStyle.clone();
            this._font.label = this.fontStyle.clone();
            this._font.description = this.fontStyle.clone();
            this._font.axis = this.fontStyle.clone();
            this._font.ticks = this.fontStyle.clone();

            this._font.label.fontWeight = "bold";
            this._font.ticks.fontSize -= 2;
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

            this._svg.legend.attr("transform", "translate("+ this.marginLeft +"," + this._font.legend.fontSize*0.5 + ")");
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

            var description = this._svg.label.select(".description")
                .text(this.description)
                .attr("x", this.nettoWidth * 0.5 + this.marginLeft)
                .attr("y", this.height + this._font.label.fontSize*0.8)
                .attr("text-anchor", "middle");

            var label = this._svg.label.select(".label")
                .text(this.label)
                .attr("x", this.nettoWidth * 0.5 + this.marginLeft)
                .attr("y", this.height + this._font.label.fontSize*0.8)
                .attr("text-anchor", "middle");

            var descriptionOffset = 0,
                labelOffset = 0;

            if (this.description) {

                var descriptionDimen = description[0][0].getBBox();

                descriptionOffset -= descriptionDimen.height;
                labelOffset -= descriptionDimen.height;
            }

            if (this.label) {

                var labelDimen = label[0][0].getBBox();

                labelOffset -= labelDimen.height;
            }

            label.attr("transform", "translate(0,"+labelOffset+")");
            description.attr("transform", "translate(0,"+descriptionOffset+")");
        }

        drawLegend() {

            var legendDotRadius = this._font.legend.fontSize * 0.5,
                legendOffsetMin = 10,
                legendOffsetFactor = 0.03,
                legendOffset = this.nettoWidth * legendOffsetFactor > legendOffsetMin ? this.nettoWidth * legendOffsetFactor : legendOffsetMin,
                translateX = 0;

            this.dataSets.forEach((dataset:DataSet,k:number) => {

               if (dataset.showLegend === false) {
                   return;
               }

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

                this.fontStyle = this.fontStyle || new Utils.FontStyle();
                this.fontStyle.normalize(value.fontStyle);
                this.initializeFonts();
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

        // TODO
        // xAxis:xAxis and yAxis:yAxis is causing error in WebStorm
        xAxis:any = null;
        yAxis:any = null;

        constructor() {
            super();

            this.xAxis = new xAxis(this);
            this.yAxis = new yAxis(this);
        }

        setFormat(format:string) {

            this.format = d3.format(format);
            this.xAxis.setFormat(format);
            this.yAxis.setFormat(format);

            return this;
        }

        getPoint() {
            return new Point();
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

        xAxis:any;
        yAxis:any;
        zAxis:any;

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
            return new Point();
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
}