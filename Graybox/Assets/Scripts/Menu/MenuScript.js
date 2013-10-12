#pragma strict
	private var m_ratiox:int = Screen.width / 5;
	private var m_ratioy:int = Screen.height / 20;
	private var m_BoxesValue:int = 6;
	private var m_CorrectBoxesValue:int = 1;
function Start () {
}

function Update () {
	//Debug.Log(Screen.currentResolution.width + "x" + Screen.currentResolution.height);
}

function OnGUI() {
	
	if(GUI.Button(Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2), m_ratiox, m_ratioy), "Start")) {
		Application.LoadLevel("CityScene");
		GameObject.Find("indestructable").GetComponent(globalScript).enableIngameMenu();
		GameObject.Find("indestructable").GetComponent(globalScript).setAmountBoxes(m_BoxesValue);
		GameObject.Find("indestructable").GetComponent(globalScript).setAmountCorrect(m_CorrectBoxesValue);
	}
	if(GUI.Button(Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 + m_ratioy), m_ratiox, m_ratioy), "SetScreenResolution (1920, 1080)")) {
		SetResolution(1920, 1080);
	}
	if(GUI.Button(Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 2), m_ratiox, m_ratioy), "SetScreenResolution (1280, 720)")) {
		SetResolution(1280, 720);
	}
	m_BoxesValue = GUI.HorizontalSlider(Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy / 2 + m_ratioy * 4), m_ratiox, m_ratioy), m_BoxesValue, 6, 10);
	GUI.Label(Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy / 2 + m_ratioy * 3), m_ratiox, m_ratioy), "Boxes: "+ m_BoxesValue.ToString());
	
	m_CorrectBoxesValue = GUI.HorizontalSlider(Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy / 2 + m_ratioy * 6), m_ratiox, m_ratioy), m_CorrectBoxesValue, 1, 4);
	GUI.Label(Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy / 2 + m_ratioy * 5), m_ratiox, m_ratioy), "Correct boxes: "+ m_CorrectBoxesValue.ToString());
}

function SetResolution(width:int, height:int) {
	m_ratiox = width / 5;
	m_ratioy = height / 20;
	Screen.SetResolution(width, height, false);
	
}