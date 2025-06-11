const options = {
  1: "Pedra",
  2: "Papel",
  3: "Tesoura",
};

let overall = 0;
const textDraw = "A rodada empatou!";
const textWinner = "Você ganhou!";
const textLoser = "Você perdeu!";

function generateRandomOption() {
  return Math.floor(Math.random() * 3) + 1;
}

function getWinner(userOption, computerOption) {
  if (userOption === computerOption) {
    return 0;
  }
  if (
    (userOption === 1 && computerOption === 3) ||
    (userOption === 2 && computerOption === 1) ||
    (userOption === 3 && computerOption === 2)
  ) {
    overall++;
    return 1;
  }
  return 2;
}

function stringResult(result) {
  if (result === 0) {
    return textDraw;
  } else if (result === 1) {
    return textWinner;
  } else {
    return `${textLoser} A sua pontuação foi de ${overall}`;
  }
}
function stringOptions() {
  let optionsString = "Escolha uma opção: \n";
  for (let key in options) {
    optionsString += `${key} - ${options[key]}\n`;
  }
  return optionsString;
}

function playGame() {
  console.log(stringOptions());
  const userOption = parseInt(prompt(stringOptions()));
  let computerOption = generateRandomOption();
  let result = getWinner(userOption, computerOption);
  while (result !== 2) {
    const userOption = parseInt(
      prompt(
        `O computador jogou ${options[computerOption]}\n${stringResult(
          result
        )}\n${stringOptions()}`
      )
    );
    computerOption = generateRandomOption();
    result = getWinner(userOption, computerOption);
    
  }
  alert(
    `O computador jogou ${options[computerOption]}\n${stringResult(
      result
    )}\n`
  );
  const body = document.getElementsByTagName("body")[0];
  body.innerHTML = "";
  const button = document.createElement("button");
  const phase = document.createElement("p");
  phase.textContent = `A sua pontuação foi de ${overall}`;
  button.textContent = "Jogar Novamente";
  button.addEventListener("click", playGame);
  body.appendChild(phase);
  body.appendChild(button);
}
playGame();
