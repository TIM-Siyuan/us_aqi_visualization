var margin = {top: 30, right: 40, bottom: 20, left: 100},
    width = 680 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var dimensions = [
  {
    name: "State",
    scale: d3.scale.ordinal().rangePoints([0, height]),
    type: String
  },
  {
    name: "NO2 AQI",
    scale: d3.scale.linear().range([0, height]),
    type: Number
  },
  {
    name: "O3 AQI",
    scale: d3.scale.linear().range([0, height]),
    type: Number
  },
  {
    name: "SO2 AQI",
    scale: d3.scale.sqrt().range([height, 0]),
    type: Number
  },
  {
    name: "CO AQI",
    scale: d3.scale.linear().range([height, 0]),
    type: Number
  },
  {
    name: "DailyAQI",
    scale: d3.scale.linear().range([height, 0]),
    type: Number
  }
];

var x = d3.scale.ordinal()
    .domain(dimensions.map(function(d) { return d.name; }))
    .rangePoints([0, width]);

var line = d3.svg.line()
    .defined(function(d) { return !isNaN(d[1]); });

var yAxis = d3.svg.axis()
    .orient("left");

var parallel_svg = d3.select(".parallel").append("svg")
	.attr("class","parallel_svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var dimension = parallel_svg.selectAll(".dimension")
    .data(dimensions)
  .enter().append("g")
    .attr("class", "dimension")
    .attr("transform", function(d) { return "translate(" + x(d.name) + ")"; });

d3.csv("air_pollution.csv", function(error, data) {
  if (error) throw error;
  data.forEach(function(d){
    d.yyyymmdd = +d.yyyymmdd;
    d.fips = +d.fips;
    //d.DailyAQI = +d.DailyAQI;
   })

  var dataByStateByYear = d3.nest()
    .key(function(d) { return d.fips; })
    .key(function(d) { return d.yyyymmdd; })
    .map(data);
  console.log(dataByStateByYear);


  dimensions.forEach(function(dimension) {
    dimension.scale.domain(dimension.type === Number
        ? d3.extent(data, function(d) { return +d[dimension.name]; })
        : data.map(function(d) { return d[dimension.name]; }).sort());
  });

  parallel_svg.append("g")
      .attr("class", "back")
    .selectAll("path")
      .data(data)
    .enter().append("path")
      .attr("d", path);

  parallel_svg.append("g")
      .attr("class", "fore")
    .selectAll("path")
      .data(data)
    .enter().append("path")
      .attr("d", path);

  console.log(data);

  function update(yyyymmdd){
    var datum = [];
    for(var i = 0; i< data.length; i++){
      if(typeof dataByStateByYear[i] === 'undefined' || typeof dataByStateByYear[i][yyyymmdd]==='undefined'){
        continue;
      }
      datum.push(dataByStateByYear[i][yyyymmdd]);
    }

    // console.log(datum);
    datum = datum.map(d=>d[0]);

    // console.log(d[0]);
    var back = d3.select('.back')
    .selectAll("path")
    .data(datum)

    back.enter().append("path").attr("d", path)
        .attr('fill', "green");

    back.exit().remove();

    back.attr("d", path);


    var fore = d3.select('.fore')
    .selectAll("path")
    .data(datum);

    fore.enter().append("path")
              .attr("d", path);

    fore.exit().remove();

    fore.attr("d", path);
  }
  // d3.select('.parallel').append('button')
  //   .style("height",'50px')
  //   .on("click", function(){
  //     update(20150401);
  //   })
  //   d3.select('.parallel').append('button')
  //     .style("height",'50px')
  //     .on("click", function(){
  //       update(20150203);
  //     })
  //   d3.select('.parallel').append('button')
  //     .style("height",'50px')
  //     .on("click", function(){
  //       update(20150101);
  //     })
  update(20150311);

function convertTime(timedata){
    year = '2015';
    if(timedata <= 31){
      month = '01';
      day = timedata;
      if(day < 10){
        day = '0'+ day
      }
      return year+month+day
    }
    else if ( 31 < timedata && timedata <= 59 ) {
      month = '02';
      day = timedata - 31;
      if(day < 10){
        day = '0'+ day
      }
      return year+month+day
    }
    else if ( 59 < timedata && timedata <= 90 ) {
      month = '03';
      day = timedata - 59;
      if(day < 10){
        day = '0'+ day
      }
      return year+month+day
    }
    else if ( 90 < timedata && timedata <= 120 ) {
      month = '04';
      day = timedata - 90;
      if(day < 10){
        day = '0'+ day
      }
      return year+month+day
    }
    else if ( 120 < timedata && timedata <= 151 ) {
      month = '05';
      day = timedata - 120;
      if(day < 10){
        day = '0'+ day
      }
      return year+month+day
    }
    else if ( 151 < timedata && timedata <= 181 ) {
      month = '06';
      day = timedata - 151;
      if(day < 10){
        day = '0'+ day
      }
      return year+month+day
    }
    else if ( 181 < timedata && timedata <= 212 ) {
      month = '07';
      day = timedata - 181;
      if(day < 10){
        day = '0'+ day
      }
      return year+month+day
    }
    else if ( 212 < timedata && timedata <= 243 ) {
      month = '08';
      day = timedata - 212;
      if(day < 10){
        day = '0'+ day
      }
      return year+month+day
    }
    else if ( 243 < timedata && timedata <= 273 ) {
      month = '09';
      day = timedata - 243;
      if(day < 10){
        day = '0'+ day
      }
      return year+month+day
    }
    else if ( 273 < timedata && timedata <= 304 ) {
      month = '10';
      day = timedata -273;
      if(day < 10){
        day = '0'+ day
      }
      return year+month+day
    }
    else if ( 304 < timedata && timedata <= 334 ) {
      month = '11';
      day = timedata - 304;
      if(day < 10){
        day = '0'+ day
      }
      return year+month+day
    }
    else if ( 334 < timedata && timedata <= 365 ) {
      month = '12';
      day = timedata - 334;
      if(day < 10){
        day = '0'+ day
      }
      return year+month+day
    }
  }

	d3.select('.date')
		.on('input', function(){
			var yyyymmdd = convertTime(this.value);
			update(yyyymmdd);
			ymd = yyyymmdd.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
			d3.select('.dateLabel').text(ymd);
		});


  dimension.append("g")
      .attr("class", "axis")
      .each(function(d) { d3.select(this).call(yAxis.scale(d.scale)); })
    .append("text")
      .attr("class", "title")
      .attr("text-anchor", "middle")
      .attr("y", -9)
      .text(function(d) { return d.name; });

  // Rebind the axis data to simplify mouseover.
  parallel_svg.select(".axis").selectAll("text:not(.title)")
      .attr("class", "label")
      .data(data, function(d) { return d.State || d; });

  var projection = parallel_svg.selectAll(".axis text,.back path,.fore path")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

  function mouseover(d) {
    parallel_svg.classed("active", true);
    projection.classed("inactive", function(p) { return p !== d; });
    projection.filter(function(p) { return p === d; }).each(moveToFront);
  }

  function mouseout(d) {
    parallel_svg.classed("active", false);
    projection.classed("inactive", false);
  }

  function moveToFront() {
    this.parentNode.appendChild(this);
  }
});

function path(d) {
  return line(dimensions.map(function(dimension) {
    return [x(dimension.name), dimension.scale(d[dimension.name])];
  }));
}
