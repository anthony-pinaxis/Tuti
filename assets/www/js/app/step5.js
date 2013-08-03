$(function(){
	// Safety Plan Generation: Page 5
	$("#safetyPlanStep5").on("pageshow",function(event){
		console.log('Shown: Safety Plan Generation: Page 5');
	});
	// Bind save functionality to Next click
	$("#safetyPlanStep5 div[data-role='footer'] a[data-method='next']").on('click',function(){
		var msg = $.trim($("#safetyPlanStep5Message").val());
		pspa.plan.msg = msg;
	});
});