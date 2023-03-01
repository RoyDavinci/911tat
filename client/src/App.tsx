import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, SingleEscort } from "./pages";

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
	]);

	return (
		<div className='App'>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
