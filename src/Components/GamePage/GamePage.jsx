import React from "react";
import CheckersField from "./CheckersField/CheckersField";
import TemplatePageWithMenu from "../TemplatePageWithMenu/TemplatePageWithMenu";
import {Button} from "antd";
import Title from "antd/lib/typography/Title";
import blackChecker from "../../Assets/Img/Chekers/Black.svg";
import whiteChecker from "../../Assets/Img/Chekers/White.svg";
import styles from "./GamePage.module.css"

const GamePage = ({checkersFieldProps}) => {
	return (
		<TemplatePageWithMenu>
			<Title level={2}>
				<span>Партия с OpponnentLogin</span>
			</Title>
			<div>
				<p className={styles.user}>
					<img src={blackChecker} alt="checker" className={styles.checkerImg}/>
					<span>Ваш ход</span>
				</p>
				<p className={styles.user}>
					<img src={whiteChecker} alt="checker" className={styles.checkerImg}/>
					<span>OpponnentLogin</span>
				</p>
			</div>
			<div className={styles.gameBlock}>
				<div className={styles.checkersField}>
					<CheckersField {...checkersFieldProps}/>
				</div>
				<div className={styles.gameBlockFooterWrapper}>
					<div className={styles.gameBlockFooter}>
						<p>gameId: 3325</p>
						<Button danger>Сдаться</Button>
					</div>
				</div>
			</div>
		</TemplatePageWithMenu>
	);
}

export default GamePage;