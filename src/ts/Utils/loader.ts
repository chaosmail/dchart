/// <reference path="../../../d.ts/DefinitelyTyped/d3/d3.d.ts" />

module dChart.Utils {

    export class Loader {

        file:string = "";
        filetype:string = "json";

        getData(file?:string) {

            this.file = file || this.file;
        }

        normalize(value:any) {

            if (value.hasOwnProperty("file")) {
                this.file = value.file;

            }
        }
    }
}