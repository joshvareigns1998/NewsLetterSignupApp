const express = require("express");
const bodyParser=require("body-parser");
const { urlencoded } = require("body-parser");
const https=require("https");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));




app.get("/", function(req, res){
 res.sendFile(__dirname+"/index.html");
});


app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    
    const data={
        members:[{
        
            email_address: email,
            status:"subscribed",
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName,
            }}]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/eb15168167";
    const options= {
        method : "POST",
        auth : "divav:1c5ee25d8053a259f76c7bd7942bc68a-us18"
    };
    const request = https.request(url, options, function(response){
        
            if (response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            }
            else{
                res.sendFile(__dirname + "/failure.html");
            }
        response.on("data", function(data){
            returnedData = JSON.parse(data);
            console.log(returnedData.status);
        });
    });
        
    request.write(jsonData);
    request.end();


});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server stared mame");
});



// API-Key
// 1c5ee25d8053a259f76c7bd7942bc68a-us18

// Auidence ID
// eb15168167
