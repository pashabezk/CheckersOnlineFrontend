import React from "react";
import TemplatePageWithMenu from "../TemplatePageWithMenu/TemplatePageWithMenu";
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import styles from "./ProfilePage.module.css"
import Title from "antd/lib/typography/Title";
import GamesBlock from "./GamesBlock/GamesBlock";

const UserPhotoAndLoginBlock = ({login}) => {
	return (
		<div className={styles.userPhotoAndLoginBlock}>
			<Avatar
				size={100}
				icon={<UserOutlined/>}
			/>
			<div className={styles.nameBlock}>
				<Title level={2}>{login}</Title>
			</div>
		</div>
	);
};

const ProfilePage = ({login, gamesBlockProps}) => {
	return (
		<TemplatePageWithMenu>
			<UserPhotoAndLoginBlock login={login}/>
			<GamesBlock {...gamesBlockProps}/>
		</TemplatePageWithMenu>
	);
}

export default ProfilePage;