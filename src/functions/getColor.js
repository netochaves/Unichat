/* eslint-disable no-plusplus */
const getColor = () => {
  const hexadecimais = "0123456789ABCDEF"
  let cor = "#"
  while (1) {
    for (let i = 0; i < 6; i++) {
      cor += hexadecimais[Math.floor(Math.random() * 16)]
    }
    if (cor === "#FFFFFF") {
      cor = "#"
    } else {
      return cor
    }
  }
}

export default getColor
