/* eslint-disable no-unused-vars */
const isStringLengthFit = function(string, maxLength) {
  return string.length <= maxLength;
};

const isPalindrome = function (string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }
  return reversedString === normalizedString;
};

const isOverWorkingHours = function (workingDayStartTime, workingDayEndTime, meetingStartTime, meetingDuration) {
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };
  const meetingStartInMinutes = timeToMinutes(meetingStartTime);
  const workingDayEndInMinutes = timeToMinutes(workingDayEndTime);
  const workingDayStartInMinutes = timeToMinutes(workingDayStartTime);

  if (meetingStartInMinutes >= workingDayStartInMinutes && meetingStartInMinutes <= workingDayEndInMinutes) {
    return (workingDayEndInMinutes >= meetingStartInMinutes + meetingDuration);
  } else {
    return false;
  }
};
