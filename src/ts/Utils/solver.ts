module dChart.Utils {

    export interface ISolver {

        min:number;
        max:number;
        step:number;
        fn:any;
    }

    export interface ISolver2D extends ISolver {

        solve: (min?:number, max?:number, step?:number) => Point2D[];
    }

    export interface ISolver3D extends ISolver {

        solve: (min?:number, max?:number, step?:number) => Point3D[];
    }

    export class Solver {

        min:number = 0;
        max:number = 10;
        step:number = 1;

        fn:any;

        constructor() {

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

    export class Solver2D extends Solver implements ISolver2D {

        solve(min?:number, max?:number, step?:number) {

            this.min = min || this.min;
            this.max = max || this.max;
            this.step = step || this.step;

            var x:number;
            var data: Point2D[] = [];

            if (typeof this.fn !== "function") {
                return data;
            }

            for (x=min;x<=max;x+=step) {
                data.push(new Point2D(x, this.fn(x)));
            }

            return data;
        }
    }

    export class Solver3D extends Solver implements ISolver3D {

        solve(min?:number, max?:number, step?:number) {

            this.min = min || this.min;
            this.max = max || this.max;
            this.step = step || this.step;

            var x:number;
            var y:number;
            var data: Point3D[] = [];

            if (typeof this.fn !== "function") {
                return data;
            }

            for (x=min;x<=max;x+=step) {
                data.push(new Point3D(x, y, this.fn(x, y)));
            }

            return data;
        }
    }
}