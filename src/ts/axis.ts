/// <reference path="../../d.ts/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../../d.ts/DefinitelyTyped/d3/d3.d.ts" />
/// <reference path="Utils/utils.ts" />

module dChart {

    export interface IAxis {

        label:string;
        scale:string;
        autorange:bool;
        range:number[];
        domain:number[];
    }

    export interface ITickSize {

        major:number;
        minor:number;
        end:number;
    }

    export class Axis {

        range:number[] = [0, 1];

        domain:number[] = [0, 1];

        autorange:bool = true;

        scale:D3.Scale = d3.scale.linear();

        d3Attrs:any[] = [];

        length:Utils.Size = new Utils.Size(1);

        /**
         * Axis Orientation
         * x,y or z
         * @type {string}
         */
        orientation:string = "x";

        /**
         * start        Show the Axis at the beginning (left, top) of the Chart
         * center       Show the Axis in the center of the Chart
         * end          Show the Axis at the end (bottom, right) of the Chart
         * @type {string}
         */
        align:string = "start";

        /**
         * start        Show the Axis-Label at the beginning (left, top) of the Axis
         * center       Show the Axis-Label in the center of the Axis
         * end          Show the Axis-Label at the end (bottom, right) of the Axis
         * @type {string}
         */
        labelAlign:string = "end";

        ticks:number = 10;

        ticksFormat:string[];

        tickValues:number[];

        tickSubdivide:bool = false;

        tickSize:ITickSize = {
            major:1,minor:0,end:0
        };

        tickPadding:number;

        visible:bool = true;

        constructor(public axisLabel:string) {

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
         setScale(scale:string = "linear") {

            this.scale = (scale.match(/^identity$/i)) ? d3.scale.identity()
                : (scale.match(/^pow|power$/i)) ? d3.scale.pow()
                : (scale.match(/^sqrt$/)) ? d3.scale.sqrt()
                : (scale.match(/^log$/)) ? d3.scale.log()
                : (scale.match(/^quantize/)) ? d3.scale.quantize()
                : (scale.match(/^quantile$/)) ? d3.scale.quantile()
                : (scale.match(/^treshold$/)) ? d3.scale.treshold()
                : d3.scale.linear();

            this.scale.domain(this.domain).range(this.range);

            return this;
        }

        addScaleFn(fn:string,args:any) {

            if (this.scale.prototype[fn]) {
                this.scale[fn](args);
            }
        }

        setOrientation(orientation:string = "x") {

            this.orientation = (orientation.match(/^y|v|vertical$/i)) ? "y"
                : (orientation.match(/^z$/i)) ? "z"
                : "x";

            return this;
        }

        setDomain(domain:number[] = [0, 1]) {

            this.domain = domain;

            return this;
        }

        setRange(range:number[] = [0, this.length.value]) {

            this.range = range;

            return this;
        }

        setTicks(ticks:number = 10) {

            this.ticks = ticks;
        }

        setLabelAlign(labelAlign:string) {

            this.labelAlign = (labelAlign.match(/^top|left|start$/i)) ? "start"
                : (labelAlign.match(/^bottom|right|end$/i)) ? "end"
                : "center";

            return this;
        }

        getAxis() {

            var axis = d3.svg.axis().scale(this.scale).orient(this.labelAlign).ticks(this.ticks);

            return axis;
        }

        /**
         * Utils Axis as SVG
         * @param length {Utils.Size}
         * @param min {number}
         * @param max {number}
         */
            draw(length:Utils.Size, min:number, max:number) {

            if (this.autorange === true) {
                this.range = [min, max];
            }

            var pos = this.align === "center" ? length.value * 0.5 :
                this.align === "start" ? 0 :
                    length.value;


            var labelOrient = this.align === "start" ? "top" : "bottom";

            var labelPos = this.labelAlign === "start" ? 0 :
                this.labelAlign === "center" ? length.value * 0.5 :
                    length.value;

            var scale = null;


            scale = scale.domain(this.range).range([0, length.value]);

            var axis = d3.svg.axis().scale(scale).orient(labelOrient).ticks(this.ticks);

            if (this.ticksFormat.length > 0) {
                axis.tickFormat((d:number) => this.ticksFormat[d]);
            }
        }
    }
}