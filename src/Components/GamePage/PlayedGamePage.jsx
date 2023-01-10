import React from "react";
import TemplatePageWithMenu from "../TemplatePageWithMenu/TemplatePageWithMenu";
import Title from "antd/lib/typography/Title";
import {TrophyTwoTone} from "@ant-design/icons";

const PlayedGamePage = ({winnerLogin, loserLogin}) => {
	return (
		<TemplatePageWithMenu>
			<Title>Игра завершена</Title>
			<Title level={2}>Победитель: {winnerLogin} <TrophyTwoTone twoToneColor="#e09a00"/></Title>
			<Title level={3}>Соперник: {loserLogin}</Title>
		</TemplatePageWithMenu>
	);
};

export default PlayedGamePage;