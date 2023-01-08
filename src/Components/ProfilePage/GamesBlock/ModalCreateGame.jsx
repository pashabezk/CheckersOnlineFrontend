import React from "react";
import {Button, Modal, Tooltip, Typography} from "antd";
import styles from "../ProfilePage.module.css";
import {CopyOutlined} from "@ant-design/icons";

const {Text} = Typography;

// Модульное окно с уведомлением о создании новой игры
const ModalCreateGame = ({messageApi,  createdGameId, onCreateNewGameModalClose, isCreateGameModalOpen}) => {

	// функция для создания всплывающего окна
	const success = () => {
		messageApi.open({
			type: "success",
			content: "Скопировано",
			duration: 2
		});
	};

	const onClickCopy = () => { // функция копирования по нажатию
		navigator.clipboard.writeText(String(createdGameId))
			.then(() => success()); // отображение всплывающего окна
	};

	return (
		<Modal
			title="Игра создана"
			open={isCreateGameModalOpen}
			closable={false}
			footer={[
				<Button type="primary" onClick={onCreateNewGameModalClose}>OK</Button>
			]}
		>
			<div>
				<Text>Для начала игры ваш соперник должен нажать кнопку «Присоединиться» и ввести идентификатор игры:</Text><br/>
				<Text>id: </Text>
				<Tooltip title="Копировать">
					<Text code onClick={onClickCopy} className={styles.copy}>{createdGameId}&nbsp;<CopyOutlined/></Text>
				</Tooltip>
			</div>
		</Modal>
	);
};

export default ModalCreateGame;