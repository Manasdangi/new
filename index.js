//requiring modules
const request = require("request-promise");
const cheerio = require("cheerio");
var express=require("express")
var bodyParser = require("body-parser")
const port = process.env.PORT || 3000;
const app = express();

let imdbData = []
let v1,v2,v3,v4,v5;
var movie;//storing url in "movie" 

 app.use(bodyParser.json()) 
 app.use(bodyParser.urlencoded({
     extended:true
 }))
app.set("view engine","hbs")
app.get("/",(req,res)=>{
    res.render('index',{
        un:v1
    })
})

//asynchronuos method
async function f(){
    try{
//created an array    


const res = await request ({
//this res gonna be data comes when request library makes request to the URL
    
    uri:movie,
    header:{
       //this part is neccesaary to let know the website that we are making legal request
        accept:
       "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9",
        ":scheme": "https"
    },
    gzip:true,//content-encoding = gzip

});
// // //cheerio make our work easy. By using it we can store our info in "$"
// // //here we loaded entire res(html page..) in $
let $ = cheerio.load(res)
let title= $('#pageContent>div:nth-child(3)>div.userbox>div.info>div.main-info>h1>\n').text()
let currentrating =$('#pageContent>div:nth-child(3)>div.userbox>div.info>ul>li:nth-child(1)>\n').text()
//let solvedproblem=$('#pageContent > div:nth-child(7)> div > div:nth-child(7)>div:nth-child(1)>div:nth-child(1)>div:nth-child(1)').text()                                                                                                                                     erActivityFrame_frame > div > div._UserActivityFrame_footer>div:nth-child(1)>div:nth-child(1)>div:nth-child(1)').text()
let contribution=$('#pageContent>div:nth-child(3)>div.userbox>div.info>ul>li:nth-child(2)>\n').text()
let lastactivity=$('#pageContent>div:nth-child(3)>div.userbox>div.info>ul>li:nth-child(4)>\n').text()
let register=$('#pageContent>div:nth-child(3)>div.userbox>div.info>ul>li:nth-child(5)>\n').text();
//pushed element into the array 
v1=title;
v2=currentrating;
v3=contribution;
v4=lastactivity;
v5=register;
//console.log(v1,v2,v3,v4);
imdbData.push({
    title,
    currentrating,
    contribution,
    lastactivity,
    register,

});

console.log(imdbData);


}
catch(error) {
    console.error(error);
}
}


app.post("/sign_up",(req,res)=>{
    movie=req.body.link;
  //  console.log(req.body.link);
    f().then(
        
        res.render('index',{
           place1:v1,
           place2:v2,
           place3:v3,
           place4:v4,
           place5:v5,
        })
    )
    res.end()

    })



app.listen(port,()=>{
  console.log('listening on port');
});

