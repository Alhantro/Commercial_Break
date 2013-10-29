#pragma strict
	private var m_ratiox:int = Screen.width / 5;
	private var m_ratioy:int = Screen.height / 20;
	private var m_BoxesValue:int = 6;
	private var m_CorrectBoxesValue:int = 1;
	private var m_menuMode:int = 0;
	
function Start () {
}

function Update () {
	//Debug.Log(Screen.currentResolution.width + "x" + Screen.currentResolution.height);
}

function OnGUI() {
	if (m_menuMode == 0) {
		if(GUI.Button(Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 - m_ratioy * 3), m_ratiox, m_ratioy * 2), "Start")) {
			m_menuMode = 2;
			GameObject.Find("indestructable").GetComponent(globalScript).setState("Start");
		}
		
		if (GUI.Button(Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 ), m_ratiox, m_ratioy * 2), "Settings")) {
			m_menuMode = 1;
			GameObject.Find("indestructable").GetComponent(globalScript).setState("Settings");
		}
		if (GUI.Button(Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 3), m_ratiox, m_ratioy * 2), "Exit Game")) {
			Application.Quit();
		}
	}
	if (m_menuMode == 1) {
		if(GUI.Button(Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 - m_ratioy * 2), m_ratiox, m_ratioy * 2), "SetScreenResolution (1920, 1080)")) {
			SetResolution(1920, 1080);
			return;
		}
		if(GUI.Button(Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 ), m_ratiox, m_ratioy * 2), "SetScreenResolution (1280, 720)")) {
			SetResolution(1280, 720);
			return;
		}
		if(GUI.Button(Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 7), m_ratiox, m_ratioy* 2), "Back")) {
			m_menuMode = 0;
			GameObject.Find("indestructable").GetComponent(globalScript).setState("Menu");
			return;
		}
	}
	if (m_menuMode == 2) {
		if(GUI.Button(Rect((Screen.width / 2 - m_ratiox /2 - m_ratiox * 1.1), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 4), m_ratiox, m_ratioy * 2), "Easy")) {
			Application.LoadLevel("CityScene");
			GameObject.Find("indestructable").GetComponent(globalScript).enableIngameMenu();
			GameObject.Find("indestructable").GetComponent(globalScript).setAmountBoxes(6);
			GameObject.Find("indestructable").GetComponent(globalScript).setAmountCorrect(3);
		}
		if(GUI.Button(Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 4), m_ratiox, m_ratioy * 2), "Normal")) {
			Application.LoadLevel("CityScene");
			GameObject.Find("indestructable").GetComponent(globalScript).enableIngameMenu();
			GameObject.Find("indestructable").GetComponent(globalScript).setAmountBoxes(8);
			GameObject.Find("indestructable").GetComponent(globalScript).setAmountCorrect(3);
		}
		if(GUI.Button(Rect((Screen.width / 2 - m_ratiox /2 + m_ratiox * 1.1), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 4), m_ratiox, m_ratioy * 2), "Hard")) {
			Application.LoadLevel("CityScene");
			GameObject.Find("indestructable").GetComponent(globalScript).enableIngameMenu();
			GameObject.Find("indestructable").GetComponent(globalScript).setAmountBoxes(10);
			GameObject.Find("indestructable").GetComponent(globalScript).setAmountCorrect(3);
		}
		if(GUI.Button(Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 7), m_ratiox, m_ratioy* 2), "Back")) {
			m_menuMode = 0;
			GameObject.Find("indestructable").GetComponent(globalScript).setState("Menu");
			return;
		}
	}
}

function SetResolution(width:int, height:int) {
	m_ratiox = width / 5;
	m_ratioy = height / 20;
	Screen.SetResolution(width, height, false);
	
}