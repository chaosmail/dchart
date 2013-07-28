module dChart {

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

        x:string;
        t:string;
    }

    export interface IPoint3DMap extends IPointMap {

        x:string;
        y:string;
        z:string;
    }

    export interface IPoint3DTimeMap extends IPointMap {

        x:string;
        y:string;
        t:string;
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

        normalize(value:any) {

            if (value.hasOwnProperty("stroke")) {
                this.lineStyle.stroke = new Utils.Color(value.stroke);
            }

            if (value.hasOwnProperty("strokeWidth")) {
                this.lineStyle.strokeWidth = new Utils.Size(parseFloat(value.strokeWidth));
            }

            if (value.hasOwnProperty("strokeOpacity")) {
                this.lineStyle.strokeOpacity = parseFloat(value.strokeOpacity);
            }

            if (value.hasOwnProperty("fill")) {
                this.areaStyle.fill = new Utils.Color(value.fill);
            }

            if (value.hasOwnProperty("fillOpacity")) {
                this.areaStyle.fillOpacity = parseFloat(value.fillOpacity);
            }
        }

        map(value:any, map:IPointMap) {

            if (value.hasOwnProperty(map.stroke)) {
                this.lineStyle.stroke = new Utils.Color(value[map.stroke]);
            }

            if (value.hasOwnProperty(map.strokeWidth)) {
                this.lineStyle.strokeWidth = new Utils.Size(parseFloat(value[map.strokeWidth]));
            }

            if (value.hasOwnProperty(map.strokeOpacity)) {
                this.lineStyle.strokeOpacity = parseFloat(value[map.strokeOpacity]);
            }

            if (value.hasOwnProperty(map.fill)) {
                this.areaStyle.fill = new Utils.Color(value[map.fill]);
            }

            if (value.hasOwnProperty(map.fillOpacity)) {
                this.areaStyle.fillOpacity = parseFloat(value[map.fillOpacity]);
            }
        }

        parse(elem:Element) {

            _.map(elem.attributes, (value) => {

                if (value.nodeName.match(/^stroke$/i)) {
                    this.lineStyle.stroke = Utils.Elem.getColor(value);
                    return;
                }
                else if (value.nodeName.match(/^stroke-width$/i)) {
                    this.lineStyle.strokeWidth = Utils.Elem.getSize(value);
                    return;
                }
                else if (value.nodeName.match(/^stroke-opacity$/i)) {
                    this.lineStyle.strokeOpacity = Utils.Elem.getFloat(value);
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
                else if (value.nodeName.match(/^y$/i)) {
                    this.x = Utils.Elem.getFloat(value);
                    return;
                }
                else if (value.nodeName.match(/^val$/i)) {
                    this.x = Utils.Elem.getFloat(value);
                    return;
                }
                else if (value.nodeName.match(/^value$/i)) {
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

        map(value:any, map:IPoint2DTimeMap) {
            super.map(value,map);

            if (value.hasOwnProperty(map.x)) {
                this.x = parseFloat(value[map.x]);
            }

            if (value.hasOwnProperty(map.t)) {
                this.t = new Date(value[map.t]);
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

        constructor(public x?:number, public y?:number, public t?:Date) {
            super();
        }

        map(value:any, map:IPoint3DTimeMap) {
            super.map(value,map);

            if (value.hasOwnProperty(map.x)) {
                this.x = parseFloat(value[map.x]);
            }

            if (value.hasOwnProperty(map.y)) {
                this.y = parseFloat(value[map.y]);
            }

            if (value.hasOwnProperty(map.t)) {
                this.t = new Date(value[map.t]);
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
                else if (value.nodeName.match(/^t$/i)) {
                    this.t = new Date(value.nodeValue);
                    return;
                }
            });
        }
    }
}