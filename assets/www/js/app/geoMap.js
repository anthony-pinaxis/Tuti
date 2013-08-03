$(function(){
	// Safety Plan Generation: Page 1
	$("#geoMapPage").on("pageshow",function(event){
		if(!$("#geoMap").hasClass('initialized')){
			// Load Map
			startGeoMap();
		}
		
	});
	
	var startGeoMap = function(){
		navigator.geolocation.getCurrentPosition(loadMap, function(e){
			$.mobile.hidePageLoadingMsg();
	        console.log('Can\'t retrieve position.\nError: ' + e);
		});
	};
	
	var loadMap = function(position){
		var location = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

		// Set height for container
		setMapHeight();
		$('#geoMap').gmap({'center': position.coords.latitude+","+position.coords.longitude, 'zoom': 12, 'disableDefaultUI':true, 'callback': function() {
			var self = this;
			self.clear('markers');
			self.set('bounds', null);
			self.placesSearch({ 'location': location, 'radius': '500',query:"suicide center",types:['hospital','doctor','church','health'] }, function(results, status) {
				if ( status === 'OK' ) {
					$.each(results, function(i, item) {
						self.addMarker({ 'id': item.id, 'position': item.geometry.location, 'bounds':true }).click(function() {
							self.openInfoWindow({'content': '<h4>'+item.name+'</h4><p>'+item.formatted_address+'</p>'}, this);
						});
					});
				}
			});
			$('#geoMap').addClass('initialized');
		}});
	};
	
	var setMapHeight = function(){
		var height = $('#geoMapPage div[data-role="content"]').height();
		$('#geoMap').height(height);
	};
});