const User = require('../model/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {registerValidation, loginValidation} = require('../validations/users');

registerUser = async (req, res) => {
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).send('Email already exists')

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
}

loginUser = async (req, res) => {
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password is wrong');
    
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET,{ expiresIn: '10h' });
    try {
        res.header('auth-token', token).send(token);
    } catch (err) {
        res.send(err);
    }

}

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;