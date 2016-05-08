var app = require("express")();
var moment = require("moment");
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul",
	"Aug","Sep","Oct","Nov","Dec"];

function isDate(d){
	return !isNaN(new Date(d).valueOf());
}

app.get("/:d", function(req,res){
	var parsed_dates = {
		unix: null,
		natural: null
	};
	console.log("params: "+req.params.d);
	if(/^-?\d+$/.test(req.params.d))
		var date = moment.unix(Number(req.params.d));
	else{
		console.log("aqui");
		var date = moment(req.params.d);
	}
	
	if(date.isValid()){
		parsed_dates.unix = date.unix();
		parsed_dates.natural = date.utc().format("MMMM D, YYYY");
	}
	res.json(parsed_dates);
});
app.listen(80, function(){
	console.log("Running on port 80");
}); 