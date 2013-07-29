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

        static getSize(value:Element) {
            return new Size(parseFloat(value.nodeValue));
        }

        static  getColor(value:Element) {
            return new Color(value.nodeValue);
        }

        static  getDate(value:Element) {
            return new Date(value.nodeValue);
        }
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

    export interface IStyle {

        get();
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
}