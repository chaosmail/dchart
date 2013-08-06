/*global describe:true, beforeEach:true, it:true */

var assert = require("assert"),
    load = require('load'),
    jsdom = require("jsdom");

var libDChart = load(process.cwd()+'/dist/dchart.min.js');
var dChart = libDChart.dChart;

describe('dChart.Point', function(){

    var elements = jsdom.jsdom("<div stroke='#ffff00' stroke-width='0.2' stroke-opacity='0.95' fill-opacity='0.8' fill='#ff00ff'></div>"),
        element = elements.children[0],
        normalizeElement = {areaStyle: {stroke:'#ffff00', strokeWidth:0.2, strokeOpacity:0.95, fillOpacity:0.8, fill:'#ff00ff'}},
        customMap = {areaStyle: {stroke:'customStroke', strokeWidth:'customStrokeWidth', strokeOpacity:'customStrokeOpacity', fillOpacity:'customFillOpacity', fill:'customFill'}},
        mapElement = {customStroke:'#ffff00', customStrokeWidth:0.2, customStrokeOpacity:0.95, customFillOpacity:0.8, customFill:'#ff00ff'};

    describe('#parse()', function(){

        var p = new dChart.Point();

        it('should create an AreaStyle', function(){

            p.parse(element);

            var area = new dChart.Utils.AreaStyle();
            area.stroke = '#ffff00';
            area.strokeWidth = 0.2;
            area.strokeOpacity = 0.95;
            area.fill = '#ff00ff';
            area.fillOpacity = 0.8;

            assert.deepEqual(area, p.areaStyle);
        })
    })
    /*
    describe('#map()', function(){

        var p = new dChart.Point();

        it('should create an AreaStyle', function(){

            p.map(mapElement, customMap);

            var area = new dChart.Utils.AreaStyle();
            area.stroke = '#ffff00';
            area.strokeWidth = 0.2;
            area.strokeOpacity = 0.95;
            area.fill = '#ff00ff';
            area.fillOpacity = 0.8;

            assert.deepEqual(area, p.areaStyle);
        })
    })*/

    describe('#normalize()', function(){

        var p = new dChart.Point();

        it('should create an AreaStyle', function(){

            p.normalize(normalizeElement);

            var area = new dChart.Utils.AreaStyle();
            area.stroke = '#ffff00';
            area.strokeWidth = 0.2;
            area.strokeOpacity = 0.95;
            area.fill = '#ff00ff';
            area.fillOpacity = 0.8;

            assert.deepEqual(area, p.areaStyle);
        })
    })
})

describe('dChart.Point1D', function(){

    var elements = jsdom.jsdom("<div x='5.25'></div><div y='4.25'></div><div val='3.25'></div><div value='2.25'></div>"),
        element = [elements.children[0],elements.children[1],elements.children[2],elements.children[3]],
        normalizeElement = [{x:6.25},{y:5.25},{val:4.25},{value:3.25}],
        customMap = {x:'customX'},
        mapElement = {customX:7.25};

    describe('#parse()', function(){

        var p = new dChart.Point1D();

        it ('should create 1D Point',function() {

            p.parse(element[0]);
            assert.deepEqual(new dChart.Point1D(5.25), p);

            p.parse(element[1]);
            assert.deepEqual(new dChart.Point1D(4.25), p);

            p.parse(element[2]);
            assert.deepEqual(new dChart.Point1D(3.25), p);

            p.parse(element[3]);
            assert.deepEqual(new dChart.Point1D(2.25), p);
        })
    })

    describe('#map()', function(){

        var p = new dChart.Point1D();

        it ('should create 1D Point',function() {

            p.map(mapElement,customMap);
            assert.deepEqual(new dChart.Point1D(7.25), p);
        })
    })

    describe('#normalize()', function(){

        var p = new dChart.Point1D();

        it ('should create 1D Point',function() {

            p.normalize(normalizeElement[0]);
            assert.deepEqual(new dChart.Point1D(6.25), p);

            p.normalize(normalizeElement[1]);
            assert.deepEqual(new dChart.Point1D(5.25), p);

            p.normalize(normalizeElement[2]);
            assert.deepEqual(new dChart.Point1D(4.25), p);

            p.normalize(normalizeElement[3]);
            assert.deepEqual(new dChart.Point1D(3.25), p);
        })
    })
})

describe('dChart.Point2D', function(){

    var elements = jsdom.jsdom("<div x='5.25' y='12.14'></div><div x='5.25' val='13.14'></div><div x='5.25' value='14.14'></div>"),
        element = [elements.children[0],elements.children[1],elements.children[2]],
        normalizeElement = [{x:6.25,y:13.14},{x:6.25,val:14.14},{x:6.25,value:15.14}],
        customMap = {x:'customX',y:'customY'},
        mapElement = {customX:7.25,customY:14.14};

    describe('#parse()', function(){

        var p = new dChart.Point2D();

        it ('should create 2D Point',function() {

            p.parse(element[0]);
            assert.deepEqual(new dChart.Point2D(5.25,12.14), p);

            p.parse(element[1]);
            assert.deepEqual(new dChart.Point2D(5.25,13.14), p);

            p.parse(element[2]);
            assert.deepEqual(new dChart.Point2D(5.25,14.14), p);
        })
    })

    describe('#map()', function(){

        var p = new dChart.Point2D();

        it ('should create 2D Point',function() {

            p.map(mapElement,customMap);
            assert.deepEqual(new dChart.Point2D(7.25,14.14), p);
        })
    })

    describe('#normalize()', function(){

        var p = new dChart.Point2D();

        it ('should create 2D Point',function() {

            p.normalize(normalizeElement[0]);
            assert.deepEqual(new dChart.Point2D(6.25,13.14), p);

            p.normalize(normalizeElement[1]);
            assert.deepEqual(new dChart.Point2D(6.25,14.14), p);

            p.normalize(normalizeElement[2]);
            assert.deepEqual(new dChart.Point2D(6.25,15.14), p);
        })
    })
})

describe('dChart.Point3D', function(){

    var elements = jsdom.jsdom("<div x='5.25' y='12.14' z='26.87'>"),
        element = elements.children[0],
        normalizeElement = {x:6.25,y:13.14,z:27.87},
        customMap = {x:'customX',y:'customY',z:'customZ'},
        mapElement = {customX:7.25,customY:14.14,customZ:28.87};

    describe('#parse()', function(){

        var p = new dChart.Point3D();

        it ('should create 3D Point',function() {

            p.parse(element);
            assert.deepEqual(new dChart.Point3D(5.25,12.14,26.87), p);
        })
    })

    describe('#map()', function(){

        var p = new dChart.Point3D();

        it ('should create 3D Point',function() {

            p.map(mapElement,customMap);
            assert.deepEqual(new dChart.Point3D(7.25,14.14,28.87), p);
        })
    })

    describe('#normalize()', function(){

        var p = new dChart.Point3D();

        it ('should create 3D Point',function() {

            p.normalize(normalizeElement);
            assert.deepEqual(new dChart.Point3D(6.25,13.14,27.87), p);
        })
    })
})