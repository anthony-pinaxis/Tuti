$(function(){
	// Safety Plan Generation: Page 6
	$("#safetyPlanStep6").on("pageshow",function(event){
		console.log('Shown: Safety Plan Generation: Page 6');
		$("#safetyPlanStep6Dangers").listview('refresh');
	});
	// Bind step 6 buttons
	$('#safetyPlanStep6 form a[data-method="add"]').click(function(event){
		event.preventDefault();
		event.stopPropagation();
		var activity = $.trim($("#safetyPlanStep6AddDanger").val());
		if(activity){
			activity = "<a href='#'>"+activity+"</a>";
			$("#safetyPlanStep6Dangers").append("<li>"+activity+"<a href='#' data-function='remove'></a></li>").listview('refresh');
		}
		$("#safetyPlanStep6AddDanger").val('');
		
	});
	$("#safetyPlanStep6Dangers").on('click','li a[data-function="remove"]',function(){
		$(this).parent().remove();
		$("#safetyPlanStep6Dangers").listview('refresh');
	});
	// Bind save functionality to Next click
	$("#safetyPlanStep6 div[data-role='footer'] a[data-method='next']").on('click',function(){
		pspa.plan.dangers = [];
		$("#safetyPlanStep6Dangers").children('li').each(function(){
			var $li = $(this);
			var text = $li.find('div.ui-btn-text > a.ui-link-inherit').html();
			pspa.plan.dangers.push(text);
		});
	});
});