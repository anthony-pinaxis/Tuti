(function(){
	var pspa = {
		db : false,
		id:false,
		resetPlan:function(){
			pspa.plan = {
				provider:{},
				indicators:[],
				activities:[],
				dangers:[]
			};
			pspa.id = false;
			var query = "DELETE FROM plan";
			pspa.db.transaction(function(tx){
				tx.executeSql(query);
			}, function(err){
				alert("DB Error: "+err);
			}, function(){
				console.log('DB Success!');
			});
			$("#safetyPlanStep1Indicators").html('');
			$("#safetyPlanStep2Activities").html('');
			$("#safetyPlanStep3SelectedContacts").html('');
			$("#safetyPlanStep4SelectedContacts").html('');
			$("#providerFirstName").val('');
			$("#providerLastName").val('');
			$("#providerPhoneNumber").val('');
			$("#safetyPlanStep6Message").val('');
			
			pspa.toggleNewUser();
		},
		loadPlan:function(){
			pspa.db.transaction(function(tx){
				tx.executeSql('SELECT * FROM plan LIMIT 0,1', [], pspa.parsePlan, dbError);
			},dbError);
		},
		parsePlan:function(tx,results){
			for (var i=0; i<results.rows.length; i++){
				pspa.plan = JSON.parse(results.rows.item(i).plan);
				pspa.id = results.rows.item(i).id;
				
				pspa.applyExistingValues();
				pspa.toggleReturningUser();
				return false;
			}
			pspa.toggleNewUser();
		},
		applyExistingValues:function(){
			// Make sure document is ready
			$(function(){
				$("#home .forNewUser").show();
				$("#home .forReturningUser").show();
				// Apply existing values		
				// Step 1
				if(pspa.plan.indicators){
					$.each(pspa.plan.indicators,function(i,indicator){
						indicator = "<a href='#'>"+indicator+"</a>";
						$("#safetyPlanStep1Indicators").append("<li>"+indicator+"<a href='#' data-function='remove'></a></li>");
					});
				}
				// Step 2
				if(pspa.plan.activities){
					$.each(pspa.plan.activities,function(i,activity){
						activity = "<a href='#'>"+activity+"</a>";
						$("#safetyPlanStep2Activities").append("<li>"+activity+"<a href='#' data-function='remove'></a></li>");
					});
				}
				// Step 3
				$.each(pspa.plan.generalContacts,function(i,contact){
					$("#safetyPlanStep3SelectedContacts").append("<li><a href='#' data-contactPhone='"+contact.phone+"' data-contactEmail='"+contact.email+"'>"+contact.name+"</a><a href='#' data-function='remove'></a></li>");
				});
				// Step 4
				$.each(pspa.plan.emergencyContacts,function(i,contact){
					$("#safetyPlanStep4SelectedContacts").append("<li><a href='#' data-contactPhone='"+contact.phone+"' data-contactEmail='"+contact.email+"'>"+contact.name+"</a><a href='#' data-function='remove'></a></li>");
				});
				// Step 5
				var msg = pspa.plan.msg || "";
				$("#safetyPlanStep5Message").val(msg);
				// Step 6
				if(pspa.plan.dangers){
					$.each(pspa.plan.dangers,function(i,danger){
						danger = "<a href='#'>"+danger+"</a>";
						$("#safetyPlanStep6Dangers").append("<li>"+danger+"<a href='#' data-function='remove'></a></li>");
					});
				}
				// Step 7
				
				var firstName = pspa.plan.provider.firstName || "";
				var lastName = pspa.plan.provider.lastName || "";
				var phone = pspa.plan.provider.phone || "";
				$("#providerFirstName").val(firstName);
				$("#providerLastName").val(lastName);
				$("#providerPhoneNumber").val(phone);	
			});
		},
		plan:{
			provider:{},
			indicators:[],
			activities:[],
			dangers:[]
		},
		toggleReturningUser:function(){
			$('#home .forNewUser').hide();
			$('#home .forReturningUser').show();
			
			// Set top margin for button to center it
			var mTop = ($(window).height() - $('#home .forReturningUser button').height()) / 2;
			$('#home .forReturningUser button').css('margin-top',mTop);
		},
		toggleNewUser:function(){
			$('#home .forNewUser').show();
			$('#home .forReturningUser').hide();
		},
		sendSms:function(contacts){
			$.each(contacts,function(i,contact){
				window.plugins.SmsPlugin.send(
					contact.phone,
					pspa.plan.msg, 
				    function () { 
						// Success Callback  
				    },
				    function (e) {
				    	// Fail Callback
				    	console.log('Message Failed:' + e);
				    }
				);
			});
			alert('Your emergency message has been sent. Please visit the nearest crisis center, or call the crisis hotline by clicking on the "Call Help" button.');
		},
		nextActivity : function(e){
			var $this = $(this);
			var $slideshow = $this.siblings('.slideshow');
			if($slideshow.length === 0){
				$slideshow = $this.children('.slideshow');
			}
			var $current = $slideshow.children("div:visible").hide();
			if($current.next().length === 0){
				$current.parent().children('div:first').show();
			}
			else{
				$current.next().show();
			}
		},
		previousActivity : function(e){
			var $this = $(this);
			var $slideshow = $this.siblings('.slideshow');
			if($slideshow.length === 0){
				$slideshow = $this.children('.slideshow');
			}
			var $current = $slideshow.children("div:visible").hide();
			if($current.prev().length === 0){
				$current.parent().children('div:last').show();
			}
			else{
				$current.prev().show();
			}
		}
	},
	dbError = function(err){
		console.log(err.code+": "+err.message);
	};
	
	$(function(){		
		// Check page for initial load
		// Start by creating db if it doesn't exist
		pspa.db = window.openDatabase("pspa", "1.0", "Pinaxis Suicide Prevention App DB", 1000000);
		pspa.db.transaction(function(tx){
			tx.executeSql('CREATE TABLE IF NOT EXISTS plan (id,plan)');
			
			// With DB in place, attempt to load safety plan
			pspa.loadPlan();
			
		}, dbError);
		
		$("body").on('click',"[data-function='SendSMS']",function(e){
			pspa.sendSms(pspa.plan.emergencyContacts);
		});
		
		$(window).resize(pspa.setMapHeight);
		
		// Bind safety plan deletion
		$("[data-method='deleteSafetyPlan']").click(pspa.resetPlan);
	});
	
	window.pspa = pspa;
})();