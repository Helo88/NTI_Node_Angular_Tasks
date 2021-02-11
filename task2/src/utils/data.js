// const{ MongoClient,ObjectID} = require('mongodb');
//
//
// // Connection URL
// const url = 'mongodb://localhost:27017';
//
// // Database Name
// const dbName = 'session8';
//
// // Use connect method to connect to the server
// MongoClient.connect(url,{}, function(err, client) {
//   if(err) console.log("failed to connect")
//
//   const db = client.db(dbName);
//
//   getrec=function(){
//     db.collection("new").find({}).toArray(function(err, result) {
//         if (err) throw err;
//         console.log(result);
//          res.send(result)
//          }
//   })
// }
// })
// module.exports={
//     getrec,
//     // getPostComments,
//
// }
