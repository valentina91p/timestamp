var app = require("express")();
var moment = require("moment");

app.get("/",function(req,res){
	res.sendFile("index.html", {root: __dirname});
});

app.get("/:d", function(req,res){
	var parsed_dates = {
		unix: null,
		natural: null
	};
	if(/^-?\d+$/.test(req.params.d))
		var date = moment.unix(Number(req.params.d));
	else
		var date = moment.utc(req.params.d);
	
	if(date.isValid()){
		parsed_dates.unix = date.utc().unix();
		parsed_dates.natural = date.format("MMMM D, YYYY");
	}
	res.json(parsed_dates);
});
app.listen(80, function(){
	console.log("Running on port 80");
}); 