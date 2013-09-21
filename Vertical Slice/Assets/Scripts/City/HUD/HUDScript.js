#pragma strict

//Constants.HUD_X						top left corner = 0
//Constants.HUD_Y						90% of screen height
private var height = Screen.height * 0.20;			//10% remaining space
private var width = Screen.width;					//full screen width
public var hudTexture:Texture2D;

function Start () {

}

function Update () {

}

function OnGUI(){
	GUI.DrawTexture(Rect(Constants.HUD_X, Constants.HUD_Y, width, height), hudTexture, ScaleMode.StretchToFill, true, 1.0f);
}