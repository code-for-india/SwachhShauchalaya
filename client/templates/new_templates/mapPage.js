Meteor.startup(function() {
  Session.set("mapPage", true);
});

Template.mapPage.helpers({
  mapPage : function(){
    return Session.get('mapPage');
  },
});

Template.mapPage.events({
  
});
