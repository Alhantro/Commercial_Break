#pragma strict
	private var m_ratiox:int = Screen.width / 5;
	private var m_ratioy:int = Screen.height / 20;
function Start () {
}

function Update () {
	Debug.Log(Screen.currentResolution.width + "x" + Screen.currentResolution.height);
}

function OnGUI() {
	
	if(GUI.Button(Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2), m_ratiox, m_ratioy), "Start")) {
		Application.LoadLevel("Vertical Slice");
	}
	if(GUI.Button(Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 + m_ratioy), m_ratiox, m_ratioy), "SetScreenResolution (1920, 1080)")) {
		SetResolution(1920, 1080);
	}
	if(GUI.Button(Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 2), m_ratiox, m_ratioy), "SetScreenResolution (1280, 720)")) {
		SetResolution(1280, 720);
	}
	
}

function SetResolution(width:int, height:int) {
	m_ratiox = width / 5;
	m_ratioy = height / 20;
	Screen.SetResolution(width, height, false);
	
}