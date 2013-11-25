/// <reference path="../references.ts" />
/// <reference path="point-chart.ts" />

module dChart {

    export class AreaChart extends PointChart {

        svgAreaContainer:D3.Selection[] = [];
        svgArea:D3.Selection[] = [];

        constructor(config?:IChart2D) {
            super();

            if (config) {
                this.normalize(config);
                this.draw();
            }
        }

        drawData() {

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                this.svgAreaContainer[key] = this._svg.data
                    .append("g")
                    .attr("class", "dchart-data-set dchart-data-set-" + key);

                this.svgArea[key] = this.svgAreaContainer[key].append("path");
            });

            super.drawData();
        }

        redrawData() {

            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();
            var areaFn = [];

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                areaFn[key] = d3.svg.area()
                    .interpolate(dataSet.interpolate)
                    .x(function(d) { return xScale(d.x); })
                    .y0(<any>this.nettoHeight)
                    .y1(function(d) { return yScale(d.y); });

                if (!this.showTransition) {

                    this.svgArea[key].attr("d", areaFn[key](dataSet.data))
                        .areaStyle(dataSet.areaStyle);
                }
                else {

                    this.svgArea[key]
                        .areaStyle(dataSet.areaStyle)
                        .transition()
                        .duration(this.transition.duration)
                        .delay((d,i) => key*this.transition.delay)
                        .ease(this.transition.ease)
                        .attrTween("d", function() {

                            var data = [],
                                minX = dataSet.min("x"),
                                maxX = dataSet.max("x"),
                                difX = maxX - minX,
                                index = 0;

                            return function(t) {

                                data = dataSet.data.slice(0);

                                // calculate x value in range from minX to maxX
                                var accX = t*difX+minX;

                                // increment
                                while (data[index].x < accX) {
                                    index += 1;
                                }

                                // when first elem, return it
                                if (index === 0) {
                                    // return only first entry in data array
                                    return areaFn[key](data.slice(0,1));
                                }

                                // cut array to the length of the actual elem
                                data = data.slice(0,index+1);

                                // define the interpolateFn
                                var interpolate = d3.interpolate(data[index-1],data[index]);

                                // calculate the t value in range from data[index-1].x to data[index].x
                                var accT = (accX - data[index-1].x) / (data[index].x - data[index-1].x);

                                // replace the last element with the interpolated
                                data.splice(index,1,interpolate(accT));

                                return areaFn[key](data);
                            }
                        });
                }
            });

            super.redrawData();
        }
    }
}