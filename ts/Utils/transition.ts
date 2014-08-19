/// <reference path="../../../d.ts/DefinitelyTyped/d3/d3.d.ts" />

module dChart.Utils {

    export class Transition {

        duration:number = 150;
        delay:number = 0;
        ease:string = "cubic-in-out";

        normalize(value:any) {

            if (value.hasOwnProperty("ease")) {
                this.ease = value.ease;
            }

            if (value.hasOwnProperty("delay")) {
                this.delay = parseFloat(value.delay);
            }

            if (value.hasOwnProperty("duration")) {
                this.duration = parseFloat(value.duration);
            }
        }
    }
}