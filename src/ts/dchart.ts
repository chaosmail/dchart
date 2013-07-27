/// <reference path="../../d.ts/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../../d.ts/DefinitelyTyped/d3/d3.d.ts" />
"use strict";

module dChart {

    export class ElementUtils {

        static getFloat(regexp:RegExp, value:Element) {
            if (value.nodeName.match(regexp)) {
                return parseFloat(value.nodeValue);
            }
            return null;
        }

        static getSize(regexp:RegExp, value:Element) {
            if (value.nodeName.match(regexp)) {
                return new Size(parseFloat(value.nodeValue));
            }
            return null;
        }

        static  getColor(regexp:RegExp, value:Element) {
            if (value.nodeName.match(regexp)) {
                return new Color(value.nodeValue);
            }
            return null;
        }
    }

    export class Point {

        /**
         * dChart Line Element, that stores all Attribute Styles
         */
        lineStyle:LineStyle = new LineStyle();

        /**
         * dChart Area Element, that stores all Attribute Styles
         */
        areaStyle:AreaStyle = new AreaStyle();

        normalize(value:any) {

        }

        parse(elem:Element) {

            _.map(elem.attributes, (value) => {

                if (value.nodeName.match(/^stroke$/i)) {
                    this.lineStyle.stroke = new Color(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^stroke-width$/i)) {
                    this.lineStyle.strokeWidth = new Size(parseFloat(value.nodeValue));
                    return;
                }
                else if (value.nodeName.match(/^stroke-opacity$/i)) {
                    this.lineStyle.strokeOpacity = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^fill$/i)) {
                    this.areaStyle.fill = new Color(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^fill-opacity$/i)) {
                    this.areaStyle.fillOpacity = parseFloat(value.nodeValue);
                    return;
                }
            });
        }
    }

    export class Point1D extends Point {

        constructor(public x?:number) {
            super();
        }

        normalize(value:any) {
            super.parse(value);

            if (typeof(value) === "number") {
                this.x = value;
            }
        }

        parse(elem:Element) {
            super.parse(elem);

            _.map(elem.attributes, (value) => {

                if (value.nodeName.match(/^x$/i)) {
                    this.x = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^y$/i)) {
                    this.x = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^val$/i)) {
                    this.x = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^value$/i)) {
                    this.x = parseFloat(value.nodeValue);
                    return;
                }
            });
        }
    }

    export class Point2D extends Point {

        constructor(public x?:number, public y?:number) {
            super();
        }

        parse(elem:Element) {
            super.parse(elem);

            _.map(elem.attributes, (value) => {

                if (value.nodeName.match(/^x$/i)) {
                    this.x = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^y$/i)) {
                    this.y = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^val$/i)) {
                    this.y = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^value$/i)) {
                    this.y = parseFloat(value.nodeValue);
                    return;
                }
            });
        }
    }

    export class Point2DTime extends Point {

        constructor(public x?:number, public t?:Date) {
            super();
        }

        parse(elem:Element) {
            super.parse(elem);

            _.map(elem.attributes, (value) => {

                if (value.nodeName.match(/^x$/i)) {
                    this.x = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^y$/i)) {
                    this.t = new Date(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^val$/i)) {
                    this.t = new Date(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^value$/i)) {
                    this.t = new Date(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^t$/i)) {
                    this.t = new Date(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^time$/i)) {
                    this.t = new Date(value.nodeValue);
                    return;
                }
            });
        }
    }

    export class Point3D extends Point {

        constructor(public x?:number, public y?:number, public z?:number) {
            super();
        }

        parse(elem:Element) {
            super.parse(elem);

            _.map(elem.attributes, (value) => {

                if (value.nodeName.match(/^x$/i)) {
                    this.x = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^y$/i)) {
                    this.y = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^z$/i)) {
                    this.z = parseFloat(value.nodeValue);
                    return;
                }
            });
        }
    }

    export class Point3DTime extends Point {

        constructor(public x?:number, public y?:number, public t?:Date) {
            super();
        }

        parse(elem:Element) {
            super.parse(elem);

            _.map(elem.attributes, (value) => {

                if (value.nodeName.match(/^x$/i)) {
                    this.x = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^y$/i)) {
                    this.y = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^t$/i)) {
                    this.t = new Date(value.nodeValue);
                    return;
                }
            });
        }
    }

    /**
     * Stores the Attributes of the Axis
     */
    export class Axis {

        clamp:bool = false;

        range:number[] = [0, 1];

        rangeAuto:bool = true;

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
         * power        d3.scale.pow()
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
         * @type {string}
         * @see https://github.com/mbostock/d3/wiki/Quantitative-Scales
         */
        scale:string = "linear";

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

        nice:number[] = [];

        ticks:number = 10;

        ticksFormat:string[];

        visible:bool = true;

        constructor(public axisLabel:string) {

        }

        /**
         * Draw Axis as SVG
         * @param length {Size}
         * @param min {number}
         * @param max {number}
         */
        draw(length:Size, min:number, max:number) {

            if (this.rangeAuto === true) {
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
            switch (this.scale) {

                case "identity":
                    scale = d3.scale.identity();
                    break;

                case "power":
                    scale = d3.scale.pow();
                    break;

                case "sqrt":
                    scale = d3.scale.sqrt();
                    break;

                case "log":
                    scale = d3.scale.log();
                    break;

                case "quantize":
                    scale = d3.scale.quantize();
                    break;

                case "quantile":
                    scale = d3.scale.quantile();
                    break;

                case "treshold":
                    scale = d3.scale.treshold();
                    break;

                case "linear":
                default:
                    scale = d3.scale.linear();

            }

            scale = scale.domain(this.range).range([0, length.value]);

            var axis = d3.svg.axis().scale(scale).orient(labelOrient).ticks(this.ticks);

            if (this.ticksFormat.length > 0) {
                axis.tickFormat((d:number) => this.ticksFormat[d]);
            }
        }
    }

    /**
     * Stores the Points and Attributes of a DataSet
     */
    export class DataSet {

        /**
         * Array of Points
         */
        public data:Point[] = [];

        /**
         * Interpolation between the points in the DataSet
         * @type {string}
         */
        interpolate:string = "linear";

        /**
         * Visibility of the DataSet
         * @type {boolean}
         */
        visible:bool = true;

        /**
         * Line Element, that stores all Attribute Styles
         */
        lineStyle:LineStyle = new LineStyle();

        /**
         * Area Element, that stores all Attribute Styles
         */
        areaStyle:AreaStyle = new AreaStyle();

        /**
         * Constructor
         * @param dataSetLabel
         */
            constructor(public dataSetLabel:string) {

        }

        public Point() {
            return new Point();
        }

        /**
         * Recalculate the Points, if DataSet is a function
         */
        public recalculate() {

        }

        /**
         * Parse the Attributes of the HTML-Element of the DataSet
         * @param {Element} elem The <dataset> HTML-Element
         */
            parse(elem:Element) {

            _.map(elem.attributes, function (value) {

                if (value.nodeName.match(/^label$/i)) {
                    this.label = value.nodeValue;
                }
                else if (value.nodeName.match(/^interpolate$/i)) {
                    this.interpolate = value.nodeValue;
                }
                else if (value.nodeName.match(/^min$/i)) {
                    this.solver.min = parseFloat(value.nodeValue);
                }
                else if (value.nodeName.match(/^max$/i)) {
                    this.solver.max = parseFloat(value.nodeValue);
                }
                else if (value.nodeName.match(/^step$/i)) {
                    this.solver.max = parseFloat(value.nodeValue);
                }
                else if (value.nodeName.match(/^stroke$/i)) {
                    this.lineStyle.stroke = new Color(value.nodeValue);
                }
                else if (value.nodeName.match(/^stroke-width$/i)) {
                    this.lineStyle.strokeWidth = new Size(parseFloat(value.nodeValue));
                }
                else if (value.nodeName.match(/^stroke-opacity$/i)) {
                    this.lineStyle.strokeOpacity = parseFloat(value.nodeValue);
                }
                else if (value.nodeName.match(/^fill$/i)) {
                    this.areaStyle.fill = new Color(value.nodeValue);
                }
                else if (value.nodeName.match(/^fill-opacity$/i)) {
                    this.areaStyle.fillOpacity = parseFloat(value.nodeValue);
                }
                else if (value.nodeName.match(/^data$/i)) {
                    this.parseDataAttr(value);
                }
            });

            _.map(elem.childNodes, function (value) {

                var point = this.Point();
                point.parse(value);

                this.data.push(point);
            });

        }

        min(axis:string) {
            return 0.0;
        }

        max(axis:string) {
            return 0.0;
        }

        /**
         * Parse the data attribute of the DataSet
         * data="[1,2,3]"
         * data="[{Point},{Point},{Point}]"
         * @param {Node} value Value of the Data Attribute
         */
            parseDataAttr(value:Node) {

            if (value.nodeValue === undefined || value.nodeValue === null || value.nodeValue.trim() === "") {
                return;
            }

            var parsedData = [];

            try {
                parsedData = JSON.parse(value.nodeValue);
            }
            catch (e) {

            }

            // TODO Parse data="[{Point},{Point},{Point}]"

            _.map(parsedData, function (value) {

                var point = this.Point();
                point.normalize(value);

                this.data.push(point);
            });
        }
    }

    export class DataSet2D extends DataSet {

        data:Point2D[] = [];
        solver:ISolver2D = new Solver2D();

        public Point() {
            return new Point2D();
        }

        public recalculate() {
            this.data = this.solver.solve();
        }

        min(axis:string) {

            return d3.min(this.data, (d:Point2D) => d[axis]);
        }

        max(axis:string) {

            return d3.max(this.data, (d:Point2D) => d[axis]);
        }
    }

    export class DataSet3D extends DataSet {

        data:Point3D[] = [];
        solver:ISolver3D = new Solver3D();

        public Point() {
            return new Point3D();
        }

        public recalculate() {
            this.data = this.solver.solve();
        }

        min(axis:string) {

            return d3.min(this.data, (d:Point3D) => d[axis]);
        }

        max(axis:string) {

            return d3.max(this.data, (d:Point3D) => d[axis]);
        }
    }

    export class Chart {

        chartMarginLeft:Size = new Size(10);
        chartMarginRight:Size = new Size(10);
        chartMarginTop:Size = new Size(10);
        chartMarginBottom:Size = new Size(10);

        chartTitle:string;
        chartDescription:string;

        constructor(public chartWidth:Size = new Size(400), public chartHeight:Size = new Size(400)) {

        }
    }

    export class Chart2D extends Chart {

        public dataSets:DataSet2D[];

        xAxis:Axis = new Axis("x");
        yAxis:Axis = new Axis("y");

        drawAxis() {
            var min = this.min();
            var max = this.max();

            var width = (new Size(this.chartWidth.value)).sub(this.chartMarginLeft).sub(this.chartMarginRight);
            var height = (new Size(this.chartHeight.value)).sub(this.chartMarginTop).sub(this.chartMarginBottom);

            this.xAxis.draw(width, min[0], max[0]);
            this.yAxis.draw(height, min[1], max[1]);
        }

        min(axis:string = "x") {
            return d3.min(this.dataSets, (dataSet:DataSet2D) => dataSet.min(axis));
        }

        max(axis:string = "x") {
            return d3.max(this.dataSets, (dataSet:DataSet2D) => dataSet.max(axis));
        }
    }

    export class Chart3D extends Chart {

        public dataSets:DataSet3D[];

        chartDepth:Size = new Size(400);

        xAxis:Axis = new Axis("x");
        yAxis:Axis = new Axis("y");
        zAxis:Axis = new Axis("z");

        drawAxis() {
            var min = this.min();
            var max = this.max();

            var width = new Size(this.chartWidth.value).sub(this.chartMarginLeft).sub(this.chartMarginRight);
            var height = new Size(this.chartHeight.value).sub(this.chartMarginTop).sub(this.chartMarginBottom);

            this.xAxis.draw(width, min[0], max[0]);
            this.yAxis.draw(height, min[1], max[1]);
            this.zAxis.draw(this.chartDepth, min[2], max[2]);
        }

        min(axis:string = "x") {
            return d3.min(this.dataSets, (dataSet:DataSet3D) => dataSet.min(axis));
        }

        max(axis:string = "x") {
            return d3.max(this.dataSets, (dataSet:DataSet3D) => dataSet.max(axis));
        }
    }

    export interface IStyle {

        get();
    }

    export class Color {

        constructor(public value:string) {

        }

        get() {
            return this.value;
        }

        RGB() {
            return d3.rgb(this.value);
        }

        HSL() {
            return d3.hsl(this.value);
        }

        HCL() {
            return d3.hcl(this.value);
        }

        LAB() {
            return d3.lab(this.value);
        }
    }

    export class Size {

        constructor(public value:number) {

        }

        get() {
            return this.value.toString(10) + "px";
        }

        sub(d:Size) {
            this.value -= d.value;
            return this;
        }

        add(d:Size) {
            this.value += d.value;
            return this;
        }

        mul(d:Size) {
            this.value *= d.value;
            return this;
        }

        div(d:Size) {
            this.value /= d.value;
            return this;
        }
    }

    export class LineStyle implements IStyle {

        stroke: Color;
        strokeWidth: Size;
        strokeOpacity: number;

        get() {
            return "";
        }
    }

    export class AreaStyle implements IStyle {

        fill: Color;
        fillOpacity: number;

        get() {
            return "";
        }
    }

    export interface ISolver {

        min:number;
        max:number;
        step:number;
    }

    export interface ISolver2D extends ISolver {

        fn: (x:number) => number;
        solve: (min?:number, max?:number, step?:number) => Point2D[];
    }

    export interface ISolver3D {

        fn: (x:number, y:number) => number;
        solve: (min?:number, max?:number, step?:number) => Point3D[];
    }

    export class Solver2D implements ISolver2D {

        public min:number = 0;
        public max:number = 10;
        public step:number = 1;

        fn(x:number) {
            return x;
        }

        solve(min?:number, max?:number, step?:number) {

            min = min || this.min;
            max = max || this.max;
            step = step || this.step;

            var x:number;
            var data: Point2D[] = [];

            for (x=min;x<=max;x+=step) {
                data.push(new Point2D(x, this.fn(x)));
            }

            return data;
        }
    }

    export class Solver3D implements ISolver3D {

        public min:number = 0;
        public max:number = 10;
        public step:number = 1;

        fn(x:number, y:number) {
            return x;
        }

        solve(min?:number, max?:number, step?:number) {

            min = min || this.min;
            max = max || this.max;
            step = step || this.step;

            var x:number;
            var y:number;
            var data: Point3D[] = [];

            for (x=min;x<=max;x+=step) {
                data.push(new Point3D(x, y, this.fn(x, y)));
            }

            return data;
        }
    }
}