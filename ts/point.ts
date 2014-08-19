/// <reference path="references.ts" />

module dChart {

    export interface IPoint {

        stroke:string;
        strokeWidth:number;
        strokeOpacity:number;
        fill:string;
        fillOpacity:number;
        label:string;

        x:number;
        y:number;
        z:number;

        sigma:number;
    }

    export interface IPointMap {

        stroke:string;
        strokeWidth:string;
        strokeOpacity:string;
        fill:string;
        fillOpacity:string;

        x:string;
        y:string;
        z:string;

        sigma:string;
    }

    export class Point {

        label:string = "";

        /**
         * dChart Line Element, that stores all Attribute Styles
         */
        lineStyle:Utils.LineStyle = new Utils.LineStyle();

        /**
         * dChart Area Element, that stores all Attribute Styles
         */
        areaStyle:Utils.AreaStyle = new Utils.AreaStyle();

        /**
         * dChart Area Element, that stores all Attribute Styles
         */
        symbolStyle:Utils.SymbolStyle = new Utils.SymbolStyle();

        sigma:number = null;

        constructor(public x?:number, public y?:number, public z?:number) {

        }

        normalize(value:any) {

            if (value.hasOwnProperty("label")) {
                this.label = value.label;
            }

            if (value.hasOwnProperty("lineStyle")) {

                var lineStyle = new Utils.LineStyle();
                lineStyle.normalize(value.lineStyle);
                this.lineStyle = lineStyle;
            }

            if (value.hasOwnProperty("areaStyle")) {

                var areaStyle = new Utils.AreaStyle();
                areaStyle.normalize(value.areaStyle);
                this.areaStyle = areaStyle;
            }

            if (value.hasOwnProperty("style")) {

                var symbolStyle = new Utils.SymbolStyle();
                symbolStyle.normalize(value.style);
                this.symbolStyle = symbolStyle;
            }

            if (value.hasOwnProperty("symbolStyle")) {

                var symbolStyle = new Utils.SymbolStyle();
                symbolStyle.normalize(value.symbolStyle);
                this.symbolStyle = symbolStyle;
            }

            if (value.hasOwnProperty("x")) {
                this.x = parseFloat(value.x);
            }

            if (value.hasOwnProperty("y")) {
                this.y = parseFloat(value.y);
            }

            if (value.hasOwnProperty("z")) {
                this.z = parseFloat(value.z);
            }

            if (value.hasOwnProperty("sigma")) {
                this.sigma = parseFloat(value.sigma);
            }
        }

        map(value:any, map:IPointMap) {

            if (value.hasOwnProperty(map.stroke)) {
                this.areaStyle.stroke = value[map.stroke];
            }

            if (value.hasOwnProperty(map.strokeWidth)) {
                this.areaStyle.strokeWidth = parseFloat(value[map.strokeWidth]);
            }

            if (value.hasOwnProperty(map.strokeOpacity)) {
                this.areaStyle.strokeOpacity = parseFloat(value[map.strokeOpacity]);
            }

            if (value.hasOwnProperty(map.fill)) {
                this.areaStyle.fill = value[map.fill];
            }

            if (value.hasOwnProperty(map.fillOpacity)) {
                this.areaStyle.fillOpacity = parseFloat(value[map.fillOpacity]);
            }

            if (value.hasOwnProperty(map.x)) {
                this.x = parseFloat(value[map.x]);
            }

            if (value.hasOwnProperty(map.y)) {
                this.y = parseFloat(value[map.y]);
            }

            if (value.hasOwnProperty(map.z)) {
                this.z = parseFloat(value[map.z]);
            }

            if (value.hasOwnProperty(map.sigma)) {
                this.sigma = parseFloat(value[map.sigma]);
            }
        }

        parse(elem:Element) {

            d3.map(elem.attributes).forEach((value:any) => {

                if (value.nodeName.match(/^stroke$/i)) {
                    this.areaStyle.stroke = Utils.Elem.getColor(value);
                    return;
                }
                else if (value.nodeName.match(/^stroke-width$/i)) {
                    this.areaStyle.strokeWidth = Utils.Elem.getFloat(value);
                    return;
                }
                else if (value.nodeName.match(/^stroke-opacity$/i)) {
                    this.areaStyle.strokeOpacity = Utils.Elem.getFloat(value);
                    return;
                }
                else if (value.nodeName.match(/^fill$/i)) {
                    this.areaStyle.fill = Utils.Elem.getColor(value);
                    return;
                }
                else if (value.nodeName.match(/^fill-opacity$/i)) {
                    this.areaStyle.fillOpacity = Utils.Elem.getFloat(value);
                    return;
                }
                else if (value.nodeName.match(/^x|t|time|date$/i)) {
                    this.x = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^y|val|value$/i)) {
                    this.y = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^z|w|weight$/i)) {
                    this.z = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^e|s|sigma$/i)) {
                    this.sigma = parseFloat(value.nodeValue);
                    return;
                }
            });
        }
    }
}