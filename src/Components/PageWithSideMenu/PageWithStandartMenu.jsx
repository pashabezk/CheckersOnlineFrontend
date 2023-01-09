import React from "react";
import {AppstoreOutlined, PlaySquareOutlined, UserOutlined} from "@ant-design/icons";
import {Menu} from "antd";
import styles from "./PageWithDefaultMenuSidebar.module.css"
import {useLocation, useNavigate} from "react-router-dom";

const menuItems = [
	{label: 'Профиль', icon: <UserOutlined/>, key: 'profile'},
	{
		label: 'Последние игры',
		icon: <AppstoreOutlined/>,
		key: 'games',
		children: [
			{label: 'Игра', icon: <PlaySquareOutlined/>, key: 'game'},
			{label: 'Игра', icon: <PlaySquareOutlined/>, key: 'game/1'},
			{label: 'Игра', icon: <PlaySquareOutlined/>, key: 'game/2'},
		],
	},
];

const PageWithDefaultMenuSidebar = ({children}) => {
	const navigate = useNavigate();
	const location = useLocation().pathname.split('/')[1];

	const onMenuSelect = (props) => {
		navigate("/" + props.key);
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.sidebar}>
				<Menu
					mode="inline"
					defaultSelectedKeys={[location]}
					// defaultOpenKeys={['games']}
					items={menuItems}
					onSelect={onMenuSelect}
				/>
			</div>
			<section className={styles.content}>
				{children}
			</section>
		</div>
	);
}

export default PageWithDefaultMenuSidebar;