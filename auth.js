import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import models from './models/index';
export const createTokens = async (user, secret) => {
    const token = jwt.sign(
        {
            user: _.pick(user, ['id'])
        },
        secret,
        {
            expiresIn: '1h'
        }
    );
    const refreshToken = jwt.sign(
        {
            user: _.pick(user, 'id'),
        },
        secret,
        {
            expiresIn: '7d',
        }
    )
    return {refreshToken, token}
}

export const tryLogin = async (email, password, models, SECRET) => {
    const user = await models.User.findOne({ where: { email }, raw: true});
    if (!user) {return {
        ok: false,
        errors: [{path: 'email', message: 'Invalid email'}],
    }}
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {return {
        ok: false,
        errors: [{path: 'password', message: 'Incorrect password'}],
    }}

    const refreshTokenSecret = user.password + SECRET;

    const {token, refreshToken} = await createTokens(user, SECRET, refreshTokenSecret);
    return {
        ok: true,
        user,
        token, 
        refreshToken,
    };
};

export const refreshTokens = async (token, refreshToken, models, SECRET) => {
    let userId = 0;
    try {
        userId = jwt.decode(refreshToken);
        const user = await models.User.findOne({where: {id: userId}});
        if (!user) {
            throw new Error("no user found");
        }
        const refreshTokenSecret = user.password + SECRET;
        jwt.verify(refreshToken, refreshTokenSecret);
        const newTokens = await createTokens(user, SECRET)
        return {
            user,
            token: newTokens.token,
            refreshToken: newTokens.refreshToken,
        }
    } catch(err) {
        return {};
    }
}

export const addUser = SECRET => async (req, res, next) => {
    const token = req.headers['x-token'];
    if (token) {
        try {
            const { user } = jwt.verify(token, SECRET);
            req.user = user;
      } catch (err) {
        const refreshToken = req.headers['x-refresh-token'];
        const newTokens = await refreshTokens(token, refreshToken, models, SECRET);
        if (newTokens.token && newTokens.refreshToken) {
          res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
          res.set('x-token', newTokens.token);
          res.set('x-refresh-token', newTokens.refreshToken);
        }
        req.user = newTokens.user;
      }
    }
    next();
  };