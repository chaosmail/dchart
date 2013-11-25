/// <reference path="../references.ts" />

module dChart {

    export class PointChart extends Chart2D {

        svgSymbolContainer:D3.Selection[] = [];

        constructor(config?:IChart2D) {
            super();

            if (config) {
                this.normalize(config);
                this.draw();
            }
        }

        drawData() {

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                this.svgSymbolContainer[key] = this._svg.data.append("g");
            });
        }

        redrawData() {

            var xScale = this.xAxis.getScale();
            var yScale = this.yAxis.getScale();

            this.dataSets.forEach((dataSet:DataSet,key:number) => {


                if (!dataSet.showSymbol) {
                    return;
                }

                var group = this.svgSymbolContainer[key]
                    .selectAll("path")
                    .data(dataSet.data, (d:any) => d.x);

                var symbol = d3.svg.symbol().type(dataSet.symbolStyle.type);

                if (!this.showTransition) {

                    group.exit()
                        .remove();

                    group.enter()
                        .append("path")
                        .areaStyle(dataSet.symbolStyle)
                        .attr("transform", (d:Point) => "translate("+xScale(d.x)+","+yScale(d.y)+") scale("+dataSet.symbolStyle.size+")")
                        .attr("d", symbol);
                }
                else {

                    // Generate a temporary Line function,
                    // on which the symbols are animated
                    var lineFn = d3.svg.line()
                        .interpolate(dataSet.interpolate)
                        .x(function(d:Point) { return xScale(d.x); })
                        .y(function(d:Point) { return yScale(d.y); });

                    group.exit()
                        .remove();

                    group.enter()
                        .append("path")
                        .areaStyle(dataSet.symbolStyle)
                        .attr("transform", "translate("+xScale(dataSet.data[0].x)+","+yScale(dataSet.data[0].y)+") scale(1)")
                        .attr("d", symbol)
                        .transition()
                        .duration(this.transition.duration)
                        .delay((d,i) => this.transition.delay * key)
                        .ease(this.transition.ease)
                        .attrTween("transform",
                        (d,i) => Utils.Animation.animateAlongPath(

                            // Draw a temporary Line for each point
                            // only to the last points coordinates
                            this.svgSymbolContainer[key]
                                .append("path")
                                .attr("class","animationLine")
                                .attr("stroke","none")
                                .attr("fill","none")
                                .attr("d",lineFn(dataSet.data.slice(0,i+1))
                                )
                        ));

                    // Remove temporary Lines
                    this.svgSymbolContainer[key].selectAll('.animationLine').remove();
                }
            });
        }
    }
}