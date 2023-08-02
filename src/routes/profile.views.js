import { Router } from "express";
const router = new Router();

function auth(req, res, next) {
  try {
    let session = req.session;
    console.log(session.user);
    if (!session.user) {
      res.send("inicia sesion primero");
      return false;
    }
    next();
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

router.get("/profile", auth, (req, res) => {
  try {
    res.render("profile", {});
  } catch (err) {
    console.log(err);
    res.render(err);
  }
});

export { router };
