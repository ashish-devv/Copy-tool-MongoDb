require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
const axios=require("axios");

const app=express();
app.use(bodyparser.urlencoded({extended:true}));
mongoose.connect(process.env.MONGOURI,{ useNewUrlParser: true ,useUnifiedTopology: true},()=>{
    console.log("Connected to mongodb Server");
});
app.set("view engine","ejs");
const bgslokSchema = new mongoose.Schema({
        _id: String,
        chapter: Number,
        verse: Number,
        slok: String,
        transliteration: String,
        tej: Object,
        siva: Object,
        purohit: Object,
        chinmay: Object,
        san: Object,
        adi: Object,
        gambir: Object,
        madhav: Object,
        anand: Object,
        rams: Object,
        raman: Object,
        abhinav: Object,
        sankar: Object,
        jaya: Object,
        vallabh: Object,
        ms: Object,
        srid: Object,
        dhan: Object,
        venkat: Object,
        puru: Object,
        neel: Object,
    });

const Bgslok= new mongoose.model("Bgslok",bgslokSchema);

app.route("/")
.get((req,res)=>{
    res.render("index",{jsondata:"enter Correct url to copy content to db 😂"});
})
.post((req,res)=>{
    console.log("link given :"+req.body.link);
    console.log("--------------------------------------------------");
    axios.get(req.body.link)
  .then(response => {
    //console.log(response.data);
    const slok = new Bgslok(response.data);
        slok.save((err)=>{
        if(!err)
        {
            console.log("Shlok Inserted 👌👌👌👌");
        }
        else{
            console.log(err);
        }
    });
    res.render("index",{jsondata:response.data})
    
  })
  .catch(error => {
    console.log(error);
    res.render("index",{jsondata:"❌❌❌ Error Occured ❌❌❌ give Correct url 💀"})
  });

    
})


var port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`server started at : ${port}`)
})