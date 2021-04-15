function chord(){
  var csv = union_csv;

  var matrixData={
    "Increase in work hours": [],
    "Decrease in pay/earning": [],
    "Temporary layoff/business closure": [],
    "Lost job/business closed": [], 
    "No employment income": [], 
    "Not Receive Psycho Therapy": [],
    "Major impact on food/groceries Expense": [],
    "Major impact on perscription medication expense": [],
    "Perceived poor health since COVID": [],
    "Better health compared with before COVID": []
  }
  function update_data(){
    var ft_data = csv.filter(d=>d.EMP_10_A==1);
    matrixData["Increase in work hours"] =
      [0, count(ft_data, "EMP_10_D", 1), count(ft_data, "EMP_10_E", 1), count(ft_data, "EMP_10_G", 1), count(ft_data, "CIN_05_A", 2), count(ft_data, "HL_25_D", 1), count(ft_data, "EXP_05D", 1), count(ft_data, "EXP_05F", 1), count(ft_data, "HL_05", 5), count(ft_data, "HL_15", 2)]
    
    ft_data = csv.filter(d=>d.EMP_10_D==1);
    matrixData["Decrease in pay/earning"] =
      [count(ft_data, "EMP_10_A", 1), 0, count(ft_data, "EMP_10_E", 1), count(ft_data, "EMP_10_G", 1), count(ft_data, "CIN_05_A", 2), count(ft_data, "HL_25_D", 1), count(ft_data, "EXP_05D", 1), count(ft_data, "EXP_05F", 1), count(ft_data, "HL_05", 5), count(ft_data, "HL_15", 2)]    
    
    ft_data = csv.filter(d=>d.EMP_10_E==1);
    matrixData["Temporary layoff/business closure"] =
      [count(ft_data, "EMP_10_A", 1), count(ft_data, "EMP_10_D", 1), 0, count(ft_data, "EMP_10_G", 1), count(ft_data, "CIN_05_A", 2), count(ft_data, "HL_25_D", 1), count(ft_data, "EXP_05D", 1), count(ft_data, "EXP_05F", 1), count(ft_data, "HL_05", 5), count(ft_data, "HL_15", 2)]

    ft_data = csv.filter(d=>d.EMP_10_G==1);
    matrixData["Lost job/business closed"] =
      [count(ft_data, "EMP_10_A", 1), count(ft_data, "EMP_10_D", 1), count(ft_data, "EMP_10_E", 1), 0, count(ft_data, "CIN_05_A", 2), count(ft_data, "HL_25_D", 1), count(ft_data, "EXP_05D", 1), count(ft_data, "EXP_05F", 1), count(ft_data, "HL_05", 5), count(ft_data, "HL_15", 2)]
  
    ft_data = csv.filter(d=>d.CIN_05_A==2);
    matrixData["No employment income"] =
      [count(ft_data, "EMP_10_A", 2), count(ft_data, "EMP_10_D", 1), count(ft_data, "EMP_10_E", 1), count(ft_data, "EMP_10_G", 1), 0, count(ft_data, "HL_25_D", 1), count(ft_data, "EXP_05D", 1), count(ft_data, "EXP_05F", 1), count(ft_data, "HL_05", 5), count(ft_data, "HL_15", 2)]

    ft_data = csv.filter(d=>d.HL_25_D==1);
    matrixData["Not Receive Psycho Therapy"] =
      [count(ft_data, "EMP_10_A", 2), count(ft_data, "EMP_10_D", 1), count(ft_data, "EMP_10_E", 1), count(ft_data, "EMP_10_G", 1), count(ft_data, "CIN_05_A", 2), 0, count(ft_data, "EXP_05D", 1), count(ft_data, "EXP_05F", 1), count(ft_data, "HL_05", 5), count(ft_data, "HL_15", 2)]

    ft_data = csv.filter(d=>d.EXP_05D==1);
    matrixData["Major impact on food/groceries Expense"] =
      [count(ft_data, "EMP_10_A", 2), count(ft_data, "EMP_10_D", 1), count(ft_data, "EMP_10_E", 1), count(ft_data, "EMP_10_G", 1), count(ft_data, "CIN_05_A", 2), count(ft_data, "HL_25_D", 1), 0, count(ft_data, "EXP_05F", 1), count(ft_data, "HL_05", 5), count(ft_data, "HL_15", 2)]

    ft_data = csv.filter(d=>d.EXP_05F==1);
    matrixData["Major impact on perscription medication expense"] =
      [count(ft_data, "EMP_10_A", 2), count(ft_data, "EMP_10_D", 1), count(ft_data, "EMP_10_E", 1), count(ft_data, "EMP_10_G", 1), count(ft_data, "CIN_05_A", 2), count(ft_data, "HL_25_D", 1), count(ft_data, "EXP_05D", 1), 0, count(ft_data, "HL_05", 5), count(ft_data, "HL_15", 2)]
  
    ft_data = csv.filter(d=>d.HL_05==5);
    matrixData["Perceived poor health since COVID"] =
      [count(ft_data, "EMP_10_A", 2), count(ft_data, "EMP_10_D", 1), count(ft_data, "EMP_10_E", 1), count(ft_data, "EMP_10_G", 1), count(ft_data, "CIN_05_A", 2), count(ft_data, "HL_25_D", 1), count(ft_data, "EXP_05D", 1), count(ft_data, "EXP_05F", 1), 0, count(ft_data, "HL_15", 2)]

    ft_data = csv.filter(d=>d.HL_15==2);
    matrixData["Better health compared with before COVID"] =
      [count(ft_data, "EMP_10_A", 2), count(ft_data, "EMP_10_D", 1), count(ft_data, "EMP_10_E", 1), count(ft_data, "EMP_10_G", 1), count(ft_data, "CIN_05_A", 2), count(ft_data, "HL_25_D", 1), count(ft_data, "EXP_05D", 1), count(ft_data, "EXP_05F", 1), count(ft_data, "HL_05", 2), 0]
  }
  update_data();

  matrix= Object.values(matrixData);
  matrixKeys = Object.keys(matrixData);



  
  var svg = d3.select("#chord"),
  width = +svg.attr("width"),
  height = +svg.attr("height"),
  outerRadius = Math.min(width, height) * 0.5 - 150,
  innerRadius = outerRadius - 30;

  var formatValue = d3.formatPrefix(",.0", 1e3);

  var chord = d3.chord()
  .padAngle(0.024)
  .sortSubgroups(d3.descending);

  var arc = d3.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius);

  var ribbon = d3.ribbon()
  .radius(innerRadius);

  // if(!d3.select("#chord").select("g").selectAll("path").empty()) return update();

  function update(){
    var g = svg.select("g")
      .datum(chord(matrix));
    var groups = d3.selectAll(".groups")
    .data(function(chords) { return chords.groups; })
  }

  var g = svg.select("g").remove();

  g = svg.append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ") rotate(75)")
  .datum(chord(matrix));

  var group = g.append("g")
  .attr("class", "groups")
  .selectAll("g")
  .data(function(chords) { return chords.groups; })
  .enter().append("g");

  group.append("path")
  // .style("fill", function(d) { return color(d.index); })
  .transition().duration(500)
  .style("fill", function(d) { 
    console.log(d);
    if(selected != null){
      if(selected.cat=="EMP_10_A" && d.index == 0){
        return "RoyalBlue";
      }
      if(selected.cat=="EMP_10_D" && d.index == 1){
        return "RoyalBlue";
      }
      if(selected.cat=="EMP_10_E" && d.index == 2){
        return "RoyalBlue";
      }
      if(selected.cat=="EMP_10_G" && d.index == 3){
        return "RoyalBlue";
      }
      if(selected.cat=="CIN_05_A" && d.index == 4){
        return "RoyalBlue";
      }
      if(selected.cat=="HL_25_D" && d.index == 5){
        return "RoyalBlue";
      }
      if(selected.cat=="EXP_05D" && d.index == 6){
        return "RoyalBlue";
      }
      if(selected.cat=="EXP_05F" &&d.index == 7){
        return "RoyalBlue";
      }
      if(selected.cat=="HL_05" && d.index == 8){
        return "RoyalBlue";
      }
      if(selected.cat=="HL_15" && d.index == 9){
        return "RoyalBlue";
      }
    }
        // console.log("1");
        return "gray";
    })
  // .style("stroke", function(d) { return d3.rgb(color(d.index)).darker(); })
  .attr("d", arc)

  var groupTick = group.selectAll(".group-tick")
  .data(function(d) { return groupTicks(d, 1e3); })
  .enter().append("g")
  .attr("class", "group-tick")
  .attr("transform", function(d) {
    // console.log(d);
    return "rotate(" + (d.angle * 180 / Math.PI - 86) + 
    ") translate(" + outerRadius + ",2)"; 
  });

  groupTick.append("line")
  .attr("x2", 6);

  groupTick
  .filter(function(d) { return d.value % 9e3 === 0; })
  .append("text")
  .attr("x", 8)
  .attr("dy", ".35em")
  .attr("transform", function(d) { return d.angle > Math.PI/2 && d.angle < Math.PI*3/2 ? "rotate(180) translate(-16)" : null; })
  .style("text-anchor", function(d) { return d.angle > Math.PI/2 && d.angle < Math.PI*3/2? "end" : null; })
  .text(function(d) { 
    return matrixKeys[d.index]; 
  });

  g.append("g")
  .attr("class", "ribbons")
  .selectAll("path")
  .data(function(chords) { return chords; })
  .enter().append("path")
  .attr("d", ribbon)
  .style("fill", function(d) { 
    if(selected != null){
      if(selected.cat=="EMP_10_A" && (d.source.index == 0 || d.target.index == 0)){
        return "RoyalBlue";
      }
      if(selected.cat=="EMP_10_D" && (d.source.index == 1 || d.target.index == 1)){
        return "RoyalBlue";
      }
      if(selected.cat=="EMP_10_E" && (d.source.index == 2 || d.target.index == 2)){
        return "RoyalBlue";
      }
      if(selected.cat=="EMP_10_G" && (d.source.index == 3 || d.target.index == 3)){
        return "RoyalBlue";
      }
      if(selected.cat=="CIN_05_A" && (d.source.index == 4 || d.target.index == 4)){
        return "RoyalBlue";
      }
      if(selected.cat=="HL_25_D" && (d.source.index == 5 || d.target.index == 5)){
        return "RoyalBlue";
      }
      if(selected.cat=="EXP_05D" && (d.source.index == 6 || d.target.index == 6)){
        return "RoyalBlue";
      }
      if(selected.cat=="EXP_05F" && (d.source.index == 7 || d.target.index == 7)){
        return "RoyalBlue";
      }
      if(selected.cat=="HL_05" && (d.source.index == 8 || d.target.index == 8)){
        return "RoyalBlue";
      }
      if(selected.cat=="HL_15" && (d.source.index == 9 || d.target.index == 9)){
        return "RoyalBlue";
      }
    }
        // console.log("1");
        return "darkgray";
    })
  // .transition().duration(500)
  // .style("fill", "darkgray")
  // .transition().duration(500)
  .style("opacity", 0.5)
  // .style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); });

  // Returns an array of tick angles and values for a given group and step.
  function groupTicks(d, step) {
    var k = (d.endAngle - d.startAngle) / d.value;
    return d3.range(0, d.value, step).map(function(value) {
      return {
        index:d.index,
        value: value, 
        angle: value * k + d.startAngle
      };
    });
  }

}

