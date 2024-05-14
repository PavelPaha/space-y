import * as path from "path";
import fs from "fs";
import express, {response} from "express";
import https from "https";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const rootDir = process.cwd();
const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('spa/build'));



app.get('/api/getUser', (req, res) => {
  res.json({
    user: req.cookies.user
  });
});

app.get("/client.mjs", (_, res) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.sendFile(path.join(rootDir, "client.mjs"), {
    maxAge: -1,
    cacheControl: false,
  });
});

app.get("/", (_, res) => {
  res.send(":)");
});

app.post('/api/logoutUser', (req, res) => {
  res.clearCookie('user');
  res.send();
})

app.post('/api/loginUser', (req, res) => {
  const user = req.body.user;

  res.cookie('user', user, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  });

  res.json({
    user: user
  });
});


app.get("/api/roadster", (_, res) => {
  fetch('https://api.spacexdata.com/v3/roadster')
      .then(response => response.json())
      .then(data => res.send(data))
      .catch(error => console.log(error));
});

app.get("/api/about", (_, res) => {
  fetch('https://api.spacexdata.com/v3/info')
      .then(response => response.json())
      .then(data => res.send(data))
      .catch(error => console.log(error));
});

app.get("/api/history", (_, res) => {
  fetch('https://api.spacexdata.com/v3/history')
      .then(response => response.json())
      .then(data => res.send(data))
      .catch(error => console.log(error));
});

app.get("/api/history/:id", async (req, res) => {
  const { id } = req.params;
  fetch(`https://api.spacexdata.com/v3/history/${id}`)
      .then(response => response.json())
      .then(data => {res.send(data)})
      .catch(error => console.log(error));
});

app.get("/api/rockets", (_, res) => {
  fetch('https://api.spacexdata.com/v3/rockets')
      .then(response => response.json())
      .then(data => res.send(data))
      .catch(error => console.log(error));
});

app.get("/api/rockets/:id", (req, res) => {
  const { id } = req.params;
  fetch(`https://api.spacexdata.com/v3/rockets/${id}`)
      .then(response => response.json())
      .then(data => res.send(data))
      .catch(error => console.log(error));
});

const checkSession = (req, res, next) => {
  if (req.cookies.user === undefined)
    res.redirect('/login');
  else
    next();
};

app.all('/*', checkSession, (req, res) => {
  const filePath = path.resolve(rootDir, "spa/build/index.html");
  res.sendFile(filePath);
});


https
    .createServer(
        {
          key: fs.readFileSync("certs/server.key"),
          cert: fs.readFileSync("certs/server.cert"),
        },
        app
    )
    .listen(port, function () {
    });