#pragma strict

private var jobString:String = "";			//change to "" when other jobs are implemented
private var amount_Correct:int = 3;			//standard correct is 3
private var amount_Boxes:int = 5;			//standard amount of boxes is 5
private var mode:String = "Compiled";		//"Compiled" or "Unity"
private var debugMode:boolean = false;		//debug mode for compiled version
private var debugButton:String = "Debug Off";
private var debug:String = "This is the Debugger";
private var ingameMenu:boolean = false;
private var showMenu:boolean = false;
private var state:String = "Menu";
private var handPosition:Vector3;			//Hand Cursor

static var createdIndestructable:boolean = false;	//if it is already created then its true

function Awake()
{
	//if indestructale isn't created yet... create it
	if(!createdIndestructable)
	{
		DontDestroyOnLoad(this.gameObject);		//make sure this object is not destroyed on load!
		createdIndestructable = true;			//first creation of indestructable
	}
	else	//indestructable is created so there is a double.. destroy it
	{
		Destroy(this.gameObject);
	}
}

function OnGUI()
{
	//if(debugMode)
	//{
	//	GUI.Label(Rect(0,0, 300, Screen.width), debug);
	//}
	
	//if you press escape show the menu
	if(Input.GetKeyUp("escape") && ingameMenu == true && showMenu == false)
	{
		showMenu = true;
	}
	
//	if(state == "Menu")
//	{
//		if(GUI.Button(Rect(Screen.width - 100,Screen.height - 100,100,100), debugButton))
//		{
//			if(debugMode)
//			{
//				debugMode = false;
//				debugButton = "Debug Off";
//			}
//			else
//			{
//				debugMode = true;
//				debugButton = "Debug On";
//			}
//		}
//	}
	
	//show the menu
	if(ingameMenu == true && showMenu == true)
	{
		//resume button
		if(GUI.Button(Rect(Screen.width / 2 - 50, (Screen.height /2) - 50, 100, 25),"Doorgaan"))
		{
			showMenu = false;
		}
		//quit button
		if(GUI.Button(Rect(Screen.width / 2 - 100, (Screen.height /2) , 200, 25),"Terug naar het hoofdmenu"))
		{
			disableIngameMenu();
			showMenu = false;
			state = "Menu";
			Application.LoadLevel("MenuScene");
		}
	}
	

}

//
//	Setters
//
public function enableIngameMenu():void
{
	ingameMenu = true;
}

public function disableIngameMenu():void
{
	ingameMenu = false;
}

public function addToDebug(message:String):void
{
	debug = debug + "\n" + message;
	//debug = message;
}

public function setState(value:String):void
{
	state = value;
}

public function setJob(job:String):void
{
	jobString = job;
}

public function setAmountCorrect(value:int):void
{
	amount_Correct = value;
}

public function setAmountBoxes(value:int):void
{
	amount_Boxes = value;
}

public function setHand(pos:Vector3):void
{
	handPosition = pos;
}

//
//	Getters
//
public function getJobName():String
{
	return jobString;
}

public function getAmountCorrect():int
{
	return amount_Correct;
}

public function getAmountBoxes():int
{
	//check first if its higher than 16, the game is not built for higher than 10
	if(amount_Boxes > 16) setAmountBoxes(16);
	return amount_Boxes;
}

public function getMode():String
{
	return mode;
}

public function getHand():Vector3
{
	return handPosition;
}