function liftCup(cup, goDown, scene)
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
  scene.beginAnimation(cup, 0, x);
}
