#pragma strict

import System.IO;
import System.Xml;

private var jobString:String = "";			//change to "" when other jobs are implemented
private var jobNaam:String = "";
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

//texture loading
private var counter:int = 0;
private var totalAmountLoading:int = 0;
private var loading:boolean = true;
private var loadingTextures:boolean = true;

private var jobScene:boolean = false;

static var createdIndestructable:boolean = false;	//if it is already created then its true

public function Awake()
{
	//if indestructale isn't created yet... create it
	if(!createdIndestructable)
	{
		DontDestroyOnLoad(this.gameObject);		//make sure this object is not destroyed on load!
		createdIndestructable = true;			//first creation of indestructable
		gameObject.GetComponent(TextureLoader).buildTextureArrays();
	}
	else	//indestructable is created so there is a double.. destroy it
	{
		Destroy(this.gameObject);
	}
}

public function OnApplicationQuit():void
{
	writeEndTimeToXML();
}

public function OnGUI():void
{
	if(loadingTextures)
	{
	
		GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height), this.gameObject.GetComponent(TextureLoader).getLoadingScreen());
		GUI.Label(Rect(Screen.width / 2, Screen.height / 2, 200, 200), checkLoading());
	
	}
	else
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
				writeEndTimeToXML();
				Application.LoadLevel("MenuScene");
			}
		}
	
	}
}

private function checkLoading():String
{
	if(counter != 0)
	{
		var _count:int = counter * 100;
		var isLoaded:int = (_count / totalAmountLoading);
		
		if(isLoaded == 100) 
		{
			loadingTextures = false;
		}
		return isLoaded.ToString();
	}
	
	return "";
}

//
//	Setters
//
public function setJobNaam(naam:String):void
{
	jobNaam = naam;
}

public function createScore():void
{	
	//new xml document
	var xmlDocument:XmlDocument = new XmlDocument();
	//path to the xml
	var filePath:String = Application.dataPath + "/Scores/Score.xml";
	var rootNode:XmlNode;
	
	//check if the file exists, if not make one!
	if(File.Exists(filePath))
	{
		xmlDocument.Load(filePath);
		rootNode = xmlDocument.DocumentElement;
	}
	else
	{
		//make new document
		File.WriteAllText(filePath, "<Scores></Scores>");
		xmlDocument.Load(filePath);
		rootNode = xmlDocument.DocumentElement;
	}
	
	
	//create a new score node (per player)
	var scoreNode:XmlElement = xmlDocument.CreateElement("Score");
	rootNode.AppendChild(scoreNode);
	//speler score
	var playerScoreNode:XmlElement = xmlDocument.CreateElement("SpelerScore");
	scoreNode.AppendChild(playerScoreNode);
	
		var brandweerNode:XmlElement = xmlDocument.CreateElement("Brandweer");
		playerScoreNode.AppendChild(brandweerNode);
		brandweerNode.InnerText = "0";
		
		var kelnerNode:XmlElement = xmlDocument.CreateElement("Kelner");
		playerScoreNode.AppendChild(kelnerNode);
		kelnerNode.InnerText = "0";
		
		var legerNode:XmlElement = xmlDocument.CreateElement("Leger");
		playerScoreNode.AppendChild(legerNode);	
		legerNode.InnerText = "0";

		var marinierNode:XmlElement = xmlDocument.CreateElement("Marinier");
		playerScoreNode.AppendChild(marinierNode);				
		marinierNode.InnerText = "0";
									
		var monteurNode:XmlElement = xmlDocument.CreateElement("Monteur");
		playerScoreNode.AppendChild(monteurNode);														
		monteurNode.InnerText = "0";

		var politieNode:XmlElement = xmlDocument.CreateElement("Politie");
		playerScoreNode.AppendChild(politieNode);																								
		politieNode.InnerText = "0";
		
		var schoonmakerNode:XmlElement = xmlDocument.CreateElement("Schoonmaker");
		playerScoreNode.AppendChild(schoonmakerNode);																																		
		schoonmakerNode.InnerText = "0";
																											
		var stewardessNode:XmlElement = xmlDocument.CreateElement("Stewardess");
		playerScoreNode.AppendChild(stewardessNode);
		stewardessNode.InnerText = "0";
			
		var truckNode:XmlElement = xmlDocument.CreateElement("Truck_Chauffeur");
		playerScoreNode.AppendChild(truckNode);
		truckNode.InnerText = "0";
		
		var verplegerNode:XmlElement = xmlDocument.CreateElement("Verpleger");
		playerScoreNode.AppendChild(verplegerNode);
		verplegerNode.InnerText = "0";
		
	//tijd begin
	var beginTimeNode:XmlElement = xmlDocument.CreateElement("Begin_Tijd");
	scoreNode.AppendChild(beginTimeNode);
	beginTimeNode.InnerText = System.DateTime.Now.Day.ToString() + "/" + System.DateTime.Now.Month.ToString() + "/" + System.DateTime.Now.Year.ToString() + " " + System.DateTime.Now.Hour.ToString() + ":" + System.DateTime.Now.Minute.ToString() + ":" + System.DateTime.Now.Second.ToString();
	
	var endTimeNode:XmlElement = xmlDocument.CreateElement("Eind_Tijd");
	scoreNode.AppendChild(endTimeNode);
	
	xmlDocument.Save(filePath);
}

public function writeScoreToXML():void
{
	//read xml document
	var xmlDocument:XmlDocument = new XmlDocument();
	var filePath:String = Application.dataPath + "/Scores/Score.xml";
	
	xmlDocument.Load(filePath);
	var rootNode:XmlNode = xmlDocument.DocumentElement;
	
	var scores:XmlNodeList = rootNode.ChildNodes;
	
	var scoreNodeList:XmlNodeList;
	
	for(var score in scores)
	{
		var node:XmlNode = score as XmlNode;
		scoreNodeList = node.ChildNodes;
	}
	
	var jobNodesList:XmlNodeList;
	
	for(var _scoreStats in scoreNodeList)
	{
		var scoreStats:XmlNode = _scoreStats as XmlNode;
		if(scoreStats.Name == "SpelerScore")
		{
			jobNodesList = scoreStats.ChildNodes;
		}
	}
	
	for(var _jobs in jobNodesList)
	{
		var jobNode:XmlNode = _jobs as XmlNode;
		
		if(jobNode.Name == jobNaam)
		{
			if(int.Parse(jobNode.InnerText) < GameObject.Find("ScriptHolder").GetComponent(JobScore).getScore())
			{
				jobNode.InnerText = GameObject.Find("ScriptHolder").GetComponent(JobScore).getScore().ToString();
			}
		}
	}
	
	xmlDocument.Save(filePath);
}

public function writeEndTimeToXML():void
{
	//read xml document
	var xmlDocument:XmlDocument = new XmlDocument();
	var filePath:String = Application.dataPath + "/Scores/Score.xml";
	
	xmlDocument.Load(filePath);
	var rootNode:XmlNode = xmlDocument.DocumentElement;
	
	var scores:XmlNodeList = rootNode.ChildNodes;
	
	var scoreNodeList:XmlNodeList;
	
	for(var score in scores)
	{
		var node:XmlNode = score as XmlNode;
		scoreNodeList = node.ChildNodes;
	}
	
	for(var _scoreStats in scoreNodeList)
	{
		var scoreStats:XmlNode = _scoreStats as XmlNode;
		if(scoreStats.Name == "Eind_Tijd")
		{
			scoreStats.InnerText = System.DateTime.Now.Day.ToString() + "/" + System.DateTime.Now.Month.ToString() + "/" + System.DateTime.Now.Year.ToString() + " " + System.DateTime.Now.Hour.ToString() + ":" + System.DateTime.Now.Minute.ToString() + ":" + System.DateTime.Now.Second.ToString();
		}
	}
	
	xmlDocument.Save(filePath);
}

public function setLoading(value:boolean):void
{
	loading = value;
}

public function setLoadingTextures(value:boolean):void
{
	loadingTextures = value;
}

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

public function setAmountTexturesLoading(value:int):void
{
	totalAmountLoading = value;
}

public function deductFromLoading():void
{
	totalAmountLoading --;
}

public function increaseCounter():void
{
	counter++;
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

public function setJobSceneBool(bool:boolean):void
{
	jobScene = bool;
}

//
//	Getters
//
public function getScore(naam:String):int
{
	//read xml document
	var xmlDocument:XmlDocument = new XmlDocument();
	var filePath:String = Application.dataPath + "/Scores/Score.xml";
	var result:int = 0;
	
	xmlDocument.Load(filePath);
	var rootNode:XmlNode = xmlDocument.DocumentElement;
	
	var scores:XmlNodeList = rootNode.ChildNodes;
	
	var scoreNodeList:XmlNodeList;
	
	for(var score in scores)
	{
		var node:XmlNode = score as XmlNode;
		scoreNodeList = node.ChildNodes;
	}
	
	var jobNodesList:XmlNodeList;
	
	for(var _scoreStats in scoreNodeList)
	{
		var scoreStats:XmlNode = _scoreStats as XmlNode;
		if(scoreStats.Name == "SpelerScore")
		{
			jobNodesList = scoreStats.ChildNodes;
		}
	}
	
	for(var _jobs in jobNodesList)
	{
		var jobNode:XmlNode = _jobs as XmlNode;
		
		if(jobNode.Name == naam)
		{
			result = int.Parse(jobNode.InnerText);
		}
	}
	
	return result;
}

public function doneLoading():boolean
{
	if(loading) return false;
	else return true;
}

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
	//check first if its higher than 16, the game is not built for higher than 16
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

public function getJobSceneBool():boolean
{
	return jobScene;
}