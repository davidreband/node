export default (x, User) => {
  const router = x.Router();

  console.log("__RRR", router);
   
  router
    .route("/")    
    .get( async r => r.res.json(await User.find()))
    .post( async r =>{
        const { URL, login, password } = r.body;
        const newUser = new User({ login, password })
        try{
            await mongoose.connect(URL, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
             });
            await newUser.save()
            r.res.status(201).json({ "Доавенно: ": login });
        }catch (e) {
            r.res.status(400).json({ "Ошибка:  ": "Нет пароля" });
        }    
    })
  router
    .route("/:login")  
    .get( async (r) => {
      const { login } = r.params;
      console.log("__ee", "ddddd");
      r.res.json(await User.find({ login }));
    });
  return router;
};