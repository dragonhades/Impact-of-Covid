function bar_chart_2() {
	var csv = union_csv;

	var c1, c2, c3, c4, c5, c6, data;


	c1 = count(csv, "HL_20", 1);
	c2 = count(csv, "HL_20", 2);
	c3 = count(csv, "HL_20", 3);
	c4 = count(csv, "HL_20", 4);
	c5 = count(csv, "HL_20", 5);
	c6 = count(csv, "HL_20", 9);
	// data = {"Category": "Mental health status", "Excellent": excellent, "Very good": very_good, "Good": good, "Fair": fair, "Poor": poor, "Not stated": ns};
	function data() {return [{"Mental Health Compared": "Much better", "Value": c1}, 
	{"Mental Health Compared": "Somewhat better", "Value": c2},
	{"Mental Health Compared": "About the same", "Value": c3},
	{"Mental Health Compared": "Somewhat worse", "Value": c4},
	{"Mental Health Compared": "Much worse", "Value": c5},
	{"Mental Health Compared": "Not stated", "Value": c6}];}
	// console.log(work_hours);
	// console.log(csv);
	// console.log(work_hours.map(d => d.Category));

	var y_max = d3.max(data(), d => d.Value);

	var svg = d3.select("#bar_chart_2"),
	margin = {top: 70, left: 30, bottom: 0, right: 0},
	width = +svg.attr("width") - margin.left - margin.right,
	height = +svg.attr("height") - margin.top - margin.bottom;

	var x = d3.scaleBand()
	.range([margin.left, width - margin.right])
	.padding(0.1)
	.paddingOuter(0.2)
	.paddingInner(0.2)

	var y = d3.scaleLinear()
	.range([height - margin.bottom, margin.top])

	y.domain([0, y_max]);
	x.domain(data().map(d => d["Mental Health Compared"]));

	if(!d3.select("#bar_chart_2").selectAll(".bar").empty()) return update();

	var title = svg.selectAll(".title");

	title.remove();

	svg.append("text")
	.attr("x", (width / 2))             
	.attr("y", margin.top/2)
	.attr("text-anchor", "middle")
	.attr("class", "title")
	.style("font-size", "16px") 
	.text("Mental Health Compared to Before COVID-19");

	var bars = svg.selectAll(".bar")
	.data(data());

	bars.remove();

	bars.enter().append("rect")
	.attr("class", "bar")
	.attr("fill", "deepskyblue")
	.attr("x", d => x(d["Mental Health Compared"]))
	.attr("width", x.bandwidth())

	// .transition().duration(500)
	.attr("y", d => y(d.Value))
	.attr("height", d => height - y(d.Value))
	// .transition().duration(500)

	var labels = svg.selectAll(".labels")
	.data(data());

	labels.remove();

	labels.enter().append("text")
	.attr("x", d => x(d["Mental Health Compared"])+x.bandwidth()/2)             
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
	.attr("x", 40)
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

		d3.select("#bar_chart_2").selectAll(".bar")
		.data(data())
		.transition().duration(500)
		.attr("y", d => new_y(d.Value))
		// .transition().duration(500)
		.attr("height", d => {return height - new_y(d.Value);})

		d3.select("#bar_chart_2").selectAll(".labels")
		.data(data())
		.transition().duration(500)
		.attr("y", d => new_y(d.Value))
		.transition().duration(500)
		.text(d=>d.Value);
	}

	function count(array, key, value) {
		// console.log(array[0][key]);
		var count = 0;
		for(var i = 0; i < array.length; ++i){
			if(array[i][key] == value)
				count++; 
		}
		return count;
	}

}