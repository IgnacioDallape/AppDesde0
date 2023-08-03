import { Router } from "express";
const router = new Router();

function auth(req, res, next) {
  try {
    let session = req.session;
    if (!session.name) {
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
    let nombre = req.session.name
    res.render("profile", {name: nombre});
  } catch (err) {
    console.log(err);
    res.render(err);
  }
});

export { router };
