import async from "async";
import crypto from "crypto"; // crypto-random-strin 随即令牌token
import nodemailer from "nodemailer"; // 想要用IMAP接收和读取邮件而不是发送邮件? 发送电子邮件
import passport from "passport";
import { User, UserDocument, AuthToken } from "../models/User";
import { Request, Response, NextFunction } from "express";
import { IVerifyOptions } from "passport-local";
import { WriteError } from "mongodb";
import { body, check, validationResult } from "express-validator"; // 校验
import "../config/passport";
import { CallbackError, NativeError } from "mongoose";

/**
 * Login page. 获取登陆界面
 * @route GET /login
 */
export const getLogin = (req: Request, res: Response): void => {
    if (req.user) {
        return res.redirect("/");
    }
    res.render("account/login", {
        title: "Login",
    });
};

/**
 * Sign in using email and password. 登录email和密码
 * @route POST /login
 */
export const postLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await check("email", "Email is not valid").isEmail().run(req); // 检查所有req.body,req.cookies,req.headers,req.params,req.query
    await check("password", "Password cannot be blank").isLength({min: 1}).run(req);
    await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);// 只检查req.body

    const errors = validationResult(req); // 校验结果
    // 校验不通过
    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/login");
    }
    //接受web数据，调用策略进行验证。通常绑定到'/login'路由，该路由负责传递所需的web数据
    passport.authenticate("local", (err: Error, user: UserDocument, info: IVerifyOptions) => {
        if (err) { return next(err); }
        if (!user) {
            req.flash("errors", {msg: info.message});
            return res.redirect("/login");
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            req.flash("success", { msg: "Success! You are logged in." });
            res.redirect(req.session.returnTo || "/");
        });
    })(req, res, next);
};

/**
 * Log out. 退出
 * @route GET /logout
 */
export const logout = (req: Request, res: Response): void => {
    req.logout();
    res.redirect("/");
};

/**
 * Signup page. 获取注册界面
 * @route GET /signup
 */
export const getSignup = (req: Request, res: Response): void => {
    if (req.user) {
        return res.redirect("/");
    }
    res.render("account/signup", {
        title: "Create Account"
    });
};

/**
 * Create a new local account. 创建一个新的本地账号
 * @route POST /signup
 */
export const postSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await check("email", "Email is not valid").isEmail().run(req);
    await check("password", "Password must be at least 4 characters long").isLength({ min: 4 }).run(req);
    await check("confirmPassword", "Passwords do not match").equals(req.body.password).run(req);
    await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req); //规范化电子邮件以进行唯一性验证。这将转换电子邮件为小写，删除点(.)和加号后的任意字符串(+foobar)。

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/signup");
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    User.findOne({ email: req.body.email }, (err: NativeError, existingUser: UserDocument) => {
        if (err) { return next(err); }
        if (existingUser) {
            req.flash("errors", { msg: "Account with that email address already exists." });
            return res.redirect("/signup");
        }
        user.save((err) => {
            if (err) { return next(err); }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.redirect("/");
            });
        });
    });
};

/**
 * Profile page. 个人信息页面
 * @route GET /account
 */
export const getAccount = (req: Request, res: Response): void => {
    res.render("account/profile", {
        title: "Account Management"
    });
};

/**
 * Update profile information. 更新个人信息
 * @route POST /account/profile
 */
export const postUpdateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await check("email", "Please enter a valid email address.").isEmail().run(req);
    await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/account");
    }

    const user = req.user as UserDocument;
    User.findById(user.id, (err: NativeError, user: UserDocument) => {
        if (err) { return next(err); }
        user.email = req.body.email || "";
        user.profile.name = req.body.name || "";
        user.profile.gender = req.body.gender || "";
        user.profile.location = req.body.location || "";
        user.profile.website = req.body.website || "";
        user.save((err: WriteError & CallbackError) => {
            if (err) {
                if (err.code === 11000) {
                    req.flash("errors", { msg: "The email address you have entered is already associated with an account." });
                    return res.redirect("/account");
                }
                return next(err);
            }
            req.flash("success", { msg: "Profile information has been updated." });
            res.redirect("/account");
        });
    });
};

/**
 * Update current password. 更新当前密码
 * @route POST /account/password
 */
export const postUpdatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await check("password", "Password must be at least 4 characters long").isLength({ min: 4 }).run(req);
    await check("confirmPassword", "Passwords do not match").equals(req.body.password).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/account");
    }

    const user = req.user as UserDocument;
    User.findById(user.id, (err: NativeError, user: UserDocument) => {
        if (err) { return next(err); }
        user.password = req.body.password;
        user.save((err: WriteError & CallbackError) => {
            if (err) { return next(err); }
            req.flash("success", { msg: "Password has been changed." });
            res.redirect("/account");
        });
    });
};

/**
 * Delete user account. 删除用户账号
 * @route POST /account/delete
 */
export const postDeleteAccount = (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as UserDocument;
    User.remove({ _id: user.id }, (err) => {
        if (err) { return next(err); }
        req.logout();
        req.flash("info", { msg: "Your account has been deleted." });
        res.redirect("/");
    });
};

/**
 * Unlink OAuth provider.
 * @route GET /account/unlink/:provider
 */
export const getOauthUnlink = (req: Request, res: Response, next: NextFunction): void => {
    const provider = req.params.provider;
    const user = req.user as UserDocument;
    User.findById(user.id, (err: NativeError, user: any) => {
        if (err) { return next(err); }
        user[provider] = undefined;
        user.tokens = user.tokens.filter((token: AuthToken) => token.kind !== provider);
        user.save((err: WriteError) => {
            if (err) { return next(err); }
            req.flash("info", { msg: `${provider} account has been unlinked.` });
            res.redirect("/account");
        });
    });
};

/**
 * Reset Password page.
 * @route GET /reset/:token
 */
export const getReset = (req: Request, res: Response, next: NextFunction): void => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    User
        .findOne({ passwordResetToken: req.params.token })
        .where("passwordResetExpires").gt(Date.now())
        .exec((err, user) => {
            if (err) { return next(err); }
            if (!user) {
                req.flash("errors", { msg: "Password reset token is invalid or has expired." });
                return res.redirect("/forgot");
            }
            res.render("account/reset", {
                title: "Password Reset"
            });
        });
};

/**
 * Process the reset password request.  处理重置密码请求。
 * @route POST /reset/:token
 */
export const postReset = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await check("password", "Password must be at least 4 characters long.").isLength({ min: 4 }).run(req);
    await check("confirm", "Passwords must match.").equals(req.body.password).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("back");
    }

    //瀑布流函数 async.waterfall(tasks<Array依次执行的任务名>,callback<执行出现错误时会执行这个回调函数将错误信息返回，当tasks无错时会在执行完tasks之后执行callback>)串行执行数组中的每一个函数最后执行回调
    //可大大降低代码耦合度，async.waterfall实现了一些列函数的异步组合
    async.waterfall([
        function resetPassword(done: (err: any, user: UserDocument) => void) {
            User
                .findOne({ passwordResetToken: req.params.token })
                .where("passwordResetExpires").gt(Date.now())
                .exec((err, user: any) => {
                    if (err) { return next(err); }
                    if (!user) {
                        req.flash("errors", { msg: "Password reset token is invalid or has expired." });
                        return res.redirect("back");
                    }
                    user.password = req.body.password;
                    user.passwordResetToken = undefined;
                    user.passwordResetExpires = undefined;
                    user.save((err: WriteError) => {
                        if (err) { return next(err); }
                        req.logIn(user, (err) => {
                            done(err, user);
                        });
                    });
                });
        },
        function sendResetPasswordEmail(user: UserDocument, done: (err: Error) => void) {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            // let testAccount = await nodemailer.createTestAccount();
            //使用默认SMTP传输创建可重用传输器对象,(邮箱账号)
            const transporter = nodemailer.createTransport({
                // host: "smtp.ethereal.email",
                // port: 587,
                // secure: false, // true for 465, false for other ports
                service: "SendGrid",
                auth: {
                    user: process.env.SENDGRID_USER,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
            const mailOptions = {
                to: user.email, // 接收列表'emil@example.com,emil2@example.com'
                from: "express-ts@starter.com", // 发送地址
                subject: "Your password has been changed", // 主题
                html: "<b>Hello node</b>", // html body
                text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n` // 文本区域
            };
            // send mail with defined transport object 发送文件与定义对象
            transporter.sendMail(mailOptions, (err) => {
                req.flash("success", { msg: "Success! Your password has been changed." }); // pug的事件
                done(err);
            });
        }
    ], (err) => {
        if (err) { return next(err); }
        res.redirect("/");
    });
};

/**
 * Forgot Password page.
 * @route GET /forgot
 */
export const getForgot = (req: Request, res: Response): void => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    res.render("account/forgot", {
        title: "Forgot Password"
    });
};

/**
 * Create a random token, then the send user an email with a reset link.
 * 创建一个随机令牌，发送user和email的一个重置链接
 * @route POST /forgot
 */
export const postForgot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await check("email", "Please enter a valid email address.").isEmail().run(req);
    await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/forgot");
    }

    async.waterfall([
        function createRandomToken(done: (err: Error, token: string) => void) {
            crypto.randomBytes(16, (err, buf) => {
                const token = buf.toString("hex"); // 二进制的16字节随机数hex
                done(err, token);
            });
        },
        function setRandomToken(token: AuthToken, done: (err: NativeError | WriteError, token?: AuthToken, user?: UserDocument) => void) {
            User.findOne({ email: req.body.email }, (err: NativeError, user: any) => {
                if (err) { return done(err); }
                if (!user) {
                    req.flash("errors", { msg: "Account with that email address does not exist." });
                    return res.redirect("/forgot");
                }
                user.passwordResetToken = token;
                user.passwordResetExpires = Date.now() + 3600*1000; // 1 hour
                user.save((err: WriteError) => {
                    done(err, token, user);
                });
            });
        },
        function sendForgotPasswordEmail(token: AuthToken, user: UserDocument, done: (err: Error) => void) {
            const transporter = nodemailer.createTransport({
                service: "SendGrid",
                auth: {
                    user: process.env.SENDGRID_USER,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
            const mailOptions = {
                to: user.email,
                from: "hackathon@starter.com",
                subject: "Reset your password on Hackathon Starter",
                text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.headers.host}/reset/${token}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`
            };
            transporter.sendMail(mailOptions, (err) => {
                req.flash("info", { msg: `An e-mail has been sent to ${user.email} with further instructions.` });
                done(err);
            });
        }
    ], (err) => {
        if (err) { return next(err); }
        res.redirect("/forgot");
    });
};

/*
Node 环境的async
* 10、async(waterfall,parallel,eachSeries,map,whilst) - node

一、async.waterfall(tasks,callback) - 瀑布流函数,串行执行每一个函数
· tasks是一个Array，包含依次执行的函数
· callback是回调函数，但瀑布流函数执行出现错误时会执行这个回调并将错误返回，当瀑布流函数无错误时，会在执行完tasks中后执行这个回调

二、async.parallel(tasks,callback) - 并行运行函数
· tasks不必等到上一个函数完成。如果任何函数发生错误，会立刻执行回调函数，返回错误信息；若没有则执行完tasks回调

三、async.eachSeries(coll,iteratee,callback)
异步执行一系列操作，保证每次遍历都执行完毕后再执行下一次的操作
· coll - [] || {},用来遍历
· iteratee - 每次遍历的执行函数可以接收(item,callback) -> callback(err)到回调
· callback - 回调函数，错误则返回，否在完成所有返回

四、async.map(coll,iteratee,callback)
· 执行顺序非固定，返回结果会按照顺序返回
· 并行执行，没发生错误情况下，会等到所有项执行完毕执行最后callback

五、async.whilist(test,iteratee,callbackopt)
· test - 循环判断函数。判断是否执行第二个函数的条件，类似循环条件，true继续执行
· iteratee - 循环执行函数。异步执行的操作，执行完后修改循环条件
· callbackop - 回调，接收错误或最后
let totalArr = [1,2,3,4]
async.whilist(
    function(){
        return totalArr.length > 0
    },
    (cb) => {
        totalArr.pop()
        cb(null,totalArr)
    },
    (err,result) => {
        done()
    }
)
* */
