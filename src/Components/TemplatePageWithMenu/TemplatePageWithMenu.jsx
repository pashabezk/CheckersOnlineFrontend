import React from "react";
import {AppstoreOutlined, PlaySquareOutlined, UserOutlined} from "@ant-design/icons";
import {Menu} from "antd";
import styles from "./TemplatePageWithMenu.module.css"
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectOpenedMenuBlocks, setOpenedMenuBlocks} from "../../Redux/MenuReducer";

// элементы меню
// в качестве key используется path для перехода
const menuItems = [
	{label: 'Профиль', icon: <UserOutlined/>, key: '/profile'},
	{
		label: 'Последние игры',
		icon: <AppstoreOutlined/>,
		key: 'games',
		children: [
			{label: 'Игра', icon: <PlaySquareOutlined/>, key: '/game'},
			{label: 'Игра', icon: <PlaySquareOutlined/>, key: '/game/1'},
			{label: 'Игра', icon: <PlaySquareOutlined/>, key: '/game/2'},
		],
	},
];

const TemplatePageWithMenu = ({children}) => {
	const navigate = useNavigate(); // хук для перехода на другие страницы
	const location = useLocation().pathname; // получение url странички; pathname возвращает часть пути, используемую приложением

	const openedMenuBlocks = useSelector(selectOpenedMenuBlocks); // получение списка раскрытых блоков меню
	const dispatch = useDispatch();

	// обработчик нажатий на элемент меню
	const onMenuSelect = (props) => {
		navigate(props.key); // переход на страничку
	}

	// обработчик раскрытия и закрытия элементов меню
	const onMenuBlockClick = (props) => {
		dispatch(setOpenedMenuBlocks(props));
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.sidebar}>
				<Menu
					mode="inline"
					defaultSelectedKeys={[location]}
					defaultOpenKeys={openedMenuBlocks}
					items={menuItems}
					onSelect={onMenuSelect}
					onOpenChange={onMenuBlockClick}
				/>
			</div>
			<section className={styles.content}>
				{children}
			</section>
		</div>
	);
}

export default TemplatePageWithMenu;