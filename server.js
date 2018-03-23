const express = require('express');
const hbs = require('hbs');

const os = require('os');

var app = express();
hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine',hbs);

//setting public folder.
app.use(express.static(`${__dirname}/public`));

app.use((request,response,next)=>{
    // var now = new Dat().toString();
    // console.log(`${new Date().toString()} ${request.method} ${request.url}`);
    // next();
    response.render('maintenance.hbs');
    // next();
});



//using hbc to add helper functions.
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});
//passing arguments to register helper
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

//using view template engine to render dynamic templates.

app.get('/',(request,response)=>{
    response.render('welcome.hbs',{
        userName:os.userInfo().username,
        pageName:'Welcome',
        welcomeMessage:'Welcome to website'
    });
});

app.get('/about',(request,response)=>{
    response.render('about.hbs',{
        pageName:'About',
    });
});
app.get('/bad',(request,response)=>{
    response.send({
        "errorMessage": "Bad request"
    });
});

app.listen(3000,()=>{
    console.log("Server is up and running on port 3000");
});