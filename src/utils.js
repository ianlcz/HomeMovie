export const formatTime = (time) => {
  if (typeof time === "number") {
    return `${parseInt(time / 60)} h ${
      Math.round((time / 60 - parseInt(time / 60)) * 60) === 0
        ? ""
        : Math.round((time / 60 - parseInt(time / 60)) * 60) < 10
        ? "0" + Math.round(((time / 60 - parseInt(time / 60)) * 60).toFixed(1))
        : Math.round(((time / 60 - parseInt(time / 60)) * 60).toFixed(1))
    }`;
  } else {
    throw new Error(`Your time is not of Number type !`);
  }
};

export const formatNumber = (number) =>
  number === null || isNaN(number)
    ? 0
    : String(number).length >= 10
    ? `${Math.round(number / 1000000000)} Mrds`
    : String(number).length >= 7
    ? `${(number / 1000000).toFixed(
        (number / 1000000 - (number / 1000000).toFixed(0)).toFixed(1) < 0.1
          ? 0
          : 1,
      )} M`
    : String(number).length >= 4
    ? `${(number / 1000).toFixed(
        (number / 1000 - (number / 1000).toFixed(0)).toFixed(1) < 0.1 ? 0 : 1,
      )} k`
    : number;

export const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const arrayOfUniqueElement = (array, filterParameter = "id") => [
  ...new Map(array.map((item) => [item[filterParameter], item])).values(),
];
