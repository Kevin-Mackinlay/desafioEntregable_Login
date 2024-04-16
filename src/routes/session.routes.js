
import { Router } from "express";
import passport from "passport";
import sessionController from "../controllers/session.controller.js";
import authorization from "../passportJwt/authorization.js";

const sessionRouter = Router();
const sessionsController = new sessionController();


sessionRouter.post(
    "/login",
    
    (req, res, next) => {

passport.authenticate("login", (err, user, info) => {
   if (err) {
     // Log the error and return a generic error message
     console.error(err);
     return res.status(500).json({ success: false, message: "Internal server error" });
   }
   if (!user) {
     // Check if info exists and has a message; otherwise, provide a default message
     const message = info && info.message ? info.message : "Authentication failed without further information.";
     return res.status(400).json({ success: false, message });
   }
    next();
})(req, res, next);
    },
    sessionsController.login
);




sessionRouter.post(
    "/signup",
    (req,res,next) => {
        passport.authenticate("signup",{session:false},(err,user,info) => {
            if(err || !user){
                console.log(info);
                return res.status(400).json({success:false, message:info.message});
            }
            next();
        })(req,res,next);
    }
    ,
    sessionsController.signup
);
    

sessionRouter.get("/google", (req, res, next) => {
  passport.authenticate("google", { scope: ["profile email"] }, (err, user, info) => {
    if (err || !user) {
      console.log(info);
      return res.status(401).json({ success: false, message: info.message });
    }

    next();
  })(req, res, next);
});

sessionRouter.get("/googlecallback", passport.authenticate("google"), (req, res) => {
  res.redirect("/products");
});
 
sessionRouter.get("/private", passport.authenticate("login", { session: false }), sessionsController.private);
sessionRouter.post("/logout", sessionsController.logout);
sessionRouter.get("/current", authorization(["user", "premium", "admin"]),sessionsController.infoCurrent);


export default sessionRouter;
