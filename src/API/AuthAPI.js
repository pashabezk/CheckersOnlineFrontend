const TEST_TOKEN = "test_token_asbsdanbhcjbbaAWQHJNXJNbjksc2234hbjsd";
// TODO: заменить TEST_TOKEN на реальный токен, получаемый с сервера

export function fetchLogIn(login, password) {
	return new Promise((resolve) =>
		setTimeout(() => {
			if (login === "pasha" && password === "1234")
				resolve({data: {error: 0, login: "pasha", id: 1, token: TEST_TOKEN}})
			else resolve({data: {error: 1, errorMsg: "Логин или пароль неверный"}})
		}, 1000)
	);
}

export function fetchLogOut() {
	return new Promise((resolve) =>
		setTimeout(() => {
			resolve({data: {error: 0}})
		}, 500)
	);
}

// запрос на сервер для расширофки данных из токена
export function fetchWhoAmI(token) {
	return new Promise((resolve) =>
		setTimeout(() => {
			if (token === TEST_TOKEN)
				resolve({data: {error: 0, login: "pasha", id: 1, token: TEST_TOKEN}})
			else resolve({data: {error: 1, errorMsg: "Сессия недоступна, авторизуйтесь на сайте снова"}})
		}, 1000)
	);
}