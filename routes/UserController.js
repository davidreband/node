export default (x, User) => {
  const router = x.Router();
  router
    .route("/")
    .get( async r => r.res.json(await User.find()))
    .post( async r =>{
        const { login, password } = r.body
        const newUser = new User({ login, password })
        await newUser.save()
        r.res.status(201).json({'Доавенно: ': login})
    })
  router
    .route("/:login")  
    .get( async (r) => {
      const { login } = r.params;
      r.res.json(await User.find({ login }));
    });
  return router;
};