/// <reference path="../references.ts" />
/// <reference path="point-chart.ts" />

module dChart {

    export class LineChart extends PointChart {

        svgLineContainer:D3.Selection[] = [];
        svgLine:D3.Selection[] = [];

        constructor(config?:IChart2D) {
            super();

            if (config) {
                this.normalize(config);
                this.draw();
            }
        }

        drawData() {

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                this.svgLineContainer[key] = this._svg.data
                    .append("g")
                    .attr("class", "dchart-data-set dchart-data-set-" + key);

                this.svgLine[key] = this.svgLineContainer[key].append("path");
            });

            super.drawData();
        }

        redrawData() {

            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();
            var lineFn = [];

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                if (!dataSet.showLine) {
                    return;
                }

                lineFn[key] = d3.svg.line()
                    .interpolate(dataSet.interpolate)
                    .x(function(d:Point) { return xScale(d.x); })
                    .y(function(d:Point) { return yScale(d.y); });

                if (!this.showTransition) {

                    this.svgLine[key].attr("d", lineFn[key](dataSet.data))
                        .lineStyle(dataSet.lineStyle)
                        .style("fill","none");
                }
                else {

                    this.svgLine[key]
                        .attr("d", lineFn[key](dataSet.data))
                        .attr("stroke", dataSet.lineStyle.stroke)
                        .attr("stroke-width", dataSet.lineStyle.strokeWidth)
                        .attr("stroke-opacity", dataSet.lineStyle.strokeOpacity)
                        .attr("stroke-linecap", dataSet.lineStyle.strokeLinecap)
                        .style("fill","none");

                    var path = <any>this.svgLine[key];
                    var totalLength = (<any>path.node()).getTotalLength();

                    this.svgLine[key]
                        .attr("stroke-dasharray", totalLength + " " + totalLength)
                        .attr("stroke-dashoffset", totalLength)
                        .transition()
                        .duration(this.transition.duration)
                        .delay((d,i) => key*this.transition.delay)
                        .attr("stroke-dashoffset", 0)
                        .each("end", function() {
                            // Apply the Dasharray after the Transition
                            d3.select(<any>this).attr("stroke-dasharray", dataSet.lineStyle.strokeDasharray);
                        });
                }
            });

            super.redrawData();
        }
    }
}