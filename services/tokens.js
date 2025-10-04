const tokens = [];

const isTokenActive = (token) => tokens.includes(token);
const addToken = (token) => tokens.push(token);

const removeToken = (token) => {
    const index = tokens.indexOf(token);
    if (index > -1) {
        tokens.splice(index, 1);
    }
}

module.exports = { isTokenActive, addToken, removeToken }