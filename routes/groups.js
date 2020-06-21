const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const models = require("../models");
const Joi = require("joi");
const authmdw = require("../middleware/authmdw");

const group = express.Router();

group.use(bodyParser.json());

mongoConnection = "mongodb://localhost/counsellor_portal";
mongoose.connect(mongoConnection, { useNewUrlParser: true });

function checkRights(req, res, next) {
	if (req.user.isCounsellor) next();
	else return res.status(403).send("You are forbidden to access this endpoint");
}

const { Group } = models;
group.get("/", [authmdw, checkRights], (req, res) => {
	res.send("you can create groups of up to 4 members");
});

group.post("/create", [authmdw, checkRights], async (req, res) => {
	const { error } = validateCreateGroupReq(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	var grp = new Group(req.body);
	var newGroup = await grp.save();
	res.send(newGroup);
});

function validateCreateGroupReq(req) {
	const schema = {
		groupDescription: Joi.string().validate(),
		members: Joi.array().items({
			username: Joi.string().required(),
			description: Joi.string().min(20).max(300).required(),
			category: Joi.string().required(),
		}),
		counsellorName: Joi.string().required(),
	};
	return Joi.validate(req, schema);
}

module.exports = group;
