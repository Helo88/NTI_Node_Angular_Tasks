const path=require('path')
const express = require('express')
const hbs = require('hbs')
const DB= require('./utils/connectDB')
const app = express()
const PORT = 3000
const myPublicFiles = path.join(__dirname, '../public')
const myViewsFiles = path.join(__dirname, '../frontend/views')
const myPartialsFiles = path.join(__dirname, '../frontend/layouts')
app.set('view engine', 'hbs')
app.set('views', myViewsFiles)
hbs.registerPartials(myPartialsFiles)
app.use(express.static(myPublicFiles))

app.use(express.urlencoded())


app.get('', (req,res)=>{
    res.render('home')
})
app.get('/addData',(req,res)=>{
res.redirect('/showAll')
})
app.post('/addData', function(req, res){ //form
   data = req.body
//   console.log("this is name nnnn ",data.id) //called by name
   DB.checkIDS(data.id,(err,res)=>{
     if (err) console.log ("reeor is" ,err)
     else {
    db = DB.testConnect( (db)=>{
     db.collection('users').insert(data, (err, result)=>{
        if(err) return console.log(err)
        else { console.log(result)}
      })


    })
  }})

res.redirect('/showAll')
});

app.get('/showAll', (req,res)=>{
    db = DB.testConnect((db)=>{
        db.collection('users').find().toArray((err, result)=>{
                if(err) res.render('error')
                else res.render('ShowAll',{data:result})
              //    console.log(res.send(result))
            })

        })
})
app.get('/search',(req,res)=>{
res.render ('search')
})

app.post('/search', (req,res)=>{
    console.log("this search ", req.body.id)
    id=req.body.id
    db = DB.testConnect((db)=>{
      db.collection('users').findOne({id:`${id}`},((err, result)=>{
              if(err) { console.log(error)}
              else{ console.log('This is rs', result)
                res.render('search',{data:result})}
          })
    )
    })
})
app.get('/delTask/:id', (req,res)=>{
    id=req.params.id
    console.log("this is del id",id)
    db = DB.testConnect((db)=>{
      db.collection('users').deleteOne({id:`${id}`},((err, result)=>{
              if(err) { console.log(error)}
              else{ console.log("this is del res",result)
                 res.redirect('/showAll')}
          })
    )
    })
})

app.get('/editTask/:id', (req,res)=>{
    id=req.params.id
    console.log("this is edit id form ger",req.params)
    db = DB.testConnect((db)=>{
    db.collection('users').findOne({id:`${id}`},((err, result)=>{
            if(err) { console.log(error)}
            else{ console.log('This is rs', result)
              res.render('edit',{data:result})}
  })
  )
}) })

app.post('/editTask/:id', (req,res)=>{
    id=req.body.id
    console.log("this is edit id",req.params)
    db = DB.testConnect((db)=>{
       var newvalues = { $set: {title:req.body.title,select:req.body.select ,content:req.body.content } };
      db.collection('users').updateOne({id:`${id}`},newvalues,((err, result)=>{
              if(err) { console.log(error)}
              else{ console.log("edited sucess")
                 res.redirect('/showAll')}
          })
    )
    })
})






app.listen(PORT)
