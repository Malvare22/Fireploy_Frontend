export const OFF_SET_LETTERS_OF_GROUP = 65;

export function letterOptionsForGroup() {
  const options = [];
  let i = 0;
  options.length = 26;
  while (i <= 25) {
    options[i] = String.fromCharCode(i + OFF_SET_LETTERS_OF_GROUP);
    i++;
  }
  return options;
}
