const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const models = require("../models");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const register = express.Router();

// destructuring models
const { User } = models;

register.use(bodyParser.json());
register.use(bodyParser.urlencoded({ extended: true }));

mongoConnection = "mongodb://localhost/counsellor_portal";
mongoose.connect(mongoConnection, { useNewUrlParser: true });

// endpoints

register.get("/", (req, res) => {
	res.send("signup form will be displayed");
});

register.post("/create", async (req, res) => {
	const { error } = validateRegisterUserReq(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	var alreadyPresent = await User.findOne({ username: req.body.username });
	if (alreadyPresent) return res.send("a user with this username is already present");

	try {
		var usr = new User(req.body);
		var salt = await bcrypt.genSalt(10);
		usr.password = await bcrypt.hash(req.body.password, salt);

		var data = await usr.save();
		const token = jwt.sign(
			{
				_id: data._id,
				isCounsellor: data.isCounsellor,
			},
			config.get("jwtPrivateKey")
		);

		newData = await User.findById(data._id).select(["-password", "-__v"]);
		res.cookie("jwt", token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24, //one day
		});

		res.send(newData);
	} catch (ex) {
		console.log(ex);
		return res.send("some error occurred while creating your account. Please try again");
	}
});

function validateRegisterUserReq(req) {
	const schema = {
		username: Joi.string().required(),
		password: Joi.string().required(),
		isCounsellor: Joi.bool(),
	};
	return Joi.validate(req, schema);
}
module.exports = register;
