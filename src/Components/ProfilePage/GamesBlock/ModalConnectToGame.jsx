import React, {useEffect} from "react";
import {Button, Form, InputNumber, Modal, Typography} from "antd";
import {useNavigate} from "react-router-dom";

const {Text} = Typography;

// Модульное окно для подключения к уже существующей игре
const ModalConnectToGame = ({isConnectGameModalOpen, isConnectGameLoading, connectedGameId, connectGameError, setConnectToGameModalOpened, onConnectToGameModalFormSubmit}) => {

	const [formConnectToGame] = Form.useForm(); // для работы с формой в модульном окне подключения к игре
	const navigate = useNavigate(); // хук для перехода на другие страницы

	useEffect(() => {
		if (connectedGameId) { // если появился идентификатор подключения к игре, значит удалось подсоединиться к игре, значит нужно перейти к игре
			setConnectToGameModalOpened(false); // закрытие модульного окна
			navigate("/game/" + connectedGameId); // переход на страницу игры
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