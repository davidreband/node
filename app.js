export default (express, bodyParser, createReadStream, crypto, http, mongoose, User, UserController, CORS) => {
  /*
  const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,OPTIONS,DELETE",
    "Access-Control-Allow-Headers":
      "x-test,Content-Type,Accept, Access-Control-Allow-Headers",
  };
  */
  const app = express();
  const URL = "mongodb+srv://davidreband:umGN4stz3622@cluster0.gviiz.mongodb.net/mongodemo?retryWrites=true&w=majority"

  app
    .use((req, res, next) => {
      res.set(CORS);
      next();
    })
    .use(bodyParser.urlencoded({ extended: true }))
    .use("/user/", UserController(express, User))

    .post('/insert/', async (req, res) => {
        const { URL, login, password } = req.body;

        console.log("__ee", "fdssfs");
        try {
          await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

          const newUser = new User({ login, password });
          await newUser.save();
          res.status(201).send(`User was saved with login ${login}`);
        } catch (e) {
          res.send(e.codeName);
        }
      })




    /*
    .post('/user/', async (r) => {
      const { URL, login, password } = r.body;
      const newUser = new User({ login, password });

      console.log("__ee", login);

      try {
        await mongoose.connect(URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        await newUser.save();
        r.res.status(201).json({ "Доавенно: ": login });
      } catch (e) {
        r.res.status(400).json({ "Ошибка:  ": "Нет пароля" });
      }
    })
    */
    .get("/login/", (req, res) => res.send("davidreband"))
     
    .get("/insert/", (req, res) => {

      console.log("__eggge", "saf");
      res
        .status(201)
        .set({ "Content-Type": "text/html; charset=utf-8" })
        .send(
          "<h1>HTML5</h1>" +
            '<form action="https://davidreband-week7.herokuapp.com/insert/" method="post">' +
            '<div>login: <input type="text" name="login"><br/><br/></div>' +
            '<div>password: <input type="text" required name="password" type="password"><br/><br/></div>' +
            '<div>URL: <input type="text" name="URL" value="mongodb+srv://davidreband:umGN4stz3622@cluster0.gviiz.mongodb.net/mongodemo?retryWrites=true&w=majority"><br/><br/></div>' +
            '<div><input type="submit" value="Submit"></div>' +
            "</form>"
        );
    })

    /*
    .get("/user/", async (r) => r.res.json(await User.find()))
    .get("/user/:login", async (r) => {
      const { login } = r.params;
      r.res.json(await User.find({ login }));
    })
    */
    .get("/code/", (req, res) => {
      res.set({ "Content-Type": "text/plain; charset=utf-8" });
      createReadStream(import.meta.url.substring(7)).pipe(res);
    })
    .get("/sha1/:input", (req, res) => {
      const { input } = req.params;
      const shasum = crypto.createHash("sha1");
      shasum.update(input);
      res.send(shasum.digest("hex"));
    })
    .all("/req/", (req, res) => {
      let url = req.method === "POST" ? req.body.addr : req.query.addr;
      http.get(url, (response) => {
        let data = "";
        response.on("data", (chunk) => (data += chunk));
        response.on("end", () => {
          res
            .set({
              "Content-Type": "text/plain; charset=utf-8",
            })
            .end(data);
        });
      });
    })
    .all("*", (req, res) => {
      res
        .status(404)
        .set({ "Content-Type": "text/html; charset=utf-8" })
        .send("davidreband");
    })
    .use((error, req, res, next) => {
      res
        .status(500)
        .set({ "Content-Type": "text/html; charset=utf-8" })
        .send("Error");
    });
  return app;
};