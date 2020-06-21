const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const models = require("../models");
const Joi = require("joi");
const authmdw = require("../middleware/authmdw");

const appointment = express.Router();

appointment.use(bodyParser.json());

mongoConnection = "mongodb://localhost/counsellor_portal";
mongoose.connect(mongoConnection, { useNewUrlParser: true });

const { Appointment } = models;
appointment.get("/", authmdw, (req, res) => {
	res.send("create an appointment with your Therapist");
});

appointment.post("/create", authmdw, async (req, res) => {
	const { error } = validateCreateAppointmentReq(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	var apt = new Appointment(req.body);
	var newAppointment = await apt.save();
	res.send(newAppointment);
});

function validateCreateAppointmentReq(req) {
	const schema = {
		slotId: Joi.string().required(),
		from: Joi.string().required(),
		to: Joi.string().required(),
		memberUsername: Joi.string().required(),
		memberId: Joi.string().required(),
		counsellorName: Joi.string().required(),
		message: Joi.string(),
	};
	return Joi.validate(req, schema);
}

module.exports = appointment;
