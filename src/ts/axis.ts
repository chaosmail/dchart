/// <reference path="../../d.ts/DefinitelyTyped/d3/d3.d.ts" />
/// <reference path="Utils/style.ts" />

module dChart {

    export interface IAxis {

        label:string;
        labelAlign:string;
        labelOffset:number;
        format:string;
        gridStyle:Utils.LineStyle;
        fontStyle:Utils.FontStyle;
        scale:string;
        autorange:bool;
        ticks:number;
        range:number[];
        domain:number[];
    }

    export class Axis {

        svg:D3.Selection;
        svgLabel:D3.Selection;

        gridStyle:Utils.LineStyle = new Utils.LineStyle();

        fontStyle:Utils.FontStyle;

        label:string;

        format:any;

        labelOffset:number = 34;

        range:number[] = [0, 1];

        domain:number[] = [0, 1];

        autorange:bool = true;

        showGrid:bool = false;

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

        ticksFormat:string[];

        tickValues:number[];

        tickSubdivide:bool = false;

        tickSize:number[];

        tickPadding:number;

        visible:bool = true;

        constructor(public chart:any) {

            this.gridStyle.stroke = "black";
            this.gridStyle.strokeWidth = 1;
            this.gridStyle.strokeOpacity = 0.25;

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

            var d3Scale = (this.scale.match(/^identity$/i)) ? d3.scale.identity()
                : (this.scale.match(/^pow|power$/i)) ? d3.scale.pow()
                : (this.scale.match(/^sqrt$/)) ? d3.scale.sqrt()
                : (this.scale.match(/^log$/)) ? d3.scale.log()
                : (this.scale.match(/^quantize/)) ? d3.scale.quantize()
                : (this.scale.match(/^quantile$/)) ? d3.scale.quantile()
                : (this.scale.match(/^treshold$/)) ? d3.scale.treshold()
                : d3.scale.linear();

            d3Scale.domain(this.domain).range(this.range);

            return d3Scale;
        }

        getAxis() {

            var orient = "top";

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

            var axis = d3.svg.axis()
                         .scale(this.getScale())
                         .orient(orient)
                         .ticks(this.ticks)
                         .tickFormat(this.format);

            if (this.showGrid) {

                axis.tickSize(-this.height, 0, 3);
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

            this.svg = container.append("g")
                        .attr("class","dchart-axis dchart-axis-" + this.orientation);

            this.svgLabel = container.append("g")
                        .attr("class","dchart-axis-label dchart-axis-" + this.orientation + "-label")
                        .append("text");



            this.redraw(min, max);
        }

        redraw(min:number = 0, max:number = 1) {

            if (this.autorange === true) {
                this.setDomain([min, max]);
            }

            this.svg.call(this.getAxis());

            this.svg.selectAll(".tick line").style("fill", "none")
                .style("stroke", (d,i) => i>0 ? this.gridStyle.stroke : "black")
                .style("stroke-width", (d,i) => i>0 ? this.gridStyle.strokeWidth : 1)
                .style("stroke-opacity", (d,i) => i>0 ? this.gridStyle.strokeOpacity : 1)
                .style("stroke-linecap", (d,i) => i>0 ? this.gridStyle.strokeLinecap : "butt")
                .style("stroke-dasharray", (d,i) => i>0 ? this.gridStyle.strokeDasharray : "0");

            this.svgLabel.text(this.label);

            this.svg.selectAll("path").style("stroke",this.gridStyle.stroke).style("shape-rendering", "crispEdges").style("fill", "none");
            this.svg.selectAll("line").style("stroke",this.gridStyle.stroke).style("shape-rendering", "crispEdges").style("fill", "none");
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

                this.labelOffset = parseInt(value.labelOffset, 10);
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

            if (value.hasOwnProperty("gridStyle")){

                var lineStyle = new Utils.LineStyle();
                lineStyle.normalize(value.gridStyle);
                this.gridStyle = lineStyle;

                this.showGrid = true;
            }

            if (value.hasOwnProperty("ticks")){

                this.ticks = parseInt(value.ticks,10);
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