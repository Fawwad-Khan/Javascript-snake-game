canvas = document.body.children[0];
context = canvas.getContext("2d");

context.scale(10, 10);

document.body.onkeyup = function(x) {
  if (x.which === 40) {
    if (direction[0] !== 0 && direction[1] !== -1) {
      direction[0] = 0;
      direction[1] = 1;
    }
  } else if (x.which === 38) {
    if (direction[0] !== 0 && direction[1] !== 1) {
      direction[0] = 0;
      direction[1] = -1;
    }
  } else if (x.which === 37) {
    if (direction[0] !== 1 && direction[1] !== 0) {
      direction[0] = -1;
      direction[1] = 0;
    }
  } else if (x.which === 39) {
    if (direction[0] !== -1 && direction[1] !== 0) {
      direction[0] = 1;
      direction[1] = 0;
    }
  }
};

snake = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 3],
  [1, 4]
];

direction = [1, 0];
apple = [8, 3];
function updateLoop() {
  tail = snake.pop();
  head = snake[0];
  if (head[1] === 20) {
    head[1] = -1;
  } else if (head[1] === -1) {
    head[1] = 20;
    direction[0] = 0;
    direction[1] = -1;
  } else if (head[0] === 20) {
    head[0] = -1;
  } else if (head[0] === -1) {
    head[0] = 20;
    direction[0] = -1;
    direction[1] = 0;
  }
  tail[0] = head[0] + direction[0];
  tail[1] = head[1] + direction[1];
  snake.unshift(tail);
  isFailed = false;

  if (head[0] === apple[0] && apple[1] === head[1]) {
    eatApple();
  }
  snake.forEach(function(item, index) {
    if (!(index === 1) && !isFailed) {
      if (item[0] === head[0] && item[1] === head[1]) {
        console.log("I am true for", item, head);
        console.log("I am true for", snake);
        isFailed = true;
      }
    }
  });

  draw();
  if (isFailed === true) {
    alert("You Failed");
    isFailed = false;
    resetGame();
  }
}

function eatApple() {
  apple = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1]]);
  score = document.getElementById("score");
  score.innerHTML = parseInt(score.innerHTML, 10) + 10;
}

function draw() {
  context.clearRect(0, 0, 300, 300);
  context.fillStyle = "black";
  snake.forEach(function([x, y]) {
    context.fillRect(x, y, 1, 1);
  });
  context.fillStyle = "red";
  context.fillRect(apple[0], apple[1], 1, 1);
}

function resetGame() {
  snake = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 3],
    [1, 4]
  ];

  direction = [1, 0];
  apple = [8, 3];
  score.innerHTML = 0;
}

setInterval(updateLoop, 100);
