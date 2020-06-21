import http from "./httpService";
// import { apiUrl } from "../config.json";

const apiEndPoint = "/register/create";

export function register(username, password, isCounsellor) {
	const res = http.post(apiEndPoint, {
		username,
		password,
		isCounsellor,
	});
	return res;
}
