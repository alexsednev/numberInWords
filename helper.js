export const formatDigitArray = (digits, formatedArray = []) => {
  const restDigits = digits % 1000;
  const wholeDigits = parseInt(digits / 1000);
  formatedArray.push([restDigits]);

  if (wholeDigits > 0) {
    formatDigitArray(wholeDigits, formatedArray);
  }

  return formatedArray;
};

export const getThouthands = (digits) => {
  if (+digits === 1) {
    return 'тисяча';
  }
  return digits < 5 ? 'тисячі' : 'тисяч';
};

export const getMillions = (digits) => {
  if (+digits === 1) {
    return 'мільйон';
  }
  return digits < 5 ? 'мільйони' : 'мільйонів';
};
