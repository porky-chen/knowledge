import express from "express";
import compression from "compression";  // compresses requests 压缩请求
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca"; // 必须使用express-session、cookie-session等会话管理,以便使用lusca
import MongoStore from "connect-mongo";// MongoDB会话存储，用于Typescript编写的Connect和Express。
import flash from "express-flash"; // 为您的快捷申请提供快捷信息
import path from "path";
import mongoose from "mongoose";
import passport from "passport"; // 验证请求,这个API很简单:您为Passport提供一个身份验证请求，Passport提供钩子来控制身份验证成功或失败时发生的事情。
import bluebird from "bluebird"; // 期约使用
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as userController from "./controllers/user";
import * as apiController from "./controllers/api";
import * as contactController from "./controllers/contact";

// API keys and Passport configuration
import * as passportConfig from "./config/passport";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug"); // 使用模板
app.use(compression()); // 压缩
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true, //如果没有发生任何修改 boolean 储存session。
    saveUninitialized: true, //在存储一些新数据之前,boolean 创建session
    secret: SESSION_SECRET,
    store: new MongoStore({
        mongoUrl,
        ttl: 1 * 24 * 60 * 60, // expired time cookie or session
        autoRemove: "native", // default delete expired session
        touchAfter: 24 * 60 * 60, // lazy session update 只要在24小时内，无论你发多少个请求，session之后被更新一次
        mongoOptions: {
            autoReconnect: true,
        }
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // 快速获取信息
app.use(lusca.xframe("SAMEORIGIN")); //启用X-FRAME-OPTIONS头, 防止点击劫持。
app.use(lusca.xssProtection(true)); // 在旧的IE浏览器(IE8)中启用X-XSS-Protection头，以帮助防止跨站脚本攻击(XSS)
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use((req, res, next) => {
    // After successful login, redirect back to the intended page
    //登陆成功的重定向
    if (!req.user &&
    req.path !== "/login" &&
    req.path !== "/signup" &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
        req.session.returnTo = req.path;
    } else if (req.user &&
    req.path == "/account") {
        req.session.returnTo = req.path;
    }
    next();
});

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }) // 最大时长maxAge,1年
);

/**
 * Primary app routes. 主要app路由
 */
app.get("/", homeController.index);
app.get("/login", userController.getLogin);
app.post("/login", userController.postLogin);
app.get("/logout", userController.logout);
app.get("/forgot", userController.getForgot);
app.post("/forgot", userController.postForgot);
app.get("/reset/:token", userController.getReset);
app.post("/reset/:token", userController.postReset);
app.get("/signup", userController.getSignup);
app.post("/signup", userController.postSignup);
app.get("/contact", contactController.getContact);
app.post("/contact", contactController.postContact);
app.get("/account", passportConfig.isAuthenticated, userController.getAccount);
app.post("/account/profile", passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post("/account/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post("/account/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
app.get("/account/unlink/:provider", passportConfig.isAuthenticated, userController.getOauthUnlink);

/**
 * API examples routes.
 */
app.get("/api", apiController.getApi);
app.get("/api/facebook", passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);

/**
 * OAuth authentication routes. (Sign in) 登录权限路由
 */
app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
    res.redirect(req.session.returnTo || "/");
});

export default app;
