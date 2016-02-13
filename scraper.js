var request = require('request'),
  HackEdges = require('./models/Edges.js'),
  JobEdges = require('./models/jobEdges.js'),
  mongoose = require('mongoose'),
  cheerio = require('cheerio');
/* Begin Block for Disease outbreak location points */
mongoose.connect('mongodb://localhost:27017');

var search_filters = {
  "locations": "",
  "diseases": "",
  "sources": "",
  "species": "",
  "category": ["1", "2", "29"],
  "vaccines": "",
  "time_interval": "1 week",
  "zoom_lat": "42.4033472",
  "zoom_lon": "-71.1138393",
  "zoom_level": 7,
  "displayapi": null,
  "heatscore": 1,
  "partner": "hm",
  "default_country": ["106"]
}

// Scrape for the outbreak log generated
request({
  method: 'POST',
  url: "http://www.healthmap.org/getAlerts.php",
  dataType: 'json',
  data: search_filters
}, function(err, resp, jsonData) {

  var JsonData = JSON.parse(jsonData);
  var list = [];
  for (var l = 0; l < JsonData.markers.length; ++l) {
    var k = JsonData.markers[l].label.split(',')
    list = list.concat(k.map(function(item) {
      return {
        lat: JsonData.markers[l].lat,
        lon: JsonData.markers[l].lon,
        label: item.trim()
      }
    }));
  }
  /* HackEdges.remove({}, function() {
      HackEdges.collection.insert(list, function(err, num) {
          if (err)
              console.log(err);
          process.exit();
      });
  })*/

});

/* End Block for Disease Log DB Population */

/* Begin Block for Corporate log DB Population */
var pushMeSenpai = []

function finalDone() {
  //  console.log(pushMeSenpai)
  JobEdges.remove({}, function() {
    JobEdges.collection.insert(pushMeSenpai, function(err, num) {
      if (err)
        console.log(err);
      JobEdges.collection.find({}, function(err, number) {
        console.log(number.toArray());
        process.exit();
      })
    });
  });
}

function fellowshipPostions(err, resp, html) {
  var parsedHTML = cheerio.load(html);
  var links = parsedHTML('a.title_ct');
  var completed = 0;
  links.map(function(index, link) {
    var hrefEntry = link.attribs.href
    request(hrefEntry, function(err, resp, html) {
      fellowshipPositionParse(err, resp, html);
      completed++;
      if (completed == links.length) {
        finalDone();
      }
    });
  });
}

function fellowshipPositionParse(err, resp, html) {
  var parseHTML = cheerio.load(html);
  var dict = makeMeAMap();
  parseHTML('h1.post-page-head').map(function(index, info) {
    dict.JobTitle = info.children[0].data
  });
  parseHTML('div.display1').map(function(index, info) {
    switch (index) {
      case 0:
        dict.Organization = info.children[0].next.data
        break;
      case 1:
        dict.Location = info.children[0].next.data
        break;
      case 2:
        dict.EligibleCitizenship = info.children[0].next.data
        break;
      case 3:
        dict.JobFunction = info.children[0].next.data
        break;
      case 4:
        dict.IssueArea = info.children[0].next.data
        break;
    }
  });
  parseHTML('div.display2').map(function(index, info) {
    //    console.log(info.children[0].next.children[0])
    // More orless for the broken text
    switch (index + 5) {
      case 5:
        dict.About = info.children[0].next.children[0].data;
        break;
      case 7:
      case 8:
        //                dict.PositionOverview =
        break;
    }
  });
  //console.log(dict)
  pushMeSenpai.push(dict)
  console.log(pushMeSenpai);
}

function makeMeAMap() {
  var newDict = {
    JobTitle: "", // Will be populated at the point that needs it in a bit
    Organization: "",
    Location: "",
    EligibleCitizenship: "",
    JobFunction: "",
    IssueArea: "",
    About: ""
      /*  PositionOverview: "", // Don't need this as of yet...
        Responsibilities: "",
        RequiredSkillsExperience: "",
        PrefferedSkillsExperience: "",
        FellowshipLogistics: ""
    */
  };
  return newDict;
}
var fellowshipHead = "http://ghcorps.org/fellows/apply-to-be-a-fellow/fellowship-position/?citizen%5B%5D=15&citizen%5B%5D=17&citizen%5B%5D=18&citizen%5B%5D=13&citizen%5B%5D=19&citizen%5B%5D=16&submit=Submit&submit_val=1"
request(fellowshipHead, fellowshipPostions)
  /* End Block for Corporate DB population */
  //process.exit()
