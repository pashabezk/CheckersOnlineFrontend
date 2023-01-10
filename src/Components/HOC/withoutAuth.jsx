import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserId} from "../../Redux/AuthReducer";

// пропускает на нужную страницу только если пользователь не авторизован
// иначе редиректит на страницу профиля
const withoutAuth = (Component) => {
	return (props) => {
		const userId = useSelector(selectUserId);

		// если идентификатор пользователя есть, значит авторизация совершена и надо перенаправить пользователя на страницу профиля
		if (userId) {
			return <Navigate to="/profile"/>
		}

		// если авторизация не пройдена, то рендерится нужный компонент
		return <Component {...props}/>
	}
}

export default withoutAuth;