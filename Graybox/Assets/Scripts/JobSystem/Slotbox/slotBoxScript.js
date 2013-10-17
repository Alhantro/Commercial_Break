#pragma strict

private var correct:boolean = false;

public function setCorrect():void
{
	correct = true;
}

public function setFalse():void
{
	correct = false;
}

public function setTexture(texture:Texture2D):void
{
	Debug.Log("texture setter");
	this.renderer.material.mainTexture = texture;
}