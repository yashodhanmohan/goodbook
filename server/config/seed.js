/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Organization from '../api/organization/organization.model';

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

Organization.find({}).removeAsync()
    .then(() => {
        Organization.create({
    		"name": "Mauris Nulla Integer Institute",
    		"email": "nisi.a.odio@augueac.co.uk",
    		"username": "Acton",
    		"password": "YGX20KUT9HP",
    		"address": "4564 Egestas. Rd.",
    		"baName": "Vaughan",
    		"baNumber": "548 12537 33891 925",
    		"bankName": "Dictum Placerat Ltd",
    		"bankBranch": "Saint-Pierre",
    		"aboutUs": "arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices",
    		"contactNo": "(0141) 651 9428"
    	},
    	{
    		"name": "Est Mollis Associates",
    		"email": "orci.luctus.et@Uttincidunt.net",
    		"username": "Honorato",
    		"password": "IQE70MHX9CM",
    		"address": "Ap #807-2305 Magna Ave",
    		"baName": "Brenden",
    		"baNumber": "5408 4204 4241 4212",
    		"bankName": "Mi Pede Nonummy Inc.",
    		"bankBranch": "Lusevera",
    		"aboutUs": "tempor bibendum. Donec felis orci, adipiscing non, luctus sit amet, faucibus ut, nulla. Cras eu tellus eu augue porttitor",
    		"contactNo": "0800 1111"
    	},
    	{
    		"name": "Vulputate Ltd",
    		"email": "convallis@tristiqueneque.co.uk",
    		"username": "Dolan",
    		"password": "YFX01OYG9ZO",
    		"address": "P.O. Box 479, 403 Ante Ave",
    		"baName": "Micah",
    		"baNumber": "5581 0189 3913 2120",
    		"bankName": "A Corp.",
    		"bankBranch": "San Jose",
    		"aboutUs": "scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia. Sed congue, elit sed consequat auctor,",
    		"contactNo": "056 0165 0540"
    	},
    	{
    		"name": "Consectetuer Adipiscing Associates",
    		"email": "Nullam.nisl@pellentesquetellussem.co.uk",
    		"username": "Lucas",
    		"password": "VLY38KIE2KW",
    		"address": "252 Donec Ave",
    		"baName": "Kyle",
    		"baNumber": "556323 4960557554",
    		"bankName": "Amet Consectetuer Adipiscing Corporation",
    		"bankBranch": "Laguna Blanca",
    		"aboutUs": "velit justo nec ante. Maecenas mi felis, adipiscing fringilla, porttitor vulputate, posuere vulputate,",
    		"contactNo": "0800 073740"
    	},
    	{
    		"name": "Donec Nibh Inc.",
    		"email": "leo@liberoMorbiaccumsan.edu",
    		"username": "Jeremy",
    		"password": "YFA59FMY8DB",
    		"address": "Ap #558-8889 Tristique Avenue",
    		"baName": "Vaughan",
    		"baNumber": "521845 9360052471",
    		"bankName": "Convallis Convallis Dolor LLC",
    		"bankBranch": "Gjoa Haven",
    		"aboutUs": "nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet",
    		"contactNo": "055 3807 4743"
    	},
    	{
    		"name": "Libero Consulting",
    		"email": "pede@liberoat.net",
    		"username": "Dillon",
    		"password": "TGK45XGL6KV",
    		"address": "Ap #172-4682 Enim Rd.",
    		"baName": "Judah",
    		"baNumber": "525278 0524437317",
    		"bankName": "Neque Ltd",
    		"bankBranch": "Germersheim",
    		"aboutUs": "Cras lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed molestie. Sed id risus quis diam",
    		"contactNo": "07304 377384"
    	},
    	{
    		"name": "Non Incorporated",
    		"email": "iaculis@facilisisloremtristique.co.uk",
    		"username": "Zeus",
    		"password": "FVW70LWH8WG",
    		"address": "1750 Ornare Av.",
    		"baName": "Basil",
    		"baNumber": "528079 390500 0790",
    		"bankName": "Vel Arcu Curabitur Associates",
    		"bankBranch": "Amiens",
    		"aboutUs": "dolor sit amet, consectetuer adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus sem mollis dui, in sodales elit erat",
    		"contactNo": "(016977) 8745"
    	},
    	{
    		"name": "Et Malesuada Fames LLP",
    		"email": "volutpat@Aliquam.org",
    		"username": "Nathaniel",
    		"password": "QIZ59FQQ1NC",
    		"address": "Ap #944-957 Semper Rd.",
    		"baName": "John",
    		"baNumber": "5413 8035 8449 0350",
    		"bankName": "A Facilisis Associates",
    		"bankBranch": "Sefro",
    		"aboutUs": "amet orci. Ut sagittis lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas",
    		"contactNo": "0845 46 40"
    	});
    });
