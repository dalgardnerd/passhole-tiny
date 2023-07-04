export function createPassphrase(
    minLength: number,
    maxLength: number,
    totalWords: number,
    includeDigits: number,
    wordSeparator: string,
    words: string[]
) {
    let wordList = findWords(totalWords, minLength, maxLength, words);
    let passphrase = formatPassphrase(wordList, wordSeparator);
    let bakedPassphrase = includeDigits ? addDigits(passphrase, includeDigits) : passphrase;
    return bakedPassphrase;
}

function findWords(totalWords: number, minLength: number, maxLength: number, words: string[]) {
    let result: string[] = [];
    while (result.length < totalWords) {
        let selectWord: string = words[Math.floor(Math.random() * words.length)].trim();
        if (isLengthValid(selectWord, minLength, maxLength)) {
            result.push(selectWord);
        }
    }
    return result;
}

function isLengthValid(word: string, min: number, max: number) {
    return word.length >= min && word.length <= max;
}

function formatPassphrase(wordList: string[], separator: string) {
    return wordList.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(separator);
}

function addDigits(passphrase: string, digitCount: number) {
    let digits = Array.from({ length: digitCount }, () => getRandomDigit()).join("");
    return passphrase + digits;
}

function getRandomDigit() {
    return Math.floor(Math.random() * 10).toString().padStart(1, '0');
}
