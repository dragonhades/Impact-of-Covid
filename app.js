var init_csv;
var stack_ft_csv;
var map_ft_csv;
var union_csv;

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