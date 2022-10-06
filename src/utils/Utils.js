const extractSubHeadingFromString = (string, month, topic) => {
  const newStringArray = string.match(/("[^"]+"|[^"\s' ']+)/g);
  let subHeading = '';

  const topicArray = topic.split(' ');
  const topic1 = topicArray[0];
  const topic2 = capitalizeFirstLetter(topicArray[1]);

  for (let i = 0; i < newStringArray.length; i++) {
    if (
      newStringArray[i] === month ||
      newStringArray[i] === topic1 ||
      newStringArray[i] === topic2
    ) {
      subHeading += ' ' + newStringArray[i];
    }
  }

  return subHeading;
};

const removeSubHeading = (fileContent, subHeading) => {
  return subHeading ? fileContent.replace(subHeading, ' ') : fileContent;
};

const capitalizeFirstLetter = (string) => {
  return string
    ? formatString(string.charAt(0).toUpperCase() + string.slice(1))
    : '';
};

const formatString = (string) => {
  const formattedString = string.replace(/[-#]/g, ' ');

  return formattedString;
};

module.exports = {
  extractSubHeadingFromString,
  removeSubHeading,
  capitalizeFirstLetter,
  formatString,
};
