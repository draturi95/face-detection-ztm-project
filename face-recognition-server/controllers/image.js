require('dotenv').config(); 

const Clarifai = require('clarifai'); 


const app = new Clarifai.App({
	apiKey: process.env.CLARIFAI_API_KEY
   });

const handleApicall = (req, res, db) => {
	app.models.
		predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data =>{
			res.json(data)
		})
		.catch(	err => response.status(400).json('error in contacting api via backend'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;

	db('users').where('id', '=', id).increment('entries', 1)
		.returning('entries')
		.then(entries => res.json(entries[0]))
		.catch(() => res.status(400).json('Unable to get the count'));


}

module.exports = {
    handleImage: handleImage, 
	handleApicall: handleApicall
}