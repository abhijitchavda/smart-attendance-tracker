var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
			, assert = require('assert');
var murl="mongodb://localhost:27017/atntracker";

/* GET home page. */
router.get('/',function(req,res,next){
res.render('index');
});

router.get('/searchbydate',function(req,res,next){
var date=req.query.date
MongoClient.connect(murl, function(err, db) {  //get product details
        assert.equal(null, err);
        db.collection("attendance").find({"date":date},{"students":1,_id:0}).toArray(function(err,resp){
            if(err){
                res.render('error',{message:"cannot get the values from the database"});
                db.close();
            }
            if(resp.length==0){
                res.render('error',{message:"Attandance for this date is not taken or no students were present"});
                db.close();
            }
            else{
                res.render('studentslist',{students:resp[0].students,searchdate:date})
                //res.json(resp[0].students).status(200)
                db.close();
            }
        });
});
    
});

router.get('/searchbyname',function(req,res,next){
var name=req.query.name;
MongoClient.connect(murl, function(err, db) {  //get product details
                assert.equal(null, err);
                db.collection("attendance").find({"students":name},{"date":1,_id:0}).toArray(function(err,resp){
                    if(err){
                        db.close();
                        res.render('error',{message:"cannot get the values from the database"});
                        //res.json({"msg":"cannot get the values from the database"}).status(500);
                    }
                    if(resp.length==0){
                        db.close();
                        res.render('error',{message:"student did not attend any class yet"});
                        //res.json({"msg":"student did not attend any class yet"}).status(200);
                    }
                    else{
                            db.close();
                            res.render('dateslist',{dates:resp,searchname:name});
                            //res.json(resp).status(200)
                        }
                });
        });

});

router.post('/register', function(req, res, next) {
	var name=req.body.name||"";
    if(name.length==0){
        res.json({"msg":"please enter a name"}).status(400);
    }
    else {
    	var datestr = new Date();
        var date = new Date();
        var utcDate = new Date(date.toUTCString());
        utcDate.setHours(utcDate.getHours()-7);
        var usDate = new Date(utcDate);
    	var month=parseInt(usDate.getMonth())+1;
        if(month<10){
            month="0"+month
        }
    	var date=""+month+"/"+usDate.getDate()+"/"+usDate.getFullYear();
    	MongoClient.connect(murl, function(err, db) {  //get product details
                assert.equal(null, err);
                db.collection("attendance").find({"date":date}).toArray(function(err,resp){
                	if(err){
                		res.json({"msg":"cannot get the values from the database"}).status(500);
                		db.close();
                        
                	}
                	if(resp.length==0){
                		db.collection("attendance").insert({"date":date,"students":[name]},function(err, resul) {
                                            //assert.equal(err, null);
                                            if (err){
                                                    res.json({"code":500,"msg":"error in register. insert new date"}).status(500);
                                                    db.close();
                                                    
                                                    }      
                                                  if(resul.result.ok==1)
                                                  {
                                                  res.json({"msg":"registered"}).status(204);
                                                  db.close();
                                                  
                                                }
                                            });
                	}
                	else{
                		db.collection("attendance").find({"date":date,"students": name } ).toArray(function(err,response){
                			if(err){
                				res.json({"msg":"error in getting the data from database"}).status(500);
                				db.close();
                			}
                			if(response.length==0){
                				db.collection("attendance").update({"date":date},{$push:{"students":name}},function(err, resul) {
                                            //assert.equal(err, null);
                                            if (err){
                                                    db.close();
                                                    res.json({"code":500,"msg":"error in register. insert new data"}).status(500);
                                                
                                                    }      
                                                  if(resul.result.ok==1)
                                                  {
                                                  db.close();
                                                  res.json({"msg":"registered"}).status(204);
                                                  
                                                }
                                            });
                			}
                			else{
                				res.json({"msg":"already registered"}).status(204);
                                
                			}

                		});
                	}

                });
        });
    }
});

router.get('/students',function(req,res,next){
    var date=req.query.date||"";
    if(date.length==0){
        res.json({"msg":"please enter a date to query"}).status(400);
    }
    else{
        MongoClient.connect(murl, function(err, db) {  //get product details
                assert.equal(null, err);
                db.collection("attendance").find({"date":date},{"students":1,_id:0}).toArray(function(err,resp){
                    if(err){
                        res.json({"msg":"cannot get the values from the database"}).status(500);
                        db.close();
                    }
                    if(resp.length==0){
                        res.json({"msg":"Attandance for this date is not taken"}).status(200);
                        db.close();
                    }
                    else{
                            res.json(resp[0]).status(200)
                            db.close();
                    }
                });
        });
    }
});

router.get('/student',function(req,res,next){
    var name=req.query.name||"";
    if(name.length==0){
        res.json({"msg":"please enter a name to query"}).status(400);
    }
    else {
        MongoClient.connect(murl, function(err, db) {  //get product details
                assert.equal(null, err);
                db.collection("attendance").find({"students":name},{"date":1,_id:0}).toArray(function(err,resp){
                    if(err){
                        db.close();
                        res.json({"msg":"cannot get the values from the database"}).status(500);
                    }
                    if(resp.length==0){
                        db.close();
                        res.json({"msg":"student did not attend any class yet"}).status(200);
                        
                    }
                    else{
                            db.close();
                            res.json(resp).status(200)
                        }
                });
        });
    }
});
module.exports = router;
