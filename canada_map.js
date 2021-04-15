function map(){

  function data(csv){ return [{"code": 10, "population": count(csv, "PPROV", 10)},
  {"code": 11, "population": count(csv, "PPROV", 11)},
  {"code": 12, "population": count(csv, "PPROV", 12)},
  {"code": 13, "population": count(csv, "PPROV", 13)},
  {"code": 24, "population": count(csv, "PPROV", 24)},
  {"code": 35, "population": count(csv, "PPROV", 35)},
  {"code": 46, "population": count(csv, "PPROV", 46)},
  {"code": 47, "population": count(csv, "PPROV", 47)},
  {"code": 48, "population": count(csv, "PPROV", 48)},
  {"code": 59, "population": count(csv, "PPROV", 59)},
  {"code": 60, "population": 0},
  {"code": 61, "population": 0},
  {"code": 62, "population": 0},
  {"code": 63, "population": count(csv, "PPROV", 63)}];}



  var svg = d3.select("#map")
  margin = {top: 70, left: 0, bottom: 0, right: -100},
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom;

  var projection = d3.geoMercator()
  .center([94, 57])
  .scale(500)
  .rotate([-180,0]);
  // console.log(csv);

  var path = d3.geoPath().projection(projection);


  // console.log(data(csv));
  const blue = d3.scaleSequential()
  .domain([0, 1500])
  .interpolator(d3.interpolateBlues);

  if(!d3.select("#map").select(".feature").empty()) return update();

    svg.attr("width", width)
  .attr("height", height)
      // .on("click", reset);

      var g = svg.append("g");

  svg.append("text")
  .attr("x", (width+margin.right) / 2)             
  .attr("y", margin.top/2-20)
  .attr("text-anchor", "middle")
  .attr("class", "title")
  .style("font-size", "16px") 
  .text("Geographic distribution of the target population");


  d3.json("https://raw.githubusercontent.com/dragonhades/Impact-of-Covid/main/canada.topo.json").then(function(canada) {

    // console.log(canada);
    g.selectAll("path")
    .data(topojson.feature(canada, canada.objects['provinces']).features)
    .enter().append("path")
    .attr("d", path)
    .attr("class", "feature")
    .style("fill", function(d, i){ return blue(data(union_csv).filter(e=>d.properties.PRUID==e.code)[0].population); })
        // .style("fill", "lightgrey")
        .on("mouseover", function(d){

          d3.select(this).style("fill", "darkorange")
          svg.append("text")
          .attr("class", "labels")
          .attr("x", path.centroid(d.geometry)[0])
          .attr("y", path.centroid(d.geometry)[1])
          .attr("text-anchor", "middle")
          .style("fill", "CornflowerBlue")
          .style("font-size", "25px") 
          .text(e=>d.id+" : "+data(union_csv).filter(e=>d.properties.PRUID==e.code)[0].population)
        })

        .on("click", function(d){
          var csv = init_csv.filter(e=>d.properties.PRUID == e.PPROV);
          if(map_ft_csv.length == csv.length){
            map_ft_csv = init_csv;
          } else map_ft_csv = csv;
          // console.log(map_csv);
          update_union_csv();
        })
        .on("mouseout", function(d){
          d3.select(this).style("fill", function(d, i){ return blue(data(union_csv).filter(e=>d.properties.PRUID==e.code)[0].population); })
          svg.selectAll(".labels").remove();
        });

        g.append("path")
        .datum(topojson.mesh(canada, canada.objects['provinces'], function(a, b) { return a !== b; }))
        .attr("class", "mesh")
        .attr("d", path)
        .attr("fill", "none")
        .attr("stroke", "darkgray")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 2)
      });

  function update(){
    // console.log("?");
    d3.json("https://raw.githubusercontent.com/dragonhades/Impact-of-Covid/main/canada.topo.json").then(function(canada) {
      d3.select("#map").selectAll(".feature")
      .data(topojson.feature(canada, canada.objects['provinces']).features)
      .transition().duration(500)
      .style("fill", function(d, i){ return blue(data(union_csv).filter(e=>d.properties.PRUID==e.code)[0].population); })
    })

  }
}