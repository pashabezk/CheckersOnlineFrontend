import React from "react";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectLogin, selectToken, selectUserId, setLogoutData, tryGetLoginUserDataAsync} from "../../Redux/AuthReducer";
import LoaderFullSpace from "../Common/LoaderFullSpace/LoaderFullSpace";
import {getTokenFromCookie} from "../../Cookie/AuthWithCookie";

// пропускает на нужную страницу только если пользователь авторизован
// иначе редиректит на страницу авторизации
const withAuthRedirect = (Component) => {
	return (props) => {
		const userId = useSelector(selectUserId);
		const login = useSelector(selectLogin);
		const token = useSelector(selectToken);
		const dispatch = useDispatch();

		// если токен есть (получен из куки), а идентификатора пользователя нет, значит надо подгрузить информацию о пользователе
		React.useEffect(() => {
			if (token && !login) {
				dispatch(tryGetLoginUserDataAsync(userId));
			}
		});
		// при этом отображается загрузка
		if (token && !login) {
			return <LoaderFullSpace/>
		}

		// проверка, что токен не был отозван
		if (getTokenFromCookie() !== token) {
			dispatch(setLogoutData()); // если отозван, то на всякий случай диспатчим logout
			return <Navigate to={"/login"}/> // редирект на страницу авторизации
		}

		// если авторизация пройдена, то рендерится нужный компонент, иначе редирект на страницу авторизации
		if (userId)
			return <Component {...props}/>
		return <Navigate to={"/login"}/>
	}
}

export default withAuthRedirect;