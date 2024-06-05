import colors from 'tailwindcss/colors';

const colorsToExclude = ['inherit', 'current', 'transparent', 'black', 'white', 'red', 'sky', 'green']
const tailwindColors = Object.keys(colors).filter((color) => !colorsToExclude.includes(color));

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * tailwindColors.length);
  return tailwindColors[randomIndex];
};

export const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "efficiency":
      return {
        backgroundColor: "emerald-200",
        border: "emerald-800",
        color: "emerald-800",
        chartColor: "emerald-400",
        baseColor: "emerald",
      };
    case "shift":
      return {
        backgroundColor: "sky-200",
        border: "sky-800",
        color: "sky-800",
        chartColor: "sky-400",
        baseColor: "sky",
      };
    case "downtime":
      return {
        backgroundColor: "red-200",
        border: "red-800",
        color: "red-800",
        chartColor: "red-400",
        baseColor: "red",
      };
    default:
      const randomColors = getRandomColor();

      return {
        backgroundColor: `${randomColors}-200`,
        border: `${randomColors}-800`,
        color: `${randomColors}-800`,
        chartColor: `${randomColors}-400`,
        baseColor: randomColors,
      };
  }
};