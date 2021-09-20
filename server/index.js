require('dotenv/config');
const express = require('express');
const db = require('./db');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const argon2 = require('argon2');
const ClientError = require('./client-error');
const jwt = require('jsonwebtoken');
const authorizationMiddleware = require('./authorization-middleware');

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.post('/api/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are both required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username";
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword",
           "dogId"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.post('/api/dog-name', (req, res, next) => {
  const { dogName } = req.body;
  const { userId } = req.user;
  if (!dogName) {
    res.status(400).json({
      error: 'Content is required'
    });
    return;
  }
  const sql = `
    with "insert_dog" as (
      insert into "dogs" ("dogName")
      values ($1)
    returning "dogId"
    ), "insert_owner" as (
      insert into "owners" ("dogId", "userId")
      values ((select "dogId" from "insert_dog"), $2)
      returning "dogId"
    )
    select "dogId" from "insert_owner"
  `;
  const params = [dogName, userId];
  db.query(sql, params)
    .then(result => {
      const dogId = result.rows;
      res.json({ dogId });
    })
    .catch(err => next(err));
});

app.patch('/api/dog-name', (req, res, next) => {
  const { dogId } = req.body;
  const { userId } = req.user;
  const sql = `
    update "users"
       set "dogId" = $1
     where "userId" = $2
     returning *
  `;
  const params = [dogId, userId];
  db.query(sql, params)
    .then(result => {
      const [dogId] = result.rows;
      res.status(201).json({ dogId });
    })
    .catch(err => next(err));
});

app.get('/api/dog-name', (req, res) => {
  // const { userId } = req.user;
  const sql = `
    select "dogName"
      from "dogs"
  `;
  // const params = [userId];
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/logs', (req, res, next) => {
  const { userId, dogId } = req.user;
  const { content } = req.body;
  if (!content) {
    res.status(400).json({
      error: 'Content is required'
    });
    return;
  }
  const sql = `
    insert into "logs" ("content", "userId", "dogId")
    values ($1, $2, $3)
    returning *
  `;
  const params = [content, userId, dogId];
  db.query(sql, params)
    .then(result => {
      const newLog = result.rows[0];
      res.status(201).json(newLog);
    })
    .catch(err => next(err));
});

app.get('/api/logs', (req, res) => {
  const { dogId } = req.user;
  const sql = `
    select "content", "logId", "createdAt"
      from "logs"
      join "dogs" using ("dogId")
    where "dogId" = $1
  `;
  const params = [dogId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/photos', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const { dogId } = req.user;
  const url = `/images/${req.file.filename}`;
  const sql = `
    insert into "photos" ("userId", "dogId", "url")
    values ($1, $2, $3)
    returning *;
  `;
  const params = [userId, dogId, url];
  db.query(sql, params)
    .then(result => {
      res.status(201).send(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/photos', (req, res, next) => {
  const { dogId } = req.user;
  const sql = `
    select *
      from "photos"
      join "dogs" using ("dogId")
    where "dogId" = $1
  `;
  const params = [dogId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
