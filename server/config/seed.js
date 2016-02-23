/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';

Thing.find({}).removeAsync()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

User.find({}).removeAsync()
  .then(() => {
    User.create({
		"firstName": "Christian",
		"lastName": "Meghan",
		"dob": "2015-04-30T09:03:53-07:00",
		"email": "Integer.urna@inlobortistellus.ca",
		"username": "IsaacKelley",
		"password": "TNG01JHV5AC",
		"contactNo": "(01170) 03723"
	},
	{
		"firstName": "Lionel",
		"lastName": "Jordan",
		"dob": "2016-05-21T20:59:41-07:00",
		"email": "nunc.sed@nibh.co.uk",
		"username": "AvramChristian",
		"password": "YFY39IPH2FA",
		"contactNo": "(0110) 678 4471"
	},
	{
		"firstName": "Tate",
		"lastName": "Ruth",
		"dob": "2015-11-28T12:36:48-08:00",
		"email": "sit.amet@Sedeu.org",
		"username": "JoshuaMccarthy",
		"password": "NIL53DZK8HV",
		"contactNo": "(027) 6823 1528"
	},
	{
		"firstName": "Garrett",
		"lastName": "Sharon",
		"dob": "2016-02-01T09:39:30-08:00",
		"email": "risus.at.fringilla@luctus.ca",
		"username": "MaconAyers",
		"password": "BOA08TVS4FE",
		"contactNo": "(019244) 09192"
	},
	{
		"firstName": "Hop",
		"lastName": "Alyssa",
		"dob": "2016-05-24T00:43:01-07:00",
		"email": "cursus@cubilia.edu",
		"username": "VanceChurch",
		"password": "KBG41HJA2FR",
		"contactNo": "07980 453852"
	},
	{
		"firstName": "Garth",
		"lastName": "Chastity",
		"dob": "2015-06-12T02:02:01-07:00",
		"email": "pede.ac.urna@ProinmiAliquam.org",
		"username": "PalmerSlater",
		"password": "JXN59AJM2WH",
		"contactNo": "0845 46 41"
	},
	{
		"firstName": "Aristotle",
		"lastName": "Kirby",
		"dob": "2015-03-01T15:14:05-08:00",
		"email": "vitae@non.ca",
		"username": "LeonardEnglish",
		"password": "ZAB57MVZ3NM",
		"contactNo": "(01977) 256073"
	},
	{
		"firstName": "Zephania",
		"lastName": "Faith",
		"dob": "2016-10-16T08:43:51-07:00",
		"email": "iaculis.aliquet.diam@nequevenenatis.net",
		"username": "GriffithWiley",
		"password": "ARA82IJV5UD",
		"contactNo": "0800 1111"
	});
  });
