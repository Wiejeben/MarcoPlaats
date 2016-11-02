module.exports = {
	data() {
        return {	
            currentLocation: { 
                lat: null,
                lon: null,
                address: [],
            },
            countries: [
            	{ name: 'Nederland', selected: false },
            	{ name: 'België', selected: false }, 
            	{ name: 'Duitsland', selected: false }
            ],
        }
    },
    methods: {
        getCurrentAdress(){
            var self = this;
            if ('geolocation' in navigator) {
                var geolocation = navigator.geolocation
                geolocation.getCurrentPosition(function(position) {
                    self.currentLocation.lat = position.coords.latitude
                    self.currentLocation.lon = position.coords.longitude

                    var latlng      = new google.maps.LatLng(self.currentLocation.lat, self.currentLocation.lon);
                    var geocoder    = new google.maps.Geocoder();

                    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {  
                                self.currentLocation.address = results[0].formatted_address.split(', ');
                                self.countries.forEach(function(value) {
                                	value.selected = (self.currentLocation.address[2] == value.name);
                                });
                            } else {
                				console.log("No location found!");
                            }
                        } else {
                			console.log("Couldn't reach geo server!");
                        }
                    });
                })
            } else {
                console.log("Geolocation is disabled!");
            }
            return self.currentLocation;
        }
    }
}

