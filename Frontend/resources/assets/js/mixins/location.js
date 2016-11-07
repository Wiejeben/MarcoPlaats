module.exports = {
    mounted(){
        $.getScript("http://maps.googleapis.com/maps/api/js?sensor=false&key="+this.apiKey);
    },
	data() {
        return {
            apiKey: 'AIzaSyA16P_aWqSP37FhtIhFtvf0zN1jMWhbbkQ',	
            currentLocation: { 
                lat: null,
                lon: null,
                address: [],
            },
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
                                console.log(results[0]);

                                splittedAdress = self.currentLocation.address[1].split(' ');

                                if(splittedAdress.length == 3){
                                    self.currentLocation.address[1] = splittedAdress[0] + splittedAdress[1]
                                    self.currentLocation.address[3] = splittedAdress[2]
                                }
                                console.log(self.currentLocation.address);
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

