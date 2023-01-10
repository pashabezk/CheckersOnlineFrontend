import React from "react";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectLogin, selectToken, selectUserId, tryGetLoginUserDataAsync} from "../../Redux/AuthReducer";
import LoaderFullSpace from "../Common/LoaderFullSpace/LoaderFullSpace";

// пропускает на нужную страницу только если пользователь не авторизован
// иначе редиректит на страницу профиля
const withoutAuth = (Component) => {
	return (props) => {
		const userId = useSelector(selectUserId);
		const token = useSelector(selectToken);
		const login = useSelector(selectLogin);
		const dispatch = useDispatch();

		// если токен есть (получен из куки), а идентификатора пользователя нет, значит надо подгрузить информацию о пользователе
		React.useEffect(() => {
			if (token && !login) {
				dispatch(tryGetLoginUserDataAsync(userId));
			}
		});
		// при этом отображается загрузка
		if (token && !userId) {
			return <LoaderFullSpace/>
		}

		// если идентификатор пользователя есть, значит авторизация совершена и надо перенаправить пользователя на страницу профиля
		if (userId) {
			return <Navigate to="/profile"/>
		}

		// если авторизация не пройдена, то рендерится нужный компонент
		return <Component {...props}/>
	}
}

export default withoutAuth;