var express = require("express")
var bodyparser = require('body-parser');
var app = express()
app.use("/",express.static("www"))
app.use(bodyparser.urlencoded({extended:false}));
app.post("/user",function(req,res){
    var name = req.body.name
    var moblie = req.body.moblie
    var address = req.body.address
    res.status(200).send('<p>你的名字是：<span>' + name + '</span></p><br><p>你的手机号：<span>' + moblie + '</span></p><br><p>你的地址是：<span>' + address + '</span></p>')
})
app.listen(3000,() => {
    console.log("node is running...")
})