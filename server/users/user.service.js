const config = require("config.json");
const jwt = require("jsonwebtoken");

let users = [];

counter = 1;

module.exports = {
    signIn,
    signUp,
    getAll,
};

async function signIn({ username, password }) {
    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!user) throw "Username or password is incorrect";

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, {
        expiresIn: "7d",
    });

    return {
        ...omitPassword(user),
        token,
    };
}

async function signUp({ username, password }) {
    if (users.filter((e) => e.username === username).length > 0) {
        throw "User with this username already exists";
    }
    users.push({ id: counter++, username: username, password: password });

    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!user) throw "Username or password is incorrect";

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, {
        expiresIn: "7d",
    });

    return {
        ...omitPassword(user),
        token,
    };
}

async function getAll() {
    return users.map((u) => omitPassword(u));
}

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
