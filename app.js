
import fetch from "node-fetch";
import Browser from "zombie";
export default (express, bodyParser, createReadStream, crypto, http, mongoose, User, UserController, CORS, writeFileSync) => {
  /*
  const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,OPTIONS,DELETE",
    "Access-Control-Allow-Headers":
      "x-test,Content-Type,Accept, Access-Control-Allow-Headers",
  };
headerCont  */


  const app = express();
  const URL = "mongodb+srv://davidreband:umGN4stz3622@cluster0.gviiz.mongodb.net/mongodemo?retryWrites=true&w=majority"

  const headerController = r => {

    r.res.set(CORS).send("OK");
  }

  app
    .use((req, res, next) => {
      res.set(CORS);
      next();
    })
    .use(express.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use("/user/", UserController(express, User))

    .get("/test/", async (req, res) => {
      const url = req.query.URL;

      Browser.localhost(url, process.env.PORT);

      const browser = new Browser();

      //console.log(url);

      await browser
        .visit(url, function () {
          console.log("_url", browser.location.href);
          browser.pressButton("#bt");

          console.log(browser.field('#inp').value);
      res
        .status(201)
        .set({ "Content-Type": "text/plane; charset=utf-8" })
        .send(browser.field("#inp").value);

        
        
        })
        

      //aaa = await browser.html("#bt");

      // var got = await browser.html("#bt");

      //console.log("_got", aaa);

      

      //const shasum = crypto.createHash("sha1");
      //shasum.update(input);
    })

    .post("/insert/", async (req, res) => {
      const { URL, login, password } = req.body;

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

    .put("/header/", (r) => {
      //const CORS = {
      //  "Access-Control-Allow-Origin": "*",
      //};
      // r.res.set(CORS);
      r.res.status(201).set(CORS).send("OK");
    })
    .options("/header/", (r) => {
      // const CORS = {
      //   "Access-Control-Allow-Origin": "*",
      // };
      // r.res.set(CORS);
      r.res.status(201).set(CORS).send("OK");
    })

    .get("/wordpress/", async (req, res) => {
      try {
        //fetch("https://reband.ru/2020/12/19/hello-world/")
        //.then((x) => x.json())

        fetch("https://reband.ru/wp-json/wp/v2/posts/1")
          .then((x) => x.json())
          .then((x) => res.status(201).send(x));
        //res
        //  .set({ "Content-Type": "text/html; charset=utf-8" })
        // .status(201)
        // .send(x);}
      } catch (e) {
        console.error(e);
      }
    })

    .get("/wordpress/wp-json/wp/v2", async (req, res) => {
      try {
        fetch("https://reband.ru/wp-json/wp/v2/posts/1")
          .then((x) => x.json())
          .then((x) => res.status(201).send(x));
      } catch (e) {
        console.error(e);
      }

      //console.log("_ddd", fromWordpress); :input
    })

    .get("/render/", (req, res) => {
      console.log("__eggge", "saf");
      res
        .status(201)
        .set({ "Content-Type": "text/html; charset=utf-8" })
        .send(
          "<h1>HTML5</h1>" +
            '<form action="https://davidreband-week7.herokuapp.com/insert/" method="post">' +
            '<div>login: <input type="text" name="login"><br/><br/></div>' +
            '<div>password: <input type="text" required name="password" type="password"><br/><br/></div>' +
            '<div>URL: <input type="text" name="URL" ><br/><br/></div>' +
            '<div><input type="submit" value="Submit"></div>' +
            "</form>"
        );
    })

    .post("/render/", (req, res) => {
      const { random2, random3 } = req.body;

      console.log("_sss", req.query.addr);

      //res.status(201).json({ "Доавенно: ": req.query.addr });

      res.status(201).format({
        "text/html": () =>
          res.render("week7.pug", { random2: random2, random3: random3 }),

        // res.renderFile("http://kodaktor.ru/j/unsafe_0ebdb", {   random2: random2,      random3: random3,     }),
      });

      //r.params
      /*
      const { URL, login, password } = r.body; req.query.addr
      const newUser = new User({ login, password });
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
      */
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
            '<div>URL: <input type="text" name="URL" ><br/><br/></div>' +
            '<div><input type="submit" value="Submit"></div>' +
            "</form>"
        );
    })

    /*
    value="mongodb+srv://davidreband:umGN4stz3622@cluster0.gviiz.mongodb.net/mongodemo?retryWrites=true&w=majority"
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
    })
    .set("view engine", "pug");
  return app;
};