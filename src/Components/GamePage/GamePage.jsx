import React from "react";
import CheckersField from "./CheckersField/CheckersField";
import TemplatePageWithMenu from "../TemplatePageWithMenu/TemplatePageWithMenu";
import {Button} from "antd";
import Title from "antd/lib/typography/Title";
import blackChecker from "../../Assets/Img/Chekers/Black.svg";
import whiteChecker from "../../Assets/Img/Chekers/White.svg";
import styles from "./GamePage.module.css"
import LoaderFullSpace from "../Common/LoaderFullSpace/LoaderFullSpace";
import {CHECKER_COLOR_WHITE, GAME_STATUS_OPPONENT_TURN, GAME_STATUS_YOUR_TURN} from "../../Strings";

const GamePage = ({gameId, login, gameData, isGameDataLoading, gameDataError, onCapitulation, isCapitulating, checkersFieldProps}) => {

	const body = <>
		<Title level={2}>
			<span>Партия с {gameData.opponentLogin}</span>
		</Title>
		<div>
			<p className={styles.user}>
				<img
					src={gameData.playerColor === CHECKER_COLOR_WHITE ? whiteChecker : blackChecker}
					alt="checker"
					className={styles.checkerImg}/>
				<span>{login}</span>
				{gameData.status === GAME_STATUS_YOUR_TURN && <span> (Ваш ход)</span>}
			</p>
			<p className={styles.user}>
				<img
					src={gameData.playerColor === CHECKER_COLOR_WHITE ? blackChecker : whiteChecker}
					alt="checker"
					className={styles.checkerImg}/>
				<span>{gameData.opponentLogin}</span>
				{gameData.status === GAME_STATUS_OPPONENT_TURN && <span> (его ход)</span>}
			</p>
		</div>
		<div className={styles.gameBlock}>
			<div className={styles.checkersField}>
				<CheckersField {...checkersFieldProps}/>
			</div>
			<div className={styles.gameBlockFooterWrapper}>
				<div className={styles.gameBlockFooter}>
					<p>gameId: {gameId}</p>
					<Button danger loading={isCapitulating} onClick={() => onCapitulation()}>Сдаться</Button>
				</div>
			</div>
		</div>
	</>;

	const errorMsg = <>
		<Title>Возникла ошибка</Title>
		<p>{gameDataError}</p>
	</>;

	return (
		<TemplatePageWithMenu>
			{
				isGameDataLoading
					? <LoaderFullSpace/>
					: gameDataError
						? errorMsg
						: body
			}
		</TemplatePageWithMenu>
	);
}

export default GamePage;