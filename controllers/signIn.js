function handleSignIn(req, res, bcrypt, db) {
  const { email, password } = req.body
  if (!email || !password) {
    res.json('incorrect log in details')
  } else {
    db.select('email', 'hash')
      .from('login')
      .where({
        email: email
      })
      .catch(err => {
        res.json('unable to get user')
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
              res.json('unable to get user')
            })
        } else {
          res.json('wrong log in details')
        }
      })
  }
}

module.exports = handleSignIn;