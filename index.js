const express = require('express');
const config = require('./config');
const course_routes = require('./Routes/course_routes');
const student_routes = require('./Routes/student_routes');


const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(course_routes);
app.use(student_routes);

app.get('/', (req,res)=>{
    res.send("Hi ! let's start our Site !");
});


//Run the server
const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`server running on a localhost: ${port} ...`);
});