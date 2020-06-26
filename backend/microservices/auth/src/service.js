const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;
//env
const dotenv = require('dotenv');
dotenv.config();
//database
const dbConnect = require('../db');
const dbCollection = 'users';
let db;


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
                'message-permission'
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
                'testpermission2',
                'testpermission3'
            ]
        });

        register({
            username: 'user2',
            password: 'User2#2020',
            firstName: 'Milan',
            lastName: 'Stanojevic',
            email: 'milanstanojevic@gmail.com',
            permissions: [
                'testpermission1',
                'testpermission3'
            ]
        });

        register({
            username: 'admin',
            password: 'Admin2020#',
            firstName: 'Admin',
            lastName: 'Admin',
            email: 'admin@gmail.com',
            permissions: [
                '*',
            ]
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
                    return;
                    //throw new Error("Not Authorized");
                }

                db.collection(dbCollection).find({ _id: ObjectID(user.id) }).toArray((err, result) => {
                    if (err) {
                        res.status(404).json({ error: "Not Found" });
                        return;
                    }

                    if (result && !result.length) {
                        res.status(404).json({ error: "Not Found" });
                        return;
                    }

                    if (result[0].permission && result[0].permissions.indexOf('*') !== -1) {
                        return next();
                    }

                    if (result[0].permissions && result[0].permissions.indexOf(permission) !== -1) {
                        return next();
                    }

                    res.status(401).json({ error: "Not Authorized" });
                    return;
                });
            });
        } else {
            res.status(401).json({ error: "Not Authorized" });
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
                return;
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
        });
    } else {
        res.status(401).json({ error: 'Not Authorized' });
        return;
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
                        token
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

const register = async (user) => {

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

    
    if (!checkPassword(user.password)){
        return {
            response: {
                error: "Password must contain between 8-15 characters, one uppercase, one lowercase, one number and one special char."
            },
            status: 400
        }
    }
    

    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10, 'b'));
    user.role = 'user';
    user.regTimestamp = new Date().getUTCMilliseconds();
    user.status = 0;

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
    removeUser
};


module.exports = AuthService;
