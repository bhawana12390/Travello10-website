import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
  );

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
db.connect();
  
app.get("/", (req,res) =>{
    res.render("home.ejs");
});
app.get("/user-dashboard", (req,res) =>{
    res.render("user-dashboard.ejs");
});
app.get("/Register", (req,res) =>{
  res.render("register.ejs");
});
app.get("/Login", (req,res)=>{
  res.render("login.ejs");
});

// app.post("/login",(req,res)=>{
//   console.log(req.body.Email);
//   res.redirect("/");
// }
// );
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/user-dashboard",
    failureRedirect: "/login",
  })
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.post("/register",async (req,res)=>
{
    const username = req.body.UserName;
    const useremail = req.body.Email;
    const userphone = req.body.Phone;
    const userpassword = req.body.Password;
    const favplaces = req.body.FavPlaces;
    
    try {
        console.log(useremail);
        const checkResult = await db.query("SELECT * FROM userregdata WHERE useremail = $1", [
          useremail,
        ]);
    
        if (checkResult.rows.length > 0) {
          req.redirect("/user-dashboard");
        } else {
          bcrypt.hash(userpassword, saltRounds, async (err, hash) => {
            if (err) {
              console.error("Error hashing password:", err);
            } else {
              const result = await db.query(
                "INSERT INTO userregdata (useremail, userpassword , userphone, username, favplaces) VALUES ($1, $2,$3,$4,$5) RETURNING *",
                [useremail, hash, userphone ,username, favplaces]
              );
              const user = result.rows[0];
              req.login(user, (err) => {
                console.log("success");
                res.redirect("/");
              });
            }
          });
        }
      } catch (err) {
        console.log("here is error");
        console.log(err);
        
      }
});

passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    console.log(username);
    try {
      
      const result = await db.query("SELECT * FROM userregdata WHERE useremail = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.userpassword;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/user-dashboard",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const result = await db.query("SELECT * FROM userregdata WHERE useremail = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO userregdata (useremail, userpassword) VALUES ($1, $2)",
            [profile.email, "google"]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});
