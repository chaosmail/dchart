/// <reference path="references.ts" />

module dChart {

    export interface IAxis {

        label:string;
        labelAlign:string;
        labelOffset:number;
        format:string;
        gridStyle:Utils.LineStyle;
        fontStyle:Utils.FontStyle;
        scale:string;
        autorange:boolean;
        ticks:number;
        tickValues:string[];
        range:number[];
        domain:number[];
    }

    export class Axis {

        svg:D3.Selection;
        svgLabel:D3.Selection;

        lineStyle:Utils.LineStyle = new Utils.LineStyle();
        gridStyle:Utils.LineStyle = new Utils.LineStyle();

        fontStyle:Utils.FontStyle;

        label:string;

        format:any;

        labelOffset:number = 34;

        range:number[] = [0, 1];

        domain:number[] = [0, 1];

        autorange:boolean = true;

        showGrid:boolean = false;

        scale:string = "linear";

        length:number = 1;

        height:number = 1;

        /**
         * Axis Orientation
         * x,y or z
         * @type {string}
         */
        orientation:string = "x";

        /**
         * start        Show the Axis at the beginning (left, top) of the Charts
         * middle       Show the Axis in the center of the Charts
         * end          Show the Axis at the end (bottom, right) of the Charts
         * @type {string}
         */
        align:string = "start";

        /**
         * start        Show the Axis-Label at the beginning (left, top) of the Axis
         * middle       Show the Axis-Label in the center of the Axis
         * end          Show the Axis-Label at the end (bottom, right) of the Axis
         * @type {string}
         */
        labelAlign:string = "end";

        ticks:number;
        tickValues:number[] = [];
        tickLabels:string[] = [];

        tickSubdivide:boolean = false;

        tickSize:number[];

        tickPadding:number;

        visible:boolean = true;

        constructor(public chart:any) {

            this.lineStyle = <any>{
                stroke: "black",
                strokeOpacity: 1,
                strokeWidth: 1,
                strokeLinecap: "butt",
                strokeDasharray: 0
            };

            this.gridStyle = <any>{
                stroke: "black",
                strokeOpacity: 0.8,
                strokeWidth: 1,
                strokeLinecap: "butt",
                strokeDasharray: 0
            };

            this.format = chart.format;
        }

        addScaleFn(fn:string,args:any) {

            if (this.scale[fn] && typeof this.scale[fn] === "function") {
                this.scale[fn](args);
            }
        }

        setOrientation(orientation:string = "x") {

            this.orientation = (orientation.match(/^y|v|vertical$/i)) ? "y"
                : (orientation.match(/^z$/i)) ? "z"
                : "x";

            return this;
        }

        setFormat(format:string) {

            this.format = d3.format(format);

            return this;
        }

        setDomain(domain:number[]) {

            this.domain = domain;

            return this;
        }

        setRange(range:number[]) {

            this.range = range;

            return this;
        }

        setAlign(align:string) {

            this.align = (align.match(/^top|left|start$/i)) ? "start"
                : (align.match(/^bottom|right|end$/i)) ? "end"
                : "middle";

            return this;
        }

        setLabelAlign(labelAlign:string) {

            this.labelAlign = (labelAlign.match(/^top|left|start$/i)) ? "start"
                : (labelAlign.match(/^bottom|right|end$/i)) ? "end"
                : "middle";

            return this;
        }

        getScale() {

            var d3Scale:any = (this.scale.match(/^identity$/i)) ? d3.scale.identity()
                : (this.scale.match(/^pow|power$/i)) ? d3.scale.pow()
                : (this.scale.match(/^sqrt$/)) ? d3.scale.sqrt()
                : (this.scale.match(/^log$/)) ? d3.scale.log()
                : (this.scale.match(/^quantize/)) ? d3.scale.quantize()
                : (this.scale.match(/^quantile$/)) ? d3.scale.quantile()
                : (this.scale.match(/^threshold/)) ? d3.scale.threshold()
                : d3.scale.linear();

            d3Scale.domain(this.domain).range(this.range);

            return d3Scale;
        }

        getAxis() {

            var orient:string = "top";

            if (this.orientation === "x") {
                orient = this.align === "start" ? "top" : "bottom";
            }

            if (this.orientation === "y") {
                orient = this.align === "end" ? "right" : "left";
            }

            if (!this.ticks) {
                var u = this.chart.unique(this.orientation);
                this.ticks = u.length;
            }

            var axis:any = d3.svg.axis()
                         .scale(this.getScale())
                         .orient(orient)
                         .ticks(this.ticks)
                         .tickFormat(this.format);

            if (this.tickLabels.length > 0) {
                (<any> axis).tickFormat((d,i) => {
                    if (i < this.tickLabels.length) {
                        return this.tickLabels[i];
                    }
                    return "";
                });
            }

            if (this.tickValues.length > 0) {
                (<any> axis).tickValues(this.tickValues);
            }

            if (this.showGrid) {

                axis.tickSize(-this.height, 0, 4);
            }

            return axis;
        }

        clear() {

            if (this.svg) {
                this.svg.remove();
            }
        }

        draw(container:D3.Selection, min:number, max:number) {

            this.clear();

            this.fontStyle = this.fontStyle || this.chart._font.axis;

            this.svg = container.append("g")
                        .attr("class","dchart-axis dchart-axis-" + this.orientation);

            this.svgLabel =
                container
                    .append("g")
                    .attr("class","dchart-axis-label dchart-axis-" + this.orientation + "-label")
                    .append("text")
                    .fontStyle(this.fontStyle);

            this.redraw(min, max);
        }

        redraw(min:number = 0, max:number = 1) {

            if (this.autorange === true) {
                this.setDomain([min, max]);
            }

            this.svg.call(this.getAxis());

            var gridLines = this.svg.selectAll(".tick line");

            this.svgLabel.text(this.label);

            // Crisp Edges for everything
            // for nicer rendering
            this.svg.selectAll("path").style("shape-rendering", "crispEdges").style("fill", "none");
            this.svg.selectAll("line").style("shape-rendering", "crispEdges").style("fill", "none");

            // Style for Axis
            this.svg.selectAll("path.domain").lineStyle(this.lineStyle);

            // Style for Grid
            gridLines.style("fill", "none").lineStyle(this.gridStyle);

            // Adjust Grid Position
            if (this.showGrid && this.align === "end") {

                if (this.orientation === "x") {
                    gridLines.attr("transform","translate(0,0)");
                }
                else if (this.orientation === "y") {
                    gridLines.attr("transform","translate(0,0)");
                }
            }
            else if (this.showGrid && this.align === "middle") {

                if (this.orientation === "x") {
                    gridLines.attr("transform","translate(0,"+ this.height*0.5 +")");
                }
                else if (this.orientation === "y") {
                    gridLines.attr("transform","translate(-"+ this.height*0.5 +",0)");
                }
            }

        }

        normalize(value:any) {

            if (value.hasOwnProperty("label")){

                this.label = value.label
            }

            if (value.hasOwnProperty("align")){

                this.setAlign(value.align);
            }

            if (value.hasOwnProperty("labelAlign")){

                this.setLabelAlign(value.labelAlign);
            }

            if (value.hasOwnProperty("labelOffset")){

                this.labelOffset = parseInt(<any> value.labelOffset, 10);
            }

            if (value.hasOwnProperty("autorange")){

                this.autorange = value.autorange;
            }

            if (value.hasOwnProperty("format")){

                this.setFormat(value.format);
            }

            if (value.hasOwnProperty("showGrid")){

                this.showGrid = value.showGrid;
            }

            if (value.hasOwnProperty("fontStyle")) {

                this.fontStyle = this.fontStyle || this.chart._font.axis;

                this.fontStyle.normalize(value.fontStyle);
            }

            if (value.hasOwnProperty("lineStyle")){

                var lineStyle = new Utils.LineStyle();
                lineStyle.normalize(value.lineStyle);
                this.lineStyle = lineStyle;
            }

            if (value.hasOwnProperty("gridStyle")){

                var lineStyle = new Utils.LineStyle();
                lineStyle.normalize(value.gridStyle);
                this.gridStyle = lineStyle;

                this.showGrid = true;
            }

            if (value.hasOwnProperty("ticks")){

                this.ticks = parseInt(<any> value.ticks,10);
            }

            if (value.hasOwnProperty("tickValues")){

                this.tickValues = value.tickValues;
            }

            if (value.hasOwnProperty("tickLabels")){

                this.tickLabels = value.tickLabels;
            }

            if (value.hasOwnProperty("scale")){

                this.scale = value.scale;
            }

            if (value.hasOwnProperty("range")){

                this.setDomain(value.range);
                this.autorange = false;
            }
        }
    }

    export class xAxis extends Axis {

        orientation:string = "x";

        constructor(chart:any) {
            super(chart);

            this.setAlign("bottom");
            this.setLabelAlign("right");
        }

        redraw(min:number = 0, max:number = 1) {

            var pos = this.align === "middle" ? this.height * 0.5
                : this.align === "start" ? 0
                : this.height;

            var labelPos = this.labelAlign === "middle" ? this.length * 0.5
                : this.labelAlign === "start" ? 0
                : this.length;

            this.svg.attr("transform", "translate(0," + pos + ")");

            this.svgLabel.attr("x", labelPos)
                .attr("y", this.height + this.labelOffset)
                .attr("text-anchor", this.labelAlign);

            this.setRange([0,this.length]);

            super.redraw(min, max);
        }
    }

    export class yAxis extends Axis {

        orientation:string = "y";

        constructor(chart:any) {
            super(chart);

            this.setAlign("left");
            this.setLabelAlign("top");
        }

        redraw(min:number = 0, max:number = 1) {

            var pos = this.align === "middle" ? this.height * 0.5
                : this.align === "start" ? 0
                : this.height;

            var labelPos = this.labelAlign === "middle" ? this.length * 0.5
                : this.labelAlign === "start" ? 0
                : this.length;

            var labelAlign = this.labelAlign === "start" ? "end"
                : this.labelAlign === "end" ? "start"
                : "middle";

            this.svg.attr("transform", "translate(" + pos + ",0)");

            this.svgLabel.attr("x", -labelPos)
                .attr("y", -this.labelOffset)
                .attr("transform", "rotate(-90)")
                .attr("text-anchor", labelAlign);

            this.setRange([this.length,0]);

            super.redraw(min, max);
        }
    }

    export class zAxis extends Axis {

        orientation:string = "z";

        constructor(chart:any) {
            super(chart);

        }
    }
}