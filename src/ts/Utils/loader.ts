/// <reference path="../../../d.ts/DefinitelyTyped/d3/d3.d.ts" />

module dChart.Utils {

    export interface IDataSrc {
        url:string;
        dataType:string;
        map:any;
    }

    export class Loader {

        url:string = "";
        dataType:string = "json";
        map:any = {};

        getData(callback:(data:any, map:any) => void) {

            d3.json(this.url, (response:any) => {
                callback(response, this.map);
            });
        }

        normalize(value:any) {

            if (value.hasOwnProperty("url")) {
                this.url = value.url;
            }

            if (value.hasOwnProperty("dataType")) {
                this.dataType = value.dataType;
            }

            if (value.hasOwnProperty("map")) {
                this.map = value.map;
            }
        }
    }
}