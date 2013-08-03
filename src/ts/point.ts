module dChart {

    export interface IPoint {

        stroke:string;
        strokeWidth:number;
        strokeOpacity:number;
        fill:string;
        fillOpacity:number;
        label:string;
    }

    export interface IPoint1D extends IPoint {

        x:number;
    }

    export interface IPoint2D extends IPoint {

        x:number;
        y:number;
    }

    export interface IPoint2DTime extends IPoint {

        t:number;
        y:number;
    }

    export interface IPoint3D extends IPoint {

        x:number;
        y:number;
        z:number;
    }

    export interface IPoint3DTime extends IPoint {

        t:number;
        y:number;
        z:number;
    }

    export interface IPointMap {

        stroke:string;
        strokeWidth:string;
        strokeOpacity:string;
        fill:string;
        fillOpacity:string;
    }

    export interface IPoint1DMap extends IPointMap {

        x:string;
    }

    export interface IPoint2DMap extends IPointMap {

        x:string;
        y:string;
    }

    export interface IPoint2DTimeMap extends IPointMap {

        t:string;
        y:string;
    }

    export interface IPoint3DMap extends IPointMap {

        x:string;
        y:string;
        z:string;
    }

    export interface IPoint3DTimeMap extends IPointMap {

        t:string;
        y:string;
        z:string;
    }

    export class Point {

        /**
         * dChart Line Element, that stores all Attribute Styles
         */
        lineStyle:Utils.LineStyle = new Utils.LineStyle();

        /**
         * dChart Area Element, that stores all Attribute Styles
         */
        areaStyle:Utils.AreaStyle = new Utils.AreaStyle();

        constructor() {

        }

        normalize(value:any) {

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
        }

        parse(elem:Element) {

            _.map(elem.attributes, (value) => {

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
            });
        }
    }

    export class Point1D extends Point {

        constructor(public x?:number) {
            super();
        }

        normalize(value:any) {
            super.normalize(value);

            if (value.hasOwnProperty("x")) {
                this.x = parseFloat(value.x);
            }
            else if (value.hasOwnProperty("y")) {
                this.x = parseFloat(value.y);
            }
            else if (value.hasOwnProperty("val")) {
                this.x = parseFloat(value.val);
            }
            if (value.hasOwnProperty("value")) {
                this.x = parseFloat(value.value);
            }
        }

        map(value:any, map:IPoint1DMap) {
            super.map(value,map);

            if (value.hasOwnProperty(map.x)) {
                this.x = parseFloat(value[map.x]);
            }
        }

        parse(elem:Element) {
            super.parse(elem);

            _.map(elem.attributes, (value) => {

                if (value.nodeName.match(/^x$/i)) {
                    this.x = Utils.Elem.getFloat(value);
                    return;
                }
                else if (value.nodeName.match(/^y|val|value$/i)) {
                    this.x = Utils.Elem.getFloat(value);
                    return;
                }
            });
        }
    }

    export class Point2D extends Point {

        constructor(public x?:number, public y?:number) {
            super();
        }

        normalize(value:any) {
            super.normalize(value);

            if (value.hasOwnProperty("x")) {
                this.x = parseFloat(value.x);
            }

            if (value.hasOwnProperty("y")) {
                this.y = parseFloat(value.y);
            }
            else if (value.hasOwnProperty("val")) {
                this.y = parseFloat(value.val);
            }
            if (value.hasOwnProperty("value")) {
                this.y = parseFloat(value.value);
            }
        }

        map(value:any, map:IPoint2DMap) {
            super.map(value,map);

            if (value.hasOwnProperty(map.x)) {
                this.x = parseFloat(value[map.x]);
            }

            if (value.hasOwnProperty(map.y)) {
                this.y = parseFloat(value[map.y]);
            }
        }

        parse(elem:Element) {
            super.parse(elem);

            _.map(elem.attributes, (value) => {

                if (value.nodeName.match(/^x$/i)) {
                    this.x = parseFloat(value.nodeValue);
                    return;
                }
                else if (value.nodeName.match(/^y|val|value$/i)) {
                    this.y = parseFloat(value.nodeValue);
                    return;
                }
            });
        }
    }

    export class Point2DTime extends Point {

        constructor(public t?:Date, public y?:number) {
            super();
        }

        normalize(value:any) {
            super.normalize(value);

            if (value.hasOwnProperty("x")) {
                this.t = new Date(value.x);
            }
            else if (value.hasOwnProperty("t")) {
                this.t = new Date(value.t);
            }
            else if (value.hasOwnProperty("time")) {
                this.t = new Date(value.time);
            }
            else if (value.hasOwnProperty("date")) {
                this.t = new Date(value.date);
            }

            if (value.hasOwnProperty("y")) {
                this.y = parseFloat(value.y);
            }
            else if (value.hasOwnProperty("val")) {
                this.y = parseFloat(value.val);
            }
            if (value.hasOwnProperty("value")) {
                this.y = parseFloat(value.value);
            }
        }

        map(value:any, map:IPoint2DTimeMap) {
            super.map(value,map);

            if (value.hasOwnProperty(map.t)) {
                this.t = new Date(value[map.t]);
            }

            if (value.hasOwnProperty(map.y)) {
                this.y = parseFloat(value[map.y]);
            }
        }

        parse(elem:Element) {
            super.parse(elem);

            _.map(elem.attributes, (value) => {

                if (value.nodeName.match(/^x|t|time|date$/i)) {
                    this.t = Utils.Elem.getDate(value);
                    return;
                }
                else if (value.nodeName.match(/^y|val|value$/i)) {
                    this.y = Utils.Elem.getFloat(value);
                    return;
                }
            });
        }
    }

    export class Point3D extends Point {

        constructor(public x?:number, public y?:number, public z?:number) {
            super();
        }

        normalize(value:any) {
            super.normalize(value);

            if (value.hasOwnProperty("x")) {
                this.x = parseFloat(value.x);
            }

            if (value.hasOwnProperty("y")) {
                this.y = parseFloat(value.y);
            }

            if (value.hasOwnProperty("z")) {
                this.z = parseFloat(value.z);
            }
        }

        map(value:any, map:IPoint3DMap) {
            super.map(value,map);

            if (value.hasOwnProperty(map.x)) {
                this.x = parseFloat(value[map.x]);
            }

            if (value.hasOwnProperty(map.y)) {
                this.y = parseFloat(value[map.y]);
            }

            if (value.hasOwnProperty(map.z)) {
                this.z = parseFloat(value[map.z]);
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

        constructor(public t?:Date, public y?:number, public z?:number) {
            super();
        }

        normalize(value:any) {
            super.normalize(value);

            if (value.hasOwnProperty("x")) {
                this.t = new Date(value.x);
            }
            else if (value.hasOwnProperty("t")) {
                this.t = new Date(value.t);
            }
            else if (value.hasOwnProperty("time")) {
                this.t = new Date(value.time);
            }
            else if (value.hasOwnProperty("date")) {
                this.t = new Date(value.date);
            }

            if (value.hasOwnProperty("y")) {
                this.y = parseFloat(value.y);
            }

            if (value.hasOwnProperty("z")) {
                this.z = parseFloat(value.z);
            }
        }

        map(value:any, map:IPoint3DTimeMap) {
            super.map(value,map);

            if (value.hasOwnProperty(map.t)) {
                this.t = new Date(value[map.t]);
            }

            if (value.hasOwnProperty(map.y)) {
                this.y = parseFloat(value[map.y]);
            }

            if (value.hasOwnProperty(map.z)) {
                this.z = parseFloat(value[map.z]);
            }
        }

        parse(elem:Element) {
            super.parse(elem);

            _.map(elem.attributes, (value) => {

                if (value.nodeName.match(/^x|t|time|date$/i)) {
                    this.t = new Date(value.nodeValue);
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
}