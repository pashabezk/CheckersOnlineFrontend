import cookie from "js-cookie";

// работа с токеном
export const getTokenFromCookie = () => {
	return cookie.get("token");
}

export const putTokenToCookie = (token) => {
	cookie.set("token", token);
}

export const removeTokenFromCookie = () => {
	cookie.remove("token");
}

// работа с пользователем
export const getUserIdFromCookie = () => {
	return cookie.get("id");
}

export const putUserIdToCookie = (id) => {
	cookie.set("id", id);
}

export const removeUserIdFromCookie = () => {
	cookie.remove("id");
}