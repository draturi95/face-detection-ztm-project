require('dotenv').config(); 

const register = require('./controllers/register.js'); 
const signin = require('./controllers/signin.js')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex');


let PORT = process.env.PORT; 

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1', //local host 
		user: 'postgres', //note we havent specified the port
		password: 'Dhawal@123',
		database: 'smartbrain'
	}
})


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors())


app.post('/signin', (req, res) =>{signin.handleSignin(req, res)(db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req,res, db, knex, bcrypt)});

app.get('/profile/:id', (req, res) => profile.getProfile(req, res, db))

app.put('/image', (req, res) => image.handleImage(req, res, db)); 

app.post('/imageurl', (req, res) => image.handleApicall(req, res, db)); 


app.listen(PORT, () => {
	console.log('It isnt raining');
	console.log(process.env.PORT)
})






