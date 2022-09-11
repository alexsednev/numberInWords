// Import stylesheets
import './style.css';
import { numsObj } from './digits';
import { formatDigitArray, getThouthands, getMillions } from './helper';
// Write Javascript code!
const appDiv = document.getElementById('app');
const appInput = document.querySelector('input');
const validationReg = /^\d[\d,]*(\.\d+)?$/;
const splitReg = /[.]/;

appInput.addEventListener('change', (e) => {
  appDiv.innerHTML = numberInWords(appInput.value);
});

function numberInWords(digitsToWords) {
  if (!validationReg.test(digitsToWords)) {
    throw new Error('Not a number');
  }

  digitsToWords = Number(digitsToWords.replace(',', '.'));

  const [wholeNumber, remainder] = digitsToWords.toFixed(2).split(splitReg);

  const formatedArray = formatDigitArray(wholeNumber);

  if (formatedArray.length > 3) {
    throw new Error('Too bis number');
  }

  const digInWordsArr = formatedArray.reduce((wordsArr, nums, i) => {
    nums = nums.toString();
    let splitedArr = nums.split('');
    let lastTwoDigits = (nums % 100).toString();
    let objPointer;
    splitedArr.splice(-2, 2);

    if (lastTwoDigits < 20) {
      lastTwoDigits = lastTwoDigits.split();
      lastTwoDigits.splice(0, 0, '0');
    } else {
      lastTwoDigits = lastTwoDigits.split('');
    }

    const lastDigit = lastTwoDigits[lastTwoDigits.length - 1];

    if (i > 0) {
      const separator =
        i === 1 ? getThouthands(lastDigit) : getMillions(lastDigit);
      wordsArr.push(separator);
    }

    splitedArr = splitedArr.concat(lastTwoDigits);

    splitedArr.reverse().forEach((digit, j) => {
      objPointer = null;
      if (i < 2 && j === 0 && lastDigit < 3) {
        objPointer = 'thouthandException';
      }
      wordsArr.push(numsObj[objPointer || `num${j}`][digit]);
    });

    return wordsArr;
  }, []);

  const finalString = `${digInWordsArr
    .reverse()
    .join(' ')
    .trim()} грн ${remainder} коп`;
  return finalString[0].toUpperCase() + finalString.slice(1);
}
