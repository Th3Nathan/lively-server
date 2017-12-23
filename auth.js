import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';

export const createTokens = async (user, secret, secret2) => {
    const createToken = jwt.sign(
        {
            user: _.pick(user, ['id'])
        },
        secret,
        {
            expiresIn: '1m'
        }
    );
    const refreshToken = jwt.sign(
        {
            user: _.pick(user, 'id'),
        },
        secret2,
        {
            expiresIn: '7d',
        }
    )
}

export const tryLogin = async (email, password, models, SECRET) => {
    const user = await models.User.findOne({ where: { email }, raw: true});
    if (!user) {throw 'Invalid login';}
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {throw 'Invalid login';}

    const [token, refreshToken] = await createTokens(user, SECRET, user.refreshSecret);
    return {
        token, 
        refreshToken,
    };
};