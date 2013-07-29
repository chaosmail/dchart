Declarative Chart Library
=========================

[![Build Status](https://travis-ci.org/chaosmail/dchart.png?branch=master)](https://travis-ci.org/chaosmail/dchart)
**Warning! This is not useable yet!**

This library is a extensible declarative vanillajs Chart Library written in typescript.
It also can be used with jQuery (see ...) or AngularJS ([see this Repo](https://github.com/chaosmail/angular-dchart))

Example-Usage
-------------
```javascript

var lineChart1 = new dChart.LineChart({
    elem: 'lineChart1',
    width: 400,
    height: 400,
    label: "My awesome Chart",
    description: "This awesome chart lib is using D3.js",
    axis: {
        x: {
            label: "x-Axis"
        },
        y: {
            label: "y-Axis",
            range: [0,1]
        }
    },
    dataSets:[
        {
            label: "Dataset 1: Points",
            stroke: "#ff0000",
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
            label: "Dataset 2: Function",
            stroke: "#ff0000",
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
