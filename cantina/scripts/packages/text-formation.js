function fnCapitalize(word) {
	const firstLetter = word.charAt(0).toLocaleUpperCase();
	const rest = word.slice(1);

	const result = firstLetter + rest;

	return result;
}

export { fnCapitalize };