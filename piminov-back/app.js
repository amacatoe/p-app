const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const app = express();

const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

async function start(){
  try{
      await mongoose.connect('mongodb+srv://admin:admin@cluster0.3u9ac.mongodb.net/piminov-db?retryWrites=true&w=majority',{
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true
      })
      app.listen(port, ()=> {
          console.log('We are live on ' + port);
      })
  }
  catch(e){
      console.log(e);
  }
}

start();
