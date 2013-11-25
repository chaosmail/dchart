module dChart.Utils {

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
}