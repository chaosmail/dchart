/// <reference path="../../../d.ts/DefinitelyTyped/d3/d3.d.ts" />
/// <reference path="../../../lib/d3-styles/dist/d3-styles.d.ts" />

module dChart.Utils {

    export class Style {

        clone() {

            var tmp = new (<any> this).constructor();

            for(var k in this) {
                tmp[k] = this[k];
            }

            return <any> tmp;
        }
    }

    /**
     * Styles for strokes
     * @see http://www.w3schools.com/svg/svg_stroking.asp
     */
    export class LineStyle extends Style {

        stroke:string = "black";
        strokeWidth:number = 1;
        strokeOpacity:number = 1;
        strokeLinecap:string = "butt";
        strokeDasharray:string = "0";

        normalize(value:any) {

            if (value.hasOwnProperty("stroke")) {
                this.stroke = value.stroke;
            }

            if (value.hasOwnProperty("strokeWidth")) {
                this.strokeWidth = parseFloat(value.strokeWidth);
            }

            if (value.hasOwnProperty("strokeOpacity")) {
                this.strokeOpacity = parseFloat(value.strokeOpacity);
            }

            if (value.hasOwnProperty("strokeLinecap")) {
                this.strokeLinecap = value.strokeLinecap;
            }

            if (value.hasOwnProperty("strokeDasharray")) {
                this.strokeDasharray = value.strokeDasharray;
            }
        }

        // TODO
        // Add the map function here
    }

    /**
     * Styles for areas
     */
    export class AreaStyle extends LineStyle {

        fill:string = "black";
        fillOpacity:number = 1;

        normalize(value:any) {
            super.normalize(value);

            if (value.hasOwnProperty("fill")) {
                this.fill = value.fill;
            }

            if (value.hasOwnProperty("fillOpacity")) {
                this.fillOpacity = parseFloat(value.fillOpacity);
            }
        }

        // TODO
        // Add the map function here
    }

    /**
     * Styles for symbols
     */
    export class SymbolStyle extends AreaStyle {

        /**
         * circle           a circle.
         * cross            a Greek cross or plus sign.
         * diamond          a rhombus.
         * square           an axis-aligned square.
         * triangle-down    a downward-pointing equilateral triangle.
         * triangle-up      an upward-pointing equilateral triangle.
         * @type {string}
         */
        type:string = "circle";
        size:number = 1;

        normalize(value:any) {
            super.normalize(value);

            if (value.hasOwnProperty("type")) {
                this.type = value.type;
            }

            if (value.hasOwnProperty("size")) {
                this.size = parseFloat(value.size);
            }
        }

        // TODO
        // Add the map function here
    }

    /**
     * Styles for fonts
     */
    export class FontStyle extends AreaStyle {

        fontFamily:string = "sans-serif";
        fontSize:number = 11;
        fontWeight:string = "normal";
        stroke:string = "none";

        normalize(value:any) {
            super.normalize(value);

            if (value.hasOwnProperty("fontFamily")) {
                this.fontFamily = value.fontFamily;
            }

            if (value.hasOwnProperty("fontWeight")) {
                this.fontWeight = value.fontWeight;
            }

            if (value.hasOwnProperty("fontSize")) {
                this.fontSize = parseFloat(value.fontSize);
            }
        }

        // TODO
        // Add the map function here
    }

}