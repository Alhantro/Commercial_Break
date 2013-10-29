#pragma strict
	private var m_ratiox:int = Screen.width / 5;
	private var m_ratioy:int = Screen.height / 20;
	private var m_BoxesValue:int = 6;
	private var m_CorrectBoxesValue:int = 1;
	private var m_menuMode:int = 0;
	
	private var handPos : Vector3;
	
// Buttons
	private var startGame : Rect = Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 - m_ratioy * 3), m_ratiox, m_ratioy * 2);
	private var opties : Rect = Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 ), m_ratiox, m_ratioy * 2);
	private var leaveGame : Rect = Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 3), m_ratiox, m_ratioy * 2);
	
	private var resolution1 : Rect = Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 - m_ratioy * 2), m_ratiox, m_ratioy * 2);
	private var resolution2 : Rect = Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 ), m_ratiox, m_ratioy * 2);
	private var backButton1 : Rect = Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 7), m_ratiox, m_ratioy* 2);
	
	private var easy : Rect = Rect((Screen.width / 2 - m_ratiox /2 - m_ratiox * 1.1), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 4), m_ratiox, m_ratioy * 2);
	private var normal : Rect = Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 4), m_ratiox, m_ratioy * 2);
	private var hard : Rect = Rect((Screen.width / 2 - m_ratiox /2 + m_ratiox * 1.1), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 4), m_ratiox, m_ratioy * 2);
	private var backButton2 : Rect = Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 7), m_ratiox, m_ratioy* 2);
	
	private var rectArray : Array = new Array();
	private var rectArrayNames : Array = new Array();
	
function Start ()
{
	rectArray.Push(startGame, opties, leaveGame, resolution1, resolution2, backButton1, easy, normal, hard, backButton2);
	rectArrayNames.Push("startGame", "opties", "leaveGame", "resolution1", "resolution2", "backButton1", "easy", "normal", "hard", "backButton2");
	Debug.Log(rectArray);
	Debug.Log(rectArrayNames);
}

function Update ()
{
	//Debug.Log(Screen.currentResolution.width + "x" + Screen.currentResolution.height);
	
	handPos = GameObject.Find("indestructable").GetComponent(globalScript).getHand();
	
	if(startGame.Contains(handPos))
	{
		Debug.Log("PRINT");
	}
}

function OnGUI() {
	if (m_menuMode == 0)
	{
		//START
		if(GUI.Button(startGame, "Start"))
		{
			m_menuMode = 2;
			GameObject.Find("indestructable").GetComponent(globalScript).setState("Start");
		}
		//OPTIES
		if (GUI.Button(opties, "Opties"))
		{
			m_menuMode = 1;
			GameObject.Find("indestructable").GetComponent(globalScript).setState("Settings");
		}
		//SPEL VERLATEN
		if (GUI.Button(leaveGame, "Spel Verlaten"))
		{
			Application.Quit();
		}
	}
	if (m_menuMode == 1)
	{
		if(GUI.Button(resolution1, "Verander Resolutie (1920, 1080)"))
		{
			SetResolution(1920, 1080);
			return;
		}
		if(GUI.Button(resolution2, "Verander Resolutie (1280, 720)"))
		{
			SetResolution(1280, 720);
			return;
		}
		if(GUI.Button(backButton1, "Terug"))
		{
			m_menuMode = 0;
			GameObject.Find("indestructable").GetComponent(globalScript).setState("Menu");
			return;
		}
	}
	if (m_menuMode == 2)
	{
		if(GUI.Button(easy, "Makkelijk"))
		{
			Application.LoadLevel("CityScene");
			GameObject.Find("indestructable").GetComponent(globalScript).enableIngameMenu();
			GameObject.Find("indestructable").GetComponent(globalScript).setAmountBoxes(6);
			GameObject.Find("indestructable").GetComponent(globalScript).setAmountCorrect(3);
		}
		if(GUI.Button(normal, "Normaal"))
		{
			Application.LoadLevel("CityScene");
			GameObject.Find("indestructable").GetComponent(globalScript).enableIngameMenu();
			GameObject.Find("indestructable").GetComponent(globalScript).setAmountBoxes(8);
			GameObject.Find("indestructable").GetComponent(globalScript).setAmountCorrect(3);
		}
		if(GUI.Button(hard, "Moeilijk"))
		{
			Application.LoadLevel("CityScene");
			GameObject.Find("indestructable").GetComponent(globalScript).enableIngameMenu();
			GameObject.Find("indestructable").GetComponent(globalScript).setAmountBoxes(10);
			GameObject.Find("indestructable").GetComponent(globalScript).setAmountCorrect(3);
		}
		if(GUI.Button(backButton2, "Terug"))
		{
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