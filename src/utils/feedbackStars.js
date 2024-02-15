export const feedbackStar = (num) => {
  const isInt = Number.isInteger(num);

  let feedbackArr = [];
  for (let i = 0; i < Math.floor(num); i++) {
    feedbackArr.push(i);
  }

  return {
    isInt,
    feedbackArr,
  };
};
