Meteor.startup(function() {
  Session.set("mapPage", true);
  Session.set('FROMSIMULATOR',false);
});

Template.washroomPage.helpers({
  requests : function(){
    return Requests.find().fetch();
  },
  selectedLoo : function(){
  	var selectedLoo = _.filter(Loos.find().fetch(),function(value){ return value.tID === Session.get('SELECTEDLOO')})[0];
  	var dataArray = [];
  	selectedLoo.subWashrooms.map(function(sub){
  		var obj={};
  		var requestsForSub = _.filter(Requests.find().fetch(),function(v){ 
  			return v.subWashroomId === sub.id && v.status === "Open";
  		});
  		var cleanRequests = _.filter(requestsForSub,function(v){ 
  			return v.type === "Clean";
  		});
  		dataArray.push({
  			name:sub.id.split(":")[1].trim(),
  			openRequests:requestsForSub.length,
  			cleanRequests:cleanRequests.length,
  			maintenanceRequests:requestsForSub.length-cleanRequests.length,
  		});
  	});
  	return dataArray;
  },
  mainWRName : function(){
  	return Session.get('SELECTEDLOO');
  },
  totalVisits: function(){
    var total = 0;
    _.filter(Loos.find().fetch(), function(obj) {
            return obj.tID === Session.get('SELECTEDLOO')
    })[0].subWashrooms.map(function(value) {
      total= total+value.personVisitedThisMonth
    });
    return total;
  },
  totalRequests: function(){
    return _.filter(Requests.find().fetch(), function(obj) {
            return obj.subWashroomId.split(' : ')[0] === Session.get('SELECTEDLOO')
    }).length;
  },
  Rating: function(){
    var total = 0;
    _.filter(Loos.find().fetch(), function(obj) {
            return obj.tID === Session.get('SELECTEDLOO')
    })[0].subWashrooms.map(function(value) {
      total= total+value.personVisitedThisMonth
    });
    if (total === 0) {
      return 0;
    } else {
      return 1-(_.filter(Requests.find().fetch(), function(obj) {
              return obj.subWashroomId.split(' : ')[0] === Session.get('SELECTEDLOO')
      }).length)/total;
    }
  },
});

Template.washroomPage.events({
  'click a':function(e,target){
    console.log(e,target);
  }
});


if (Meteor.isClient) {
  Template.washroomPage.onRendered(function () {

    var initializing = true;
      Requests.find().observeChanges({
        added: function(id, doc) {
          if (!initializing) {
            Template.appBody.addNotification({
              action: 'Close',
              title: 'Clean Request Raised',
              callback: function() {
                 Router.go('feed');
              }
            });
          }
        }
      });
      initializing = false;

    var text = [{
        "id": "totalVisits",
        "english": " No. of people visited during this Month : ",
        "hindi": " इस महीने आने वालों की संख्या : "
        },{
        "id": "totalRequests",
        "english": "No. of complaints raised during this Month : ",
        "hindi": " इस महीने आने वाली शिकायतों की संख्या : "
        },{
        "id": "Rating",
        "english": "Toilet Rating : ",
        "hindi": " शौचालय रेटिंग : "
        },{
        "id": "openRequests", 
        "english": "Open Complaints : ",
        "hindi": "  खुली शिकायत: "
        },{
        "id": "cleanRequests",
        "english": "Clean Complaints : ",
        "hindi": " सफाई हेतु शिकायत  : "
        },{
        "id": "maintenanceRequests",
        "english": "Maintenance Complaints : ",
        "hindi": " रखरखाव हेतु शिकायत : "
        }];

    var language = Session.get("LANGUAGENAME");

    _.map(text,function(obj){
        var id = obj.id;
        var text = obj[language];
        _.map(document.querySelectorAll("#" + id),function(elem){
          elem.innerText = text;
        });
    });
  });
}