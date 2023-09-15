const bodyparser = require('body-parser');
const express = require('express');
const app =express();
const port = 3000;

app.set('views','./views');
app.set('view engine','ejs');

app.use(bodyparser.urlencoded({extended:false}));

app.use(express.static('./public/style.css'));


let tasks = [];

app.get('/',(req,res)=>{
    res.render('index',{tasks});
});

app.post('/addTask',(req,res)=>{
    const newTask = req.body.task;
    tasks.push({id:Date.now(), text: newTask});
    console.log(tasks)


    res.redirect('/');
});
app.get('/edit/:id',(req,res)=>{
    const taskId = parseInt(req.params.id);
    const task =tasks.find(task=>task.id===taskId);
    res.render('edit',{task});
})
app.post('/edit/:id',(req,res)=>{
    const taskId = parseInt(req.params.id);
    const updatedText = req.body.task;
    const task = tasks.find(task=> task.id===taskId);
    if(task){
        task.text = updatedText;
    }
    res.redirect('/');
});
app.get('/delete/:id',(req,res)=>{
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.redirect('/');
})


app.listen(port,(req,res)=>{
    console.log("Your server is Currently running...... Better go catch it hahahahhhahhehehehahheahaehehaheheaheaheaheahhaehaheahaheahahahhah .... heh")
})
