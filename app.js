var init_csv;
var stack_ft_csv;
var map_ft_csv;
var union_csv;

var selected;

d3.csv("https://raw.githubusercontent.com/dragonhades/Impact-of-Covid/main/data.csv").then(d => {
	init_csv = d;
	stack_ft_csv = d;
	map_ft_csv = d;
	union_csv = d;
	stacked_bar_chart();
	bar_chart_1();
	bar_chart_2();
	map();
	chord();
})

function update_union_csv(){
	union_csv = stack_ft_csv.filter(d=>map_ft_csv.some(e=> d.PUMFID == e.PUMFID));

	bar_chart_1()

	bar_chart_2()

	map();

	chord();

	// d3.select("#bar_chart_1").selectAll("rect").attr("fill", save1);
	// d3.select("#bar_chart_2").selectAll("rect").attr("fill", save2);
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