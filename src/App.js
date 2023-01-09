import './App.css';
import React from "react";
import {Layout, Spin} from "antd";
import {Content, Footer} from "antd/es/layout/layout";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import AppFooter from "./Components/Footer/Footer";
import AppHeader from "./Components/Header/Header";
import GamePage from "./Components/GamePage/GamePage";

const Login = React.lazy(() => import ("./Components/Login/Login"));
// const GamePage = React.lazy(() => import ("./Components/GamePage/GamePage"));
const ProfilePageContainer = React.lazy(() => import ("./Components/ProfilePage/ProfilePageContainer"));

function App() {
	return (
		// styling
		// <ConfigProvider
		// 	theme={{
		// 		token: {
		// 			colorPrimary: '#00b96b',
		// 		},
		// 	}}
		// >

		// HashRouter only for GitHub pages
		// <BrowserRouter basename={process.env.PUBLIC_URL}> // use instead HashRouter in real project
		<HashRouter>
			<Layout className="main-wrapper">
				<AppHeader/>
				<Content>
					<React.Suspense fallback={<Spin tip="Загрузка" size="large"/>}>
						<Routes>
							<Route path="/" element={<Navigate to="/profile"/>}/>
							<Route path="/profile" element={<ProfilePageContainer/>}/>
							<Route path="/game" element={<GamePage/>}/>
							<Route path="/login" element={<Login/>}/>
							<Route path="*" element={<Navigate to="/"/>}/>
						</Routes>
					</React.Suspense>
				</Content>
				<Footer>
					<div className="center1000px">
						<AppFooter/>
					</div>
				</Footer>
			</Layout>
		</HashRouter>
	);
}

export default App;
