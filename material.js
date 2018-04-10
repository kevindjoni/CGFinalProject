function createMat(scene)
{
  var mat = new BABYLON.StandardMaterial("material", scene);
  var ground = new BABYLON.StandardMaterial("ground", scene);

  //Ball Colour etc.
  mat.diffuseColor = new BABYLON.Color3(255, 0, 0);
  mat.specularColor = new BABYLON.Color3(0, 0.5, 1);
  mat.specularPower = 50;
  mat.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

  //Mat Transparency
  mat.alpha = 1;

  //Ground Colour etc.
  ground.diffuseColor = new BABYLON.Color3(201, 128, 12);
  ground.specularColor = new BABYLON.Color3(0, 0.5, 1);
  ground.specularPower = 50;
  ground.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

  return mat;
}
