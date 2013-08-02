Declarative Chart Library
=========================

[![Build Status](https://travis-ci.org/chaosmail/dchart.png?branch=master)](https://travis-ci.org/chaosmail/dchart)

This library is an extensible declarative vanillajs Chart Library written in typescript.

A Demo can be found here: http://chaosmail.at/2013/dchart/

It also can be used with jQuery (see ...) or AngularJS ([see this Repo](https://github.com/chaosmail/angular-dchart))

Example-Usage
-------------
```javascript

var lineChart1 = new dChart.LineChart({
    elem: 'lineChart1',
    width: 800,
    height: 400,
    label: "My awesome Chart",
    description: "This awesome chart lib is using D3.js",
    axis: {
        x: {
            label: "x-Axis",
            align: "bottom",
            labelAlign: "right",
            grid: true
        },
        y: {
            label: "y-Axis",
            align: "left",
            scale: "sqrt",
            labelAlign: "center",
            range: [0,1],
            grid:true
        }
    },
    dataSets:[
        {
            label: "Dataset 1: Points",
            lineStyle: {
                stroke: "mediumslateblue",
                strokeWidth: 2,
                strokeDasharray: "5,5"
            },
            dotStyle: {
                stroke: "mediumslateblue",
                strokeWidth: 2,
                fill: "#fff"
            },
            interpolate: "linear",
            data: [
                {x:0,y:0},
                {x:1,y:0.5},
                {x:2,y:0.7},
                {x:3,y:0.85},
                {x:4,y:0.9},
                {x:5,y:0.92}
            ]
        },
        {
            label: "Dataset 2: Points",
            lineStyle: {
                stroke: "orange",
                strokeWidth: 2
            },
            interpolate: "cardinal",
            data: [
                {x:0,y:0.92},
                {x:1,y:0.9},
                {x:2,y:0.85},
                {x:3,y:0.7},
                {x:4,y:0.5},
                {x:5,y:0}
            ]
        },
        {
            label: "Dataset 2: Points",
            lineStyle: {
                stroke: "green",
                strokeWidth: 2
            },
            dotStyle: {
                stroke: "none",
                fill: "green"
            },
            dotRadius: 3,
            data: [
                {x:0,y:0.4},
                {x:1,y:0.6},
                {x:2,y:0.75},
                {x:3,y:0.8},
                {x:4,y:0.85},
                {x:5,y:0.87}
            ]
        },
        {
            label: "Dataset 3: Function",
            lineStyle: {
                stroke: "red",
                strokeWidth: 2
            },
            dataFn: {
                fn: Math.cos,
                min: 0,
                max: 5,
                step: 1
            }
        }
    ]
});
```

Development
-----------
Get the source and install the dependencies.
```
clone https://github.com/chaosmail/dchart.git
bower install
npm install
```
Make dist
```
grunt
```
Run the tests
```
npm test
```

Todo
----
+ Implement Full Functionality
+ Add more Unit Tests
+ Add Demos

License
-------
> Copyright (c) 2013 Christoph Körner

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
