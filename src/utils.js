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
    ? `${(number / 1000000000).toFixed(2)} Mrds`
    : String(number).length >= 7
    ? `${(number / 1000000).toFixed(0)} M`
    : String(number).length >= 4
    ? `${(number / 1000).toFixed(0)} k`
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

export const formatName = (nameOfCharacter) => {
  return (nameOfCharacter.split(" ")[1] &&
    nameOfCharacter.split(" ")[1].length === 2 &&
    /./g.test(nameOfCharacter.split(" ")[1])) ||
    (nameOfCharacter.split(" ")[0].length === 2 &&
      /./g.test(nameOfCharacter.split(" ")[0]))
    ? {
        lastname: nameOfCharacter.split(" ").at(-1),
        firstname:
          nameOfCharacter
            .split(" ")
            .slice(0, nameOfCharacter.split(" ").length - 1)
            .join(" ") + " ",
      }
    : {
        lastname: nameOfCharacter
          .split(" ")
          .slice(1, nameOfCharacter.split(" ").length)
          .join(" "),
        firstname: nameOfCharacter.split(" ")[0] + " ",
      };
};

export const encodeSlug = (text) =>
  String(text)
    .toLowerCase()
    .replace(/( : )/g, "-")
    .replace(/(:)|(- )|[?!,’'.&#\u00A0]|(...)/gm, "")
    .replace(/ /g, "-");

export const decodeSlug = (text) =>
  String(text).replace(/-/g, " ").toLowerCase();
