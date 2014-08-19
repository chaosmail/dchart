/// <reference path="../references.ts" />
/// <reference path="pie-chart.ts" />

module dChart {

    export class DoughnutChart extends PieChart {

        innerRadius:number = 10;

        normalize(value:any) {
            super.normalize(value);

            if (value.hasOwnProperty("innerRadius")) {
                this.innerRadius = parseFloat(<any> value.innerRadius);
            }
        }
    }
}