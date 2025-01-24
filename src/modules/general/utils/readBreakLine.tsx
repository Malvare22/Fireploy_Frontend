export const readBreakLine = (str: string) => {
  console.log(str)
  const tmp = str.split("\n");
  let content: any[] = [];
  for (let i = 0; i < tmp.length; i++) {
    content.push(<span key={`line-${i}`}>{tmp[i]}</span>); // Agregar el texto
    if (i + 1 !== tmp.length) {
      content.push(<br key={`br-${i}`} />); // Agregar un <br /> excepto después del último
    }
  }

  return content;
};
