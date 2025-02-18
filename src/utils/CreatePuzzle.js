export const creteIntialState = () => {
  let choices = [];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      choices.push({ i, j });
    }
  }
  let intialState = Array.from({ length: 5 }, () => Array(5).fill(""));

  for (let i = 0; i < 6; i++) {
    const n = choices.length;

    const ind = Math.floor(Math.random() * n);

    const x = choices[ind].i;
    const y = choices[ind].j;

    intialState[x][y] = "w";

    choices.splice(ind, 1);
  }

  for (let i = 0; i < 6; i++) {
    const n = choices.length;

    const ind = Math.floor(Math.random() * n);

    const x = choices[ind].i;
    const y = choices[ind].j;

    intialState[x][y] = "x";

    choices.splice(ind, 1);
  }

  for (let i = 0; i < 6; i++) {
    const n = choices.length;

    const ind = Math.floor(Math.random() * n);

    const x = choices[ind].i;
    const y = choices[ind].j;

    intialState[x][y] = "y";

    choices.splice(ind, 1);
  }

  for (let i = 0; i < 6; i++) {
    const n = choices.length;

    const ind = Math.floor(Math.random() * n);

    const x = choices[ind].i;
    const y = choices[ind].j;

    intialState[x][y] = "z";

    choices.splice(ind, 1);
  }
  const fi = choices[0].i;
  const fj = choices[0].j;
  intialState[fi][fj] = "o";

  return intialState;
};
