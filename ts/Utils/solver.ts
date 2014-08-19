module dChart.Utils {

    export interface ISolver {

        min:number;
        max:number;
        step:number;
        fn:any;
    }

    export interface ISolver1D extends ISolver {

        solve: (min?:number, max?:number, step?:number) => any[];
    }

    export interface ISolver2D extends ISolver {

        solve: (min?:number, max?:number, step?:number) => any[];
    }

    export interface ISolver3D extends ISolver {

        solve: (min?:number, max?:number, step?:number) => any[];
    }

    export class Solver {

        min:number = 0;
        max:number = 10;
        step:number = 1;

        fn:any;

        constructor() {

        }

        solve(min?:number, max?:number, step?:number) {

            var data: any[] = [];

            return data;
        }

        normalize(value:any) {

            if (value.hasOwnProperty("min")) {
                this.min = parseFloat(value.min);
            }

            if (value.hasOwnProperty("max")) {
                this.max = parseFloat(value.max);
            }

            if (value.hasOwnProperty("min")) {
                this.step = parseFloat(value.step);
            }

            if (value.hasOwnProperty("fn") && (typeof value.fn === "function")) {
                this.fn = value.fn;
            }
        }
    }

    export class Solver1D extends Solver implements ISolver1D {

        solve(min?:number, max?:number, step?:number) {

            this.min = min || this.min;
            this.max = max || this.max;
            this.step = step || this.step;

            var x:number;
            var data:any[] = [];

            if (typeof this.fn !== "function") {
                return data;
            }

            for (x=this.min;x<=this.max;x+=this.step) {
                data.push({x:this.fn()});
            }

            return data;
        }
    }

    export class Solver2D extends Solver implements ISolver2D {

        solve(min?:number, max?:number, step?:number) {

            this.min = min || this.min;
            this.max = max || this.max;
            this.step = step || this.step;

            var x:number;
            var data:any[] = [];

            if (typeof this.fn !== "function") {
                return data;
            }

            for (x=this.min;x<=this.max;x+=this.step) {
                data.push({x:x, y:this.fn(x)});
            }

            return data;
        }
    }
}