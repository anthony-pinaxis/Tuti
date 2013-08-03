$(function(){
	// Safety Plan Generation: Page 1
	$("#activatePlan1").on("pageshow",function(event){
		// Show coping activities
		if(typeof pspa.plan.activities === 'object'){
			$("#activatePlan1 .slideshow").html('');
			$.each(pspa.plan.activities,function(i,activity){
				$("#activatePlan1 .slideshow").append("<div>"+activity+"</div>");
			});
			console.log($("#activatePlan1 .slideshow").html());
		}
		
		// Show 3 random contacts from call list
		if(typeof pspa.plan.generalContacts === 'object'){
			$("#activatePlan1 .callList").html('');
			$.each(pspa.plan.generalContacts,function(i,contact){
				var html = '<a href="tel:'+contact.phone+'" data-role="button" data-icon="star" data-iconpos="right" data-theme="e">Call '+contact.name+'</a>';
				$("#activatePlan1 .callList").append(html).trigger('create');
			});
		}
	});
	
	// Bindings
	$("#activatePlan1 .slideshowContainer").swipeleft(pspa.nextActivity);
	$("#activatePlan1 .slideshowContainer > .rightArrow").on('click',pspa.nextActivity);
	$("#activatePlan1 .slideshowContainer").swiperight(pspa.previousActivity);
	$("#activatePlan1 .slideshowContainer > .leftArrow").on('click',pspa.previousActivity);
});