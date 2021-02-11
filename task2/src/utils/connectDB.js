const { MongoClient, ObjectID} = require('mongodb')
function testConnect(callback){
    const myDBUrl = 'mongodb://127.0.0.1:27017'
    const dbName = "myNewTask"
    MongoClient.connect(
        myDBUrl,
        {useNewUrlParser:true, useUnifiedTopology:true},
        (error, client)=>{
            if(error) return console.log('db error')

            const db = client.db(dbName)
            callback(db)
        })
}

function checkIDS (id,callback)
{

  db = testConnect((db)=>{
//  console.log("connected")
  se={id:`${id}`}
  db.collection('users').findOne(se,((err, result)=>{
          if(result==null) { callback(false,true) //unique id error false
            console.log('this is DB ERROR unoaue',err)

}
          else { callback(true,false) ,console.log('this is DB ERROR ',result)}
       //console.log(result)
      })
)

})}


module.exports={
  testConnect,
  checkIDS

}
