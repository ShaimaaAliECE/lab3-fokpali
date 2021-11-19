const express = require('express');
const newConnection = require('./DBConnection');

const app = express();

app.use(express.static('static'));

app.get('/',(req, res)=>{
   //home page made using express
    res.send("<img src='imgs/DoodleLogo.jpg'/><h1> Welcome to Doodle!</h1><p><i>We are glad to have you here!</i></p><a href='/signup-form.html'>Guest</a><br/><a href='/login-form.html'>Admin</a>");
});

//makes guest page with list of guests and times
app.get('/guest', (req, res) => {
    let conn = newConnection();
    conn.connect();

    //creating a list of times
    let ListofTimes;
    conn.query(`SELECT * FROM Times`, (err, rows, fields) =>{
    
        ListofTimes = rows;
        //makes top row of table with all 10 options
        let content = '';
        content += '<table style="width:100%" border="2px solid black">';
        content += '<tr>';
        content += '<th>Name</th>';
        content += '<th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>';
        content += '</tr>';

        for (t of ListofTimes)
        {//adds list of times to table
            content += '<tr style="text-align:center">';
            content += '<td>'+t.Name+'</td><td>'+ t.Option1 +'</td><td>'+ t.Option2 +'</td><td>'+ t.Option3 +'</td><td>'+ t.Option4 +'</td><td>'+ t.Option5 +'</td>';
            content += '<td>'+ t.Option6 +'</td><td>'+ t.Option7 +'</td><td>'+ t.Option8 +'</td><td>'+ t.Option9 +'</td><td>' + t.Option10 +'</td>';
            content += '</tr>';}
            content += '</table>';
        content += `<form action='/guest-answer' method='post'>
        Enter Your Name:
        <input name='name' type='text'/>
        <br>
        <input type="checkbox" id="option1" name="Option1" value="one">
        <label for="option1"> Option 1 </label><br>
        <input type="checkbox" id="option2" name="Option2" value="two">
        <label for="option2"> Option 2 </label><br>
        <input type="checkbox" id="option3" name="Option3" value="three">
        <label for="option3"> Option 3 </label><br>
        <input type="checkbox" id="option4" name="Option4" value="four">
        <label for="option4"> Option 4 </label><br>
        <input type="checkbox" id="option5" name="Option5" value="five">
        <label for="option5"> Option 5 </label><br>
        <input type="checkbox" id="option6" name="Option6" value="six">
        <label for="option6"> Option 6 </label><br>
        <input type="checkbox" id="option7" name="Option7" value="seven">
        <label for="option7"> Option 7 </label><br>
        <input type="checkbox" id="option8" name="Option8" value="eight">
        <label for="option8"> Option 8 </label><br>
        <input type="checkbox" id="option9" name="Option9" value="nine">
        <label for="option9"> Option 9 </label><br>
        <input type="checkbox" id="option10" name="Option10" value="ten">
        <label for="option10"> Option 10 </label><br>
        <input type="submit" value="Submit">
    </form>`
    res.send(content);
    })
    conn.end();
})

app.get('/show-query',(req, res)=>{
    res.send(req.query);
});

app.get('/signup',(req, res)=>{
    res.send(req.query.name +' has signed up!')
});
app.use(express.urlencoded({
    extended: true
}))

app.post('/login',(req, res)=>{
    let userName=req.body.user;
    let password=req.body.pwd;
    let message = "Access Denied";
    if(userName=='favour'&& password=='123')
    {
        res.redirect('./welcome.html');
    }
    else res.send(message);
})


app.get('/welcome',(req, res)=>{
    // res.send(' has signed up!')
     res.send("<img src='imgs/DoodleLogo.jpg'/><h1> Welcome to Doodle!</h1><p><i>We are glad to have you here!</i></p><a href='/signup-form.html'>Guest</a><br/><a href='/login-form.html'>Admin</a>");
 });



app.get('/time-slots', (req,res) =>{
    let one=req.query.time1;
    let two=req.query.time2;
    let three=req.query.time3;
    let four=req.query.time4;
    let five=req.query.time5;
    let six=req.query.time6;
    let seven=req.query.time7;
    let eight=req.query.time8;
    let nine=req.query.time9;
    let ten=req.query.time10;
   //creates instance of the time values

    let conn = newConnection();
    conn.connect();
    //inserts into database
    conn.query(`INSERT INTO Times values ("Admin",'${one}',
    '${two}','${three}', '${four}','${five}','${six}','${seven}',
    '${eight}','${nine}','${ten}')`
    ,(err,rows,fields) =>{
        res.redirect('/times');
    })

    conn.end();
})

app.get('/times',(req,res) => {
    let conn = newConnection();
    conn.connect();
    let ListofTimes;
    conn.query(`SELECT * FROM Times`, (err, rows, fields) =>{
    
        ListofTimes = rows;
        let content = '';
        content += '<table style="width:100%" border="1px solid black">';
        content += '<tr>';
        content += '<th>Name</th>';
        content += '<th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>';
        content += '</tr>';
        for (t of ListofTimes)
        {
            
            content += '<tr style="text-align:center">';
            content += '<td>'+t.Name+'</td><td>'+ t.Option1 +'</td><td>'+ t.Option2 +'</td><td>'+ t.Option3 +'</td><td>'+ t.Option4 +'</td><td>'+ t.Option5 +'</td>';
            content += '<td>'+ t.Option6 +'</td><td>'+ t.Option7 +'</td><td>'+ t.Option8 +'</td><td>'+ t.Option9 +'</td><td>' + t.Option10 +'</td>';
            content += '</tr>';
            
        }
        content += '</table>';

        content += '<a href="/guest"> Fill out as a Guest </a>';
        res.send(content);
    })


    conn.end();
})

app.post('/guest-answer', (req, res) =>{

    let nGuest = req.body.name; //creates new gues 

    let one = "";
    let two = "";
    let three = "";
    let four = "";
    let five = "";
    let six = "";
    let seven = "";
    let eight = "";
    let nine = "";
    let ten = "";

    if(req.body.Option1){one = '✓';}
    if(req.body.Option2){two = '✓';}
    if(req.body.Option3){three = '✓';}
    if(req.body.Option4){four = '✓';}
    if(req.body.Option5){five = '✓';}
    if(req.body.Option6){six = '✓';}
    if(req.body.Option7){seven = '✓';}
    if(req.body.Option8){eight = '✓';}
    if(req.body.Option9){nine = '✓';}
    if(req.body.Option10){ten = '✓';}
    
   

    let conn = newConnection();
    conn.connect();
    //adds values into new guest
    conn.query(`INSERT INTO Times values ('${nGuest}','${one}',
    '${two}','${three}', '${four}','${five}','${six}','${seven}',
    '${eight}','${nine}','${ten}')`
    ,(err,rows,fields) =>{
        res.redirect('/times');
    })

    conn.end();
})

app.listen(80);

 