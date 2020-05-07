const dbSchema = 
  `CREATE TABLE IF NOT EXISTS Users (
    id integer NOT NULL PRIMARY KEY,
    login text NOT NULL UNIQUE,
    password text NOT NULL,
    secret text
  );`

module.exports = { dbSchema };
