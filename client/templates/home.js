Meteor.startup(function() {
  Session.set("languageSelected", false);
  Session.set("SELECTEDLOO", "RajivChowk_Metro_Gate_1");
  Session.set("LANGUAGENAME", "english");
});
Template.home.helpers({
  languageSelected: function(){
    return Session.get("languageSelected");
  },
  classforPopUp: function(){
    if (Session.get("languageSelected")) {
      return "hide";
    } else {
      return "popupWrapper"
    }
  }
});

Template.home.events({
  'click input': function(event, template){
    console.log(event);
    Session.set("languageSelected", true);
    Session.set("LANGUAGENAME", event.target.value);
    var text = [{
        "id": "welcomeNote",
        "english": "Moving towards a Cleaner India",
        "hindi": "एक स्वच्छ भारत की ओर"
        },{
        "id": "adminMsg",
        "english": "Near By Toilets",
        "hindi": "पास के शौचालय"
        },{
        "id": "adminSubtitle",
        "english": "See what is the condition of near by toilets",
        "hindi": " रखरखाव हेतु अनुरोध : "
        },{
        "id": "adminButton",
        "english": "Log in to Admin View",
        "hindi": "एडमिन लॉगिन"
        },{
        "id": "mgrSubtitle",
        "english": "Near By Toilets",
        "hindi": "पास के शौचालय"
        },{
        "id": "mgrMsg",
        "english": "See what is the condition toilets assigned to you",
        "hindi": " रखरखाव हेतु अनुरोध : "
        },{
        "id": "mgrButton",
        "english": "Log in to Admin View",
        "hindi": "मैनेजर लॉगिन"
        }];

    var language = Session.get("LANGUAGENAME");

    _.map(text,function(obj){
        var id = obj.id;
        var text = obj[language];
        _.map(document.querySelectorAll("#" + id),function(elem){
          elem.innerText = text;
        });
    });
  }
});
