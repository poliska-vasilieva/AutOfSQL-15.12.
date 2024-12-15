
const express = require('express');
const app = express();
const cors = require('cors');
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "public/text.sqlite",
});
const Account = sequelize.define('Account', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
sequelize.sync();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.post('/register', async (request, response) => {
    const { email, password, name } = request.body;
    try {
        let account = await Account.create({ email, password, name });
        response.status(201).send(account);
    } catch (error) {
        response.status(500).send({ error: 'Ошибка при регистрации' });
    }

});

app.post('/login', async (request, response) => {
    const { email, password } = request.body;
    let user = await User.findOne({ where: { email: email } });
    if (user == null) {
        return response.sendStatus(404);
    }
    if (user.password !== password) {
        return response.sendStatus(400);
    }

    response.redirect('/profile')
});


app.get('/profile', async (request, response) => {
    let account = await Account.findOne({ where: { email: request.body.email } });
    if (!account) {
        return response.sendStatus(404);
    }
    response.send(account);
});

app.post('/auth', async (request, response) => {
    const { email, password } = request.body;
    let account = await Account.findOne({ where: { email: email } });
    if (account == null) {
        return response.sendStatus(404);
    }
    if (account.password !== password) {
        return response.sendStatus(400);
    }
    response.sendStatus(200);
});

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
