function bar_chart_1() {
	var csv = union_csv;

	var c1, c2, c3, c4, c5, c6;

	c1 = count(csv, "HL_10", 1);
	c2 = count(csv, "HL_10", 2);
	c3 = count(csv, "HL_10", 3);
	c4 = count(csv, "HL_10", 4);
	c5 = count(csv, "HL_10", 5);
	c6 = count(csv, "HL_10", 9);
	// data = {"Category": "Mental health status", "Excellent": excellent, "Very good": very_good, "Good": good, "Fair": fair, "Poor": poor, "Not stated": ns};
	function data() {return [{"Mental health status": "Excellent", "Value": c1}, 
			{"Mental health status": "Very good", "Value": c2},
			{"Mental health status": "Good", "Value": c3},
			{"Mental health status": "Fair", "Value": c4},
			{"Mental health status": "Poor", "Value": c5},
			{"Mental health status": "Not stated", "Value": c6}];}
	// console.log(work_hours);
	// console.log(csv);
		// console.log(work_hours.map(d => d.Category));

	var y_max = d3.max(data(), d => d.Value);

	var svg = d3.select("#bar_chart_1"),
		margin = {top: 70, left: 30, bottom: 0, right: 5},
		width = +svg.attr("width") - margin.left - margin.right,
		height = +svg.attr("height") - margin.top - margin.bottom;

	var x = d3.scaleBand()
		.range([margin.left, width - margin.right])
		.padding(0.1)
		.paddingOuter(0.2)
		.paddingInner(0.2)

	var y = d3.scaleLinear()
		.range([height - margin.bottom, margin.top])
	// console.log([height - margin.bottom, margin.top])

	y.domain([0, y_max]);
	x.domain(data().map(d => d["Mental health status"]));

	if(!d3.select("#bar_chart_1").selectAll(".bar").empty()) return update();


		var title = svg.selectAll(".title");

		title.remove();

		svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", margin.top/2)
        .attr("text-anchor", "middle")
        .attr("class", "title")
        .style("font-size", "16px") 
        .text("Perceived Mental Health Since COVID");

		var bars = svg.selectAll(".bar")
			.data(data());

		bars.remove();

		bars.enter().append("rect")
			.attr("class", "bar")
			.attr("fill", "deepskyblue")
			.attr("x", d => x(d["Mental health status"]))
			.attr("width", x.bandwidth())
			// .transition().duration(500)
			.attr("y", d => { return y(d.Value)})
			.attr("height", d => height - y(d.Value))


		var labels = svg.selectAll(".labels")
			.data(data());

		labels.remove();
		
		labels.enter().append("text")
		    .attr("x", d => x(d["Mental health status"])+x.bandwidth()/2)             
		    .attr("y", d => y(d.Value))
		    .attr("text-anchor", "middle")
		    .attr("class", "labels")
		    .style("font-size", "14px") 
		    .text(d=>d.Value);


		svg.selectAll(".y-axis").remove();
		svg.selectAll(".x-axis").remove();

		var yAxis = svg.append("g")
		.attr("transform", `translate(${margin.left},0)`)
		.attr("class", "y-axis")

		var xAxis = svg.append("g")
		.attr("transform", `translate(0,${margin.bottom+height})`)
		.attr("class", "x-axis")

		svg.selectAll(".y-axis")
		.call(d3.axisLeft(y).ticks(null, "s"))

		svg.selectAll(".x-axis")
		.call(d3.axisBottom(x).tickSizeOuter(0))
		.selectAll("text")
		.attr("text-anchor","left")
	    .attr("y", 10)
	    .attr("x", 25)
	    .attr("dy", ".15em")
	    .attr("transform", "rotate(30)")

	function update(){
		var new_y = d3.scaleLinear()
			.range([height - margin.bottom, margin.top])
		y_max = d3.max(data(), d => d.Value);
		// console.log([height - margin.bottom, margin.top]);
		new_y.domain([0, y_max]);

		svg.selectAll(".y-axis")
		.transition().duration(500)
		.call(d3.axisLeft(new_y).ticks(null, "s"))

		d3.select("#bar_chart_1").selectAll(".bar")
		.data(data())
		.transition().duration(500)
		.attr("y", d => new_y(d.Value))
		// .transition().duration(500)
		.attr("height", d => {return height - new_y(d.Value);})

		d3.select("#bar_chart_1").selectAll(".labels")
		.data(data())
		.transition().duration(500)
		.attr("y", d => new_y(d.Value))
		.transition().duration(500)
	    .text(d=>d.Value);
	}
}