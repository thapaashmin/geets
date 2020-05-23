//required
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const https = require("https");


const app = express();
//for passing the file
app.use(bodyParser.urlencoded({extended:true}));
//show the static file can be viewed
app.use(express.static("static"))
//direct to the home page


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

//post
app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    console.log(firstName+"   "+lastName+"  "+email);

    var data= {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    var jsonData = JSON.stringify(data);
     
    const url = "https://us18.api.mailchimp.com/3.0/lists/328fbb759f";
    const options = {
        method: "POST",
        auth: "ashmin:b0a7eb1bcf001b70329300383a81633c-us18"

    }

    const request = https.request(url,options,function(response){
        if (response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/")

})
//port number
app.listen(process.env.PORT || 3000,function(){
    console.log("server is runnig");
});


///b0a7eb1bcf001b70329300383a81633c-us18
//328fbb759f