import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';

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