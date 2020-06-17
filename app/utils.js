export const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.map(letter => letter.toLowerCase()).join('');

export const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
