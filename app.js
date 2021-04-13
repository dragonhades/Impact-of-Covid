d3.csv("https://raw.githubusercontent.com/dragonhades/Impact-of-Covid/main/data.csv").then(d => stacked_bar_chart(d))

function stacked_bar_chart(csv) {
	// console.log(csv.map(d => d.EMP_10_A));
	// console.log(csv.columns);

	var dec = count(csv, "EMP_10_A", 1);
	var inc = count(csv, "EMP_10_B", 1);
	var nochange = count(csv, "EMP_10_A", 2) - inc;
	var ns = count(csv, "EMP_10_A", 9);
	var work_hours = [{"Category": "Change in work hours", "Dec": dec, "Inc": inc, "No change": nochange, "Not Stated": ns},
	{"Category": "Change in pay/earning", "Dec": 1253, "Inc": 274, "No change": 12189-274, "Not Stated": 45}];
	// console.log(work_hours);
	// console.log(csv);
	// console.log(work_hours.map(d => d.Category));

	var keys = Object.keys(work_hours[0]).slice(1);

	var svg = d3.select("#stacked_bar_chart"),
		margin = {top: 35, left: 110, bottom: 0, right: 15},
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
		.range(["lightblue", "deepskyblue", "royalblue", "darkorange"])
		.domain(keys);


	var data = work_hours;

	data.forEach(function(d) {
		d.total = d3.sum(keys, k => +d[k])
		return d
	})

	x.domain([0, d3.max(data, d => d.total)]);

	svg.selectAll(".x-axis")
		.call(d3.axisTop(x).ticks(null, "s"))

	y.domain(data.map(d => d.Category));

	svg.selectAll(".y-axis")
		.call(d3.axisLeft(y).tickSizeOuter(0))

	var group = svg.selectAll("g.layer")
		.data(d3.stack().keys(keys)(data), d => d.key)

	group.enter().insert("g", ".y-axis").append("g")
		.classed("layer", true)
		.attr("fill", d => color(d.key));

	var bars = svg.selectAll("g.layer").selectAll("rect")
		.data(d => d);

	bars.enter().append("rect")
		.attr("height", 35)
		.merge(bars)
		.attr("y", d => 45+y(d.data.Category))
		.attr("x", d => {
			// console.log(d);
			return x(d[0]);
			
		})
		.attr("width", d => x(d[1]) - x(d[0]))


	var text = svg.selectAll(".text")
		.data(data, d => d.Category);
	for(var c=0; c<work_hours.length; c++){
		for(var i=0; i<keys.length; i++){
			text.enter().append("text")
				.attr("class", "text")
				.attr("text-anchor", "start")
				.merge(text)
				.attr("y", c*160 + y.bandwidth()+5)
				.attr("x", d => {
					var stk = d3.stack().keys(keys)(data);
					console.log(x(stk[i][c][1]));
					return x(stk[i][c][0] + (stk[i][c][1] - stk[i][c][0])/2.0)-5;
				})
				.text(d => keys[i])
		}
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