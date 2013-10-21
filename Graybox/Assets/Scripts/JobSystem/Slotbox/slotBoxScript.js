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
	//Debug.Log("texture setter");
	this.renderer.material.mainTexture = texture;
}

public function getTexture():Texture2D
{
	return this.renderer.material.mainTexture as Texture2D;
}