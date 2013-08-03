$(function(){
	// Safety Plan Generation: Page 3
	$("#safetyPlanStep3").on("pageshow",function(event){
		console.log('Shown: Safety Plan Generation: Page 3');
		$("#safetyPlanStep3SelectedContacts").listview('refresh');
	});
	// Bind step3 Contact View
	$("#safetyPlanStep3 .findContacts").on('click',function(e){
		e.preventDefault();
		window.plugins.contactViewPlugin.show(function(contact){
			// email,phone,name
			$("#safetyPlanStep3SelectedContacts").append("<li><a href='#' data-contactEmail='"+contact.email+"' data-contactPhone='"+contact.phone+"'>"+contact.name+"</a><a href='#' data-function='remove'></a></li>").listview('refresh');
			
		}, function(){
			console.log("ContactViewPlugin failed: Step 3");
		});
	});
	$("#safetyPlanStep3SelectedContacts").on('click','li a[data-function="remove"]',function(){
		$(this).parent().remove();
		$("#safetyPlanStep3SelectedContacts").listview('refresh');
	});
	// Bind save functionality to Next click
	$("#safetyPlanStep3 div[data-role='footer'] a[data-method='next']").on('click',function(){
		pspa.plan.generalContacts = [];
		$("#safetyPlanStep3SelectedContacts").children('li').each(function(){
			var $li = $(this);
			var $a = $li.find('div.ui-btn-text > a.ui-link-inherit');
			var name = $a.html();
			var email = $a.attr('data-contactEmail');
			var phone = $a.attr('data-contactPhone');
			var contact = {
				email:email,
				name:name,
				phone:phone
			};
			pspa.plan.generalContacts.push(contact);
		});
	});
});