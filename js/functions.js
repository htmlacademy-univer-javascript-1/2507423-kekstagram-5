const isStringLengthFit = function(string, maxLength) {
  return string.length <= maxLength;
};

const isPalindrome = function (string) {
  let normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }
  return reversedString === normalizedString;
};


