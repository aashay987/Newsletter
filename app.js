const express = require('express')
const bodyParser = require('body-parser')
const request = require('requests')
const https = require('https')
const app = express()
const port = 3000

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html")
  //res.send('Hello World')
})
app.post('/',function(req,res){
  var name = req.body.fname;
  var surname = req.body.lname;
  var email = req.body.email;

  var data = {
    members : [
      {
        email_address : email,
        status : "subscribed",
        merge_fields : {
          FNAME : name,
          LNAME : surname,
        }
      }
    ]
  }
  url = "https://us20.api.mailchimp.com/3.0/lists/3d61b4c201"
  options = {
    method : "POST",
    auth : "aashay:92d0e935b5a6d2fd2819dc6eb7b3d702-us20"
  }
  const jsondata = JSON.stringify(data);
  const request = https.request(url,options, function(response){
      if(response.statusCode === 200)
      {
        res.sendFile(__dirname + "/success.html")
      }
      else
      {
        res.sendFile(__dirname + "/failure.html")
      }
      response.on("data",function(data){
        //console.log(JSON.parse(data));

      })
  })
  request.write(jsondata)
  request.end()
})

app.post('/failure',function(req,res){
  res.redirect('/')
})
app.listen(process.env.PORT||3000, () => {
  console.log('Listening at http://localhost:${port}')
})
//92d0e935b5a6d2fd2819dc6eb7b3d702-us20
//3d61b4c201
