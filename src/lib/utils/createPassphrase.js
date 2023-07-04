export function createPassphrase(minLength, maxLength, totalWords, includeDigits, wordSeparator, words) {
    let wordList = findWords(totalWords, minLength, maxLength, words);
    let passphrase = formatPassphrase(wordList, wordSeparator);
    let bakedPassphrase = includeDigits ? addDigits(passphrase, includeDigits) : passphrase;
    return bakedPassphrase;
}
function findWords(totalWords, minLength, maxLength, words) {
    let result = [];
    while (result.length < totalWords) {
        let selectWord = words[Math.floor(Math.random() * words.length)].trim();
        if (isLengthValid(selectWord, minLength, maxLength)) {
            result.push(selectWord);
        }
    }
    return result;
}
function isLengthValid(word, min, max) {
    return word.length >= min && word.length <= max;
}
function formatPassphrase(wordList, separator) {
    return wordList.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(separator);
}
function addDigits(passphrase, digitCount) {
    let digits = Array.from({ length: digitCount }, () => getRandomDigit()).join("");
    return passphrase + digits;
}
function getRandomDigit() {
    return Math.floor(Math.random() * 10).toString().padStart(1, '0');
}
//# sourceMappingURL=createPassphrase.js.map