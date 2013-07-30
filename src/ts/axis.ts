/// <reference path="../../d.ts/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../../d.ts/DefinitelyTyped/d3/d3.d.ts" />
/// <reference path="Utils/utils.ts" />

module dChart {

    export interface IAxis {

        label:string;
        labelAlign:string;
        labelOffset:number;
        grid:bool;
        gridStyle:Utils.LineStyle;
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

        label:string;

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

        ticks:number = 10;

        ticksFormat:string[];

        tickValues:number[];

        tickSubdivide:bool = false;

        tickSize:number[];

        tickPadding:number;

        visible:bool = true;

        constructor() {

            this.gridStyle.stroke = "black";
            this.gridStyle.strokeWidth = 1;
            this.gridStyle.strokeOpacity = 0.25;
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


        /**
         * linear       d3.scale.linear()
         *              Linear scales are the most common scale, and a good default choice to map a continuous input domain
         *              to a continuous output range. The mapping is linear in that the output range value y can be expressed
         *              as a linear function of the input domain value x: y = mx + b. The input domain is typically a dimension
         *              of the data that you want to visualize, such as the height of students (measured in meters) in a sample
         *              population. The output range is typically a dimension of the desired output visualization, such as the
         *              height of bars (measured in pixels) in a histogram.
         *              https://github.com/mbostock/d3/wiki/Quantitative-Scales#wiki-linear
         * identity     d3.scale.identity()
         *              Identity scales are a special case of linear scales where the domain and range are identical; the scale
         *              and its invert method are both the identity function. These scales are occasionally useful when working
         *              with pixel coordinates, say in conjunction with the axis and brush components.
         *              https://github.com/mbostock/d3/wiki/Quantitative-Scales#wiki-identity
         * pow          d3.scale.pow()
         *              Power scales are similar to linear scales, except there's an exponential transform that is applied to
         *              the input domain value before the output range value is computed. The mapping to the output range value
         *              y can be expressed as a function of the input domain value x: y = mx^k + b, where k is the exponent value.
         *              Power scales also support negative values, in which case the input value is multiplied by -1, and the
         *              resulting output value is also multiplied by -1.
         *              https://github.com/mbostock/d3/wiki/Quantitative-Scales#wiki-pow
         * sqrt         d3.scale.sqrt()
         *              Constructs a new power scale with the default domain [0,1], the default range [0,1], and the exponent .5.
         *              https://github.com/mbostock/d3/wiki/Quantitative-Scales#wiki-sqrt
         * log          d3.scale.log()
         *              Log scales are similar to linear scales, except there's a logarithmic transform that is applied to the
         *              input domain value before the output range value is computed. The mapping to the output range value y
         *              can be expressed as a function of the input domain value x: y = m log(*x*) + b. Log scales also support
         *              negative values, in which case the input value is multiplied by -1, and the resulting output value is also
         *              multiplied by -1. However, note that the domain of a log scale should never contain zero, as log(0) is
         *              negative infinity.
         *              https://github.com/mbostock/d3/wiki/Quantitative-Scales#wiki-log
         * quantize     d3.scale.quantize()
         *              Quantize scales are a variant of linear scales with a discrete rather than continuous range. The input
         *              domain is still continuous, and divided into uniform segments based on the number of values in (the
         *              cardinality of) the output range. The mapping is linear in that the output range value y can be expressed
         *              as a linear function of the input domain value x: y = mx + b. The input domain is typically a dimension
         *              of the data that you want to visualize, such as the height of students (measured in meters) in a sample
         *              population. The output range is typically a dimension of the desired output visualization, such as the
         *              height of bars (measured in pixels) in a histogram.
         *              https://github.com/mbostock/d3/wiki/Quantitative-Scales#wiki-quantize
         * quantile     d3.scale.quantile()
         *              Quantile scales map an input domain to a discrete range. Although the input domain is continuous and
         *              the scale will accept any reasonable input value, the input domain is specified as a discrete set of
         *              values. The number of values in (the cardinality of) the output range determines the number of quantiles
         *              that will be computed from the input domain. To compute the quantiles, the input domain is sorted, and
         *              treated as a population of discrete values. The input domain is typically a dimension of the data that
         *              you want to visualize, such as the daily change of the stock market. The output range is typically a
         *              dimension of the desired output visualization, such as a diverging color scale.
         *              https://github.com/mbostock/d3/wiki/Quantitative-Scales#wiki-quantile
         * treshold     d3.scale.threshold()
         *              Threshold scales are similar to quantize scales, except they allow you to map arbitrary subsets of the domain
         *              to discrete values in the range. The input domain is still continuous, and divided into slices based on a set
         *              of threshold values. The input domain is typically a dimension of the data that you want to visualize, such
         *              as the height of students (measured in meters) in a sample population. The output range is typically a dimension
         *              of the desired output visualization, such as a set of colors (represented as strings).
         *              https://github.com/mbostock/d3/wiki/Quantitative-Scales#wiki-threshold
         * @param scale {string}
         * @see https://github.com/mbostock/d3/wiki/Quantitative-Scales
         */
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
                orient = this.align === "end" ? "bottom" : "top";
            }

            if (this.orientation === "y") {
                orient = this.align === "end" ? "right" : "left";
            }

            var axis = d3.svg.axis()
                         .scale(this.getScale())
                         .orient(orient)
                         .ticks(this.ticks);

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

            if (value.hasOwnProperty("grid")){

                this.showGrid = value.grid;
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
    }
}