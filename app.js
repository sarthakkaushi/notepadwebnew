const express = require('express'),
        app     = express(),
        port =  process.env.PORT || 8080;
const path = require('path')        
var cors = require('cors')
var bodyParser = require('body-parser');
var shortid  = require('shortid')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors())

        app.set('view engine', 'ejs');
        const db = require('./models/notepad')

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/notes',(req,res)=>{
  
    db.Notepad.find({}).then((r)=>{
      res.send(r)
    })
  
})

app.post('/api/notes',(req,res)=>{
    console.log(req.body)
    let sendData = {
        title:req.body.title,
        text:req.body.content,
        slug:shortid.generate()
      }
      db.Notepad.create(sendData).then((r)=>{
        res.send({
          result:true,
          url:`${sendData.slug}`,
          _id:r._id
    
        })
      })
    
})


// db.Notepad.find({}).then(r=>{
//   r.forEach(d=>{
//     db.Notepad.findByIdAndDelete(d._id).then((r)=>{
//       console.log(`Deleted`)
//     })
//   })
//   db.Notepad.findByIdAndDelete()
// })


app.get('/api/notes/:slug',(req,res)=>{
    const slug =  req.params.slug
    db.Notepad.find({slug:slug}).then((r)=>{
      //res.send(r)
      res.send({data:r[0]})
    })
})
app.put('/api/notes/:slug',(req,res)=>{
  const newData ={
    title:req.body.title,
    text:req.body.content
  }
  console.log(req.body)

    db.Notepad.findOneAndUpdate(  getidbyslug(req.params.slug),{$set: newData}).then((r)=>{
      db.Notepad.find({slug:req.params.slug}).then((r)=>{
        console.log(r[0])
      })
    })
})

app.put('/api/notes/update/:id',(req,res)=>{
  const newData ={
    title:req.body.title,
    text:req.body.content
  }
  console.log(req.body)
    
    db.Notepad.findByIdAndUpdate(req.params.id,{$set: newData}).then((r)=>{
      db.Notepad.findById(req.params.id).then((r)=>{
        console.log(r)
        res.send(r)
      })
    })
})

function getidbyslug(slug){
  db.Notepad.find({slug}).then((r)=>{

    return r[0]._id
  })
}
console.log(process.env.NODE_ENV)

  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

app.listen(port,()=>console.log(`Server running on port ${port}`))        