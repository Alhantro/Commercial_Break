#pragma strict
	private var m_ratiox:int = Screen.width / 5;
	private var m_ratioy:int = Screen.height / 20;
	private var m_BoxesValue:int = 6;
	private var m_CorrectBoxesValue:int = 1;
	private var m_menuMode:int = 0;
	
	private var handPos : Vector3;
	
// Button rectangles
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
	
	private var rectArray : Array = new Array();
	//private var rectArrayNames : Array = new Array();
	private var rectBoolArray : Array = new Array();
	
	private var timer:float;
	private var seconds:float;
	
	private var buttonTextureArray:Array = new Array();
	public var guiStyle:GUIStyle = new GUIStyle();
	private var backgroundTexture:Texture2D;

function Awake()
{
	backgroundTexture = searchBackgroundTexture("background");
	rectArray.Push(startGameB, optionsB, leaveGameB, resolution1, resolution2, backButton1, easy, normal, hard, backButton2);
	
	for(var i=0; i<rectArray.length; i++)
	{
		rectBoolArray.Push(false);
	}
	//rectArrayNames.Push("startGame", "optionsB", "leaveGameB", "resolution1", "resolution2", "backButton1", "easy", "normal", "hard", "backButton2");
	fillButtonTextureArray();
	
}

function Update ()
{
	//Debug.Log(Screen.currentResolution.width + "x" + Screen.currentResolution.height);	
	handPos = GameObject.Find("indestructable").GetComponent(globalScript).getHand();
	
	checkRectangles();
	
	if (m_menuMode == 0)
	{
		if(checkInButton(startGameB)) startGame();
		if(checkInButton(optionsB)) options();
		if(checkInButton(leaveGameB)) leaveGame();
	}
	if (m_menuMode == 1)
	{
		if(checkInButton(resolution1)) setResolution1();;
		if(checkInButton(resolution2)) setResolution2();
		if(checkInButton(backButton1)) backToMenu();
	}
	if (m_menuMode == 2)
	{
		if(checkInButton(easy)) easyMode();
		if(checkInButton(normal)) normalMode();
		if(checkInButton(hard)) hardMode();
		if(checkInButton(backButton2)) backToMenu();
	}
	
	//Debug.Log(seconds);
}

private function checkInButton(rect:Rect):boolean
{
	if(rect.Contains(handPos))
	{
		if(seconds == 3){
			seconds = 0;
			timer = 0;
			return true;
		} 
		else increaseTimer();
	}
	else return false;
}

private function increaseTimer()
{
	timer += Time.deltaTime;
	
	seconds = Mathf.RoundToInt(timer%60);
}

private function checkRectangles():void
{
	for(var i = 0; i<rectArray.length; i++)
	{
		var rectangle : Rect = rectArray[i];
		if(rectangle.Contains(handPos))
		{
			rectBoolArray[i] = true;
		}
		else
		{
			rectBoolArray[i] = false;
		}
	}
	var check:boolean = false;
	for(var j=0; j<rectBoolArray.length; j++)
	{
		
		if(rectBoolArray[j] == true)
		{
			check = true;
		}
	}
	
	//Debug.Log(check);
	
	if(check == false)
	{
		seconds = 0;
		timer = 0;
	}
}

private function startGame():void
{
	m_menuMode = 2;
	GameObject.Find("indestructable").GetComponent(globalScript).setState("Start");
}

private function options():void
{
	m_menuMode = 1;
	GameObject.Find("indestructable").GetComponent(globalScript).setState("Settings");
}

private function leaveGame():void
{
	Application.Quit();
}

private function setResolution1():void
{
	SetResolution(1920, 1080);
	return;
}

private function setResolution2():void
{
	SetResolution(1280, 720);
	return;
}

private function backToMenu():void
{
	m_menuMode = 0;
	GameObject.Find("indestructable").GetComponent(globalScript).setState("Menu");
	return;
}

private function easyMode():void
{
	Application.LoadLevel("CityScene");
	GameObject.Find("indestructable").GetComponent(globalScript).enableIngameMenu();
	GameObject.Find("indestructable").GetComponent(globalScript).setAmountBoxes(10);
	GameObject.Find("indestructable").GetComponent(globalScript).setAmountCorrect(3);
}

private function normalMode():void
{
	Application.LoadLevel("CityScene");
	GameObject.Find("indestructable").GetComponent(globalScript).enableIngameMenu();
	GameObject.Find("indestructable").GetComponent(globalScript).setAmountBoxes(13);
	GameObject.Find("indestructable").GetComponent(globalScript).setAmountCorrect(3);
}

private function hardMode():void
{
	Application.LoadLevel("CityScene");
	GameObject.Find("indestructable").GetComponent(globalScript).enableIngameMenu();
	GameObject.Find("indestructable").GetComponent(globalScript).setAmountBoxes(16);
	GameObject.Find("indestructable").GetComponent(globalScript).setAmountCorrect(3);
}

function SetResolution(width:int, height:int):void {
	m_ratiox = width / 5;
	m_ratioy = height / 20;
	Screen.SetResolution(width, height, false);
	
}

/*
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
*/



//texturing the buttons
function OnGUI() {
	GUI.depth = 1;
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), backgroundTexture, ScaleMode.StretchToFill);

	if (m_menuMode == 0)
	{
		if(GUI.Button(startGameB,"", guiStyle)) startGame();									//Start Game
		GUI.DrawTexture(startGameB, buttonTextureArray[0] as Texture, ScaleMode.StretchToFill);
		
		if(GUI.Button(optionsB, "", guiStyle)) options();					//Options
		GUI.DrawTexture(optionsB, buttonTextureArray[1] as Texture, ScaleMode.StretchToFill);
		
		if(GUI.Button(leaveGameB, "", guiStyle)) leaveGame();				//Leave Game
		GUI.DrawTexture(leaveGameB, buttonTextureArray[2] as Texture, ScaleMode.StretchToFill);
	}
	if (m_menuMode == 1)
	{
		if(GUI.Button(resolution1, "", guiStyle)) setResolution1();			//Set 1920x1080
		GUI.DrawTexture(resolution1, buttonTextureArray[3] as Texture, ScaleMode.StretchToFill);
		
		if(GUI.Button(resolution2, "", guiStyle)) setResolution2();			//Set 1280x720
		GUI.DrawTexture(resolution2, buttonTextureArray[4] as Texture, ScaleMode.StretchToFill);
		
		if(GUI.Button(backButton1, "", guiStyle)) backToMenu();				//Back to Menu
		GUI.DrawTexture(backButton1, buttonTextureArray[5] as Texture, ScaleMode.StretchToFill);
	}
	if (m_menuMode == 2)
	{
		if(GUI.Button(easy, "", guiStyle)) easyMode();						//Set Easy
		GUI.DrawTexture(easy, buttonTextureArray[6] as Texture, ScaleMode.StretchToFill);
		
		if(GUI.Button(normal, "", guiStyle)) normalMode();					//Set Normal
		GUI.DrawTexture(normal, buttonTextureArray[7] as Texture, ScaleMode.StretchToFill);
		
		if(GUI.Button(hard, "", guiStyle)) hardMode();						//Set Hard
		GUI.DrawTexture(hard, buttonTextureArray[8] as Texture, ScaleMode.StretchToFill);
		
		if(GUI.Button(backButton2, "", guiStyle)) backToMenu();				//Back to Menu
		GUI.DrawTexture(backButton2, buttonTextureArray[5] as Texture, ScaleMode.StretchToFill);
	}
}


function fillButtonTextureArray():void
{
	 var texture:Texture2D;
	 
	 texture = searchButtonTexture("Startgame");
	 buttonTextureArray.push(texture);
	 
	 texture = searchButtonTexture("Options");
	 buttonTextureArray.push(texture);
	 
	 texture = searchButtonTexture("Leavegame");
	 buttonTextureArray.push(texture);
	 
	 texture = searchButtonTexture("Resolution1080p");
	 buttonTextureArray.push(texture);
	 
	 texture = searchButtonTexture("Resolution720p");
	 buttonTextureArray.push(texture);
	 
	 texture = searchButtonTexture("Backbutton");
	 buttonTextureArray.push(texture);
	 
	 texture = searchButtonTexture("Easy");
	 buttonTextureArray.push(texture);
	 
	 texture = searchButtonTexture("Medium");
	 buttonTextureArray.push(texture);
	 
	 texture = searchButtonTexture("Hard");
	 buttonTextureArray.push(texture);	
}


function searchButtonTexture(name:String):Texture2D
{
	var filePath:String = Application.dataPath + "/ButtonTextures/Menu";
	var fileInfo = Directory.GetFiles(filePath, name+".png" , SearchOption.AllDirectories);
	
	for(file in fileInfo)
	{
		//new WWW download
		var wwwPNG = new WWW("file://"+file);
		
	}
	
	return wwwPNG.texture;
}

function searchBackgroundTexture(name:String):Texture2D
{
	var filePath:String = Application.dataPath + "/MenuBackground";
	var fileInfo = Directory.GetFiles(filePath, name+".png" , SearchOption.AllDirectories);
	
	for(file in fileInfo)
	{
		//new WWW download
		var wwwPNG = new WWW("file://"+file);
		
	}
	
	return wwwPNG.texture;
}
