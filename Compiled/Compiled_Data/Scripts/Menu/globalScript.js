#pragma strict

private var jobString:String = "";			//change to "" when other jobs are implemented
private var amount_Correct:int = 3;			//standard correct is 3
private var amount_Boxes:int = 5;			//standard amount of boxes is 5
private var mode:String = "Compiled";		//"Compiled" or "Unity"
private var debugMode:boolean = true;		//debug mode for compiled version
private var debug:String = "This is the Debugger";
private var ingameMenu:boolean = false;
private var showMenu:boolean = false;

function Awake()
{
	DontDestroyOnLoad(this.gameObject);		//make sure this object is not destroyed on load!
}

function OnGUI()
{
	if(debugMode)
	{
		GUI.Label(Rect(0,0, 300, Screen.width), debug);
	}
	
	//if you press escape show the menu
	if(Input.GetKeyUp("escape") && ingameMenu == true && showMenu == false)
	{
		showMenu = true;
	}
	
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
			Application.LoadLevel("MenuScene");
		}
	}
	

}

//
//	Setters
//
public function enableIngameMenu()
{
	ingameMenu = true;
}

public function disableIngameMenu()
{
	ingameMenu = false;
}

public function addToDebug(message:String):void
{
	debug = debug + "\n" + message;
	//debug = message;
}
public function setJob(job:String):void
{
	jobString = job;
}

public function setAmountCorrect(value:int)
{
	amount_Correct = value;
}

public function setAmountBoxes(value:int)
{
	amount_Boxes = value;
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
	//check first if its higher than 10, the game is not built for higher than 10
	if(amount_Boxes > 10) setAmountBoxes(10);
	return amount_Boxes;
}

public function getMode():String
{
	return mode;
}