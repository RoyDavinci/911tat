import React, { useEffect, useState } from "react";
import { verified } from "../../interfaces/user";
import { useParams } from "react-router-dom";
import "./singleEscort.css";
import { items } from "../../helpers/data";
import { useAppDispatch } from "../../app/hooks";
import { addToCart } from "../../features/cart/cart";

export const SingleEscort = () => {
	const [escort, setEscort] = useState<verified>();
	const dispatch = useAppDispatch();

	const { id } = useParams();
	console.log(id);

	useEffect(() => {
		const getElement = () => {
			const itemData = items.find((item) => item.id === Number(id));
			setEscort(itemData);
			dispatch(addToCart(itemData));
		};
		getElement();
	}, [id]);
	console.log(escort);

	return <div>SingleEscort</div>;
};
