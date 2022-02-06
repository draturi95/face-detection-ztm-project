const handleSignin = (req, res) => (db, bcrypt) => {
	const { email, password } = req.body;

	if(!email || !password){
		return req.status(400).json("Invalid email/password")
	}

	db.where('email', '=', email).select('*').from('login')
		.then(data => {
			// if (data.length > 0) {
			if (bcrypt.compareSync(password, data[0].hash)) {
				return db.select('*').from('users').where('email', '=', email) // always return this when inside a then related to database.selct 
					.then(user => res.json(user[0]))//Note that this data is relied on, on the frontend
					.catch(() => res.status(400).json("Unable to get user"))
			}
			else
				res.status(400).json('Wrong Login Credentiasls')


		})
		.catch(() => res.json('error in the sigin code '));

}

module.exports = {
	handleSignin: handleSignin
}