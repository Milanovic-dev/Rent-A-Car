const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;
const uuidv4 = require('uuid/v4');
//env
const dotenv = require('dotenv');
const {sendMail} = require('./mail');
dotenv.config();

//database
const dbConnect = require('../db');
const dbCollection = 'users';
let db;
const { log, logCustom } = require('./security/logger')


dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
    .then(async (conn) => {
        db = conn;

        register({
            username: 'user0',
            password: 'User0#2020',
            firstName: 'Nikola',
            lastName: 'Milanovic',
            email: 'nikolamilanovic21@gmail.com',
            permissions: [
                'orders-permission',
                'client-orders-permission',
                'messages-permission',
                'car-action-permission',
                'get-codebook-permission',
                'comments-permission'
            ],
            role: 'user'
        });

        register({
            username: 'user1',
            password: 'User1#2020',
            firstName: 'Milana',
            lastName: 'Tucakov',
            email: 'milanatucakov@gmail.com',
            permissions: [
                'orders-permission',
                'client-orders-permission',
                'messages-permission',
                'car-action-permission',
                'get-codebook-permission',
                'comments-permission'
            ],
            role: 'user'
        });

        register({
            username: 'user2',
            password: 'User2#2020',
            firstName: 'Milan',
            lastName: 'Stanojevic',
            email: 'milanstanojevic@gmail.com',
            permissions: [
                'orders-permission',
                'client-orders-permission',
                'messages-permission',
                'car-action-permission',
                'get-codebook-permission',
                'comments-permission'
            ],
            role: 'user'
        });

        register({
            username: 'milan-stanojevic',
            password: 'Milan2020#',
            firstName: 'Milan',
            lastName: 'Stanojevic',
            email: 'stanojevic.milan97@gmail.com',
            permissions: [
                'orders-permission',
                'client-orders-permission',
                'messages-permission',
                'car-action-permission',
                'get-codebook-permission',
                'comments-permission'
            ],
            role: 'user'
        });


        register({
            username: 'admin',
            password: 'Admin2020#',
            firstName: 'Admin',
            lastName: 'Admin',
            email: 'admin@gmail.com',
            role: 'admin',
            permissions: [
                '*',
            ],
        });

    }).catch((e) => {
        console.log(`DB error: ${e}`);
    })



const generatePermissionMiddleware = (permission) => {
    return async (req, res, next) => {
        if (typeof req.headers.authorization !== "undefined") {
            let token = req.headers.authorization.split(" ")[1];

            jwt.verify(token, process.env.JWT_SECRET, { algorithm: "HS256" }, (err, user) => {
                res.locals.uid = user.id;
                if (err) {
                    res.status(401).json({ error: "Not Authorized" });
                    log(req, 401)
                    logCustom('WARNING Attempted access to resource without permission ');
                    return;
                    //throw new Error("Not Authorized");
                }

                db.collection('users').find({ username: user.id }).toArray((err, result) => {
                    if (err) {
                        res.status(404).json({ error: "Not Found" });
                        return;
                    }

                    if (result && !result.length) {
                        res.status(404).json({ error: "Not Found" });
                        return;
                    }

                    if (result[0].permissions && result[0].permissions.indexOf('*') !== -1) {
                        return next();
                    }

                    if (result[0].permissions && result[0].permissions.indexOf(permission) !== -1) {
                        return next();
                    }

                    res.status(401).json({ error: "Not Authorized" });
                    log(req, 401)
                    logCustom('WARNING 401 Attempted access to resource without permission ');
                    return;
                });
            });
        } else {
            res.status(401).json({ error: "Not Authorized" });
            log(req, 401)
            logCustom('WARNING 401 Attempted access to resource without permission ');
            return;
            //throw new Error("Not Authorized");
        }
    }

}


const DORProtection = async (req, res, next) => {
    if (typeof req.headers.authorization !== 'undefined') {
        let token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, { algorithm: 'HS256' }, async (err, user) => {
            if (err) {
                res.status(401).json({ error: 'Not Authorized' });
                throw new Error("Not Authorized");
            }

            const id = user.id;

            const dbUser = await db.collection(dbCollection).findOne({ _id: ObjectID(id) });
            const permissions = dbUser.permissions;

            if (permissions) {
                if (permissions.indexOf('accessDOR') !== -1 || permissions.indexOf('*') !== -1) {
                    next();
                    return;
                }
            }
            if (req.params !== 'undefined') {
                const paramsId = req.params.id;
                if (paramsId === id) {
                    next();
                    return;
                }
            }

            res.status(401).json({ error: 'Not Authorized' });
            throw new Error("Not Authorized");
        });
    } else {
        res.status(401).json({ error: 'Not Authorized' });
        throw new Error("Not Authorized");
    }
};


const login = async (username, password) => {
    let user = await db.collection(dbCollection).findOne({ username: username });

    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            let token = jwt.sign({ "id": user.username }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '7d' });
            if (user.status == 1) {
                return {
                    response: {
                        error: 'User disabled'
                    },
                    status: 401
                };

            } else {

                return {
                    response: {
                        token,
                        role: user.role
                    },
                    status: 200
                };
            }
        }
        else {
            return {
                response: {
                    error: "Wrong creditials"
                },
                status: 400
            };
        }
    }
    else {
        return {
            response: {
                error: "User doesn't exist."
            },
            status: 404
        };
    }
};

const checkPassword = (password) => {
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (password.match(decimal))
        return true;
    else
        return false;
}

const updatePassword = async ({ oldPassword, newPassword }, authorization) => {
    const result = await new Promise((resolve, reject) => {
        let token = authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, { algorithm: 'HS256' }, async (err, user) => {
            if (err) {
                logCustom(`WARNING Attempted to change password without permission`);
                resolve({ status: 401 })
                return;
            }

            let user0 = await db.collection(dbCollection).findOne({ username: user.id });

            if (bcrypt.compareSync(oldPassword, user0.password)) {
                await db.collection(dbCollection).updateOne({ username: user.id }, { $set: { password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10, 'b')) } });
                resolve({ status: 200 })
            }

            resolve({ status: 400 })
        })
    })

    return result;
}

const register = async (user, enableVerify = null) => {

    let dbUser = await db.collection(dbCollection).findOne({ username: user.username });

    if (dbUser) {
        return {
            response: {
                error: "User with that username already exists."
            },
            status: 400
        };
    }

    if (!user.password) return { status: 400 };


    if (!checkPassword(user.password)) {
        return {
            response: {
                error: "Password must contain between 8-15 characters, one uppercase, one lowercase, one number and one special char."
            },
            status: 400
        }
    }

    user._id = ObjectID();

    if (enableVerify) {
        user.emailVerified = false;
        user.status = 1;

    } else {
        user.emailVerified = true;
    }

    if(!user.role){
        user.role = 'user';
    }

    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10, 'b'));
    user.regTimestamp = new Date().getUTCMilliseconds();

    let storeResult = await db.collection(dbCollection).insertOne(user);

    if (storeResult.insertedCount == 1) {
        return {
            status: 200,
            response: {}
        };
    }
    else {
        return {
            response: {
                error: "Something went wrong."
            },
            status: 500
        }
    }
};

const verifyEmail = async (uid, code) => {
    let user = await db.collection(dbCollection).findOne({ _id: ObjectID(uid) });
    if (!user) {
        return {
            response: {
                error: "User not exists."
            },
            status: 404
        };
    }

    if (user.emailVerified) {

        return {
            response: {
                error: "Email adress already verified."
            },
            status: 200
        };

    }

    if (code == user.emailVerificationCode) {
        if (Math.floor(new Date().getTime() / 1000 >= user.emailTimestampLimit)) {
            return {
                response: {
                    error: "Email verificaton code expired."
                },
                status: 401
            };
        }

        await db.collection(dbCollection).updateOne({ _id: user._id }, {
            $set: {
                emailVerified: true,
                emailVerificationCode: null,
                emailTimestampLimit: null
            }
        });
        return {
            response: {
                message: "Email address verified"
            },
            status: 200
        };
    } else {
        return {
            response: {
                error: "Wrong email verification code"
            },
            status: 400
        };

    }
}

const users = async () => {
    let userArray = await db.collection(dbCollection).find().toArray();

    for (let i = 0; i < userArray.length; i++) {
        userArray[i] = userJSON(userArray[i], i);
    }

    return {
        response: userArray,
        status: 200
    };
}
const user = async (id) => {

    let user = await db.collection(dbCollection).find({ _id: ObjectID(id) }).toArray();

    user[0] = userJSON(user[0]);


    return {
        response: user,
        status: 200
    };
}
const update = async (id, obj) => {
    let _id = id;

    delete obj._id;

    let check = await db.collection(dbCollection).find({ username: obj.username, _id: { $ne: ObjectID(id) } }).count();
    if (check) {
        return {
            error: `User with username "${obj.username}" already exists`
        }
    }
    if (obj.password) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(obj.password, salt);
        delete obj.password;
        obj.pk = hash;
    }
    await db.collection(dbCollection).updateOne({ _id: ObjectID(id) }, {
        $set: obj
    })

    return {
        response: obj,
        status: 200
    };
}
const setStatus = async (uid, id, status) => {


    // let admin = await db.collection(dbCollection).find({ _id: ObjectID(uid), role: 'admin' }).toArray(); //admin ili neko vec

    await db.collection(dbCollection).updateOne({ _id: ObjectID(id) }, {
        $set: {
            role: status.role
        }
    })

    return {
        response: id,
        status: 200
    };
}
const updateStatus = async (id, status) => {


    // let admin = await db.collection(dbCollection).find({ _id: ObjectID(uid), role: 'admin' }).toArray(); //admin ili neko vec
    if (status == 0) {
        // user.emailVerificationCode = uuidv4();
        // user.emailTimestampLimit = Math.floor(new Date().getTime() / 1000 + 10 * 24 * 60 * 60);

        await db.collection(dbCollection).updateOne({ _id: ObjectID(id) }, {
            $set: {
                emailVerificationCode: uuidv4(),
                emailTimestampLimit: Math.floor(new Date().getTime() / 1000 + 10 * 24 * 60 * 60)
            }
        })

        let user = await db.collection(dbCollection).findOne({ _id: ObjectID(id) });
        /*var transporter = nodemailer.createTransport({
            host: SMTPServer,
            port: SMTPPort,
            secure: true,
            requireTLS: true,
            auth: {
                user: SMTPUsername,
                pass: SMTPPassword
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
            from: SMTPUsername,
            to: user.email,
            subject: 'Verify E-mail address',
            text: `Verify email address by visiting link: https://localhost:8080/auth/email/verify/${user._id.toString()}/${user.emailVerificationCode}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });*/

        sendMail(user.email, 'Verify E-mail address', `Verify email address by visiting link: https://localhost:8080/auth/email/verify/${user._id.toString()}/${user.emailVerificationCode}`)


    }else {
        let user = await db.collection(dbCollection).findOne({ _id: ObjectID(id) });
        sendMail(user.email, 'Blocked from service', `You have been blocked on rent a car site`)

    }
    await db.collection(dbCollection).updateOne({ _id: ObjectID(id) }, {
        $set: {
            status: status
        }
    })

    return {
        response: id,
        status: 200
    };
}

const removeUser = async (id) => {


    // let admin = await db.collection(dbCollection).find({ _id: ObjectID(uid), role: 'admin' }).toArray(); //admin ili neko vec

    await db.collection(dbCollection).deleteOne({ _id: ObjectID(id) })

    return {
        response: id,
        status: 200
    };
}



const userJSON = (user, i) => {
    return {
        _id: user._id,
        username: user.username,
        role: user.role,
        regTimestamp: user.regTimestamp,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        status: user.status,
        key: i,

    };
};

const sessionUser = async (authorization) => {
    return new Promise((resolve, reject) => {
        const token = authorization ? authorization.split(" ")[1] : null;

        if (!token) return { status: 401 };

        jwt.verify(token, process.env.JWT_SECRET, async (err, userData) => {
            if (err) {
                return reject({ status: 401 });
            }

            if (!userData) return { status: 401 };

            const id = userData.id;
            let res = await db.collection('users').findOne({ username: id });
            res = userJSON(res);
            resolve({ status: 200, response: res });
        })
    })
}

const AuthService = {
    login,
    register,
    users,
    user,
    update,
    setStatus,
    generatePermissionMiddleware,
    DORProtection,
    updateStatus,
    removeUser,
    verifyEmail,
    updatePassword,
    sessionUser
};


module.exports = AuthService;
