/* jslint node: true */

var assert = require("assert"),
    load = require('load'),
    jsdom = require("jsdom"),
    _ = require("underscore")._;

var libDChart = load(process.cwd()+'/src/ts/dchart.js',{_:_});
var dChart = libDChart.dChart;

describe('dChart.ElementUtils', function(){

    var elements = jsdom.jsdom("<div stroke='#ffff00' stroke-width='0.2' stroke-opacity='0.95' fill-opacity='0.8' fill='#ff00ff'></div>"),
        strokeElement = elements.children[0].attributes[0],
        strokeWidthElement = elements.children[0].attributes[1],
        strokeOpacityElement = elements.children[0].attributes[2],
        fillOpacityElement = elements.children[0].attributes[3],
        fillElement = elements.children[0].attributes[4];

    describe('#getFloat()', function(){

        it('should return float', function(){

            assert.equal(0.8, dChart.ElementUtils.getFloat(fillOpacityElement));
            assert.equal(0.95, dChart.ElementUtils.getFloat(strokeOpacityElement));
        })
    })

    describe('#getSize()', function(){

        it('should return Size', function(){

            assert.deepEqual(new dChart.Size(0.2), dChart.ElementUtils.getSize(strokeWidthElement));
        })
    })

    describe('#getColor()', function(){

        it('should return Color', function(){

            assert.deepEqual(new dChart.Color('#ffff00'), dChart.ElementUtils.getColor(strokeElement));
            assert.deepEqual(new dChart.Color('#ff00ff'), dChart.ElementUtils.getColor(fillElement));
        })
    })
})

describe('dChart.Point', function(){

    var elements = jsdom.jsdom("<div stroke='#ffff00' stroke-width='0.2' stroke-opacity='0.95' fill-opacity='0.8' fill='#ff00ff'></div>"),
        element = elements.children[0];

    describe('#parse()', function(){

        var p = new dChart.Point();

        it('should create a LineStyle', function(){

            p.parse(element);

            var line = new dChart.LineStyle();
            line.stroke = new dChart.Color('#ffff00');
            line.strokeWidth = new dChart.Size(0.2);
            line.strokeOpacity = 0.95;

            assert.deepEqual(line, p.lineStyle);
        })

        it('should create an AreaStyle', function(){

            p.parse(element);

            var area = new dChart.AreaStyle();
            area.fill = new dChart.Color('#ff00ff');
            area.fillOpacity = 0.8;

            assert.deepEqual(area, p.areaStyle);
        })
    })
})