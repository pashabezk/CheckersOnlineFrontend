import React from "react";
import {Button, Modal, Typography} from "antd";

const {Text} = Typography;

// Модульное окно с уведомлением об успешном прохождении авторизации
const ModalRegistrationCompleted = ({isCompletedModalOpen, onButtonClick}) => {
	return (
		<Modal
			title="Авторизация прошла успешно"
			open={isCompletedModalOpen}
			closable={false}
			footer={[
				<Button
					type="primary"
					onClick={onButtonClick}
					key="ok">Перейти к авторизации
				</Button>
			]}>
			<div>
				<Text>Нажмите на кнопку ниже, чтобы войти в систему</Text><br/>
			</div>
		</Modal>
	);
}

export default ModalRegistrationCompleted;