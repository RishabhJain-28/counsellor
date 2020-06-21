const jwt = require("jsonwebtoken");
const config = require("config");

function authmdw(req, res, next) {
	const token = req.cookies.jwt;

	if (!token) return res.status(401).send("Access denied! Auth token not found");

	try {
		const decodedToken = jwt.verify(token, config.get("jwtPrivateKey"));
		console.log(decodedToken);
		req.user = decodedToken;
		next();
	} catch (err) {
		res.status(400).send("invalid token !!");
	}
}

module.exports = authmdw;
