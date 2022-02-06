const getProfile = (req, res, db) => {
	const { id } = req.params;
	let userAns = {};

	db.where('id', '=', id).select('*').from('users')
		.then(user => {
			if (user.length > 0)
				res.json(user[0])
			else res.json("User doesn't exist")
		})
		.catch(() => res.status(404).json('Error in fetching this user'))

}

module.exports = {
    getProfile: getProfile
}