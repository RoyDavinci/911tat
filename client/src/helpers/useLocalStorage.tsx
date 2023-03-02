import { useState } from "react";

export function useLocalStorage(key: string) {
	const [state, setState] = useState(localStorage.getItem(key));
	function setStorage(item: string) {
		localStorage.setItem(key, item);
		setState(item);
	}
	return [state, setStorage];
}
