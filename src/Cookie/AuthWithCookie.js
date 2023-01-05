import cookie from "js-cookie";


export const getTokenFromCookie = () => {
	return cookie.get("token");
}

export const putTokenToCookie = (token) => {
	cookie.set("token", token);
}

export const removeTokenFromCookie = () => {
	cookie.remove("token");
}