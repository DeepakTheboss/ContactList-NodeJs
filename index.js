// this is my expres server and some controllers
const  express = require('express');
const path = require('path');
const port = 8000;

// to access the config of db while connecting to express server and test it we need to add that file.
const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app  = express(); // from here we can access all things of express library


// app.get('/', function(req,res){
//     res.send('<h1>Cool, it is runnig!</h1>');  //instead of res.end like in Node.j s
// })

//now if we want to send data from controller to view(template) then need to change res.render()
// but beofre that we need to add template path means where we have to keep the template in our project for that

//we require a 'path' library.

app.set('view engine', 'ejs');
app.set('This is template', path.join(__dirname, 'views'));

//adding a parser bcs we need to decode and convert the encoded data to object and used it means parsed data
//also called as middleware bcs it is b/w in browser and controller(server).

app.use(express.urlencoded()); // Parser

app.use(express.static('assests'));

// middleware 1
// app.use(function(req,res,next){
//       console.log("Middleware 1");
//       next();
// })

// // middleware 2
// app.use(function(req,res,next){
//     console.log("Middleware 2");
//     next();
// })


//creating a contact list
const contactList = [
    {
        name:"arpan",
        phone:123456789
    },
    {
        name:"deepak",
        phone: 2233445566
    },
    {
        name:"manohar",
        phone:882845678
    }
];





app.get('/', async function(req,res){

    try {
        // Use async/await to fetch contacts from the database
        const contacts = await Contact.find({});
    
        // Render the 'home' view with fetched contacts
        res.render('home', {
          title: "I am flying",
          contact_list: contacts,
        });
      } catch (err) {
        // Handle any errors that occur during database query or rendering
        console.error("Error in fetching contacts from db", err);
        return;
      }
    // // return res.render('home', {
    // //     title : "I am flying",
    // //     contact_list : contactList  
    // });
    //return res.redirect('/practice');
})

app.get('/practice', function(req, res){
   return  res.render('practice', {
        title: "Let's Practice"
    })
})

// to handling  form we have made a controller , here we are 
//analysing the data, and rediecting to some other page or home page
app.post('/create-contact', async function(req,res){
  //schema is for collection (new code)

    try {
        console.log("body", req.body);
       const newContact =  await Contact.create({
        name: req.body.my_name,
        phone: req.body.my_phone
        });

        console.log("****** newly created contact *********", newContact);
        return res.redirect('back');
    } catch(err) {
        console.log('Error in creating a contact', err);
        return;
        
    }

     // contactList.push({
    //      name:req.body.my_name,
    //      phone: req.body.my_phone
    // });
   // contactList.push(req.body);
    //return res.redirect('/');  // or we can we use 'back' 
    // if home URL is very big then we can simlpy write res.redirect('back') so need to write whole long URL


});
       
   


app.get('/delete-contact/', async function(req,res){
   //now deleting contact from DB

   //get the id from query in the URL
   let id = req.query.id;

   //find the contact in the database using id and delete
   try {
    let deletedContact = await Contact.findByIdAndDelete(id);

    console.log("Deleted contact ", deletedContact);
    return res.redirect('/');
   }
   catch(err){
        console.log("Error while deleting the contact from db", err);
        return;
   }

    // console.log(req.query);
    // let phone = req.query.phone; // it will pick phone when we click on cross symbol(x)
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // // if index is not -1 then we can delete that contactIndex from contactList
    // console.log(contactIndex);

    // if(contactIndex != -1){
    //   contactList.splice(contactIndex,1);
    // }

    // return res.redirect('/');
})







app.listen(port, function(err){
    if(err){
        console.log("Error in running express server ", err);
    }

    console.log("Yup! My express server is up and running on port", port);
})
