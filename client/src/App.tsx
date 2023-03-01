import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, Profile, SignUp, SingleEscort } from "./pages";

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
			element: <Profile />,
			path: "/dashboard",
		},
	]);

	return (
		<div className='App'>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
