$(function(){
	// Safety Plan Generation: Page 2
	$("#safetyPlanStep2").on("pageshow",function(event){
		console.log('Shown: Safety Plan Generation: Page 2');
		$("#safetyPlanStep2Activities").listview('refresh');
	});
	// Bind step 2 buttons
	$('#safetyPlanStep2 form a[data-method="add"]').click(function(event){
		event.preventDefault();
		event.stopPropagation();
		var activity = $.trim($("#safetyPlanStep2AddActivity").val());
		if(activity){
			activity = "<a href='#'>"+activity+"</a>";
			$("#safetyPlanStep2Activities").append("<li>"+activity+"<a href='#' data-function='remove'></a></li>").listview('refresh');
		}
		$("#safetyPlanStep2AddActivity").val('');
		
	});
	$("#safetyPlanStep2Activities").on('click','li a[data-function="remove"]',function(){
		$(this).parent().remove();
		$("#safetyPlanStep2Activities").listview('refresh');
	});
	// Bind save functionality to Next click
	$("#safetyPlanStep2 div[data-role='footer'] a[data-method='next']").on('click',function(){
		pspa.plan.activities = [];
		$("#safetyPlanStep2Activities").children('li').each(function(){
			var $li = $(this);
			var text = $li.find('div.ui-btn-text > a.ui-link-inherit').html();
			pspa.plan.activities.push(text);
		});
	});
});