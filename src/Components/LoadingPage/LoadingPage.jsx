import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getInfoFromTokenAsync, selectToken, selectUserId} from "../../Redux/AuthReducer";
import {Spin} from "antd";
import styles from "./LoadingPage.module.css"

// страница загрузки во время ожидания получения данных о пользователе по токену
const LoadingPage = () => {

	const userId = useSelector(selectUserId);
	const token = useSelector(selectToken);
	const dispatch = useDispatch();

	// если токен есть (получен из куки), а идентификатора пользователя нет, значит надо подгрузить информацию о пользователе
	if (token && !userId) {
		dispatch(getInfoFromTokenAsync(token));
	}

	return (
		<div className={styles.loadingContainer}>
			<Spin tip="Загрузка" size="large" className={styles.loader}/>
		</div>
	);
}

export default LoadingPage;