import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
	Home,
	Login,
	Main,
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
			path: "/dashboard",
			children: [
				{
					element: <Profile />,
					path: "profile",
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
