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
    }

    export class AreaStyle {

        fill:string = "blue";
        fillOpacity:number = 1;
    }
}