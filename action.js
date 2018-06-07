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
  if(goDown){
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

function revealAllCup(cup, scene)
{
  for(var i= 0; i< cup.length;i++)
  {
    liftCup(cup[i], false, scene);
  }
}

function createCup()
{
  for (var i = 0; i < cupsTotal; i++)
  {
    cup[i] = new BABYLON.Mesh.CreateCylinder("cup", 15, 7, 10, 32, 1 , scene);
    cup[i].position.y = 7.5;
    // cup[i].position.x = i + (i)*15;
    if(i%2 == 0) {
      cup[i].position.x = tempDist;
      tempDist = tempDist + cupDist;
    }
    else {
      cup[i].position.x = -tempDist;
    }
    cup[i].position.z = 0;
    cup[i].material = cupMat(scene);
    cup[i].actionManager = new BABYLON.ActionManager(scene);
  }
}

function putDown(cup, scene, call)
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
    value: 15
  });

  keys.push({
    frame: 30,
    value: 7.5
  });

  animationBox.setKeys(keys);

  cup.animations = [];
  cup.animations.push(animationBox);

  scene.beginAnimation(cup, 0, 30, false , 1, call);
}

function hideCup(cup,ball,scene,callback)
{
  for(var j=0; j < cup.length; j++)
  {
    if(j == cup.length -1)
    {
      putDown(cup[j], scene, callback);
    }
    else
    {
      putDown(cup[j], scene);
    }
  }
}

function disableClicking(cup,scene)
{
  for(var i= 0; i< cup.length;i++)
  {
    cup[i].actionManager = new BABYLON.ActionManager(scene);
  }
}

function createNewCup(diff)
{
  var len = cup.length;
  for (var j=0; j< diff;j++)
  {
    cup[len+j] = new BABYLON.Mesh.CreateCylinder("cup", 15, 7, 10, 32, 1 , scene);
    var num = len+j;
    if(num%2 == 0) {
      cup[len+j].position.x = tempDist;
      tempDist = tempDist + cupDist;
    }
    else {
      cup[len+j].position.x = -tempDist;
    }
    cup[len+j].position.y = 7.5;
    cup[len+j].position.z = 0;
    cup[len+j].material = cupMat(scene);
    cup[len+j].actionManager = new BABYLON.ActionManager(scene);
  }
}

function newEnvironment(call)
{
  if(score == 10)
  {
    alert("More Cups!");
    cupsTotal += 2;
    createNewCup(2);
    shuffleNumber += 2;
  }
  if(score % 3 == 0)
  {
    alert("Speed Increased!");
    speed += 0.5;
  }
  call();
}

function makeScoreBoard()
{
  outputplane = BABYLON.Mesh.CreatePlane("outputplane", 25, scene, false);
  outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
  outputplane.material = new BABYLON.StandardMaterial("outputplane", scene);
  outputplane.position = new BABYLON.Vector3(0, 75, -20);
  outputplane.scaling.x = 2.5;
  outputplane.scaling.y = 2.5;

  outputplaneTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
  outputplane.material.diffuseTexture = outputplaneTexture;
  outputplane.material.specularColor = new BABYLON.Color3(0, 0, 0);
  outputplane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
  outputplane.material.backFaceCulling = false;
  // outputplaneTexture.getContext().clearRect(0, 140, 512, 512);
  outputplaneTexture.drawText("Score: " + score, null, 180, "bold 60px verdana", "white");
  // outputplaneTexture.drawText(text, null, 180, "bold 60px verdana", "white");

  outputplaneTexture.hasAlpha = true;
}

function clickable(cup, ball, scene)
{
  for(var i=0; i< cup.length; i++)
  {
    cup[i].actionManager.registerAction(new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnLeftPickTrigger, function (e) {
      disableClicking(cup,scene);
      revealAllCup(cup, scene);
      setTimeout( function() {
        if(e.meshUnderPointer.position.x == ball.position.x)
        {
          alert('Well Done!');
          score++;
          hideCup( cup , ball, scene, function()
          {
            newEnvironment( function()
            {
              cupWithBall = Math.floor(Math.random() * cupsTotal);
              outputplane.dispose();
              makeScoreBoard();
            });
            // shuffleCup(cup, shuffleNumber, ball, cupDist, scene);
            ball.position = cup[cupWithBall].position.clone();
            ball.position.y = 3;
            liftCup(cup[cupWithBall] , true, scene, function () {
              shuffleCup(cup, shuffleNumber, ball, cupDist, scene);
            });
          });
        }
        else
        {
          alert('Wrong Cup');
          alert('Your Final score is: ' + score);
          alert('Thank You for Playing! Press R to restart');
        }
      }, 1000);
    }));
  }
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
  }
  else
  {
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

  scene.beginAnimation(cup, 0, 60,false, speed, back);
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
    soundEffect();

    switchCup(cup[len1], cup[len2], ball, scene, function()
    {
    shuffleNumber--;
    console.log(shuffleNumber);
    shuffleCup(cup, shuffleNumber, ball, length, scene);
    });
  }
  else
  {
    ball.visibility = 1;
    ball.position = cup[cupWithBall].position.clone();
    ball.position.y = 3;
    clickable(cup,ball,scene);
  }
}

function soundEffect()
{
  var sound = new BABYLON.Sound("sound", "soundEffect.mp3", scene, null, {loop: false, autoplay: true});
}
