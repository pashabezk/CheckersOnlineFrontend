import React, {useEffect} from "react";
import {Button, Form, InputNumber, Modal, Typography} from "antd";

const {Text} = Typography;

// Модульное окно для подключения к уже существующей игре
const ModalConnectToGame = ({messageApi, isConnectGameModalOpen, isConnectGameLoading, connectedGameId, connectGameError, setConnectToGameModalOpened, onConnectToGameModalFormSubmit}) => {

	const [formConnectToGame] = Form.useForm(); // для работы с формой в модульном окне подключения к игре

	useEffect(() => {
		if (connectedGameId) { // если появился идентификатор подключения к игре, значит удалось подсоединиться к игре, значит нужно перейти к игре
			setConnectToGameModalOpened(false); // закрытие модульного окна
			messageApi.open({ // отображение всплывающего уведомления об успехе подключения
				type: "success",
				content: "Игра добавлена в ваш список",
				duration: 5
			});
		}
	}, [connectedGameId]);

	// функция обработчик нажатия кнопки "Отмена" в модульном окне подключения к игре
	const onConnectGameModalCancelButtonClick = () => {
		formConnectToGame.resetFields(); // очистка формы
		setConnectToGameModalOpened(false); // закрытие модульного окна
	};

	// функция обработчик отправки формы в модульном окне подключения к игре
	// функция вызывается только если форма прошла валидацию
	const onConnectToGameFormSubmitted = () => {
		onConnectToGameModalFormSubmit(formConnectToGame.getFieldValue("gameId"));
	};

	return (
		<Modal
			title="Присоединиться к игре"
			open={isConnectGameModalOpen}
			centered
			onCancel={onConnectGameModalCancelButtonClick}
			footer={[
				<Button
					type="default"
					onClick={onConnectGameModalCancelButtonClick}
					key="cancel">Отмена
				</Button>,
				<Button
					type="primary"
					onClick={() => formConnectToGame.submit()}
					loading={isConnectGameLoading}
					key="ok">OK
				</Button>
			]}
		>
			<div>
				<Text>Для подключения к игре введите её идентификатор</Text><br/>
				<Form
					onFinish={onConnectToGameFormSubmitted}
					form={formConnectToGame}
					requiredMark={false}>
					<Form.Item
						label="id"
						name="gameId"
						validateStatus={connectGameError ? "error" : "success"}
						help={connectGameError}
						rules={[{
							required: true,
							message: "Введите идентификатор игры",
						}]}>
						<InputNumber size="small" min={1}/>
					</Form.Item>
				</Form>
			</div>
		</Modal>
	);
}

export default ModalConnectToGame;