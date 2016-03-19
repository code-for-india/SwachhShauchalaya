Loos = new Mongo.Collection('loos');

Loos.allow({
  insert: function(userId) {
    return true;
  },
  update: function(userId) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  }
});

Meteor.methods({
  updateLoo: function(requestId, subWArray) {
    // Loos.update({_id : requestId},{$set:{subWashrooms : subWArray}});
    return Loos.update({_id : requestId},{$set:{subWashrooms : subWArray}});
  }
});


if (Meteor.isServer && Loos.find().count() === 0) {
  Meteor.startup(function() {
    var looSeeds = [
    { 
      "tID":"RajivChowk_Metro_Gate_1",
      "managerName": "Mr. Saurabh Tyagi",
      "contactNumber": "7504031445",
      "userImage": "https://pbs.twimg.com/profile_images/705368018411458560/g26K1aDB_normal.jpg",
      "latitude": "28.6181584",
      "longitude": "77.2049011",
      "subWashrooms" : [
          {
            "id":"RajivChowk_Metro_Gate_1 : A",
            "personVisitedThisMonth":0,
            "lastCleaned": new Date()
          },
          {
            "id":"RajivChowk_Metro_Gate_1 : B",
            "personVisitedThisMonth":0,
            "lastCleaned": new Date()
          }
        ]
    },
    { 
      "tID":"RajivChowk_Metro_Gate_2",
      "managerName": "Mr. Ramesh Sharma",
      "contactNumber": "7809484915",
      "userImage": "https://avatars3.githubusercontent.com/u/204768?v=2&s=400",
      "latitude": "28.6082878",
      "longitude": "77.2010387",
      "subWashrooms" : [
          {
            "id":"RajivChowk_Metro_Gate_2 : A",
            "personVisitedThisMonth":0,
            "lastCleaned": new Date()
          },
          {
            "id":"RajivChowk_Metro_Gate_2 : B",
            "personVisitedThisMonth":0,
            "lastCleaned": new Date()
          }

        ]
    }];
    _.each(looSeeds, function(obj){

      Loos.insert(obj);

    });

  });
}