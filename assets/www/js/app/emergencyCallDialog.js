$(function(){
	// Safety Plan Generation: Page 1
	$("body").on("pageshow","#emergencyCallDialog",function(event){
		if(typeof pspa.plan.provider !== 'object' || !pspa.plan.provider.phone){
			$("#emergencyCallDialogProviderItem").addClass('ui-disabled').parent().listview('refresh');
			console.log('no provider phone');
		}
		else{
			$("#emergencyCallDialogProviderItem").removeClass('ui-disabled').parent().listview('refresh');
			$("#emergencyCallDialogProviderItem a").attr('href','tel:'+pspa.plan.provider.phone);
			console.log($("#emergencyCallDialogProviderItem a").attr('href'));
		}
	});
});