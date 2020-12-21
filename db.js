const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongoAtlasUri = 'mongodb://amyjakate:ameyjakate@cluster0-shard-00-00.lstnw.mongodb.net:27017,cluster0-shard-00-01.lstnw.mongodb.net:27017,cluster0-shard-00-02.lstnw.mongodb.net:27017/LaptopAssistant?ssl=true&replicaSet=atlas-kkuefp-shard-0&authSource=admin&retryWrites=true&w=majority';
try {
    // Connect to the MongoDB cluster
        mongoose.connect(mongoAtlasUri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
        console.log('DB Connected....');
   }
     catch (e) {
    console.log("could not connect");
  }


module.exports = mongoose;