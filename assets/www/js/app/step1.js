$(function(){
	// Safety Plan Generation: Page 1
	$("body").on("pageshow","#safetyPlanStep1",function(event){
		console.log('Shown: Safety Plan Generation: Page 1');
		if(pspa.plan.indicators && $("#safetyPlanStep1Indicators li").length === 0){
			$.each(pspa.plan.indicators,function(i,indicator){
				indicator = "<a href='#'>"+indicator+"</a>";
				$("#safetyPlanStep1Indicators").append("<li>"+indicator+"<a href='#' data-function='remove'></a></li>");
			});
		}
		$("#safetyPlanStep1Indicators").listview('refresh');
	});
	// Bind step 1 buttons
	$('body').on('click','#safetyPlanStep1 form a[data-method="add"]',function(event){
		event.preventDefault();
		event.stopPropagation();
		var indicator = $.trim($("#safetyPlanStep1AddIndicator").val());
		if(indicator){
			indicator = "<a href='#'>"+indicator+"</a>";
			$("#safetyPlanStep1Indicators").append("<li>"+indicator+"<a href='#' data-function='remove'></a></li>").listview('refresh');
		}
		$("#safetyPlanStep1AddIndicator").val('');
		
	});
	$("body").on('click','#safetyPlanStep1Indicators li a[data-function="remove"]',function(){
		$(this).parent().remove();
		$("#safetyPlanStep1Indicators").listview('refresh');
	});
	// Bind save functionality to Next click
	$("body").on('click',"#safetyPlanStep1 div[data-role='footer'] a[data-method='next']",function(){
		pspa.plan.indicators = [];
		$("#safetyPlanStep1Indicators > li").each(function(){
			var $li = $(this);
			var text = $li.find('div.ui-btn-text > a.ui-link-inherit').html();
			pspa.plan.indicators.push(text);
		});
	});
});