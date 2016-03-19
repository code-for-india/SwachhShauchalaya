Requests = new Mongo.Collection('requests');

Requests.allow({
  insert: function(userId, doc) {
    return doc.userId === userId;
  },
  update: function(userId, doc) {
    return true;
    // return doc.userId === userId;
  }
});

Requests.openRequests = function(place) {
  return Requests.find(
    {$where: function() {return (this.requestStatus == 'Open')} }
  ); 
}

Meteor.methods({
  createRequest: function(request) {

    check(request, {
      type: String,
      status: String,
      subWashroomId: String
    });
    
    request.reqRaiseTime = new Date;

    // if (! this.isSimulation && loc)
    //   request.place = getLocationPlace(loc);
    
    var id = Requests.insert(request);
    
    // if (! this.isSimulation && tweet)
    //   tweetRequest(request);
    
    return id;
  },
  updateRequest: function(requestId) {
    Requests.update({_id : requestId},{$set:{requestStatus : 'Closed'}});
    return requestId;
  }
});
