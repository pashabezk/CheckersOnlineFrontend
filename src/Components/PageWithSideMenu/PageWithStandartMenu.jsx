import React from "react";
import {LinkOutlined, MailOutlined, PlaySquareOutlined, UserOutlined} from "@ant-design/icons";
import {Menu} from "antd";
import styles from "./PageWithDefaultMenuSidebar.module.css"
import {useLocation, useNavigate} from "react-router-dom";

const menuItems = [
	{label: 'Профиль', icon: <UserOutlined/>, key: 'profile'},
	{label: 'Сообщения', icon: <MailOutlined/>, key: 'messages'},
	{label: 'Игра', icon: <PlaySquareOutlined/>, key: 'game'},
	{
		label: 'Раскрывашка',
		icon: <LinkOutlined/>,
		key: 'item-3',
		children: [{
			label: 'Подменю 1',
			key: 'submenu-item-1'
		}, {
			label: 'Подменю 2',
			key: 'submenu-item-2'
		}],
	},
];

const PageWithDefaultMenuSidebar = ({children, ...props}) => {
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
					// defaultOpenKeys={['sub1']}
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