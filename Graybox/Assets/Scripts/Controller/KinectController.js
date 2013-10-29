#pragma strict

public var rightHand : GameObject;
public var mouseHand : Texture;
private var position : Vector3;

private var midScreen : Vector3 = Vector3(Screen.width/2,Screen.height/2,0);

private var handPosition : Vector3;

function Start ()
{
}

function Update ()
{
	position = Camera.main.WorldToScreenPoint(rightHand.transform.position);
	//Debug.Log(position);
	handPosition = scalePosition(midScreen, position);
	
	
}

function OnGUI()
{
	GUI.DrawTexture(Rect((handPosition.x - 32), (Screen.height - handPosition.y - 32), 64, 64), mouseHand, ScaleMode.ScaleToFit, true);
}

function scalePosition(midScreenPos:Vector3, position:Vector3):Vector3
{
	var difference = position - midScreenPos;
	var newPos = midScreenPos + (difference *2);
	
	if(newPos.x < 0) newPos.x = 0;
	if(newPos.x > Screen.width) newPos.x = Screen.width;
	if(newPos.y < 0) newPos.y = 0;
	if(newPos.y > Screen.height) newPos.y = Screen.height;
	
	
	return newPos;
}