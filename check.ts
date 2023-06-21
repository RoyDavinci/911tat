const values = {
	data: "welcome",
	item: "",
	kkk: "kk",
};
const body = {};
function getKeyByValue(object: object, value: string) {
	return Object.keys(object).find((key) => object[key] === value);
}

Object.values(values).map((item) => {
	if (!item.length) return;
	else {
		const key = getKeyByValue(values, item);
		if (key) {
			body[key] = item;
		}
	}
});
console.log(body);
