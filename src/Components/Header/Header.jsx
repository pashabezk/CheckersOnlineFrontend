import React from "react";
import styles from "./Header.module.css"
import logo from "../../Assets/logo.svg"
import {Button} from "antd";
import {LoginOutlined, LogoutOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuthing, selectUserId, tryLogOutAsync} from "../../Redux/AuthReducer";
import {useNavigate} from "react-router-dom";

const AppHeader = () => {

	const userId = useSelector(selectUserId);
	const isAuthing = useSelector(selectIsAuthing);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onLoginButtonClick = () => {
		navigate("/login");
	}

	const onLogoutButtonClick = () => {
		dispatch(tryLogOutAsync());
	}

	return (
		<header className={styles.mainHeader}>
			<div className={"center1000px " + styles.centeredMainHeader}>
				<div className={styles.logoContainer}>
					<img src={logo} alt="logo"/>
					<h1>SiteName</h1>
				</div>
				<div className={styles.headerColumnRight}>
					{
						userId
							? <Button onClick={onLogoutButtonClick} icon={<LogoutOutlined/>} loading={isAuthing}> Выйти </Button>
							: <Button onClick={onLoginButtonClick} icon={<LoginOutlined/>} loading={isAuthing}> Войти </Button>
					}
				</div>
			</div>
		</header>
	);
}

export default AppHeader;