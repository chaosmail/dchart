/*global describe:true, beforeEach:true, it:true */

var assert = require("assert"),
    load = require('load'),
    jsdom = require("jsdom"),
    _ = require("underscore")._;

var libDChart = load(process.cwd()+'/dist/dchart.min.js',{_:_});
var dChart = libDChart.dChart;

describe('dChart.Utils.Elem', function(){

    var elements = jsdom.jsdom("<div stroke='#ffff00' stroke-width='0.2' stroke-opacity='0.95' fill-opacity='0.8' fill='#ff00ff' date='01.01.1999'></div>"),
        strokeElement = elements.children[0].attributes[0],
        strokeWidthElement = elements.children[0].attributes[1],
        strokeOpacityElement = elements.children[0].attributes[2],
        fillOpacityElement = elements.children[0].attributes[3],
        fillElement = elements.children[0].attributes[4],
        dateElement = elements.children[0].attributes[5];

    describe('#getFloat()', function(){

        it('should return float', function(){

            assert.equal(0.8, dChart.Utils.Elem.getFloat(fillOpacityElement));
            assert.equal(0.95, dChart.Utils.Elem.getFloat(strokeOpacityElement));
        })
    })

    describe('#getSize()', function(){

        it('should return Size', function(){

            assert.deepEqual(new dChart.Utils.Size(0.2), dChart.Utils.Elem.getSize(strokeWidthElement));
        })
    })

    describe('#getColor()', function(){

        it('should return Color', function(){

            assert.deepEqual(new dChart.Utils.Color('#ffff00'), dChart.Utils.Elem.getColor(strokeElement));
            assert.deepEqual(new dChart.Utils.Color('#ff00ff'), dChart.Utils.Elem.getColor(fillElement));
        })
    })

    describe('#getDate()', function(){

        it('should return Date', function(){

            assert.deepEqual(new Date('01.01.1999'), dChart.Utils.Elem.getDate(dateElement));
        })
    })
})