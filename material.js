function createMat(scene)
{
  var mat = new BABYLON.StandardMaterial("material", scene);

  mat.diffuseColor = new BABYLON.Color3(1, 0, 0);
  mat.specularColor = new BABYLON.Color3(0, 0.5, 1);
  mat.specularPower = 50;
  mat.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

  //Mat Transparency
  mat.alpha = 1;
  return mat;
}

function ballMat(scene)
{
    var mat = new BABYLON.StandardMaterial("material", scene);

    mat.diffuseColor = new BABYLON.Color3(1,5,0);
    mat.specularColor = new BABYLON.Color3(0,1,0);
    mat.specularPower = 25;

    mat.ambientColor = new BABYLON.Color3(0.5,0.98,0.53);
    mat.alpha = 1;

    return mat;
}

function cupMat(scene)
{
    var mat = new BABYLON.StandardMaterial("material", scene);

    mat.diffuseColor = new BABYLON.Color3(0,0,1);
        // mat.diffuseColor = new BABYLON.Color3(220,220,220);
    mat.specularColor = new BABYLON.Color3(0,1,1);
    mat.specularPower = 25;

    mat.ambientColor = new BABYLON.Color3(0.5,0.98,0.53);
    mat.alpha = 1;

    return mat;
}
