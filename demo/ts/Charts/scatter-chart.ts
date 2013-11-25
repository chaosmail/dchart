/// <reference path="../references.ts" />

module dChart {

    export class ScatterChart extends Chart2D {

        svgScatterContainer:D3.Selection[] = [];

        constructor(config?:IChart2D) {
            super();

            if (config) {
                this.normalize(config);
                this.draw();
            }
        }

        drawData() {

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                this.svgScatterContainer[key] = this._svg.data
                    .append("g")
                    .attr("class", "dchart-data-set dchart-data-set-" + key);

            });
        }

        redrawData() {

            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                var group = this.svgScatterContainer[key].selectAll("path")
                    .data(dataSet.data, (d:any) => d.x);

                var symbol = d3.svg.symbol().type(dataSet.symbolStyle.type);

                if (!this.showTransition) {

                    group.exit()
                        .remove();

                    group.enter()
                        .append("path")
                        .areaStyle(dataSet.symbolStyle)
                        .attr("transform", (d:Point) => {

                            var size = d.z != 0 ? d.z*dataSet.symbolStyle.size : dataSet.symbolStyle.size;

                            return "translate("+xScale(d.x)+","+yScale(d.y)+") scale("+size+")";
                        })
                        .attr("d", symbol);
                }
                else {

                    group.exit()
                        .remove();

                    group.enter()
                        .append("path")
                        .areaStyle(dataSet.symbolStyle)
                        .attr("transform", (d:Point) => "translate("+xScale(d.x)+","+yScale(d.y)+") scale(0)")
                        .attr("d", symbol)
                        .transition()
                        .duration(this.transition.duration)
                        .delay((d,i) => i*this.transition.delay)
                        .ease(this.transition.ease)
                        .attr("transform", (d:Point) => {

                            var size = d.z && d.z != 0 ? d.z*dataSet.symbolStyle.size : dataSet.symbolStyle.size;

                            return "translate("+xScale(d.x)+","+yScale(d.y)+") scale("+size+")";
                        });
                }

            });
        }
    }
}