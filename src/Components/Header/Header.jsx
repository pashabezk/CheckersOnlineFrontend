import React from "react";
import styles from "./Header.module.css"
import logo from "../../Assets/Img/Chekers/White.svg"
import {Button} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuthing, selectUserId, tryLogOutAsync} from "../../Redux/AuthReducer";
import {useNavigate} from "react-router-dom";

const AppHeader = () => {
	const userId = useSelector(selectUserId);
	const isAuthing = useSelector(selectIsAuthing);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onLogoutButtonClick = () => {
		dispatch(tryLogOutAsync());
	};

	return (
		<header className={styles.mainHeader}>
			<div className={"center1000px " + styles.centeredMainHeader}>
				<div className={styles.logoContainer}>
					<img src={logo} alt="logo"/>
					<h1>Шашки</h1>
				</div>
				<div className={styles.headerColumnRight}>
					{
						userId
							? <Button onClick={onLogoutButtonClick} icon={<LogoutOutlined/>} loading={isAuthing}>Выйти</Button>
							: <>
								<Button onClick={() => navigate("/registration")} type={"default"}>Создать аккаунт</Button>
								<Button onClick={() => navigate("/login")} type={"primary"}>Войти</Button>
							</>
					}
				</div>
			</div>
		</header>
	);
}

export default AppHeader;