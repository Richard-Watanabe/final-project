require('dotenv/config');
const express = require('express');
const db = require('./db');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.post('/api/logs', (req, res, next) => {
  const dogId = parseInt(req.body.dogId);
  const { content } = req.body;
  if (!content) {
    res.status(400).json({
      error: 'Content is required'
    });
    return;
  }
  const sql = `
    insert into "logs" ("content", "userId", "dogId", "count")
    values ($1, $2, $3, $4)
    returning *
  `;
  const params = [content, 1, dogId, 1];
  db.query(sql, params)
    .then(result => {
      const newLog = result.rows[0];
      res.status(201).json(newLog);
    })
    .catch(err => next(err));
});

app.get('/api/logs', (req, res) => {
  const sql = `
    select "content","count", "logId", "createdAt"
      from "logs"
     order by "logId";
  `;
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

app.post('/api/photos', uploadsMiddleware, (req, res, next) => {
  const url = `/images/${req.file.filename}`;
  const sql = `
    insert into "photos" ("userId", "dogId", "url")
    values ($1, $2, $3)
    returning *;
  `;
  const params = [1, 1, url];
  db.query(sql, params)
    .then(result => {
      res.status(201).send(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/photos', (req, res, next) => {
  const sql = `
    select *
      from "photos"
      where "dogId" = 1
  `;
  db.query(sql)
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
