function liftCup(cup, goDown, scene, callfunction)
{
  var animationBox = new BABYLON.Animation(
		"liftCup",
		"position.y",
		50,
		BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
	);

  var keys = [];

  keys.push({
    frame: 0,
    value: 7.5
  });

  keys.push({
    frame: 30,
    value: 15
  });

  // needed if the lift is for first Scene
  // or when try to answer the cup.
  if(goDown) {
    keys.push({
      frame: 60,
      value: 7.5
    });
  }

  animationBox.setKeys(keys);

  cup.animations = [];
  cup.animations.push(animationBox);

  var x = (goDown) ? 60 : 30;
  scene.beginAnimation(cup, 0, x, false , 1, callfunction);
}

function cupRotation(cup, posCup, movement, scene, back)
{
  // movement is going square like

  //     ^  ----------> v
  //     | CUP          |
  //
  //
  var animationBox = new BABYLON.Animation(
    "moveCup",
    "position",
    25,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );
  var cupPos2 = cup.position.clone();
  if(movement == 'back')
  {
    cupPos2.z = 5;
  } else {
    cupPos2.z = -5;
  }

  var cupPos3 = cupPos2.clone();
  cupPos3.x = posCup.x;

  var keys = [];

  keys.push({
    frame: 0,
    value: cup.position
  });

  keys.push({
    frame: 20,
    value: cupPos2
  });

  keys.push({
    frame: 40,
    value: cupPos3
  });

  keys.push({
    frame: 60,
    value: posCup
  });

  animationBox.setKeys(keys);

  cup.animations = [];
  cup.animations.push(animationBox);

  scene.beginAnimation(cup, 0, 60,false, 5, back);
}

function switchCup(cup1, cup2, ball, scene, callfunction)
{
  ball.visibility = 0;
  var firstanimation = false;
  var secondanimation = false;
  var movement1 = 'back';
  var movement2 = 'front';
  cupRotation(cup1, cup2.position.clone() , movement1, scene, function() {
    firstanimation = true;
    if(firstanimation && secondanimation) {
      callfunction();
    }
  });
  cupRotation(cup2, cup1.position.clone() , movement2, scene, function() {
    secondanimation = true;
    if(firstanimation && secondanimation) {
      callfunction();
    }
  });
}

function shuffleCup(cup, shuffleNumber, ball, length, scene)
{
  var len1 = Math.floor(Math.random() * cup.length);
  var len2 = Math.floor(Math.random() * cup.length);

  while(len1 == len2)
  {
    len2 = Math.floor(Math.random() * cup.length);
  }

  console.log("len1 =" + len1); console.log(len2);

  if(shuffleNumber > 0)
  {
    switchCup(cup[len1], cup[len2], ball, scene, function() {
      shuffleNumber--;
      console.log(shuffleNumber);
      shuffleCup(cup, shuffleNumber, ball, length, scene);
    });
  } else {
    ball.visibility =1;
    ball.position = cup[cupWithBall].position.clone();
  }
}
