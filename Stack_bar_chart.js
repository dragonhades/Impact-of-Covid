function stacked_bar_chart() {
	var data, keys;
	data(init_csv);

	var svg = d3.select("#stacked_bar_chart"),
		margin = {top: 80, left: 100, bottom: 0, right: 5},
		width = +svg.attr("width") - margin.left - margin.right,
		height = +svg.attr("height") - margin.top - margin.bottom;

	var y = d3.scaleBand()
		.range([margin.top, height - margin.bottom])
		.padding(0.1)
		.paddingOuter(0.2)
		.paddingInner(0.2)

	var x = d3.scaleLinear()
		.range([margin.left, width - margin.right])

	var yAxis = svg.append("g")
		.attr("transform", `translate(${margin.left},0)`)
		.attr("class", "y-axis")

	var xAxis = svg.append("g")
		.attr("transform", `translate(0,${margin.top})`)
		.attr("class", "x-axis")

	var color = d3.scaleOrdinal()
		.range(["CornflowerBlue", "lightblue", "deepskyblue", "RoyalBlue", "lightskyblue", "darkorange"])
		.domain(keys);

	data.forEach(function(d) {
		d.total = d3.sum(keys, k => +d[k])
		return d
	})

	x.domain([0, d3.max(data, d => d.total)]);

	svg.selectAll(".x-axis")
		.call(d3.axisTop(x).ticks(null, "s"))

	// console.log(data.map(d => d.Category));
	y.domain(data.map(d => d.Category));

	svg.selectAll(".y-axis")
		.call(d3.axisLeft(y).tickSizeOuter(0).ticks(8, "%"))
		.selectAll(".tick text")
		.call(wrap, 50)
		.selectAll("text")
		.attr("text-anchor","right")
	    // .attr("y", 10)
	    .attr("x", -125)
	    // .attr("dy", ".15em")
	    // .attr("transform", "rotate(30)")

	var group = svg.selectAll("g.layer")
		.data(d3.stack().keys(keys)(data))
	// console.log((d3.stack()([1, 2, 3])));

	group.enter().insert("g", ".y-axis").append("g")
		.classed("layer", true)
		.attr("fill", d => color(d.key));

	var bars = svg.selectAll("g.layer").selectAll("rect")
		.data(d => {
			d.map(e => {
				// console.log(d);
				e.key = e.data.keynames[d.index];
				e.cat = e.data.keycat[d.index]
				e.code = e.data.keycodes[d.index];
				e.value = e.data["k"+(d.index+1)];
			});
			return d;})

	bars.enter().append("rect")
		.attr("height", 35)
		.attr("y", d => (y.bandwidth()-35)/2 + y(d.data.Category))
		.attr("x", d => x(d[0]))
		.attr("width", d => x(d[1]) - x(d[0]))
		.style("pointer-events","all");

	svg.selectAll("rect")
		.on("mouseover", function(d) {
	      var xPos = parseFloat(d3.select(this).attr("x"));
	      var yPos = parseFloat(d3.select(this).attr("y"));
	      var height = parseFloat(d3.select(this).attr("height"));
	      var width = parseFloat(d3.select(this).attr("width"));

	      d3.select(this).attr("stroke","darkblue").attr("stroke-width",2);

	      // console.log(d);
	      svg.append("text")
	      .attr("x",xPos+width/2)
	      .attr("y",yPos-5)
	      .attr("class","tooltip")
	      .attr("text-anchor", "middle")
	      .text(d.key +": "+ d.value); 
	      
	   })
		.on("mouseout", function(d) {
			d3.select(this).attr("stroke","blue").attr("stroke-width",0);
			svg.selectAll(".tooltip").remove();
		})
		.on("click", function(d) {
			// console.log(d);
			var xPos = parseFloat(d3.select(this).attr("x"));
		    var yPos = parseFloat(d3.select(this).attr("y"));
		    var height = parseFloat(d3.select(this).attr("height"));
		    var width = parseFloat(d3.select(this).attr("width"));

		    var csv = init_csv.filter(f => {
				if(d.cat == "EMP_10_A XOR EMP_10_B"){
					return f["EMP_10_A"] == 2 && f["EMP_10_B"] == 2;
				}
				if(d.cat == "EMP_10_C XOR EMP_10_D"){
					return f["EMP_10_C"] == 2 && f["EMP_10_D"] == 2;
				}
				else return f[d.cat] == d.code;
			})

		    svg.select(".selected").remove();

		    if(stack_ft_csv.length != csv.length){
				svg.append("rect")
				.attr("x", xPos)
				.attr("y", yPos)
				.attr("width", width)
				.attr("height", height)
				.attr("class", "selected")
				.attr("fill", "none")
				.attr("stroke","red")
				.attr("stroke-width",2);

				selected = d;
			} else {
				selected = null;
			}
			
			// console.log(csv);
			// bar_chart(csv.slice(5000));

			// bars = d3.selectAll("#bar_chart").selectAll(".bars").remove()

			if(stack_ft_csv.length == csv.length) {
				stack_ft_csv = init_csv;
			}
			else stack_ft_csv = csv;
			update_union_csv();
			d3.select("#bar_chart_1").selectAll("rect").attr("fill", d3.select(this).style("fill"));
			d3.select("#bar_chart_2").selectAll("rect").attr("fill", d3.select(this).style("fill"));

			// d3.select("#map").select("path").exit();
			// map();
		})

	var title = svg.selectAll(".title");

	title.remove();

	svg.append("text")
    .attr("x", margin.left/2+(width / 2))             
    .attr("y", margin.top/2)
    .attr("text-anchor", "middle")
    .attr("class", "title")
    .style("font-size", "16px") 
    .text("Changes on Living Status");

    function data(csv){
    	// console.log(csv.map(d => d.EMP_10_A));
		// console.log(csv.columns);
		data = 
		[{"Category": "Change in work hours", 
			"k1": count(csv, "EMP_10_B", 1), "k2": count(csv, "EMP_10_A", 2) - count(csv, "EMP_10_B", 1), "k3": count(csv, "EMP_10_A", 1), "k4": 0, "k5": 0, "k6": count(csv, "EMP_10_A", 9), 
			"keynames": ["Population: decrease in work hours", "Population: no change in work hours", "Population: Increase in work hours", "", "", "Population: answer not Stated"],
			"keycat": ["EMP_10_B", "EMP_10_A XOR EMP_10_B", "EMP_10_A", "", "", "EMP_10_A"],
			"keycodes": [1, 0, 1, 0, 0, 9]},
		{"Category": "Change in pay/earning", 
			"k1": count(csv, "EMP_10_C", 1), "k2": count(csv, "EMP_10_C", 2) - count(csv, "EMP_10_D", 1), "k3": count(csv, "EMP_10_D", 1), "k4": 0, "k5": 0, "k6": count(csv, "EMP_10_C", 9),
			"keynames": ["Population: increase in pay/earning", "Population: no change in pay/earning", "Population: decrease in pay/earning", "", "", "Population: answer not Stated"],
			"keycat": ["EMP_10_C", "EMP_10_C XOR EMP_10_D", "EMP_10_D", "", "", "EMP_10_C"],
			"keycodes": [1, 0, 1, 0, 0, 9]},
		{"Category": "Temporary layoff/business closure", "k1": count(csv, "EMP_10_E", 2), "k2": 0, "k3": count(csv, "EMP_10_E", 1), "k4": 0, "k5": 0, "k6": count(csv, "EMP_10_E", 9),
			"keynames": ["Population: Don't have temporary layoff/business closure", "", "Population: Have temporary layoff/business closure", "", "", "Population: answer not Stated"],
			"keycat": ["EMP_10_E", "", "EMP_10_E", "", "", "EMP_10_E"],
			"keycodes": [2, 0, 1, 0, 0, 9]},
		{"Category": "Job loss/ Permanent business closure", "k1": count(csv, "EMP_10_G", 2), "k2": 0, "k3": count(csv, "EMP_10_G", 1), "k4": 0, "k5": 0, "k6": count(csv, "EMP_10_G", 9),
			"keynames": ["Population: Don't have job loss/ Permanent business closure", "", "Population: Have job loss/ Permanent business closure", "", "", "Population: answer not Stated"],
			"keycat": ["EMP_10_G", "", "EMP_10_G", "", "", "EMP_10_G"],
			"keycodes": [2, 0, 1, 0, 0, 9]},
		{"Category": "Received Income: Employment", "k1": count(csv, "CIN_05_A", 1), "k2": 0, "k3": count(csv, "CIN_05_A", 2), "k4": 0, "k5": 0, "k6": count(csv, "CIN_05_A", 9),
			"keynames": ["Population: Received employment income", "", "Population: No employment income", "", "", "Population: answer not Stated"],
			"keycat": ["CIN_05_A", "", "CIN_05_A", "", "", "CIN_05_A"],
			"keycodes": [1, 0, 2, 0, 0, 9]},
		{"Category": "Not Receive Psycho Therapy", "k1": count(csv, "HL_25_D", 2), "k2": 0, "k3": count(csv, "HL_25_D", 1), "k4": 0, "k5": 0, "k6": count(csv, "HL_25_D", 9),
			"keynames": ["Population: Received", "", "Population: Not Received", "", "", "Population: answer not Stated"],
			"keycat": ["HL_25_D", "", "HL_25_D", "", "", "HL_25_D"],
			"keycodes": [2, 0, 1, 0, 0, 9]},
		{"Category": "Food/groceries Expense", "k1": count(csv, "EXP_05D", 4), "k2": count(csv, "EXP_05D", 3), "k3": count(csv, "EXP_05D", 2), "k4": count(csv, "EXP_05D", 1), "k5": count(csv, "EXP_05D", 5), "k6": count(csv, "EXP_05D", 9),
			"keynames": ["Population: No impact", "Population: Minor impact", "Population: moderate impact", "Population: major impact", "Population: too soon to tell", "Population: answer not Stated"],
			"keycat": ["EXP_05D", "EXP_05D", "EXP_05D", "EXP_05D", "EXP_05D", "EXP_05D"],
			"keycodes": [4, 3, 2, 1, 5, 9]},
		{"Category": "Perscription medication expense", "k1": count(csv, "EXP_05F", 4), "k2": count(csv, "EXP_05F", 3), "k3": count(csv, "EXP_05F", 2), "k4": count(csv, "EXP_05F", 1), "k5": count(csv, "EXP_05F", 5), "k6": count(csv, "EXP_05F", 9),
			"keynames": ["Population: No impact", "Population: Minor impact", "Population: moderate impact", "Population: major impact", "Population: too soon to tell", "Population: answer not Stated"],
			"keycat": ["EXP_05F", "EXP_05F", "EXP_05F", "EXP_05F", "EXP_05F", "EXP_05F"],
			"keycodes": [4, 3, 2, 1, 5, 9]},
		{"Category": "Perceived health since COVID", "k1": count(csv, "HL_05", 1), "k2": count(csv, "HL_05", 2), "k3": count(csv, "HL_05", 3), "k4": count(csv, "HL_05", 4), "k5": count(csv, "HL_05", 5), "k6": count(csv, "HL_05", 9),
			"keynames": ["Population: Excellent", "Population: Very good", "Population: Good", "Population: Fair", "Population: Poor", "Population: answer not Stated"],
			"keycat": ["HL_05", "HL_05", "HL_05", "HL_05", "HL_05", "HL_05"],
			"keycodes": [1, 2, 3, 4, 5, 9]},
		{"Category": "Health compared with before COVID", "k1": count(csv, "HL_15", 1), "k2": count(csv, "HL_15", 2), "k3": count(csv, "HL_15", 3), "k4": count(csv, "HL_15", 4), "k5": count(csv, "HL_15", 5), "k6": count(csv, "HL_15", 9),
			"keynames": ["Population: Much better now", "Population: Somewhat better now", "Population: About the same", "Population: Somewhat worse now", "Population: Much worse now", "Population: answer not Stated"],
			"keycat": ["HL_15", "HL_15", "HL_15", "HL_15", "HL_15", "HL_15"],
			"keycodes": [1, 2, 3, 4, 5, 9]},
		];
		
		keys = ["k1", "k2", "k3", "k4", "k5", "k6"];
    }
}

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", -10).attr("y", y-10).attr("dy", dy + "em")
    while (word = words.pop()) {
      line.push(word)
      tspan.text(line.join(" "))
      if (tspan.node().getComputedTextLength() > width) {
        line.pop()
        tspan.text(line.join(" "))
        line = [word]
        tspan = text.append("tspan").attr("x", -10).attr("y", y-10).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
      }
    }
  })
}