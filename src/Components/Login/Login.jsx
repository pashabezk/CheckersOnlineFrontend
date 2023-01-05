import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthError, selectIsAuthing, setAuthError, tryLogInAsync} from "../../Redux/AuthReducer";
import withAuthRedirect from "../HOC/withAuthRedirect";
import styles from "./Login.module.css"

const Login = () => {

	// const login = useSelector(selectLogin);
	// const userId = useSelector(selectUserId);
	const isAuthing = useSelector(selectIsAuthing);
	const authError = useSelector(selectAuthError);
	const dispatch = useDispatch();

	const onFinish = async (values) => {
		dispatch(tryLogInAsync({login: values.login, password: values.password}));
	};
	const onFinishFailed = (errorInfo) => {
		dispatch(setAuthError(errorInfo.errorFields[0].errors[0]))
	};
	const onFieldsChange = () => {
		dispatch(setAuthError(null))
	}

	return (
		<div className={styles.loginContainer}>
			<Form
				labelCol={{
					span: 6
				}}
				wrapperCol={{
					span: 16
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				onFieldsChange={onFieldsChange}
				requiredMark={false}
				className={styles.loginForm}>
				<Form.Item
					label="Логин"
					name="login"
					rules={[
						{
							required: true,
							message: 'Поле логин обязательно',
						}
					]}>
					<Input/>
				</Form.Item>
				<Form.Item
					label="Пароль"
					name="password"
					rules={[
						{
							required: true,
							message: 'Поле пароль обязательно',
						},
					]}>
					<Input.Password/>
				</Form.Item>
				<Form.Item
					name="remember"
					valuePropName="checked"
					wrapperCol={{
						span: 0,
						offset: 6
					}}>
					<Checkbox>запомнить меня</Checkbox>
				</Form.Item>
				<Form.Item
					wrapperCol={{offset: 6}}
					validateStatus={authError ? "error" : "success"}
					help={authError}>
					<Button type="primary" htmlType="submit" loading={isAuthing}>
						Войти
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default withAuthRedirect(Login);