import React from "react";
import {Button, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import styles from "./Registration.module.css"
import withoutAuth from "../HOC/withoutAuth";
import {selectRegistrationError, selectRegistrationIsCompletedModalOpen, selectRegistrationIsLoading, setIsRegistrationCompletedModalOpen, setRegistrationErrorMsg, tryRegisterAsync} from "../../Redux/RegistrationReducer";
import ModalRegistrationCompleted from "./ModalRegistrationCompleted";
import Title from "antd/lib/typography/Title";
import {useNavigate} from "react-router-dom";

const Registration = () => {

	const isLoading = useSelector(selectRegistrationIsLoading);
	const error = useSelector(selectRegistrationError);
	const isCompletedModalOpen = useSelector(selectRegistrationIsCompletedModalOpen);
	const dispatch = useDispatch();
	const navigate = useNavigate(); // хук для перехода на другие страницы

	const onFinish = async (values) => {
		if (values.password === values.password2)
			dispatch(tryRegisterAsync({login: values.login, password: values.password}));
		else
			dispatch(setRegistrationErrorMsg("Пароли не совпадают"));
	};
	const onFinishFailed = (errorInfo) => {
		dispatch(setRegistrationErrorMsg(errorInfo.errorFields[0].errors[0]));
	};
	const onFieldsChange = () => {
		dispatch(setRegistrationErrorMsg(null));
	};
	const onCompletedModalButtonClick = () => { // обработчик нажатий на кнопку в модульном окне уведомления об успешном завершении авторизации
		dispatch(setIsRegistrationCompletedModalOpen(false)); // закрытие модульного окна
		navigate("/login"); // переход на страницу авторизации
	};

	return (
		<div className={styles.registrationContainer}>
			<Form
				labelCol={{span: 7}}
				wrapperCol={{span: 16}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				onFieldsChange={onFieldsChange}
				requiredMark={false}
				className={styles.registrationForm}>
				<Form.Item wrapperCol={{offset: 7}} className={styles.registrationTitle}>
					<Title level={3}>Регистрация</Title>
				</Form.Item>
				<Form.Item
					label="Логин"
					name="login"
					rules={[{
						required: true,
						message: 'Поле логин обязательно',
					}]}>
					<Input/>
				</Form.Item>
				<Form.Item
					label="Пароль"
					name="password"
					rules={[{
						required: true,
						message: 'Поле пароль обязательно',
					}]}>
					<Input.Password/>
				</Form.Item>
				<Form.Item
					label="Повторите пароль"
					name="password2"
					rules={[{
						required: true,
						message: 'Повторите пароль',
					}]}>
					<Input.Password/>
				</Form.Item>
				<Form.Item
					wrapperCol={{offset: 7}}
					validateStatus={error ? "error" : "success"}
					help={error}>
					<div className={styles.buttonBlock}>
						<Button type="primary" htmlType="submit" loading={isLoading}>
							Регистрация
						</Button>
						<Button type="text" onClick={() => {
							onFieldsChange();
							navigate("/login");
						}}>Уже есть аккаунт</Button>
					</div>
				</Form.Item>
			</Form>
			<ModalRegistrationCompleted isCompletedModalOpen={isCompletedModalOpen} onButtonClick={onCompletedModalButtonClick}/>
		</div>
	);
}

export default withoutAuth(Registration);