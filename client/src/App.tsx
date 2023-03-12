import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
	Home,
	Login,
	Main,
	Pending,
	Profile,
	SignUp,
	SingleEscort,
	Update,
} from "./pages";

function App() {
	const router = createBrowserRouter([
		{
			element: <Home />,
			path: "/",
		},
		{
			element: <SingleEscort />,
			path: "/:id",
		},
		{
			element: <SignUp />,
			path: "/signup",
		},
		{
			element: <Login />,
			path: "/login",
		},
		{
			element: <Main />,
			path: "/user",
			children: [
				{
					element: <Profile />,
					path: "dashboard",
				},
				{
					element: <Pending />,
					path: "verify",
				},
			],
		},
		{
			element: <Update />,
			path: "/update",
		},
	]);

	return (
		<div className='App'>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
