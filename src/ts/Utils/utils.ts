/// <reference path="../../../d.ts/DefinitelyTyped/d3/d3.d.ts" />

module dChart.Utils {

    export class Doc {

        static css( code:string ) {

            var style = <any> document.createElement('style');

            style.type = 'text/css';

            if (style.styleSheet) {
                // IE
                style.styleSheet.cssText = code;
            } else {
                // Other browsers
                style.innerHTML = code;
            }

            document.body.appendChild( style );
        }
    }

    export class Elem {

        static getFloat(value:Element) {
            return parseFloat(value.nodeValue);
        }

        static  getColor(value:Element) {
            return value.nodeValue;
        }

        static  getDate(value:Element) {
            return new Date(value.nodeValue);
        }
    }

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
}