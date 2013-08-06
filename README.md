Declarative Chart Library
=========================

[![Build Status](https://travis-ci.org/chaosmail/dchart.png?branch=master)](https://travis-ci.org/chaosmail/dchart)

This library is an extensible declarative Chart Library written in typescript. The goal was to build a chart library, which lets you easily declare the chart pieces whithout having to hack the same d3.js functions all the time.

Demos and Docs can be found here: http://chaosmail.at/2013/dchart/

I will integrate dChart to be used with jQuery (see ...) and AngularJS ([see this Repo](https://github.com/chaosmail/angular-dchart)) when this lib is stable.

Example-Usage
-------------
```javascript

var functionChart1 = new dChart.LineChart({
    elem: 'functionChart1',
    width:700,
    height:400,
    label: "Dataset: Function Example",
    axis: {
        x: {
            label: "x axis",
            align: "center"
        },
        y: {
            label: "y axis"
        }
    },
    dataSets: [
        {
            label: "Dataset: Function 'sin'",
            lineStyle: {
                stroke: "red",
                strokeWidth: 2
            },
            dataFn: {
                fn: Math.sin,
                min: 0,
                max: 2*Math.PI,
                step: Math.PI/360
            }
        },
        {
            label: "Dataset: Function 'cos'",
            lineStyle: {
                stroke: "blue",
                strokeWidth: 2
            },
            dataFn: {
                fn: Math.cos,
                min: 0,
                max: 2*Math.PI,
                step: Math.PI/360
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
