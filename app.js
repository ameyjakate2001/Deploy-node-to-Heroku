const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080 ;
const DB = require('./db');
const mongoose = require('mongoose');
const mongoAtlasUri = 'mongodb://amyjakate:ameyjakate@cluster0-shard-00-00.lstnw.mongodb.net:27017,cluster0-shard-00-01.lstnw.mongodb.net:27017,cluster0-shard-00-02.lstnw.mongodb.net:27017/LaptopAssistant?ssl=true&replicaSet=atlas-kkuefp-shard-0&authSource=admin&retryWrites=true&w=majority';







//IMPORTING THE SCHEMA MODEL
var Laptop = require('./models/LaptopSchema');
var Login = require('./models/LoginSchema');


//SETTING VIEW ENGINE AND STATIC FILES USAGE
app.set('view engine' , 'ejs');
app.use(express.static(__dirname + '/public'));



//FOR PARSING THE REQUEST BODY
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//SETTING ENVIROMENT FOR MULTER FOR IMAGE UPLOAD

const { diskStorage } = require('multer');
var multer = require('multer');
var path = require('path');
const { chdir } = require('process');
var fs = require('fs');
const { Mongoose } = require('mongoose');
const { db } = require('./models/LaptopSchema');

var Storage = diskStorage({
    destination:'./public/uploads/',
    filename:(req,file,cb)=>{
       cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname));
    }
});

var upload = multer({
    storage:Storage
}).single('image');






// ALL ROUTES
//HOMW PAGE ROUTE
app.get('/', function(req,res){
    mongoose.connect(mongoAtlasUri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, function(err){
        var resultArray =[];
          if(err) throw err; 
          Laptop.find(function(err,lappi){
                if(err) throw err;
                else{
                    lappi.forEach(function(doc){
                        resultArray.push(doc);
                    })
                    res.render('./pages/index',{items:resultArray , filter:'Sorted By Nothing' });
                }
          })
        });
    });

app.get('/GetFilter/Brand', function(req,res){
    mongoose.connect(mongoAtlasUri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, function(err){
        var resultArray =[];
        var Bname = req.query.Selected_Brand;
        console.log(Bname);
          if(err) throw err; 
          Laptop.find({ Brand: Bname },function(err,lappi){
                if(err) throw err;
                else{
                    lappi.forEach(function(doc){
                        resultArray.push(doc);
                    })
                    res.render('./pages/index',{items:resultArray , filter:'Sorted By '+Bname + ' Brand'});
                }
          })
        });
    });

app.get('/SortBy/Price_Range', function(req,res){
    mongoose.connect(mongoAtlasUri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, function(err){
        var resultArray =[];
        var Pname = req.query.Selected_Price_Range;
        var actual_price = '';

        if(Pname === 'Less Than 40K'){
            actual_price = 40000;
            Laptop.find({"properties.price":{$lt:actual_price}},function(err,lappi){
                if(err) throw err;
                else{
                    lappi.forEach(function(doc){
                        resultArray.push(doc);
                    })
                    res.render('./pages/index',{items:resultArray , filter:'Sorted By '+Pname });
                }
          })
        }
        else if(Pname === 'Less Than 60K'){
            actual_price = 60000;
            Laptop.find({"properties.price":{$lt:actual_price,$gt:40000}},function(err,lappi){
                if(err) throw err;
                else{
                    lappi.forEach(function(doc){
                        resultArray.push(doc);
                    })
                    res.render('./pages/index',{items:resultArray , filter:'Sorted By '+Pname });
                }
          })
        }

        else if(Pname === 'Greater Than 60K'){
            actual_price = 60001;
            Laptop.find({"properties.price":{$gt:actual_price}},function(err,lappi){
                if(err) throw err;
                else{
                    lappi.forEach(function(doc){
                        resultArray.push(doc);
                    })
                    res.render('./pages/index',{items:resultArray , filter:'Sorted By '+Pname });
                }
          });
        };
    });
});



    app.get('/SortBy/Ram', function(req,res){
        mongoose.connect(mongoAtlasUri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, function(err){
            var resultArray =[];
            var Rname = req.query.Selected_Ram;
              if(err) throw err; 
              Laptop.find({"properties.Ram" :Rname},function(err,lappi){
                    if(err) throw err;
                    else{
                        lappi.forEach(function(doc){
                            resultArray.push(doc);
                        })
                        res.render('./pages/index',{items:resultArray , filter:'Sorted By '+Rname+ ' Ram' });
                    }
              });
            });
        });
        
    
        
        app.get('/SortBy/Inch', function(req,res){
            mongoose.connect(mongoAtlasUri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, function(err){
                var resultArray =[];
                var InchSize = req.query.Selected_Inch_Range;
                  if(err) throw err; 
                  Laptop.find({ "properties.Screen_size": InchSize },function(err,lappi){
                        if(err) throw err;                
                        else{
                            lappi.forEach(function(doc){
                                resultArray.push(doc);
                            })
                            res.render('./pages/index',{items:resultArray , filter:'Sorted By '+InchSize });
                        }
                  })
                });
            });


app.get('/about', function(req,res){
    res.render('./pages/about');
});

app.get('/Details/ID:-/:_id' , (req, res) => {
    Laptop.find({_id: req.params._id})
    .then(data => {
        res.render('./pages/DetailsPage',{item:data});
     });
});


app.get('/form_submit',function(req,res){
   res.render('./pages/form');
});

//POST METHOD TO SAVE DATA FROM FORM 
app.post('/form_submit',upload, function(req,res){
    var newLaptop = new Laptop({
        Name:req.body.laptopName,
        img:{
            contentType:req.body.image,
            data: fs.readFileSync(req.file.path)
        },
        Brand:req.body.Brand,
        Link:req.body.laptopLink,
        properties:{
            price:req.body.laptopPrice,
            Hdd:req.body.HDD,
            Ssd:req.body.SSD,
            Ram:req.body.RAM,
            processor:req.body.PROCESSOR,
            generation:req.body.GENERATION,
            Operating_system:req.body.OS,
            Graphics_card:req.body.GS,
            Screen_size:req.body.INCH,
        }
    });
    newLaptop.save()
    .then(item => {
            console.log('saved to database');
            res.send("item saved to database Successfully "  );
        })
        .catch(err=>{
        console.log(' something happend :  ' + err);
        });
});

app.post('/SubmitLogin',function(req,res){
    var newEmail = new Login({
        Email:req.body.email,
        TextArea:req.body.message
    }) 
    newEmail.save().then(item=>{
        console.log('saved to database');
        res.send('Hello  ' + req.body.email+'.  Your Information Saved To Database');
    })
     .catch(err=>{
        console.log(' something happend :  ' + err);
     })
});






//LISTENING TO THE SERVER
app.listen(port, ()=>{
    console.log('listening to port :'+ port);
});

