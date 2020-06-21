const express = require("express");
const socket = require("socket.io");
const authmdw = require("../middleware/authmdw");
const socketCookieParser = require("socket.io-cookie-parser");
const { func } = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

// const users =;

module.exports = function (server) {
	const users = {};
	let counsellor = null;
	const io = socket(server);

	io.use(socketCookieParser());

	io.use(auth);
	function auth(socket, next) {
		const token = socket.request.cookies.jwt;
		console.log(token);
		// console.log("a");
		if (!token) return socket.send("Access denied! Auth token not found");

		try {
			const decodedToken = jwt.verify(token, config.get("jwtPrivateKey"));
			socket.user = decodedToken;
			// console.log("b");
			next();
		} catch (err) {
			socket.send("invalid token !!");
		}
	}

	io.on("connection", socket => {
		console.log("connected", socket.id);
		// console.log("socket", socket);
		// console.log("socket.cookiee", socket.handshake.header.cookies);
		// console.log("socket.cookie.jwt", socket.request.cookies);
		console.log("user", socket.user);
		if (counsellor === null && socket.user.isCounsellor) {
			counsellor = {
				socketId: socket.id,
				isSessionActive: false,
			};
		} else if (!users[socket.id]) {
			users[socket.id] = socket.id;
		}
		if (!counsellor) return;
		socket.emit("myDetails", { socketId: socket.id, counsellor: socket.user.isCounsellor });
		io.sockets.emit("allUsers", users);
		io.sockets.emit("counsellor", counsellor.socketId);
		socket.on("disconnect", () => {
			// if (req.user.isCounsellor) counsellor = null;
			// else delete users[socket.id];
		});

		socket.on("callUser", data => {
			console.log("callUser");
			io.to(data.userToCall).emit("incoming", { signal: data.signalData, from: data.from });
		});

		socket.on("acceptCall", data => {
			console.log("acceptCall");
			io.to(data.to).emit("callAccepted", data.signal);
		});
	});
};

// app.get("/", (req, res) => {
// 	res.send("a");
// });

// server.listen(3000, () => console.log("server is running on port 3000"));
