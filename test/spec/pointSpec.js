/*global describe:true, beforeEach:true, it:true */

var assert = require("assert"),
    load = require('load'),
    jsdom = require("jsdom"),
    _ = require("underscore")._;

var libDChart = load(process.cwd()+'/dist/dchart.min.js',{_:_});
var dChart = libDChart.dChart;

describe('dChart.Point', function(){

    var elements = jsdom.jsdom("<div stroke='#ffff00' stroke-width='0.2' stroke-opacity='0.95' fill-opacity='0.8' fill='#ff00ff'></div>"),
        element = elements.children[0],
        normalizeElement = {stroke:'#ffff00', strokeWidth:0.2, strokeOpacity:0.95, fillOpacity:0.8, fill:'#ff00ff'},
        customMap = {stroke:'customStroke', strokeWidth:'customStrokeWidth', strokeOpacity:'customStrokeOpacity', fillOpacity:'customFillOpacity', fill:'customFill'},
        mapElement = {customStroke:'#ffff00', customStrokeWidth:0.2, customStrokeOpacity:0.95, customFillOpacity:0.8, customFill:'#ff00ff'};

    describe('#parse()', function(){

        var p = new dChart.Point();

        it('should create a LineStyle', function(){

            p.parse(element);

            var line = new dChart.Utils.LineStyle();
            line.stroke = new dChart.Utils.Color('#ffff00');
            line.strokeWidth = new dChart.Utils.Size(0.2);
            line.strokeOpacity = 0.95;

            assert.deepEqual(line, p.lineStyle);
        })

        it('should create an AreaStyle', function(){

            p.parse(element);

            var area = new dChart.Utils.AreaStyle();
            area.fill = new dChart.Utils.Color('#ff00ff');
            area.fillOpacity = 0.8;

            assert.deepEqual(area, p.areaStyle);
        })
    })

    describe('#map()', function(){

        var p = new dChart.Point();

        it('should create a LineStyle', function(){

            p.map(mapElement, customMap);

            var line = new dChart.Utils.LineStyle();
            line.stroke = new dChart.Utils.Color('#ffff00');
            line.strokeWidth = new dChart.Utils.Size(0.2);
            line.strokeOpacity = 0.95;

            assert.deepEqual(line, p.lineStyle);
        })

        it('should create an AreaStyle', function(){

            p.map(mapElement, customMap);

            var area = new dChart.Utils.AreaStyle();
            area.fill = new dChart.Utils.Color('#ff00ff');
            area.fillOpacity = 0.8;

            assert.deepEqual(area, p.areaStyle);
        })
    })

    describe('#normalize()', function(){

        var p = new dChart.Point();

        it('should create a LineStyle', function(){

            p.normalize(normalizeElement);

            var line = new dChart.Utils.LineStyle();
            line.stroke = new dChart.Utils.Color('#ffff00');
            line.strokeWidth = new dChart.Utils.Size(0.2);
            line.strokeOpacity = 0.95;

            assert.deepEqual(line, p.lineStyle);
        })

        it('should create an AreaStyle', function(){

            p.normalize(normalizeElement);

            var area = new dChart.Utils.AreaStyle();
            area.fill = new dChart.Utils.Color('#ff00ff');
            area.fillOpacity = 0.8;

            assert.deepEqual(area, p.areaStyle);
        })
    })
})