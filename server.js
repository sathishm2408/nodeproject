const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

const app=express();

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');



app.use((req,res,next)=>{
	var now=new Date().toString();
	var log=now+req.method+req.url;
	
	fs.appendFile('server.log',log+'\n',(error)=>{
		if(error){
			console.log('error');
		}
	});
	next();
});

app.use((req,res,next)=>{
	res.render('maintenance.hbs');
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getyear',()=>{
	return new Date().getFullYear()	
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();	
});

app.get('/',(req,res)=>{
	res.render('home.hbs',{
		title:'Home',
		welcome:'welcome to my site'
		//year:new Date().getFullYear()
	});
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		title:'About',
		//year:new Date().getFullYear()
	});
});

app.listen(3000);

/*app.get('/:name',(req,res)=>{
	res.send("name is "+req.params.name);
});*/


/*app.get('/bad',(req,res)=>{
	res.send({errorMessage:'unable'});
}); */

