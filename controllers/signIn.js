function handleSignIn(req, res, bcrypt, db) {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json('incorrect log in details')
  } else {
    db.select('email', 'hash')
      .from('login')
      .where({
        email: email
      })
      .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash)
        if (isValid) {
          db.select('*')
            .from('users')
            .where({
              email: email
            })
            .then(user => {
              res.json(user[0])
            })
            .catch(err => {
              res.status(400).json('unable to get user')
            })
        } else {
          res.status(400).json('wrong log in details')
        }
      })
  }
}

module.exports = handleSignIn;