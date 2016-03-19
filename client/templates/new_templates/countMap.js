if (Meteor.isClient) {
  Template.countMap.onRendered(function () {
    Mapbox.debug = true;
    Mapbox.load({
      plugins: ['markercluster', 'heat']
    });

    this.autorun(function () {
      if (Mapbox.loaded()) {

        Loos.find().observe({
          added: function (document) {

            L.mapbox.accessToken = 'pk.eyJ1IjoicGF1bG9ib3JnZXMiLCJhIjoicFQ1Sll5ZyJ9.alPGD574u3NOBi2iiIh--g';

            // var map = L.mapbox.map('map', 'mapbox.streets',{zoomControl:false}).setView([Session.get('LAT'),Session.get('LON')], 14);
            var map = L.mapbox.map('map', 'mapbox.streets',{zoomControl:false}).setView([28.6149939,77.1978630], 14);
            new L.Control.Zoom({ position: 'topright' }).addTo(map);

            var markers = new L.MarkerClusterGroup();
            
            var addressPoints = Loos.find().fetch();

            // var currPosMarker = L.marker(new L.LatLng(Session.get('LAT'),Session.get('LON')), {
            //     icon: L.mapbox.marker.icon({'marker-symbol': "marker", 'marker-color': '3bb2d0'})
            // });
            // markers.addLayer(currPosMarker);

            for (var i = 0; i < addressPoints.length; i++) {
                var a = addressPoints[i];

                var marker = L.marker(new L.LatLng(a.latitude, a.longitude), {
                    icon: L.mapbox.marker.icon({'marker-symbol': markerIcon(a), 'marker-color': '3bb2d0'})
                });

                marker.on('mouseover', function(e) {
                    var index = e.target.__parent._markers.indexOf(e.target),
                        obj = addressPoints[index];

                  var temp = 
                    "<span class='item-activity'><span class='attribution'>"
                    +"<span class='avatar'>"
                    +"<img src="+obj.userImage+" class='image-avatar'>"
                    +"</span>"
                    +"<span class='meta'>"
                    +"<span class='recipe'>"+obj.tID+" managed by "+obj.managerName
                    +"</span></span></span></span>";

                    // var temp2 =   "<div class='rating_wrapper'><div class='rating'><input type='radio' id='star5' name='rating' value='5' /><label for='star5' title='Rocks!'>5 stars</label><input type='radio' id='star4' name='rating' value='4' checked/><label for='star4' title='Pretty good'>4 stars</label><input type='radio' id='star3' name='rating' value='3' /><label for='star3' title='Meh'>3 stars</label><input type='radio' id='star2' name='rating' value='2' /><label for='star2' title='Kinda bad'>2 stars</label><input type='radio' id='star1' name='rating' value='1' /><label for='star1' title='Sucks big time'>1 star</label></div></div>";
                    // temp = temp +temp2;

                    var offset = $(e.originalEvent.target).offset();
                    var posY = offset.top - $(window).scrollTop() -$('#marker-tooltip').height() + 30 + 'px';
                    var posX = offset.left - $(window).scrollLeft()-($('#marker-tooltip').width()) -220+ 'px'; 

                    $('#marker-tooltip').html(temp).css({
                        'left': posX,
                        'top': posY,
                        'pointer-events' : 'none'
                    }).show();
                });

                marker.on('mouseout', function(e) {
                    $('#marker-tooltip').hide();
                });

                marker.on('click', function(e) {
                    var index = e.target.__parent._markers.indexOf(e.target),
                        obj = addressPoints[index];
                    
                    Session.set("mapPage", false);
                    Session.set("SELECTEDLOO", obj.tID);

                    $('#marker-tooltip').hide();
                    // Router.go("pie");
                });
                // var title = "Clean";
                // marker.bindPopup(title);
                markers.addLayer(marker);
            }
            map.addLayer(markers);
          },
          changed: function (newDocument, oldDocument) {},
          removed: function (oldDocument) {}
        });
        
      }

      function markerIcon(obj){
        if (obj.rating ==="1") {
            return "polling-place";
        } else if (false) {
            return "cross";
        }
            return "toilets";
      }
    });
  });

  Template.countMap.helpers({
    html: '<div id="map" class="mapbox"></div>',
    js:   'Mapbox.load();\nTracker.autorun(function () {\n' +
          '\tif (Mapbox.loaded()) {\n' +
          '\t\tL.mapbox.accessToken = MY_ACCESS_TOKEN;\n' +
          '\t\tvar map = L.mapbox.map("map", MY_MAP_ID);\n' +
          '\t}\n' +
          '});'
  });
}