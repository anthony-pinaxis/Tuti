$(function(){
	// Safety Plan Generation: Page 1
	$("#safetyPlanStep1").on("pageshow",function(event){
		console.log('Shown: Safety Plan Generation: Page 1');
		$("#safetyPlanStep1Indicators").listview('refresh');
	});
	// Bind step 1 buttons
	$('#safetyPlanStep1 form a[data-method="add"]').click(function(event){
		event.preventDefault();
		event.stopPropagation();
		var indicator = $.trim($("#safetyPlanStep1AddIndicator").val());
		if(indicator){
			indicator = "<a href='#'>"+indicator+"</a>";
			$("#safetyPlanStep1Indicators").append("<li>"+indicator+"<a href='#' data-function='remove'></a></li>").listview('refresh');
		}
		$("#safetyPlanStep1AddIndicator").val('');
		
	});
	$("#safetyPlanStep1Indicators").on('click','li a[data-function="remove"]',function(){
		$(this).parent().remove();
		$("#safetyPlanStep1Indicators").listview('refresh');
	});
	// Bind save functionality to Next click
	$("#safetyPlanStep1 div[data-role='footer'] a[data-method='next']").on('click',function(){
		$("#safetyPlanStep1Indicators").children('li').each(function(){
			pspa.plan.indicators = [];
			var $li = $(this);
			var text = $li.find('div.ui-btn-text > a.ui-link-inherit').html();
			pspa.plan.indicators.push(text);
		});
	});
});