const isEmpty = require('objects-made-easy').isEmpty;

const cleanSearchPattern = (searchPattern) => searchPattern.trim().replace(/\s+/g, ' ');

const wordCount = (searchPattern) => {
  if (isEmpty(searchPattern)) return 0;
  const text = cleanSearchPattern(searchPattern);
  if (isEmpty(text)) return 0;
  return text.split(' ').length;
};
const doubleQuotes = (s) => wordCount(s) > 1 ? `"${s}"` : s;

const createSearchCriteria = (searchPattern) => {
  if (isEmpty(searchPattern)) throw new Error('searchPattern must be provided prior to call this method');
  const text = cleanSearchPattern(searchPattern);
  if (wordCount(text)===1) return text;
  const arrWords = text.split(' ');
  const setOfWords = new Set();
  for (let i=0; i< arrWords.length; i++) {
    setOfWords.add(doubleQuotes(arrWords.slice(i).join(' ')));
  }
  for (let i=arrWords.length-1; i> 0; i--) {
    setOfWords.add(doubleQuotes(arrWords.slice(0, i).join(' ')));
  }
  return Array.from(setOfWords).join(' OR ');
};

module.exports = {
  escapeSOQL: (data) => data.replace(/(['\\])/g, '\\$&'),
  escapeSOSL: (data) => data.replace(/([?&|!{}[\]()^~*:\\"'+-])/g, '\\$&'),
  createSearchCriteria,
};
