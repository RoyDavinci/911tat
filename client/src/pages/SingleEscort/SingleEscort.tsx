import React, { useEffect, useState } from "react";
import { verified } from "../../interfaces/user";
import { useParams } from "react-router-dom";
import "./singleEscort.css";
import { data } from "../../helpers/data";

export const SingleEscort = () => {
	const [escort, setEscort] = useState<verified[]>([]);

	const { id } = useParams();
	console.log(id);

	useEffect(() => {
		const getElement = () => {
			const items = data.filter((item) => item.id === Number(id));
			setEscort(items);
		};
		getElement();
	}, [id]);
	console.log(escort);

	return <div>SingleEscort</div>;
};
