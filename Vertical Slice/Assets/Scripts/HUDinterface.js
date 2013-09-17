#pragma strict

var aTexture : Texture;

function OnGUI() {
	if(!aTexture){
		Debug.LogError("Assign a Texture in the inspector.");
		return;
	}
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), aTexture, ScaleMode.StretchToFill, true, 1.0f);
}