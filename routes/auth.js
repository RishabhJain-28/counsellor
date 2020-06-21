const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const models = require("../models");
const config = require("config");
const authmdw = require("../middleware/authmdw");
const Joi = require("joi");
const auth = express.Router();

// destructuring models
const { User } = models;

auth.use(bodyParser.json());
auth.use(bodyParser.urlencoded({ extended: true }));

mongoConnection = "mongodb://localhost/counsellor_portal";
mongoose.connect(mongoConnection, { useNewUrlParser: true });

// endpoints

auth.get("/", (req, res) => {
	res.send("Login form will be displayed");
});

auth.post("/login", async (req, res) => {
	const { error } = validateLoginUserReq(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	var user = await User.findOne({ username: req.body.username });
	if (!user) return res.send("no user with this username was found try again or create a new user");
	else {
		const valid = await bcrypt.compare(req.body.password, user.password);
		if (!valid) return res.send("wrong password");
		else {
			const token = jwt.sign(
				{
					_id: user._id,
					isCounsellor: user.isCounsellor,
				},
				config.get("jwtPrivateKey")
			);

			res.cookie("jwt", token, {
				httpOnly: true,
				maxAge: 1000 * 60 * 60 * 24, //one day
			});

			res.send(token);
		}
	}
});

function validateLoginUserReq(req) {
	const schema = {
		username: Joi.string().required(),
		password: Joi.string().required(),
	};
	return Joi.validate(req, schema);
}

// current user
auth.get("/me", authmdw, async (req, res) => {
	var user = await User.findById(req.user._id).select(["-__v", "-password"]);
	res.send(user);
});

module.exports = auth;
