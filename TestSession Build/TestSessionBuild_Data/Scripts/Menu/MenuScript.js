#pragma strict
	private var m_ratiox:int = Screen.width / 5;
	private var m_ratioy:int = Screen.height / 20;
	private var m_BoxesValue:int = 6;
	private var m_CorrectBoxesValue:int = 1;
	private var m_menuMode:int = 0;
	
	private var handPos : Vector3;
	
// Buttons
	private var startGameB : Rect = Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 - m_ratioy * 3), m_ratiox, m_ratioy * 2);
	private var optionsB : Rect = Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 ), m_ratiox, m_ratioy * 2);
	private var leaveGameB : Rect = Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 3), m_ratiox, m_ratioy * 2);
	
	private var resolution1 : Rect = Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 - m_ratioy * 2), m_ratiox, m_ratioy * 2);
	private var resolution2 : Rect = Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 ), m_ratiox, m_ratioy * 2);
	private var backButton1 : Rect = Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 7), m_ratiox, m_ratioy* 2);
	
	private var easy : Rect = Rect((Screen.width / 2 - m_ratiox /2 - m_ratiox * 1.1), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 4), m_ratiox, m_ratioy * 2);
	private var normal : Rect = Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 4), m_ratiox, m_ratioy * 2);
	private var hard : Rect = Rect((Screen.width / 2 - m_ratiox /2 + m_ratiox * 1.1), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 4), m_ratiox, m_ratioy * 2);
	private var backButton2 : Rect = Rect((Screen.width / 2 - m_ratiox /2), (Screen.height / 2 - m_ratioy /2 + m_ratioy * 7), m_ratiox, m_ratioy* 2);
	
	//private var rectArray : Array = new Array();
	//private var rectArrayNames : Array = new Array();
	
function Start ()
{
	//rectArray.Push(startGameB, optionsB, leaveGameB, resolution1, resolution2, backButton1, easy, normal, hard, backButton2);
	//rectArrayNames.Push("startGame", "optionsB", "leaveGameB", "resolution1", "resolution2", "backButton1", "easy", "normal", "hard", "backButton2");
}

function Update ()
{
	//Debug.Log(Screen.currentResolution.width + "x" + Screen.currentResolution.height);	
	handPos = GameObject.Find("indestructable").GetComponent(globalScript).getHand();
	
	if (m_menuMode == 0)
	{
		if(startGameB.Contains(handPos)) startGame();
		if(optionsB.Contains(handPos)) options();
		if(leaveGameB.Contains(handPos)) leaveGame();
	}
	if (m_menuMode == 1)
	{
		if(resolution1.Contains(handPos)) setResolution1();;
		if(resolution2.Contains(handPos)) setResolution2();
		if(backButton1.Contains(handPos)) backToMenu();
	}
	if (m_menuMode == 2)
	{
		if(easy.Contains(handPos)) easyMode();
		if(normal.Contains(handPos)) normalMode();
		if(hard.Contains(handPos)) hardMode();
		if(backButton2.Contains(handPos)) backToMenu();
	}
	
}

function OnGUI() {
	if (m_menuMode == 0)
	{
		if(GUI.Button(startGameB, "Start")) startGame();				//Start Game
		if(GUI.Button(optionsB, "Opties")) options();					//Options
		if(GUI.Button(leaveGameB, "Spel Verlaten")) leaveGame();		//Leave Game
	}
	if (m_menuMode == 1)
	{
		if(GUI.Button(resolution1, "Verander Resolutie (1920, 1080)")) setResolution1();	//Set 1920x1080
		if(GUI.Button(resolution2, "Verander Resolutie (1280, 720)")) setResolution2();		//Set 1280x720
		if(GUI.Button(backButton1, "Terug")) backToMenu();				//Back to Menu
	}
	if (m_menuMode == 2)
	{
		if(GUI.Button(easy, "Makkelijk")) easyMode();					//Set Easy
		if(GUI.Button(normal, "Normaal")) normalMode();					//Set Normal
		if(GUI.Button(hard, "Moeilijk")) hardMode();					//Set Hard
		if(GUI.Button(backButton2, "Terug")) backToMenu();				//Back to Menu
	}
}

private function startGame()
{
	m_menuMode = 2;
	GameObject.Find("indestructable").GetComponent(globalScript).setState("Start");
}

private function options()
{
	m_menuMode = 1;
	GameObject.Find("indestructable").GetComponent(globalScript).setState("Settings");
}

private function leaveGame()
{
	Application.Quit();
}

private function setResolution1()
{
	SetResolution(1920, 1080);
	return;
}

private function setResolution2()
{
	SetResolution(1280, 720);
	return;
}

private function backToMenu()
{
	m_menuMode = 0;
	GameObject.Find("indestructable").GetComponent(globalScript).setState("Menu");
	return;
}

private function easyMode()
{
	Application.LoadLevel("CityScene");
	GameObject.Find("indestructable").GetComponent(globalScript).enableIngameMenu();
	GameObject.Find("indestructable").GetComponent(globalScript).setAmountBoxes(6);
	GameObject.Find("indestructable").GetComponent(globalScript).setAmountCorrect(3);
}

private function normalMode()
{
	Application.LoadLevel("CityScene");
	GameObject.Find("indestructable").GetComponent(globalScript).enableIngameMenu();
	GameObject.Find("indestructable").GetComponent(globalScript).setAmountBoxes(8);
	GameObject.Find("indestructable").GetComponent(globalScript).setAmountCorrect(3);
}

private function hardMode()
{
	Application.LoadLevel("CityScene");
	GameObject.Find("indestructable").GetComponent(globalScript).enableIngameMenu();
	GameObject.Find("indestructable").GetComponent(globalScript).setAmountBoxes(10);
	GameObject.Find("indestructable").GetComponent(globalScript).setAmountCorrect(3);
}

function SetResolution(width:int, height:int) {
	m_ratiox = width / 5;
	m_ratioy = height / 20;
	Screen.SetResolution(width, height, false);
	
}