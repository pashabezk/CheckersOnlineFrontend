import React, {useEffect} from "react";
import {AppstoreOutlined, ClockCircleOutlined, PlaySquareOutlined, UserOutlined} from "@ant-design/icons";
import {Menu} from "antd";
import styles from "./TemplatePageWithMenu.module.css"
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectOpenedMenuBlocks, setOpenedMenuBlocks} from "../../Redux/MenuReducer";
import {selectGames, selectIsGamesListLoading, tryGetGamesListAsync} from "../../Redux/ProfileReducer";
import {reinterpretGameData} from "../../Utils/Checkers";
import {selectUserId} from "../../Redux/AuthReducer";
import {GAME_STATUS_IN_PROCESS, GAME_STATUS_OPPONENT_TURN} from "../../Strings";

const TemplatePageWithMenu = ({children}) => {
	const navigate = useNavigate(); // хук для перехода на другие страницы
	const location = useLocation().pathname; // получение url странички; pathname возвращает часть пути, используемую приложением

	const userId = useSelector(selectUserId);
	let games = useSelector(selectGames); // получение списка последних игр
	const isGamesListLoading = useSelector(selectIsGamesListLoading);
	const openedMenuBlocks = useSelector(selectOpenedMenuBlocks); // получение списка раскрытых блоков меню
	const dispatch = useDispatch();

	useEffect(() => {
		if (games === null && !isGamesListLoading) {
			dispatch(tryGetGamesListAsync());
		}
	});

	// если есть игры в списке пользователя, то отобразить 5 последних в меню
	if (games) {
		let counter = 0;
		games = games.filter(game => { // оставляем только 5 активных игр
			if ((game.status === GAME_STATUS_IN_PROCESS) && (counter++ <= 5))
				return game;
			else return false;
		});
		games = games.map(game => reinterpretGameData(game, userId)); // добавляем необходимые данные
		games = games.map(game => ({ // оформляем в виде массива children для меню
			label: game.opponentLogin,
			icon: (game.status === GAME_STATUS_OPPONENT_TURN ? <ClockCircleOutlined/> : <PlaySquareOutlined/>),
			key: "/game/" + game.id
		}));
	}

	// элементы меню
	// в качестве key используется path для перехода
	const menuItems = [
		{label: "Профиль", icon: <UserOutlined/>, key: "/profile"},
		{
			label: "Последние игры",
			icon: <AppstoreOutlined/>,
			key: "games",
			children: games !== null && games.length > 0
				? games
				: [{label: "Нет активных игр", key: "/noGames", type: "group"}]
		},
	];

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