IDHack 2016
=========
####Expert networking and awareness of global disasters. 
#####Version 1.0


<p align="center">
  <img src="https://raw.githubusercontent.com/Hive-Labs/IDHack2016/master/public/images/github.png"/>
</p>

Features
--------------
- Map of prevalent diseases around the world (live view)
- News feed for the Global Health Corp using public medium 
- List of fellows within organization
- Job posting list from existing Global Health Corp website
- Wikipedia information box on the home page for further information




Tech
--------------

IDHack2016 uses a number of API's/Platforms to work properly:

- [Node.js] - Evented I/O for the backend
- [Express.js] - Framework used to build the REST-based backend
- [jQuery] - Obvious things are obvious 


How Backend Works
--------------
During the course of the (under) 24 hours we have spent programming, we tried to remain as "RESTful" as possible with our API's and write clean code. In order to show the information about the disease itself, we are querying the Wikipedia API and getting a excerpt which contains useful information about the virus or disease that is targeted.




Prerequisites
--------------
* [Node.js] - Tested with version v5.5


Starting the server
--------------
```sh
git clone https://github.com/Hive-Labs/IDHack2016.git
npm install
node scraper.js // Populate the database
node app.js // Run the web server
```

License
--------------
MIT

[C++]:https://github.com/luca-m/emotime
[Soundcloud]:http://soundcloud.com
[jQuery]:http://jquery.com
[Node.js]:http://nodejs.org
[Express.js]:http://expressjs.com
[Meteor.js]:http://meteor.com
