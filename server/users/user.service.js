const config = require('config.json');
const jwt = require('jsonwebtoken');
const { from, pipe } = require('rxjs');
const {filter} = require('rxjs/operators')

// users hardcoded for simplicity, store in a db for production applications
let users = [{ id: 1, username: 'test', password: 'test'}, { id: 2, username: 'Rod', password: '123'}];

counter = 3

module.exports = {
    authenticate,
	register,
    getAll
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });

    return {
        ...omitPassword(user),
        token
    };
}

async function register({ username, password }) {
    source = from(users)
    if (source.pipe(filter(e => e.username === username).length) > 0) {
        throw 'User with this username already exists'
    }
    /*if (users.filter(e => e.username === username).length > 0) {
        throw 'User with this username already exists'
      }*/
	users.push({id: counter++, username: username, password: password});
	

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });

    return {
        ...omitPassword(user),
        token
    };
}

async function getAll() {
    return users.map(u => omitPassword(u));
}

// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}