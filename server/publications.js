Meteor.publish('loos', function() {
  return Loos.find();
});

Meteor.publish('requests', function() {
  return Requests.find();
});