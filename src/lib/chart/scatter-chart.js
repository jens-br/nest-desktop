"use strict"

const d3 = require("d3");

var chart = {
    margin: {
        top: 10,
        right: 40,
        bottom: 40,
        left: 50
    },
    y: 0
};

var margin = chart.margin;
chart.xScale = d3.scaleLinear();
chart.yScale = d3.scaleLinear();
chart.format = d3.format(".2f");

chart.transition = d3.transition()
    .ease(d3.easeLinear)
    .duration(1);

var _xAxis, _yAxis;

var _data = {
    x: [],
    y: [],
};

chart.data = function(d) {
    if (!arguments.length) return _data;
    _data = d;
    return chart
}

chart.xAxis = function(xScale) {
    if (!arguments.length) return _xAxis;
    _xAxis = d3.axisBottom(xScale);

    chart.g.append("g")
        .attr("id", "xaxis")
        .attr("class", "axis")
        .attr("transform", "translate(0," + chart.g.attr('height') + ")")
        .style('font-size', '14px')
        .call(_xAxis);

    return chart
}

chart.yAxis = function(yScale) {
    if (!arguments.length) return _yAxis;
    _yAxis = d3.axisLeft(yScale).ticks(3);

    chart.g.append("g")
        .attr("id", "yaxis")
        .attr("class", "axis")
        .style('font-size', '14px')
        .attr("transform", "translate(0,0)")
        .call(_yAxis);

    return chart
}

chart.xLabel = function(label) {
    if (!document.getElementsByTagName("xlabel").length) {
        chart.g.append("text")
            .attr("id", "xlabel")
            .attr("class", "label")
            .attr("text-anchor", "middle")
            .attr("x", +chart.g.attr('width') / 2)
            .attr("y", +chart.g.attr('height') + 30)
            .text("Time (ms)");
    }

    chart.g.select('#xlabel')
        .text(label);
    return chart
}

chart.yLabel = function(label) {
    if (!document.getElementsByTagName("ylabel").length) {
        chart.g.append("text")
            .attr("id", "ylabel")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("x", -1. * +chart.yScale.range()[1])
            .attr("y", 6)
            .attr("dy", ".71em")
            .attr("text-anchor", "end");
    }

    chart.g.select('#ylabel')
        .text(label);
    return chart
}

chart.onDrag = function(drag) {
    chart.drag = d3.drag()
        .on("start", function() {
            app.dragging = true
        })
        .on("drag", function() {
            drag()
        })
        .on("end", function() {
            app.dragging = false
        })
    chart.g.select('#clip')
        .call(chart.drag);
    return chart;
}

chart.onZoom = function(zoom) {
    chart.zoom = d3.zoom()
        .scaleExtent([.1, 10])
        .on("start", function() {
            app.zooming = true
        })
        .on("zoom", function() {
            zoom()
        })
        .on("end", function() {
            app.zooming = false
        })
    chart.g.select('#clip')
        .call(chart.zoom);
    return chart;
}

chart.init = function(reference, size) {
    var svg = d3.select(reference),
        width = (size.width ? size.width : +svg.attr("width")) - margin.left - margin.right,
        height = (size.height ? size.height : +svg.attr("height")) - margin.top - margin.bottom;
    chart.svg = svg;
    chart.width = width;
    chart.height = height;

    chart.xScale.range([0, width])
    chart.yScale.range([height, 0])

    var g = svg.append("g")
        .attr('height', height)
        .attr('width', width)
        .attr("transform", "translate(" + (margin.left + (size.x ? size.x : 0)) + "," + (margin.top + (size.y ? size.y : 0)) +")");
    chart.g = g;

    var clip = g.append("g")
        .attr("clip-path", "url(#clip)")
        .attr('id', 'clip');

    // add area for dragging event
    clip.append("rect")
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'white');

    return chart

}

//
// Scatter chart
//

function update() {
    chart.yScale.range([chart.height - (+chart.g.attr('y')), chart.height - (+chart.g.attr('height')) - (+chart.g.attr('y'))])
    chart.xScale.range([0, +chart.g.attr('width')])

    if (app.running || app.dragging || app.zooming) {
        chart.g.select('#xaxis')
            .call(chart.xAxis());
        chart.g.select('#yaxis')
            .call(chart.yAxis());
    } else {
        chart.g.select('#xaxis')
            .transition(chart.transition)
            .call(chart.xAxis());
        chart.g.select('#yaxis')
            .transition(chart.transition)
            .call(chart.yAxis());
    }

    var dots = chart.g.select('#clip')
        .selectAll(".dot")
        .data(chart.data().x);

    dots.attr("cx", function(d) {
            return chart.xScale(d);
        })
        .attr("cy", function(d, i) {
            return chart.yScale(chart.data().y[i]);
        })

    dots.enter().append("circle")
        .attr("class", "dot")
        .attr("r", 2)
        .attr("cx", function(d) {
            return chart.xScale(d);
        })
        .attr("cy", function(d, i) {
            return chart.yScale(chart.data().y[i]);
        });

    dots.exit()
        .remove();
}

chart.update = update;
module.exports = chart.init;
