/// <reference path="../references.ts" />

module dChart {

    export class BarChart extends Chart2D {

        svgRectContainer:D3.Selection[] = [];

        constructor(config?:IChart2D) {
            super();

            if (config) {
                this.normalize(config);
                this.draw();
            }
        }

        drawData() {

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                dataSet.showValues = true;

                this.svgRectContainer[key] = this._svg.data
                    .append("g")
                    .attr("class", "dchart-data-set dchart-data-set-" + key);

            });
        }

        redrawData() {

            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();
            var sigmaScale = 0.3;

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                var group = this.svgRectContainer[key].selectAll("rect")
                    .data(dataSet.data, (d:any) => d.x);

                if (dataSet.data.length === 0) {
                    return;
                }

                var xTickElems = this.xAxis.svg.selectAll('.tick');
                var xTicks = xTickElems[0].length;

                var start = (this.nettoWidth / (xTicks + 1))*0.5;
                var width = this.nettoWidth / (xTicks + 1) / this.dataSets.length;

                if (!this.showTransition) {

                    group.exit()
                        .remove();

                    group.enter()
                        .append("rect")
                        .areaStyle(dataSet.areaStyle)
                        .attr("x", (d:Point) => xScale(d.x) - start + key*width)
                        .attr("y", (d:Point) => yScale(d.y))
                        .attr("width", (d:Point) => width)
                        .attr("height", (d:Point) =>  this.nettoHeight - yScale(d.y));

                    group.enter()
                        .append("line")
                        .attr("x1", (d:Point) => d.sigma ? xScale(d.x) - start + key*width + width*(1-sigmaScale) : 0)
                        .attr("y1", (d:Point) => d.sigma ? yScale(d.y + d.sigma) : 0)
                        .attr("x2", (d:Point) => d.sigma ? xScale(d.x) - start + key*width + width - width*(1-sigmaScale) : 0)
                        .attr("y2", (d:Point) => d.sigma ? yScale(d.y + d.sigma) : 0)
                        .lineStyle({
                            stroke: "black",
                            strokeWidth: 1
                        });

                    group.enter()
                        .append("line")
                        .attr("x1", (d:Point) => d.sigma ? xScale(d.x) - (start + key*width)*0.5 : 0)
                        .attr("y1", (d:Point) => d.sigma ? yScale(d.y + d.sigma) : 0)
                        .attr("x2", (d:Point) => d.sigma ? xScale(d.x) - (start + key*width)*0.5 : 0)
                        .attr("y2", (d:Point) => d.sigma ? yScale(d.y - d.sigma) : 0)
                        .lineStyle({
                            stroke: "black",
                            strokeWidth: 1
                        });

                    group.enter()
                        .append("line")
                        .attr("x1", (d:Point) => d.sigma ? xScale(d.x) - start + key*width + width*(1-sigmaScale) : 0)
                        .attr("y1", (d:Point) => d.sigma ? yScale(d.y - d.sigma) : 0)
                        .attr("x2", (d:Point) => d.sigma ? xScale(d.x) - start + key*width + width - width*(1-sigmaScale) : 0)
                        .attr("y2", (d:Point) => d.sigma ? yScale(d.y - d.sigma) : 0)
                        .lineStyle({
                            stroke: "black",
                            strokeWidth: 1
                        });
                }
                else {

                    group.exit()
                        .remove();

                    group.enter()
                        .append("rect")
                        .areaStyle(dataSet.areaStyle)
                        .attr("x", (d:Point) => xScale(d.x) - start + key*width)
                        .attr("y", this.nettoHeight)
                        .attr("width", (d:Point) => width)
                        .attr("height", 0)
                        .transition()
                        .duration(this.transition.duration)
                        .delay((d,i) => i*this.transition.delay)
                        .ease(this.transition.ease)
                        .attr("y", (d:Point) => yScale(d.y))
                        .attr("height", (d:Point) => this.nettoHeight - yScale(d.y));

                    group.enter()
                        .append("line")
                        .attr("x1", (d:Point) => d.sigma ? xScale(d.x) - start + key*width + width*(1-sigmaScale) : 0)
                        .attr("y1", (d:Point) => d.sigma ? yScale(d.y + d.sigma) : 0)
                        .attr("x2", (d:Point) => d.sigma ? xScale(d.x) - start + key*width + width - width*(1-sigmaScale) : 0)
                        .attr("y2", (d:Point) => d.sigma ? yScale(d.y + d.sigma) : 0)
                        .lineStyle({
                            stroke: "black",
                            strokeWidth: 1
                        });

                    group.enter()
                        .append("line")
                        .attr("x1", (d:Point) => d.sigma ? xScale(d.x) - (start + key*width)*0.5 : 0)
                        .attr("y1", (d:Point) => d.sigma ? yScale(d.y + d.sigma) : 0)
                        .attr("x2", (d:Point) => d.sigma ? xScale(d.x) - (start + key*width)*0.5 : 0)
                        .attr("y2", (d:Point) => d.sigma ? yScale(d.y - d.sigma) : 0)
                        .lineStyle({
                            stroke: "black",
                            strokeWidth: 1
                        });

                    group.enter()
                        .append("line")
                        .attr("x1", (d:Point) => d.sigma ? xScale(d.x) - start + key*width + width*(1-sigmaScale) : 0)
                        .attr("y1", (d:Point) => d.sigma ? yScale(d.y - d.sigma) : 0)
                        .attr("x2", (d:Point) => d.sigma ? xScale(d.x) - start + key*width + width - width*(1-sigmaScale) : 0)
                        .attr("y2", (d:Point) => d.sigma ? yScale(d.y - d.sigma) : 0)
                        .lineStyle({
                            stroke: "black",
                            strokeWidth: 1
                        });
                }

            });
        }
    }

    export class BarChartHorizontal extends Chart2D {

        svgRectContainer:D3.Selection[] = [];

        constructor(config?:IChart2D) {
            super();

            if (config) {
                this.normalize(config);
                this.draw();
            }
        }

        drawData() {

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                dataSet.showValues = true;

                this.svgRectContainer[key] = this._svg.data
                    .append("g")
                    .attr("class", "dchart-data-set dchart-data-set-" + key);

            });
        }

        redrawData() {

            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();
            var sigmaScale = 0.3;

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                var group = this.svgRectContainer[key].selectAll("rect")
                    .data(dataSet.data, (d:any) => d.x);

                if (dataSet.data.length === 0) {
                    return;
                }

                var yTickElems = this.yAxis.svg.selectAll('.tick');
                var yTicks = yTickElems[0].length;

                var start = (this.nettoHeight / (yTicks + 1))*0.5;
                var height = this.nettoHeight / (yTicks + 1) / this.dataSets.length;

                if (!this.showTransition) {

                    group.exit()
                        .remove();

                    group.enter()
                        .append("rect")
                        .areaStyle(dataSet.areaStyle)
                        .attr("x", (d:Point) => xScale(0))
                        .attr("y", (d:Point) => yScale(d.y) - start + key*height)
                        .attr("width", (d:Point) => xScale(d.x))
                        .attr("height", (d:Point) => height);

                    group.enter()
                        .append("line")
                        .attr("y1", (d:Point) => d.sigma ? yScale(d.y) - start + key*height + height*(1-sigmaScale) : 0)
                        .attr("x1", (d:Point) => d.sigma ? xScale(d.x + d.sigma) : 0)
                        .attr("y2", (d:Point) => d.sigma ? yScale(d.y) - start + key*height + height - height*(1-sigmaScale) : 0)
                        .attr("x2", (d:Point) => d.sigma ? xScale(d.x + d.sigma) : 0)
                        .lineStyle({
                            stroke: "black",
                            strokeWidth: 1
                        });

                    group.enter()
                        .append("line")
                        .attr("y1", (d:Point) => d.sigma ? yScale(d.y) - (start + key*height)*0.5 : 0)
                        .attr("x1", (d:Point) => d.sigma ? xScale(d.x + d.sigma) : 0)
                        .attr("y2", (d:Point) => d.sigma ? yScale(d.y) - (start + key*height)*0.5 : 0)
                        .attr("x2", (d:Point) => d.sigma ? xScale(d.x - d.sigma) : 0)
                        .lineStyle({
                            stroke: "black",
                            strokeWidth: 1
                        });

                    group.enter()
                        .append("line")
                        .attr("y1", (d:Point) => d.sigma ? yScale(d.y) - start + key*height + height*(1-sigmaScale) : 0)
                        .attr("x1", (d:Point) => d.sigma ? xScale(d.x - d.sigma) : 0)
                        .attr("y2", (d:Point) => d.sigma ? yScale(d.y) - start + key*height + height - height*(1-sigmaScale) : 0)
                        .attr("x2", (d:Point) => d.sigma ? xScale(d.x - d.sigma) : 0)
                        .lineStyle({
                            stroke: "black",
                            strokeWidth: 1
                        });
                }
                else {

                    group.exit()
                        .remove();

                    group.enter()
                        .append("rect")
                        .areaStyle(dataSet.areaStyle)
                        .attr("x", (d:Point) => xScale(0))
                        .attr("y", (d:Point) => yScale(d.y) - start + key*height)
                        .attr("width", (d:Point) => 0)
                        .attr("height", height)
                        .transition()
                        .duration(this.transition.duration)
                        .delay((d,i) => i*this.transition.delay)
                        .ease(this.transition.ease)
                        .attr("width", (d:Point) => xScale(d.x));

                    // TODO
                    // This should be animated

                    group.enter()
                        .append("line")
                        .attr("y1", (d:Point) => d.sigma ? yScale(d.y) - start + key*height + height*(1-sigmaScale) : 0)
                        .attr("x1", (d:Point) => d.sigma ? xScale(d.x + d.sigma) : 0)
                        .attr("y2", (d:Point) => d.sigma ? yScale(d.y) - start + key*height + height - height*(1-sigmaScale) : 0)
                        .attr("x2", (d:Point) => d.sigma ? xScale(d.x + d.sigma) : 0)
                        .lineStyle({
                            stroke: "black",
                            strokeWidth: 1
                        });

                    group.enter()
                        .append("line")
                        .attr("y1", (d:Point) => d.sigma ? yScale(d.y) - (start + key*height)*0.5 : 0)
                        .attr("x1", (d:Point) => d.sigma ? xScale(d.x + d.sigma) : 0)
                        .attr("y2", (d:Point) => d.sigma ? yScale(d.y) - (start + key*height)*0.5 : 0)
                        .attr("x2", (d:Point) => d.sigma ? xScale(d.x - d.sigma) : 0)
                        .lineStyle({
                            stroke: "black",
                            strokeWidth: 1
                        });

                    group.enter()
                        .append("line")
                        .attr("y1", (d:Point) => d.sigma ? yScale(d.y) - start + key*height + height*(1-sigmaScale) : 0)
                        .attr("x1", (d:Point) => d.sigma ? xScale(d.x - d.sigma) : 0)
                        .attr("y2", (d:Point) => d.sigma ? yScale(d.y) - start + key*height + height - height*(1-sigmaScale) : 0)
                        .attr("x2", (d:Point) => d.sigma ? xScale(d.x - d.sigma) : 0)
                        .lineStyle({
                            stroke: "black",
                            strokeWidth: 1
                        });
                }

            });
        }
    }
}