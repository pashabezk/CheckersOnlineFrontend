import React from "react";
import Title from "antd/lib/typography/Title";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import TemplatePageWithMenu from "../TemplatePageWithMenu/TemplatePageWithMenu";
import {useSelector} from "react-redux";
import {selectUserId} from "../../Redux/AuthReducer";
import {FrownOutlined} from "@ant-design/icons";

const PageNotFound = ({title = "404. Такой страницы нет", message = "Попробуйте ввести другой адрес"}) => {

	const navigate = useNavigate(); // хук для перехода на другие страницы
	const userId = useSelector(selectUserId); // получение идентификатора пользователя для проверки его авторизации

	// тело компонента
	const body = <>
		<Title>
			<FrownOutlined/>&nbsp;
			{title}
		</Title>
		<p>{message}</p>
		<Button type={"primary"} onClick={() => navigate("/profile")}>
			{
				userId
					? <>Перейти в профиль</>
					: <>Авторизоваться</>
			}
		</Button>
	</>

	if (userId) // если пользователь авторизован, то отображается боковое меню
		return <TemplatePageWithMenu>{body}</TemplatePageWithMenu>;

	// иначе отображается только тело компонента
	return <div>{body}</div>;
}

export default PageNotFound;