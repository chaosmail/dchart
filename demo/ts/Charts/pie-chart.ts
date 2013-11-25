/// <reference path="../references.ts" />

module dChart {

    export class PieChart extends Chart {

        svgPieContainer:D3.Selection[] = [];
        numPoints:number = 0;
        innerRadius:number = 0;
        colorScale:any = d3.scale.category20c();

        constructor(config?:IChart) {
            super();

            if (config) {
                this.normalize(config);
                this.draw();
            }
        }

        getPoint() {
            var p = new Point();

            p.areaStyle.stroke = "none";
            p.areaStyle.fill = this.colorScale(this.numPoints);

            this.numPoints += 1;

            return p;
        }

        getSolver() {
            return new Utils.Solver1D();
        }

        drawData() {

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                dataSet.showValues = true;

                this.svgPieContainer[key] = this._svg.data
                    .append("g")
                    .attr("class", "dchart-data-set dchart-data-set-" + key)
                    .attr("transform","translate("+(this.nettoWidth*0.5)+","+(this.nettoHeight*0.5)+")");

            });
        }

        redrawData() {

            this.dataSets.forEach((dataSet:DataSet,key:number) => {

                var pie = d3.layout.pie()
                    .sort(null)
                    .value( (d:Point) => d.x);

                var radius = this.nettoHeight > this.nettoWidth ? this.nettoWidth*0.5-this.innerRadius : this.nettoHeight*0.5-this.innerRadius;

                var outerRadius = (key + 1) * radius/this.dataSets.length + this.innerRadius;
                var innerRadius = key * radius/this.dataSets.length + this.innerRadius;

                var arc = d3.svg.arc()
                    .outerRadius(outerRadius)
                    .innerRadius(innerRadius);

                var pieces = this.svgPieContainer[key]
                    .selectAll("path")
                    .data(pie(dataSet.data))
                    .enter();

                if (!this.showTransition) {
                    pieces.append("path").attr("d", arc)
                        .areaStyle((d:D3.Layout.ArcDescriptor) => d.data.areaStyle);
                    pieces.append("text")
                        .text((d:D3.Layout.ArcDescriptor) => this.format(d.value))
                        .attr("transform", (d:Point) => "translate("+arc.centroid(d)+")")
                        .fontStyle(dataSet.fontStyle)
                        .style("text-anchor", "middle");
                }
                else {

                    pieces.append("path")
                        .each((d:any)=> {
                            d._endAngle = d.endAngle;
                            d._formatedValue = this.format(d.value);
                            d.endAngle = d.startAngle;
                        })
                        .attr("d", arc)
                        .areaStyle((d:D3.Layout.ArcDescriptor) => d.data.areaStyle)
                        .transition()
                        .duration(this.transition.duration)
                        .delay((d,i) => i*this.transition.delay)
                        .ease(this.transition.ease)
                        .attrTween("d", (d:any) => {
                            var interpolate = d3.interpolate(d.startAngle, d._endAngle);
                            return function(t) {
                                d.endAngle = interpolate(t);
                                return arc(d);
                            };
                        })
                        .each("end", function(d:any) {

                            d3.select(this.parentNode)
                                .append("text")
                                .text(d._formatedValue)
                                .attr("transform", "translate("+arc.centroid(d)+") scale(1)")
                                .style("text-anchor", "middle")
                                .fontStyle(dataSet.fontStyle)
                        });
                }
            });
        }

        drawLegend() {

            var legendDotRadius = this._font.legend.fontSize * 0.5,
                legendOffsetMin = 10,
                legendOffsetFactor = 0.03,
                legendOffset = this.nettoWidth * legendOffsetFactor > legendOffsetMin ? this.nettoWidth * legendOffsetFactor : legendOffsetMin;

            this.dataSets.forEach((dataset:DataSet,j:number) => {

                var translateX = 0,
                    containerDataSet = this._svg.legend.append("g");

                dataset.data.forEach( (data:any,k:number) => {

                    var translateY = j * legendDotRadius * 2 * 1.2,
                        container =
                            containerDataSet
                                .append("g")
                                .attr("height", legendDotRadius * 2),
                        text = data.label ? data.label : dataset.label + " " + k,
                        symbolType = dataset.symbolStyle ? dataset.symbolStyle.type: "circle",
                        symbolPath = d3.svg.symbol().type(symbolType),
                        symbol = container
                            .append("path")
                            .attr("transform", "scale("+ legendDotRadius*0.18 +")")
                            .attr("d", symbolPath)
                            .areaStyle(data.areaStyle);

                    container
                        .append("text")
                        .attr("x", legendDotRadius*1.5)
                        .attr("y", legendDotRadius*0.5)
                        .style("alignment-baseline", "middle")
                        .fontStyle(this._font.legend)
                        .text(text);

                    if (k > 0) {
                        var allLegends = containerDataSet.selectAll("g"),
                            prevLegend = allLegends[0][k - 1],
                            prevLegendDimen = prevLegend.getBBox();

                        translateX += prevLegendDimen.x + prevLegendDimen.width + legendOffset;
                    }

                    container.attr("transform", "translate (" + translateX + ","+ translateY +")");
                });
            });
        }
    }
}