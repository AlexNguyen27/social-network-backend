export function truncateMultilineString(text: string, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  const descriptionArr = text.split(" ");
  const wordArr = [];

  let resultString = "";
  for (let i = 0; i < descriptionArr.length; i += 1) {
    wordArr.push(`${descriptionArr[i]} `);
    resultString += `${descriptionArr[i]} `;
    if (resultString.length > maxLength) {
      wordArr.pop(); // remove last element
      break;
    }
  }

  resultString = "";
  wordArr.forEach((word) => {
    resultString += word;
  });

  return `${resultString.trim()}...`;
}
