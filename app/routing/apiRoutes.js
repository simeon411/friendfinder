// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var bodyParser = require("body-parser");

var friendsData = require("../data/friends.js");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    var newFriend = req.body;
    var scores = req.body['scores[]'];
    var matchesArray = []

    function add(a, b) {
      return a + b;
    }

    function indexOfSmallest(a) {
      var lowest = 0;
      for (var i = 1; i < a.length; i++) {
        if (a[i] < a[lowest]) lowest = i;
      }
      return lowest;
    }

    for (var x = 0; x < friendsData.length; x++){
      var matches = [];
      for (var y = 0; y < scores.length; y++){
        matches.push(Math.abs(scores[y] - friendsData[x].scores[y]));
      }
      var sum = matches.reduce(add,0);
      matchesArray.push(sum);
    }
  

    res.json(friendsData[indexOfSmallest(matchesArray)]);

    friendsData.push(newFriend);

    
  });

};
