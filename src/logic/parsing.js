export const parseNum = (num, minVal, maxVal, regex, invalidVal = -1) => {
	if ((regex && !regex.test(num)) || num < minVal || num > maxVal) {
		return invalidVal;
	}
	return parseFloat(num);
};
