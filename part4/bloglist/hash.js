const bcrypt = require('bcrypt');

const plainTextPassword = '123'; // This should be the user's actual password
const saltRounds = 10;

bcrypt.hash(plainTextPassword, saltRounds, function(err, hash) {
  if (err) {
    throw err;
  }
  console.log('Hashed password:', hash);
});
