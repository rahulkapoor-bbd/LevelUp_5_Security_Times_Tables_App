async function register(req, res) {
    res.sendFile('register.html', { root: 'views' });
}

async function login(req, res) {
    res.sendFile('login.html', { root: 'views' });
}

module.exports = {
    register,
    login,
}