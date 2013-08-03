$(function(){
	// Safety Plan Generation: Page 7
	$("#safetyPlanStep7").on("pageshow",function(event){
		console.log('Shown: Safety Plan Generation: Page 7');
	});
	$('#safetyPlanStep7 a[data-method="next"]').click(function(){
		pspa.plan.provider.firstName = $.trim($("#providerFirstName").val());
		pspa.plan.provider.lastName = $.trim($("#providerLastName").val());
		pspa.plan.provider.phone = $.trim($("#providerPhoneNumber").val());
		
		// Save plan
		if(!pspa.id){
			var query = "INSERT INTO plan (id,plan) VALUES(1,'"+JSON.stringify(pspa.plan)+"')";
			pspa.id = 1;
		}
		else{
			var query = "UPDATE plan SET plan = '"+JSON.stringify(pspa.plan)+"' WHERE id = "+pspa.id;
		}
		console.log(query);
		pspa.db.transaction(function(tx){
			tx.executeSql(query);
		}, function(err){
			alert("DB Error: "+err);
		}, function(){
			pspa.toggleReturningUser();
			console.log('DB Success!');
		});
	});
});