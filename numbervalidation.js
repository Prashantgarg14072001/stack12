const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let PORT = 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const dob = req.body.dob;
  const phone = req.body.phone;

  const phoneRegex = /^\d{10}$/;

  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  res.redirect('/submitted-forms');
});

app.get('/submitted-forms', (req, res) => {

});
const start = async()=>{
try{
  app.listen(PORT,()=>{
    console.log('I am live in port no. 5000 ${PORT}');
  });
}
catch(error){}
};
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
