#pragma strict

public var rightHand : GameObject;
public var mouseHand : Texture;
private var position : Vector3;

function Start ()
{
}

function Update ()
{
	position = Camera.main.WorldToScreenPoint(rightHand.transform.position);	
	Debug.Log(position);
}

function OnGUI()
{
	GUI.DrawTexture(Rect((position.x - 32), (Screen.height - position.y - 32), 64, 64), mouseHand, ScaleMode.ScaleToFit, true);
}