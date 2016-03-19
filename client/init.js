Meteor.startup(function() {
  // Potentially prompts the user to enable location services. We do this early
  // on in order to have the most accurate location by the time the user shares
  Geolocation.currentLocation();
  Session.set('LAT',28.6149939);
  Session.set('LON',77.1978630);
  navigator.geolocation.getCurrentPosition(function(loc) {
  	Session.set('LAT',loc.coords.latitude);
  	Session.set('LON',loc.coords.longitude);
  });  
});