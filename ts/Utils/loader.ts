/// <reference path="../../../d.ts/DefinitelyTyped/d3/d3.d.ts" />
/// <reference path="filter.ts" />

module dChart.Utils {

    export interface IDataSrc {
        url:string;
        dataType:string;
        map:any;
        filter:Filter;
    }

    export class Loader {

        url:string = "";
        dataType:string = "json";
        map:any = {};

        getData(callback:(data:any, map:any) => void) {

            if (this.dataType.match(/^json$/i)) {
                return this.getJsonData(callback);
            }
            else if (this.dataType.match(/^txt/i)) {
                return this.getTxtData(callback);
            }
            else if (this.dataType.match(/^csv/i)) {
                return this.getCsvData(callback);
            }
            else if (this.dataType.match(/^tsv/i)) {
                return this.getTsvData(callback);
            }

            return callback([], this.map);
        }

        getJsonData(callback:(data:any, map:any) => void) {

            d3.json(this.url, (response:any) => {
                callback(response, this.map);
            });
        }

        getTxtData(callback:(data:any, map:any) => void) {

            d3.text(this.url, (response:any) => {
                callback(response, this.map);
            });
        }

        getCsvData(callback:(data:any, map:any) => void) {

            d3.csv(this.url, (response:any) => {
                callback(response, this.map);
            });
        }

        getTsvData(callback:(data:any, map:any) => void) {

            d3.tsv(this.url, (response:any) => {
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