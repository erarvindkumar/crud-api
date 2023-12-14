const JWT = require('jsonwebtoken');
const config = require('../config/config.js');

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = config;

const signAccessToken = function (data) {
    return new Promise(function (resolve, reject) {
        const payload = { name: data.name, id: data._id ? data._id : data.id };
        const secret = ACCESS_TOKEN_SECRET;
        JWT.sign(payload, secret, { expiresIn: '24h' }, function (err, token) {
            if (err) {
                console.log(err.message);
                reject(err.message);
                return;
            }
            resolve(token);
        });
    });
};

const verifyAccessToken = function (req, res, next) {
    if (!req.headers['authorization']) return next('not in headers');
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const secret = ACCESS_TOKEN_SECRET;
    const token = bearerToken[1];
    JWT.verify(authHeader, secret, function (err, payload) {
        if (err) {
            const message =
                err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
            return next(message);
        }
        console.log(payload);
        req.payload = payload;
        next('welcome');
    });
};

const signRefreshToken = function (data) {
    return new Promise(function (resolve, reject) {
        const payload = { name: data.name, id: data._id };

        const secret = REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: '30d',
        };
        JWT.sign(payload, secret, options, function (err, token) {
            if (err) {
                reject(err.message);
            }
            resolve(token);
        });
    });
};

const verifyRefreshToken = function (refreshToken) {
    const secret = REFRESH_TOKEN_SECRET;
    return new Promise(function (resolve, reject) {
        JWT.verify(refreshToken, secret, function (err, payload) {
            if (err) {
                const message =
                    err.name === 'JsonWebTokenError'
                        ? 'Wrong verification key'
                        : err.message;
                reject({ status: 301, success: false, message });
            }

            return resolve(payload);
        });
    });
};


module.exports = { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken };