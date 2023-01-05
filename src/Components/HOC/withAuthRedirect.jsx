import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectToken, selectUserId, tryLogOutAsync} from "../../Redux/AuthReducer";
import LoadingPage from "../LoadingPage/LoadingPage";
import {getTokenFromCookie} from "../../Cookie/AuthWithCookie";


// пропускает на нужную страницу только если пользователь авторизован
// иначе редиректит на страницу авторизации
const withAuthRedirect = (Component) => {
	return (props) => {
		const userId = useSelector(selectUserId);
		const token = useSelector(selectToken);
		const dispatch = useDispatch();
		const location = useLocation().pathname.split('/')[1]; // берём адрес url

		// проверка, что токен не был отозван
		if(getTokenFromCookie() !== token) {
			dispatch(tryLogOutAsync()); // если отозван, то на всякий случай диспатчим logout
			return <Navigate to={"/login"}/> // редирект на страницу авторизации
		}

		// если токен есть, а идентификатора пользователя нет, значит надо попробовать получить информацию о пользователе по токену (это происходит внутри отрендеренного компонента)
		if (token && !userId) {
			return <LoadingPage/>
		}

		// чтобы избежать зацикленности при попадании на страницу логина необходимо дополнительное условие
		// если пользователь хочет попасть на страничку авторизации и ещё не авторизован, то пропускаем его
		// если он уже авторизован, то редиректим на главную страницу
		if (location === "login") {
			if (userId)
				return <Navigate to={"/"}/>
			else
				return <Component {...props}/>
		}

		// если авторизация пройдена, то рендерится нужный компонент, иначе редирект на страницу авторизации
		if (userId)
			return <Component {...props}/>
		return <Navigate to={"/login"}/>
	}
}

export default withAuthRedirect;