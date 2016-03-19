Meteor.startup(function() {

});

Template.addRequestSimulator.helpers({
  washRooms : function(){
  	var allWashrooms = [];
  	_.map(Loos.find().fetch(),function(value){
  		_.map(value.subWashrooms,function(v){
  			allWashrooms.push({name: v.id});
  		});
  	});
    return allWashrooms;
  }
});

Template.addRequestSimulator.events({
  'submit': function(event, template) {

  	event.preventDefault();

  	var self = this,
  		selectedCabin = $(event.target).find('[name=item] option:selected').val(),
  		type = $(event.target).find('[name=type]:checked').attr('value');

  	console.log("Type", type);
  	console.log("Selected", selectedCabin);
  	
  	 Meteor.call('createRequest', {
  	   subWashroomId: selectedCabin,
  	   type:type,
  	   status:"Open"
  	 }, function(error, result) {
  	   if (error) {
  	     alert(error.reason);
  	   } else {
  	    
  	    Template.appBody.addNotification({
  	      action: 'View',
  	      title: 'Your photo was shared.',
  	      callback: function() {
  	         Session.set(IMAGE_KEY, null);
  	         Router.go('feed');
  	        // Template.recipe.setTab('feed');
  	      }
  	    });
  	    Session.set("ADDRESS_KEY", true);
  	    Overlay.close();
  	    }
  	 });
  },
  'click #addingPerson': function(event, template){
    console.log(event, template);
    var selectedParentLoo = _.filter(Loos.find().fetch(),function(loo){
      return loo.tID === $('[name=washRoomsAddPerson] option:selected').val().split(':')[0].trim();
    });

    var subWArray = selectedParentLoo[0].subWashrooms;

    var selectedSub = _.filter(subWArray,function(loo){
      return loo.id === $('[name=washRoomsAddPerson] option:selected').val();
    });
    selectedSub[0].personVisitedThisMonth = selectedSub[0].personVisitedThisMonth + 1;

    console.log("after",subWArray);
    Meteor.call('updateLoo',selectedParentLoo[0]._id, subWArray, function(error, result) {
      if (error) {
        alert(error.reason);
      } else {
        console.log("updated",result);
       }
    });
  }
});
