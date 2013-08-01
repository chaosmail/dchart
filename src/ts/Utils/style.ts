/// <reference path="../../../d.ts/DefinitelyTyped/d3/d3.d.ts" />

module dChart.Utils {

    /**
     * Styles for strokes
     * @see http://www.w3schools.com/svg/svg_stroking.asp
     */
    export class LineStyle {

        stroke:string = "red";
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
    }

    /**
     * Styles for areas
     */
    export class AreaStyle extends LineStyle {

        fill:string = "blue";
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
    }

    /**
     * Styles for fonts
     */
    export class FontStyle extends AreaStyle {

        fontFamily:string = "sans-serif";
        fontSize:number = 11;
        fontWeight:string = "normal";

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
    }

}