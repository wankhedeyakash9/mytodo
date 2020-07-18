var express = require("express")
var bodyParser = require("body-parser")
var app = express()

const todos = require("./todoCollection")


var urlEncoder = bodyParser.urlencoded({extended:false})

//my todo list

app.use(express.static("static"))
app.set("views","./views")
app.set("view engine","ejs")

app.get("/", function(req,res){ 
    console.log (`GET ${req.url}`)
    res.set("Content-Type", "text/html")  
    todos.find({},function(err,data){
        res.render("index",{todos:data})
    })    
})


app.post("/", urlEncoder ,function(req,res){
    var todo = new todos(req.body)
    todo.save(function(err,todo){ 
        if (err) console.log(err)
        res.json(todo)
        
    })
})

app.delete("/:item",function(req,res){

    console.log(req.params)
    
     todos.deleteOne({item :req.params.item.replace(/-/g," ")},function(err){})
     todos.find({},function(err,data){
        res.render("index",{todos:data})
    })    
 
})

app.listen(8081, function(){console.log("Listening at localhost:8081")})