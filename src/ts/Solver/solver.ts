module dChart.Solver {

    export interface ISolver {

        min:number;
        max:number;
        step:number;
    }

    export interface ISolver2D extends ISolver {

        fn: (x:number) => number;
        solve: (min?:number, max?:number, step?:number) => Point2D[];
    }

    export interface ISolver3D extends ISolver {

        fn: (x:number, y:number) => number;
        solve: (min?:number, max?:number, step?:number) => Point3D[];
    }

    export class Solver2D implements ISolver2D {

        public min:number = 0;
        public max:number = 10;
        public step:number = 1;

        fn(x:number) {
            return x;
        }

        solve(min?:number, max?:number, step?:number) {

            min = min || this.min;
            max = max || this.max;
            step = step || this.step;

            var x:number;
            var data: Point2D[] = [];

            for (x=min;x<=max;x+=step) {
                data.push(new Point2D(x, this.fn(x)));
            }

            return data;
        }
    }

    export class Solver3D implements ISolver3D {

        public min:number = 0;
        public max:number = 10;
        public step:number = 1;

        fn(x:number, y:number) {
            return x;
        }

        solve(min?:number, max?:number, step?:number) {

            min = min || this.min;
            max = max || this.max;
            step = step || this.step;

            var x:number;
            var y:number;
            var data: Point3D[] = [];

            for (x=min;x<=max;x+=step) {
                data.push(new Point3D(x, y, this.fn(x, y)));
            }

            return data;
        }
    }
}