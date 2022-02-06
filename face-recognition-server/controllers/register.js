const handleRegister = (req,res, db, knex, bcrypt) => {

	let { name, email, password } = req.body;
	if(!name || !email || !password){
		return res.status(400).json('Invalid name/email/password');
	}

	const hash = bcrypt.hashSync(password)

	db.transaction(trx => {
		trx.insert({ hash, email }).into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
					.returning('*') //knex has in build returning function which can be  used to return and we can use res.json in the promise itself with .then()
					.insert({
						email: loginEmail[0],
						name: name,
						joined: new Date() //note entries in database were default 0
					})
					.then(user => res.json(user[0]))
			})
			.then(trx.commit)
			.catch(trx.rollback)
	}).catch(() => res.status(400).json('error in registering the user'))

	
}



module.exports = {
    handleRegister: handleRegister
}