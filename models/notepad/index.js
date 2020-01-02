const mongoose = require('mongoose')
// mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);

mongoose.connect("mongodb://sarthak:sarthak12@ds249017.mlab.com:49017/notepad",{ useNewUrlParser: true, useUnifiedTopology: true  },(err)=>{
   if(err) {
       console.log(err)
   }else{
       console.log(`Connected To Database`)
   }
});


mongoose.Promise = Promise;

module.exports.Notepad = require("./notepad")