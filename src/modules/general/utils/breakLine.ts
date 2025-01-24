export const breakLine = (str: string, numberOfWord: number) => {
  const tmp = str.split(" ");
  let out = "";
  for (let i = 0; i < tmp.length; i++) {
    out += tmp[i] + " ";
    if ((i % numberOfWord) && i + 1 != tmp.length) {
      out += "\n";
    }
  }
  return out;
};
