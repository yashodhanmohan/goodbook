/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

import User from '../api/user/user.model';
import Organization from '../api/organization/organization.model';
import Event from '../api/event/event.model';
import EventRequest from '../api/eventRequest/eventRequest.model';
import Notification from '../api/notification/notification.model';

function tagData(x) {
    var tempTags = [x.username];
    
    tempTags.push(x.firstName.toLowerCase());
    tempTags.push(x.lastName.toLowerCase());
    tempTags.push(x.email);
    if (x.gender)
        tempTags.push(x.gender.toLowerCase());
    for (var i in x.subscribedNGO) {
        tempTags.push(x.subscribedNGO[i].toLowerCase());
    }
    for (var i in x.interests) {
        tempTags.push(x.interests[i].toLowerCase());
    }
    x.tags = [];
    x.tags = x.tags.concat(tempTags);
    User.update({ _id: x._id }, {
        $set: {
            tags: x.tags
        }
    }, function(err, result) {
        return result;
    });
    return x;
};

function tagDataE(x) {
    var tempTags = [];
    tempTags.push(x.name.toLowerCase());
    x.tags = [];
    x.tags = x.tags.concat(tempTags);
    Event.update({ _id: x._id }, {
        $set: {
            tags: x.tags
        }
    }, function(err, result) {
        return result;
    });
}


function tagDataO(x) {
    var tempTags = [x.username];
    tempTags.push(x.name.toLowerCase());
    tempTags.push(x.email);
    x.tags = [];
    x.tags = x.tags.concat(tempTags);
    Organization.update({_id: x._id}, {$set: {
        tags: x.tags
    }}, function(err, result) {
        return result;
    });
    return x;
}
function assignOrgsToEvents(){
        var uids = ["peta", "bolbala", "unicef", "cry"];
        Organization.findOne({username:"bolbala"}, function(err, result){

            Event.findOne({name:"Eye Donation Camp"}, function(err2,result2){
                result2.organizations.push(result._id);
                result2.save();
            });

        });

        Organization.findOne({username:"unicef"}, function(err, result){

            Event.findOne({name:"Eye Donation Camp"}, function(err2,result2){
                result2.organizations.push(result._id);
                result2.save();
            });

        });


        Organization.findOne({username:"unicef"}, function(err, result){

            Event.findOne({name:"Soccer Tournament"}, function(err2,result2){
                result2.organizations.push(result._id);
                result2.save();
            });

        });


        Organization.findOne({username:"cry"}, function(err, result){

            Event.findOne({name:"Cycle Distribution"}, function(err2,result2){
                result2.organizations.push(result._id);
                result2.save();
            });

        });
}

function assignEvents(){
        var uids = ["201301047", "201301048"];
        var b = 0;
        for( b=0 ; b<uids.length ; b++)
        {
                User.findOne({username:uids[b]},function(err, result){
                var y = result._id;
                var i = ["Soccer Tournament"];
                var j =0;
                for(j = 0; j<i.length; j++)
                {
                    Event.findOne({name: i[j]}, function(err, result2){
                        result2.volunteers.push(y);
                        result2.save(); 
                    });
                
                }    
            });
        }

        var uids2 = ["201301100", "201301104"];
        var b2 = 0;
        for( b2=0 ; b2<uids2.length ; b2++)
        {
                User.findOne({username:uids2[b2]},function(err, result){
                var y = result._id;
                var i = ["Eye Donation Camp"];
                var j =0;
                for(j = 0; j<i.length; j++)
                {
                    Event.findOne({name: i[j]}, function(err, result2){
                        result2.volunteers.push(y);
                        result2.save(); 
                    });
                
                }    
            });
        }

        var uids3 = ["201301417"];
        var b3 = 0;
        for( b3=0 ; b3<uids3.length ; b3++)
        {
                User.findOne({username:uids3[b3]},function(err, result){
                var y = result._id;
                var i = ["Cycle Distribution"];
                var j =0;
                for(j = 0; j<i.length; j++)
                {
                    Event.findOne({name: i[j]}, function(err, result2){
                        result2.volunteers.push(y);
                        result2.save(); 
                    });
                
                }    
            });
        }

}

function createNotifications(){

    Notification.removeAsync();
    User.findOne({username:"201301047"}, function(err, result2){
        Notification.create({
            "userId" : result2._id,
            "organization" : false,
            "notifications" : [{"nNo": 1, "content":"Welcome to goodbook"},
                                {"nNo": 2, "content":"It is late. Time to sleep"}]
        });
    });
    
    User.findOne({username:"201301048"}, function(err, result2){
        Notification.create({
            "userId" : result2._id,
            "organization" : false,
            "notifications" : [{"nNo": 1, "content":"Warm Welcome to goodbook"},
                                {"nNo": 2, "content":"Congratulations!"}]
        });
    });

    User.findOne({username:"201301100"}, function(err, result2){
        Notification.create({
            "userId" : result2._id,
            "organization" : false,
            "notifications" : [{"nNo": 1, "content":"Welcome to Platform goodbook"},
                                {"nNo": 2, "content":"100+ events"}]
        });
    });

    User.findOne({username:"201301104"}, function(err, result2){
        Notification.create({
            "userId" : result2._id,
            "organization" : false,
            "notifications" : [{"nNo": 1, "content":"Welcome to goodbook"},
                                {"nNo": 2, "content":"you are on a roll"}]
        });
    });

    User.findOne({username:"201301225"}, function(err, result2){
        Notification.create({
            "userId" : result2._id,
            "organization" : false,
            "notifications" : [{"nNo": 1, "content":"This is goodbook"},
                                {"nNo": 2, "content":"I am almost done"}]
        });
    });

    User.findOne({username:"201301417"}, function(err, result2){
        Notification.create({
            "userId" : result2._id,
            "organization" : false,
            "notifications" : [{"nNo": 1, "content":"Welcome to Project GGoodbook"},
                                {"nNo": 2, "content":"The mockups were great. Congratulations"}]
        });
    });

    User.findOne({username:"201301433"}, function(err, result2){
        Notification.create({
            "userId" : result2._id,
            "organization" : false,
            "notifications" : [{"nNo": 1, "content":"Welcome to goodbook, Pradeet"},
                                {"nNo": 2, "content":"It is late. Time to sleep"}]
        });
    });

    User.findOne({username:"201301435"}, function(err, result2){
        Notification.create({
            "userId" : result2._id,
            "organization" : false,
            "notifications" : [{"nNo": 1, "content":"This is goodbook"},
                                {"nNo": 2, "content":"The testing part has started"}]
        });
    });

    Organization.findOne({username:"peta"}, function(err, result2){
        Notification.create({
            "userId" : result2._id,
            "organization" : true,
            "notifications" : [{"nNo": 1, "content":"This is goodbook"},
                                {"nNo": 2, "content":"Saved 100 dogs. That is commendable"}]
        });
    });

    Organization.findOne({username:"cry"}, function(err, result2){
        Notification.create({
            "userId" : result2._id,
            "organization" : true,
            "notifications" : [{"nNo": 1, "content":"This is goodbook"},
                                {"nNo": 2, "content":"Please don't cry."}]
        });
    });
}

function createEventRequests() {
    EventRequest.removeAsync();

    Event.findOne({name: "Soccer Tournament"}, function(err, result2){
                        var y = result2._id;
                        User.findOne({username:"201301225"}, function(err,result){
                        var x = result._id;
                        EventRequest.create({
                                "userId" : x,
                                "eventId" : y,
                                "status" : "Accepted"
                            });
                        }
                        );
                    });

        Event.findOne({name: "Eye Donation Camp"}, function(err, result2){
                        var y = result2._id;
                        User.findOne({username:"201301433"}, function(err,result){
                        var x = result._id;
                        EventRequest.create({
                                "userId" : x,
                                "eventId" : y,
                                "status" : "Pending"
                            });
                        }
                        );
                    });

    Event.findOne({name: "Cycle Distribution"}, function(err, result2){
                        var y = result2._id;
                        User.findOne({username:"201301435"}, function(err,result){
                        var x = result._id;
                        EventRequest.create({
                                "userId" : x,
                                "eventId" : y,
                                "status" : "Rejected"
                            });
                        }
                        );
                    }); 


    Event.findOne({name: "Soccer Tournament"}, function(err, result2){
                        var y = result2._id;
                        var users = ["201301047", "201301048"];
                        var user_i = 0;
                        for(user_i =0; user_i<users.length; user_i++){
                            User.findOne({username:users[user_i]}, function(err,result){
                                var x = result._id;
                                EventRequest.create({
                                    "userId" : x,
                                    "eventId" : y,
                                    "status" : "Pending"
                                });
                        });
                        }
                    });

    Event.findOne({name: "Eye Donation Camp"}, function(err, result2){
                        var y = result2._id;
                        var users = ["201301100", "201301104"];
                        var user_i = 0;
                        for(user_i =0; user_i<users.length; user_i++){
                            User.findOne({username:users[user_i]}, function(err,result){
                                var x = result._id;
                                EventRequest.create({
                                    "userId" : x,
                                    "eventId" : y,
                                    "status" : "Accepted"
                                });
                        });
                        }
                    });

    Event.findOne({name: "Cycle Distribution"}, function(err, result2){
                        var y = result2._id;
                        var users = ["201301417"];
                        var user_i = 0;
                        for(user_i =0; user_i<users.length; user_i++){
                            User.findOne({username:users[user_i]}, function(err,result){
                                var x = result._id;
                                EventRequest.create({
                                    "userId" : x,
                                    "eventId" : y,
                                    "status" : "Accepted"
                                });
                        });
                        }
                    });
}
function assignUsersandNGOs(){
    //"201301225", "201301047", "201301048", "201301104", 
        User.findOne({username:"201301047"},function(err, result){
        var y = result._id;
        var i = ["bolbala", "cry"];
        var j =0;
        for(j = 0; j<i.length; j++)
        {
            Organization.findOne({username: i[j]}, function(err, result2){
                result2.subscribers.push(y);
                result2.save(); 
            });
        
        }    
    });

    User.findOne({username:"201301048"},function(err, result){
        
        var y = result._id;
        var i = ["bolbala", "cry"];
        var j =0;
        for(j = 0; j<i.length; j++)
        {
            Organization.findOne({username: i[j]}, function(err, result2){
                result2.subscribers.push(y);
                result2.save(); 
            });
        
        }    
    });


    User.findOne({username:"201301100"},function(err, result){
        
        var y = result._id;
        var i = ["peta", "cry"];
        var j =0;
        for(j = 0; j<i.length; j++)
        {
            Organization.findOne({username: i[j]}, function(err, result2){
                result2.subscribers.push(y);
                result2.save(); 
            });
        
        }    
    });


    User.findOne({username:"201301104"},function(err, result){
        
        var y = result._id;
        var i = ["bolbala", "cry"];
        var j =0;
        for(j = 0; j<i.length; j++)
        {
            Organization.findOne({username: i[j]}, function(err, result2){
                result2.subscribers.push(y);
                result2.save(); 
            });
        
        }    
    });

    User.findOne({username:"201301225"},function(err, result){
        
        var y = result._id;
        var i = ["bolbala", "unicef"];
        var j =0;
        for(j = 0; j<i.length; j++)
        {
            Organization.findOne({username: i[j]}, function(err, result2){
                result2.subscribers.push(y);
                result2.save(); 
            });
        
        }    
    });


    User.findOne({username:"201301435"},function(err, result){
        
        var y = result._id;
        var i = ["peta", "unicef"];
        var j =0;
        for(j = 0; j<i.length; j++)
        {
            Organization.findOne({username: i[j]}, function(err, result2){
                result2.subscribers.push(y);
                result2.save(); 
            });
        
        }    
    });


    User.findOne({username:"201301417"},function(err, result){
        
        var y = result._id;
        var i = ["peta", "unicef"];
        var j =0;
        for(j = 0; j<i.length; j++)
        {
            Organization.findOne({username: i[j]}, function(err, result2){
                result2.subscribers.push(y);
                result2.save(); 
            });
        
        }    
    });


    User.findOne({username:"201301433"},function(err, result){
        
        var y = result._id;
        var i = ["peta", "unicef"];
        var j =0;
        for(j = 0; j<i.length; j++)
        {
            Organization.findOne({username: i[j]}, function(err, result2){
                result2.subscribers.push(y);
                result2.save(); 
            });
        
        }    
    });


    Organization.findOne({username:"unicef"},function(err, result){
        
        var y = result._id;
        var i = ["201301433", "201301435" ,"201301225", "201301417"];
        var j =0;
        for(j = 0; j<i.length; j++)
        {
            User.findOne({username: i[j]}, function(err, result2){
                result2.subscribedNGO.push(y);
                result2.save(); 
            });
        
        }    
    });

    Organization.findOne({username:"cry"},function(err, result){
        
        var y = result._id;
        var i = ["201301100", "201301104" ,"201301047", "201301048"];
        var j =0;
        for(j = 0; j<i.length; j++)
        {
            User.findOne({username: i[j]}, function(err, result2){
                result2.subscribedNGO.push(y);
                result2.save(); 
            });
        
        }    
    });





    Organization.findOne({username:"peta"},function(err, result){
        
        var y = result._id;
        var i = ["201301433", "201301435" ,"201301417", "201301100"];
        var j =0;
        for(j = 0; j<i.length; j++)
        {
            User.findOne({username: i[j]}, function(err, result2){
                result2.subscribedNGO.push(y);
                result2.save(); 
            });
        
        }    
    });

    Organization.findOne({username:"bolbala"},function(err, result){
        
        var y = result._id;
        var i = ["201301225", "201301047", "201301048", "201301104"]
        var j =0;
        for(j = 0; j<i.length; j++)
        {
            User.findOne({username: i[j]}, function(err, result2){
                result2.subscribedNGO.push(y);
                result2.save(); 
            });
        
        }    
    });


    
}

function createEvents() {
    Event.find({}).removeAsync();
    Event.create({
        "name": "Eye Donation Camp",
        "location": [11.6234, 92.7625],
        "project": false,
        "startDate": "2017-04-30T09:03:53-07:00",
        "endDate": "2018-05-30T09:03:53-07:00",
        "skilled": true,
        "description": "Eye Donation Camp will be organized",
        "scale": 5,
    })
    .then(tagDataE);

        Event.create({
        "name": "Soccer Tournament",
        "location": [10.5593, 72.6358],
        "project": false,
        "startDate": "2016-04-30T09:03:53-07:00",
        "endDate": "2016-05-30T09:03:53-07:00",
        "skilled": true,
        "description": "soccer Cup to arrange funds for mentally challenged",
        "scale": 5,
    })
    .then(tagDataE);


        Event.create({
        "name": "Cycle Distribution",
        "location": [33.8765, 151.2070],
        "project": false,
        "startDate": "2016-07-30T06:03:53-07:00",
        "endDate": "2016-07-31T09:03:53-07:00",
        "skilled": false,
        "description": "Protecting the environment",
        "scale": 9,
    })
    .then(tagDataE);
}

User.find({}).removeAsync()
  .then(createUsers)
    .then(createOrgs)
        .then(createEvents)
            .then(assignUsersandNGOs)
                .then(assignEvents)
                    .then(createEventRequests)
                        .then(createNotifications)
                            .then(assignOrgsToEvents);

function createUsers() {

    User.create({
                "firstName": "Yashodhan",
                "lastName": "Bhatnagar",
                "dob": "1996-04-30T09:03:53-07:00",
                "email": "201301225@daiict.ac.in",
                "username": "201301225",
                "password": "yashodhan",
                "contactNo": "(01170) 03723",
                "studiedAt": "DA-IICT",
                "livesAt": "E-***",
                "aboutMe": "Lorem Ipsum Lorem Ipsom ",
                "location": [12.9716, 77.5946],
                "donated": "15000",
                "karma": "225",
                "gender": "male",
                "interests": ["books", "angular", "node", "mongoose"],
                "subscribedNGO":[]
         }
    ).then(tagData);


    User.create({
                "firstName": "Yashwant",
                "lastName": "keswani",
                "dob": "1996-06-04T09:03:53-07:00",
                "email": "201301047@daiict.ac.in",
                "username": "201301047",
                "password": "yashwant",
                "contactNo": "940868",
                "studiedAt": "DA-IICT",
                "livesAt": "H-105",
                "aboutMe": "Abra Abra Abra Abra ",
                "location": [12.9716, 77.5946],
                "donated": "15",
                "karma": "47",
                "gender": "male",
                "interests": ["python", "viper", "reading", "quizzing"],
                "subscribedNGO":[]       
            })
    .then(tagData);

    User.create({
                "firstName": "Manish",
                "lastName": "Berwani",
                "dob": "1996-03-31T09:03:53-07:00",
                "email": "201301048@daiict.ac.in",
                "username": "201301048",
                "password": "manish",
                "contactNo": "456456",
                "studiedAt": "DA-IICT",
                "livesAt": "G-121",
                "aboutMe": "Deputy Convenor ",
                "location": [23.0225, 72.5714],
                "donated": "1522",
                "karma": "48",
                "gender": "male",
                "interests": ["Algorithmic Coding", "studies", "mongoose"],
                "subscribedNGO":[]
         })
    .then(tagData);

    User.create(
             {
                "firstName": "Shreyas",
                "lastName": "Chaudhary",
                "dob": "1995-04-30T09:03:53-07:00",
                "email": "201301417@daiict.ac.in",
                "username": "201301417",
                "password": "shreyas",
                "contactNo": "3456",
                "studiedAt": "DA-IICT",
                "livesAt": "G-***",
                "aboutMe": "Designer ",
                "location": [12.9716, 77.5946],
                "donated": "1500",
                "karma": "417",
                "gender": "male",
                "interests": ["photoshop", "designing"],
                "subscribedNGO":[]
         })
        .then(tagData);

        User.create(
        	{
        		"firstName": "Pradeet",
                "lastName": "Swamy",
                "dob": "1995-07-23T09:03:53-07:00",
                "email": "201301433@daiict.ac.in",
                "username": "201301433",
                "password": "pradeet",
                "contactNo": "(01170) 03723",
                "studiedAt": "DA-IICT",
                "livesAt": "C-***",
                "aboutMe": "Android SPC ",
                "location": [17.3850, 78.4867],
                "donated": "15",
                "karma": "433",
                "gender": "male",
                "interests": ["android", "labs", "materialize", "mini militia"],
                "subscribedNGO":[]
        	})
    .then(tagData);

    User.create(
        	{
                "firstName": "Saumya",
                "lastName": "Bhadani",
                "dob": "1995-01-24T09:03:53-07:00",
                "email": "201301100@daiict.ac.in",
                "username": "201301100",
                "password": "saumya",
                "contactNo": "(01170) 03723",
                "studiedAt": "DA-IICT",
                "livesAt": "J/K- ***",
                "aboutMe": "Lorem  Lorem  ",
                "location": [23.0225, 72.5714],
                "donated": "15",
                "karma": "100",
                "gender": "female",
                "interests": ["books", "angular", "node"],
                "subscribedNGO":[]
        	})
    .then(tagData);

    User.create(
        	{
                "firstName": "Roshani",
                "lastName": "Narsimhan",
                "dob": "1995-09-24T09:03:53-07:00",
                "email": "201301104@daiict.ac.in",
                "username": "201301104",
                "password": "roshani",
                "contactNo": "03723",
                "studiedAt": "DA-IICT",
                "livesAt": "J/K ***",
                "aboutMe": "Ipsum Ipsom ",
                "location": [22.3072, 73.1812],
                "donated": "15",
                "karma": "104",
                "gender": "female",
                "interests": ["angular", "node", "mongoose"],
                "subscribedNGO":[]
        	})
    .then(tagData);
    User.create(
        	{
                "firstName": "Deeksha",
                "lastName": "Koul",
                "dob": "1996-04-28T09:03:53-07:00",
                "email": "201301435@daiict.ac.in",
                "username": "201301435",
                "password": "deeksha",
                "contactNo": "7232425",
                "studiedAt": "DA-IICT",
                "livesAt": "J/K-***",
                "aboutMe": "Lorem Ipsum",
                "location": [12.9716, 77.5946],
                "donated": "15",
                "karma": "435",
                "gender": "female",
                "interests": ["php", "node", "mongoose"],
                "subscribedNGO":[]
        	}).then(tagData);
}

function createOrgs(callback) {
    Organization.find({}).removeAsync();

    Organization.create({
    	"name": "UNICEF",
    	"email": "unicef@org.com",
    	"username": "unicef",
    	"password": "abc123",
    	"address": "4564 Egestas. Rd.",
    	"baName": "unicef org",
    	"baNumber": "548 12537 33891 925",
    	"bankName": "SBI",
    	"bankBranch": "New Delhi",
    	"aboutUs": "arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices",
    	"contactNo": "(0141) 651 9428",
        "karma": 365,
        "NGO": true,
        "CSR": false,
        "verified": true,
        "location": [12.9716, 77.5946]
      	}).then(tagDataO);
        	
    Organization.create({
        		"name": "BOLBALA",
                "email": "bol@gmail.com",
                "username": "bolbala",
                "password": "def456",
                "address": "Milpara Road",
                "baName": "Bolbala Org",
                "baNumber": "256 3654 2455 520",
                "bankName": "HDFC",
                "bankBranch": "Rajkot",
                "aboutUs": "Jay Bajrangbali Bolbala rocks",
                "contactNo": "321568749",
                "karma": -255,
                "NGO": true,
                "CSR": false,
                "verified": true,
                "location": [22.3039, 70.8022]
        	}).then(tagDataO);

    Organization.create({
                "name": "CRY",
                "email": "dontcry@gmail.com",
                "username": "cry",
                "password": "ghi789",
                "address": "CG Road",
                "baName": "Cry Org",
                "baNumber": "987 526 3215 500",
                "bankName": "ICICI",
                "bankBranch": "Pathankot",
                "aboutUs": "We don't cry",
                "contactNo": "45632145",
                "karma": 125,
                "NGO": true,
                "CSR": false,
                "verified": true,
                "location": [32.2643, 75.8022]    	
            }).then(tagDataO);

    Organization.create(
        	{
                "name": "PETA",
                "email": "atep@gmail.com",
                "username": "peta",
                "password": "jkl123",
                "address": "MG Road",
                "baName": "Peta Org",
                "baNumber": "999 8522 6547 855",
                "bankName": "stan Chart",
                "bankBranch": "Pune",
                "aboutUs": "Save Animals",
                "contactNo": "25631",
                "karma": 135,
                "NGO": true,
                "CSR": true,
                "verified": false,
                "location": [12.23, 55.8022]
        	}).then(tagDataO)
};

