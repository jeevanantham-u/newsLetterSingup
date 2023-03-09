const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res)
{

    // res.send("<h1>Newsletter Signup</h1>");
    res.sendFile(__dirname + "/signup.html");
    
});



app.post("/", function(req, res)
{

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
       members:[
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName
            }
          }
       ]
    };

    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    const url = "https://us21.api.mailchimp.com/3.0/lists/e5047d7402";
    const options = {
      method: "POST",
      auth:"jeevanantham10:38cea231f7ade882f3606f2c05ba59ec-u21"
    };
    

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
          
          if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
          }
            
          else{
            res.sendFile(__dirname + "/failure.html");
          }
           
            console.log(JSON.parse(data));
        });
    });

    app.post("/failure", (req, res)=>
    {
      res.redirect("/");
    });

  request.write(jsonData);
  request.end();
});


app.listen(process.env.PORT || 3000,function(req, res)
{

    console.log("server is running on port 3000");

});


//API Key
//38cea231f7ade882f3606f2c05ba59ec-us21

// List Id
//e5047d7402