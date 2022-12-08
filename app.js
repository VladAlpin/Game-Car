(function game() {
  let animatuonId = null;
  let isPause = false;

  const speed = 5;

  const car = document.querySelector('.car');
  const carWidth = car.clientWidth / 2;
  const carHeight = car.clientHeight;

  const road = document.querySelector('.road');
  const roadHeight = road.clientHeight;
  const roadWidth = road.clientWidth / 2;

  const coin = document.querySelector('.coin');
  const coordsCoin = getCoords(coin);
  const coinWidth = coin.clientWidth / 2;

  const arrow = document.querySelector('.arrow');
  const coordsArrow = getCoords(arrow);
  const arrowWidth = arrow.clientWidth / 2;

  const danger = document.querySelector('.danger');
  const coordsDanger = getCoords(danger);
  const dangerWidth = danger.clientWidth / 2;

  const trees= document.querySelectorAll('.tree');

  const carCoords = getCoords(car);

  const carMoveInfo = {
    top: null,
    bottom: null,
    left: null,
    right: null
  };

  const treesCoords = [];

  for(let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    const coordsTree = getCoords(tree);

    treesCoords.push(coordsTree);
  }

  document.addEventListener('keydown', (event) => {
    if(isPause) {
      return;
    }

    const code = event.code;

    if(code === 'ArrowUp' && carMoveInfo.top === null) {
      carMoveInfo.top = requestAnimationFrame(carMoveToTop);
    } else if (code === 'ArrowDown' && carMoveInfo.bottom === null) {
      carMoveInfo.bottom = requestAnimationFrame(carMoveToBottom);
    } else if(code === 'ArrowLeft' && carMoveInfo.left === null) {
      carMoveInfo.left = requestAnimationFrame(carMoveToLeft);
    } else if(code === 'ArrowRight' && carMoveInfo.right === null) {
      carMoveInfo.right= requestAnimationFrame(carMoveToRight);
    }
  });

  document.addEventListener('keyup', (event) => {

    const code = event.code;

    if(code === 'ArrowUp') {
      cancelAnimationFrame(carMoveInfo.top);
      carMoveInfo.top = null;
    } else if (code === 'ArrowDown') {
      cancelAnimationFrame(carMoveInfo.bottom);
      carMoveInfo.bottom = null;
    } else if(code === 'ArrowLeft') {
      cancelAnimationFrame(carMoveInfo.left);
      carMoveInfo.left = null;
    } else if(code === 'ArrowRight') {
      cancelAnimationFrame(carMoveInfo.right);
      carMoveInfo.right = null;
    }
  });

  function carMoveToTop() {
    const newY = carCoords.y -  5;

    if(newY < 0) {
      return;
    }
    carCoords.y = newY;
    carMove(carCoords.x, newY);
    carMoveInfo.top = requestAnimationFrame(carMoveToTop);
  }

  function carMoveToBottom() {
    const newY = carCoords.y +  5;

    if((newY + carHeight) > roadHeight) {
      return;
    }

    carCoords.y = newY;
    carMove(carCoords.x, newY);
    carMoveInfo.bottom = requestAnimationFrame(carMoveToBottom);
  }

  function carMoveToLeft() {
    const newX = carCoords.x -  5;

    if(newX < -roadWidth + carWidth) {
      return;
    }

    carCoords.x = newX;
    carMove(newX, carCoords.y);
    carMoveInfo.left = requestAnimationFrame(carMoveToLeft);
  }

  function carMoveToRight() {
    const newX = carCoords.x +  5;

    if(newX > roadWidth - carWidth) {
      return;
    }

    carCoords.x = newX;
    carMove(newX, carCoords.y);
    carMoveInfo.right= requestAnimationFrame(carMoveToRight);
  }

  function carMove (x, y) {
    car.style.transform = `translate(${x}px, ${y}px)`
  }

  animatuonId = requestAnimationFrame(startGame);

  function startGame() {
    treesAnimation();
    elementAnimation(coin, coordsCoin, coinWidth, -100); 
    elementAnimation(arrow, coordsArrow, arrowWidth, -600);
    elementAnimation(danger, coordsDanger, dangerWidth, -250);

    animatuonId = requestAnimationFrame(startGame);
  }

  function treesAnimation() {
    for(let i = 0; i < trees.length; i++) {
      const tree = trees[i];
      const coords = treesCoords[i];

      let newYCoord = coords.y + speed;

      if(newYCoord > window.innerHeight) {
        newYCoord = -370;
      }

      treesCoords[i].y = newYCoord;
      tree.style.transform = `translate(${coords.x}px, ${newYCoord}px)`
    }
  
  }

  function elementAnimation(element, elementCoord, elementWidth, elementInitialY) {
    let newCordsCoinY = elementCoord.y + speed;
    let newCordsCoinX = elementCoord.x;

    if(newCordsCoinY > window.innerHeight) {
      newCordsCoinY = elementInitialY;

      const direction = parseInt(Math.random() * 2);
      const maxXCoord = (roadWidth + 1 - elementWidth);
      const randomXCord = parseInt(Math.random() * maxXCoord);

      // if(direction === 0) { ///Двигаем влево
      //   newCordsCoin = -randomXCord;
      // } else if (direction === 1) { /// Двигаем вправо
      //   newCordsCoin = randomXCord;
      // };

      newCordsCoinX = direction === 0 ? -randomXCord : randomXCord;
    }
    elementCoord.y = newCordsCoinY;
    elementCoord.x = newCordsCoinX;
    element.style.transform = `translate(${newCordsCoinX}px, ${newCordsCoinY}px)`;
  }


  function  getCoords(element) {
    const matrix = window.getComputedStyle(element).transform;
    const array = matrix.split(',');
    const y = array[array.length - 1];
    const x = array[array.length - 2];
    const numericY = parseFloat(y);
    const numericX = parseFloat(x);

    return { x: numericX, y: numericY };
  }

  function collisionDetection() {
    for(var c = 0; c < car; c++) {
        for(var r = 0; r < car; r++) {
            var b = bricks[c][r];
            // calculations
        }
    }
  }

  const gameButton = document.querySelector('.game-button');
  gameButton.addEventListener('click', () => {
    isPause = !isPause; 
    if (isPause) {
      cancelAnimationFrame(animatuonId);
      cancelAnimationFrame(carMoveInfo.top);
      cancelAnimationFrame(carMoveInfo.bottom);
      cancelAnimationFrame(carMoveInfo.left);
      cancelAnimationFrame(carMoveInfo.right);
      gameButton.children[0].style.display = 'none';
      gameButton.children[1].style.display = 'initial';
    } else {
      animatuonId = requestAnimationFrame(startGame);
      gameButton.children[0].style.display = 'initial';
      gameButton.children[1].style.display = 'none';
    }
  })
})();