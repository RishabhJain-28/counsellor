const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const mongoose = require("mongoose");
const register = require("./routes/register");
const auth = require("./routes/auth");
const config = require("config");
const cookieParsser = require("cookie-parser");
const sessions = require("client-sessions");
const jwt = require("jsonwebtoken");

const groups = require("./routes/groups");
const appointment = require("./routes/appointment");
const slot = require("./routes/slot");
const videoCallInit = require("./startup/videoCall");

const PORT = 3000 || process.env.PORT;

const app = express();

if (!config.get("jwtPrivateKey")) {
	console.log("FATAL error: jwtPrivateKey not defined ");
	process.exit(1);
}

// I'm using the same secret key here
// app.use(
// 	sessions({
// 		cookieName: "jwt",
// 		secret: config.get("jwtPrivateKey"),
// 		duration: 60 * 60 * 1000, // 1 hour
// 	})
// );
app.use(cookieParsser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));

app.use("/register", register);
app.use("/auth", auth);
app.use("/groups", groups);
app.use("/appointment", appointment);
app.use("/slot", slot);

mongoConnection = "mongodb://localhost/counsellor_portal";
mongoose
	.connect(mongoConnection, { useNewUrlParser: true })
	.then(() => console.log(`connected to local database ${mongoConnection}`))
	.catch(err => console.log(`could not connect to DB. ${err}`));

app.get("/", (req, res) => {
	res.sendFile("index");
});

const server = app.listen(PORT, () => console.log(`listening to port ${PORT}`));

videoCallInit(server);
