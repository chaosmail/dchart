
module dChart.Utils {

    export interface IFilter {
        name:string;
        operator:string;
        value:any;
    }

    export class Filter {

        key:string = "";
        operator:string = "==";
        value:any = null;

        is(object:any) {

            var value = object;

            if (this.key) {
                if (!object.hasOwnProperty(this.key)) {
                    return false;
                }
                value = object[this.key];
            }

            if (this.operator.match(/==/i)) {
                return value == this.value;
            }
            else if (this.operator.match(/===/i)) {
                return value === this.value;
            }

            return false;
        }

        not(object:any) {
            return !this.is(object);
        }

        normalize(value:any) {

            if (value.hasOwnProperty("key")) {
                this.key = value.key;
            }

            if (value.hasOwnProperty("operator")) {
                this.operator = value.operator;
            }

            if (value.hasOwnProperty("value")) {
                this.value = value.value;
            }
        }
    }
}