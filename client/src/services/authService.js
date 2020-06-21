import http from "./httpService";

const apiEndPoint = "/auth/login";

export async function login(username, password) {
	const res = await http.post(apiEndPoint, {
		username,
		password,
	});
	// const a = await res.json();
	console.log(res);
	// return res;
}
export async function getCurrentUser() {
	const res = await http.get("/auth/me");
	let bool = false;
	console.log(res);
	if (res.status === 200) bool = true;
	return bool;
}

export default {
	login,
	getCurrentUser,
};
