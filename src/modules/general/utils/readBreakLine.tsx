/**
 * Splits a string by line breaks (`\n`) and returns an array of React elements.
 * Each line is wrapped in a <span>, followed by a <br />, except the last line.
 * Useful for rendering multiline strings in JSX.
 *
 * @function
 * @param {string} str - The input string with possible line breaks.
 * @returns {JSX.Element[]} Array of React elements representing the string with line breaks.
 */
export const readBreakLine = (str: string): JSX.Element[] => {
  const tmp = str.split("\n");
  let content: JSX.Element[] = [];

  for (let i = 0; i < tmp.length; i++) {
    content.push(<span key={`line-${i}`}>{tmp[i]}</span>);
    if (i + 1 !== tmp.length) {
      content.push(<br key={`br-${i}`} />);
    }
  }

  return content;
};
