var db = require('../db/config');

const User = {};

User.findByUserName = userName => {
  return db.oneOrNone('SELECT * FROM users WHERE username = $1', [userName]);
};

User.create = user => {
  return db.one(
    `
      INSERT INTO users
      (username, password, email, location, gender, profile_image, age)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `,
    [user.username, user.password, user.email, user.location, user.gender, user.profile_image, user.age]
  )
};

module.exports = User;