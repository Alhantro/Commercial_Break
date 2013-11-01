#pragma strict

private var textStyle:GUIStyle = new GUIStyle();

function Awake()
{
	textStyle.fontSize = 24;
	textStyle.normal.textColor = Color.white;
	GUI.backgroundColor = Color.black;
}

function OnGUI()
{
	GUI.Label(Rect(20, 20, Screen.width, 100), "Kies de 3 voorwerpen die bij de gekozen baan hoort", textStyle);
}