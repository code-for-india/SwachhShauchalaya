Template.pie.rendered = function() {
  // var width = $("#pie_chart-container").width(),
  //     height = $("#pie_chart-container").height(),
  //     radius = Math.min(width, height) / 2 - 10;

  // var data = d3.range(10).map(Math.random).sort(d3.descending);

  // var color = d3.scale.category20();

  // var arc = d3.svg.arc()
  //     .outerRadius(radius);

  // var pie = d3.layout.pie();

  // var svg = d3.select("#pie_chart-container").append("svg")
  //     .datum(data)
  //     .attr("width", width)
  //     .attr("height", height)
  //   .append("g")
  //     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // var arcs = svg.selectAll("g.arc")
  //     .data(pie)
  //   .enter().append("g")
  //     .attr("class", "arc");

  // arcs.append("path")
  //     .attr("fill", function(d, i) { return color(i); })
  //   .transition()
  //     .ease("bounce")
  //     .duration(2000)
  //     .attrTween("d", tweenPie)
  //   .transition()
  //     .ease("elastic")
  //     .delay(function(d, i) { return 2000 + i * 50; })
  //     .duration(750)
  //     .attrTween("d", tweenDonut);

  // function tweenPie(b) {
  //   b.innerRadius = 0;
  //   var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
  //   return function(t) { return arc(i(t)); };
  // }

  // function tweenDonut(b) {
  //   b.innerRadius = radius * .6;
  //   var i = d3.interpolate({innerRadius: 0}, b);
  //   return function(t) { return arc(i(t)); };
  // }

  //Line chart

var data = [ {dataA : [
              {"time" : "Week1", "value" : 20},
              {"time" : "Week2", "value" : 30},
              {"time" : "Week3", "value" : 10},
              {"time" : "Week4", "value" : 10}
             ]},
            {dataB : [  {"time" : "Week1", "value" : 30},
              {"time" : "Week2", "value" : 20},
              {"time" : "Week3", "value" : 10},
              {"time" : "Week4", "value" : 40}
            ]}
            ]


var x_domainKeys = _.pluck(data[0].dataA, "time");
var valueArr = []
data.map(function(obj){
                  _.values(obj)[0].map(function(d){
                      valueArr.push(d.value);
                  })
              });
// var dataA = [
//               {"time" : "Yesterday", "value" : 20},
//               {"time" : "Today", "value" : 30},
//               {"time" : "Tomorrow", "value" : 10},
//             ];

// var dataB = [
//               {"time" : "Yesterday", "value" : 40},
//               {"time" : "Today", "value" : 20},
//               {"time" : "Tomorrow", "value" : 20},
//             ];

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = $("#line_chart_container").width() - margin.left - margin.right,
    height = $("#line_chart_container").height() - margin.top - margin.bottom;

var color = d3.scale.category20();

  var xScale = d3.scale.ordinal()
              .domain(x_domainKeys)
              .rangeRoundBands([ 0, width],0.6, 0.2);

  var max_y = d3.max(valueArr);

  var yScale = d3.scale.linear()
              .domain([ 0, max_y])
              .range([ height, 0 ])



  var xAxis = d3.svg.axis()
              .scale(xScale)
              .ticks(12)
              .orient("bottom")
              // .tickPadding(10)
              .tickSize(0);

  var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient("left")
              .tickValues(function(){return [0, max_y/4, max_y/2, max_y*0.75, max_y]})
              // .tickPadding(5)
              .tickSize(-width);

var svg = d3.select("#line_chart_container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Requests");

  var dataLine=d3.svg.line()
               .x(function(d){ console.log(xScale(d.time)); return (17.5 + xScale(d.time));})
               .y(function(d){ return yScale(d.value);});

  var dataKeys = [];

  data.map(function(obj, i){
    var currentData = data[i][_.keys(obj)];
    svg.append('path')
        .attr('d', dataLine(currentData) )
        .attr('class','line')
        .attr("data-legend",function(d) {return _.keys(obj)[0]})
        .style("stroke", function(d, index) { return color(i); });
  });

  svg.append("line")
     .attr("x1", 128 + xScale(x_domainKeys[2]))
     .attr("y1", height)
     .attr("x2", 128 + xScale(x_domainKeys[2]))
     .attr("y2", 0);

       legend = svg.append("g")
    .attr("class","legend")
    .attr("transform","translate(50,30)")
    .style("font-size","12px")
    .call(d3.legend)


  // console.log("dataKeys", dataKeys);
  // svg.append('path')
  //       .attr('d',dataLine(data[0].dataA))
  //       .attr('class','line');

  // svg.append('path')
  //       .attr('d',dataLine(data[1].dataB))
  //       .attr('class','line');


// var formatDate = d3.time.format("%d-%b-%y");

// var x = d3.time.scale()
//     .range([0, width]);

// var y = d3.scale.linear()
//     .range([height, 0]);

// var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom");

// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left")
//     .ticks(5);

// var line = d3.svg.line()
//     .x(function(d) { return x(d.date); })
//     .y(function(d) { return y(d.close); });

// var svg = d3.select("#pie_chart-container").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// d3.tsv("data.tsv", type, function(error, data) {
//   if (error) throw error;

//   x.domain(d3.extent(data, function(d) { return d.date; }));
//   y.domain(d3.extent(data, function(d) { return d.close; }));

//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis);

//   svg.append("g")
//       .attr("class", "y axis")
//       .call(yAxis)
//     .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .text("Requests");

//   svg.append("path")
//       .datum(data)
//       .attr("class", "line")
//       .attr("d", line);
// });

// function type(d) {
//   d.date = formatDate.parse(d.date);
//   d.close = +d.close;
//   return d;
// }
}