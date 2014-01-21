#pragma strict
#pragma downcast

import System.Xml;	//needed for XML reading
import System.IO;	//needed for File IO (example: File.Exists)

private var textStyle:GUIStyle = new GUIStyle();
private var buttonTexture:Texture2D[];

private var buttonWidth:int = 190;
private var buttonHeight:int = 190;

private var fireB 			: Rect 	= Rect(55							, 120, buttonWidth, buttonHeight);
private var armyB 			: Rect 	= Rect(110 	+ 	 buttonWidth		, 120, buttonWidth, buttonHeight);
private var marineB 		: Rect 	= Rect(165 	+	(buttonWidth * 2)	, 120, buttonWidth, buttonHeight);
private var nurseB 			: Rect 	= Rect(220 	+	(buttonWidth * 3)	, 120, buttonWidth, buttonHeight);
private var policeB 		: Rect 	= Rect(275 	+	(buttonWidth * 4)	, 120, buttonWidth, buttonHeight);

private var cleanerB 		: Rect 	= Rect(55							, Screen.height - 250, buttonWidth, buttonHeight);
private var truckDriverB 	: Rect 	= Rect(110	+  buttonWidth			, Screen.height - 250, buttonWidth, buttonHeight);
private var airHostessB 	: Rect 	= Rect(165	+ (buttonWidth * 2)		, Screen.height - 250, buttonWidth, buttonHeight);
private var mechanicB 		: Rect 	= Rect(220	+ (buttonWidth * 3)		, Screen.height - 250, buttonWidth, buttonHeight);
private var waiterB 		: Rect 	= Rect(275	+ (buttonWidth * 4)		, Screen.height - 250, buttonWidth, buttonHeight);

private var starTexture:Texture2D = null;
private var starOpenTexture:Texture2D = null;

//make new rectangles if you need more buttons
//syntax
//private var "buttonname" : Rect = Rect(x,y,width,height);
//add the rectangle to the array in the Awake
//make a new function that'll execute that job (example fireman())
//add the if statement in the update if(checkInButton(rectangle)) functionname();
//uncomment it or add in the onGUI and fillButtonTextureArray functions to have the button placed and textured


private var rectArray 		: Array = new Array();
private var rectBoolArray 	: Array = new Array();

private var timer	:float = 0.0;
private var seconds	:float = 0.0;

private var handPos : Vector3;

private var cityBackground:Texture2D = null;

private var buttonTextureArray	:Array		= new Array();
private var guiStyle			:GUIStyle	= new GUIStyle();

function Awake()
{
	starTexture = GameObject.Find("indestructable").GetComponent(TextureLoader).getTexture("StarClosed");
	starOpenTexture = GameObject.Find("indestructable").GetComponent(TextureLoader).getTexture("StarOpen");
	cityBackground = GameObject.Find("indestructable").GetComponent(TextureLoader).loadTexture("/CityBackground/Citybackground.png", true);
	fillButtonTextureArray();
	textStyle.fontSize = 24;
	textStyle.normal.textColor = Color.white;

//
//	old code to spawn the City and texture the buildings using XML (removed the City cause the creative who should have made it got kicked)
//
//	//spawn the city
//	var City:GameObject = Instantiate(Resources.Load("City", GameObject));
//	//give the city the name City (else it will be City(Clone)
//	City.name = "City";
//	//read the XML to texture our city
//	readXML();

	rectArray.Push(fireB, armyB, marineB, nurseB, policeB, cleanerB, truckDriverB, airHostessB, mechanicB, waiterB);		//Add rectangles here

	for(var i=0; i<rectArray.length; i++)
	{
		rectBoolArray.Push(false);
	}
	
}


function Update()
{
	handPos = GameObject.Find("indestructable").GetComponent(globalScript).getHand();
	
	checkRectangles();
	
	
	if(checkInButton(fireB)) fireman();
	if(checkInButton(armyB)) army();
	if(checkInButton(marineB)) marine();
	if(checkInButton(nurseB)) nurse();
	if(checkInButton(policeB)) police();
	if(checkInButton(cleanerB)) cleaner();
	if(checkInButton(truckDriverB)) truckDriver();
	if(checkInButton(airHostessB)) airHostess();
	if(checkInButton(mechanicB)) mechanic();
	if(checkInButton(waiterB)) waiter();
	
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
	return false;
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

function fillButtonTextureArray():void
{
	 var texture:Texture2D;
	 
	 //texture = searchButtonTexture("Fireman");
	 texture = GameObject.Find("indestructable").GetComponent(TextureLoader).getTexture("Fireman");
	 buttonTextureArray.push(texture);
	 
	 //texture = searchButtonTexture("Army");
	 texture = GameObject.Find("indestructable").GetComponent(TextureLoader).getTexture("Army");
	 buttonTextureArray.push(texture);
	 
	 //texture = searchButtonTexture("Marine");
	 texture = GameObject.Find("indestructable").GetComponent(TextureLoader).getTexture("Marine");
	 buttonTextureArray.push(texture);
	 
	 //texture = searchButtonTexture("Nurse");
	 texture = GameObject.Find("indestructable").GetComponent(TextureLoader).getTexture("Nurse");
	 buttonTextureArray.push(texture);
	 
	 //texture = searchButtonTexture("Policeman");
	 texture = GameObject.Find("indestructable").GetComponent(TextureLoader).getTexture("Policeman");
	 buttonTextureArray.push(texture);
	 
	 //texture = searchButtonTexture("Cleaner");
	 texture = GameObject.Find("indestructable").GetComponent(TextureLoader).getTexture("Cleaner");
	 buttonTextureArray.push(texture);
	 
	 //texture = searchButtonTexture("Truckdriver");
	 texture = GameObject.Find("indestructable").GetComponent(TextureLoader).getTexture("Truckdriver");
	 buttonTextureArray.push(texture);
	 
	 //texture = searchButtonTexture("AirHostess");
	 texture = GameObject.Find("indestructable").GetComponent(TextureLoader).getTexture("AirHostess");
	 buttonTextureArray.push(texture);
	 
	 //texture = searchButtonTexture("Mechanic");
	 texture = GameObject.Find("indestructable").GetComponent(TextureLoader).getTexture("Mechanic");
	 buttonTextureArray.push(texture);
	 
	 //texture = searchButtonTexture("Waiter");
	 texture = GameObject.Find("indestructable").GetComponent(TextureLoader).getTexture("Waiter");
	 buttonTextureArray.push(texture);

}

function OnGUI()
{

//
//buttons without texture just a string
//
//	if(GUI.Button(fireB,"Brandweer")) fireman();
//	if(GUI.Button(armyB,"Leger")) army();
//	if(GUI.Button(marineB,"Marinier")) marine();
//	if(GUI.Button(nurseB,"Verpleegster")) nurse(); 
//	if(GUI.Button(policeB,"Politie")) police();
//	
//	GUI.Label(Rect(20, 20, Screen.width, 100), "Kies hier je baan", textStyle);
	GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height), cityBackground);

//
//buttons with textures
//

	if(GUI.Button(fireB,"", guiStyle)) fireman();
	GUI.DrawTexture(fireB, buttonTextureArray[0] as Texture, ScaleMode.StretchToFill);			//fireman

	for(var i:int=0; i<GameObject.Find("indestructable").GetComponent(globalScript).getScore("Brandweer"); i++)
	{
		GUI.DrawTexture(Rect(fireB.x + (10 * (i+1)) + 50 * i, fireB.y + 140, 50,50), starTexture);
	}
	for(var j:int=i; j<3; j++)
	{
		GUI.DrawTexture(Rect(fireB.x + (10 * (j+1)) + 50 * j, fireB.y + 140, 50, 50), starOpenTexture);
	}

	if(GUI.Button(armyB,"", guiStyle)) army();
	GUI.DrawTexture(armyB, buttonTextureArray[1] as Texture, ScaleMode.StretchToFill);			//army
	
	for(i=0; i<GameObject.Find("indestructable").GetComponent(globalScript).getScore("Leger"); i++)
	{
		GUI.DrawTexture(Rect(armyB.x + (10 * (i+1)) + 50 * i, armyB.y + 140, 50,50), starTexture);
	}
	for(j=i; j<3; j++)
	{
		GUI.DrawTexture(Rect(armyB.x + (10 * (j+1)) + 50 * j, armyB.y + 140, 50, 50), starOpenTexture);
	}
	
	
	if(GUI.Button(marineB,"", guiStyle)) marine();
	GUI.DrawTexture(marineB, buttonTextureArray[2] as Texture, ScaleMode.StretchToFill);		//marine
	
	for(i=0; i<GameObject.Find("indestructable").GetComponent(globalScript).getScore("Marinier"); i++)
	{
		GUI.DrawTexture(Rect(marineB.x + (10 * (i+1)) + 50 * i, marineB.y + 140, 50,50), starTexture);
	}
	for(j=i; j<3; j++)
	{
		GUI.DrawTexture(Rect(marineB.x + (10 * (j+1)) + 50 * j, marineB.y + 140, 50, 50), starOpenTexture);
	}
	
	
	if(GUI.Button(nurseB,"", guiStyle)) nurse(); 
	GUI.DrawTexture(nurseB, buttonTextureArray[3] as Texture, ScaleMode.StretchToFill);			//nurse
	
	for(i=0; i<GameObject.Find("indestructable").GetComponent(globalScript).getScore("Verpleger"); i++)
	{
		GUI.DrawTexture(Rect(nurseB.x + (10 * (i+1)) + 50 * i, nurseB.y + 140, 50,50), starTexture);
	}
	for(j=i; j<3; j++)
	{
		GUI.DrawTexture(Rect(nurseB.x + (10 * (j+1)) + 50 * j, nurseB.y + 140, 50, 50), starOpenTexture);
	}
	
	if(GUI.Button(policeB,"", guiStyle)) police();
	GUI.DrawTexture(policeB, buttonTextureArray[4] as Texture, ScaleMode.StretchToFill);		//police
	
		for(i=0; i<GameObject.Find("indestructable").GetComponent(globalScript).getScore("Politie"); i++)
	{
		GUI.DrawTexture(Rect(policeB.x + (10 * (i+1)) + 50 * i, policeB.y + 140, 50,50), starTexture);
	}
	for(j=i; j<3; j++)
	{
		GUI.DrawTexture(Rect(policeB.x + (10 * (j+1)) + 50 * j, policeB.y + 140, 50, 50), starOpenTexture);
	}
	
	if(GUI.Button(cleanerB,"", guiStyle)) cleaner();
	GUI.DrawTexture(cleanerB, buttonTextureArray[5] as Texture, ScaleMode.StretchToFill);		//cleaner
	
		for(i=0; i<GameObject.Find("indestructable").GetComponent(globalScript).getScore("Schoonmaker"); i++)
	{
		GUI.DrawTexture(Rect(cleanerB.x + (10 * (i+1)) + 50 * i, cleanerB.y + 140, 50,50), starTexture);
	}
	for(j=i; j<3; j++)
	{
		GUI.DrawTexture(Rect(cleanerB.x + (10 * (j+1)) + 50 * j, cleanerB.y + 140, 50, 50), starOpenTexture);
	}
	
	if(GUI.Button(truckDriverB,"", guiStyle)) truckDriver();
	GUI.DrawTexture(truckDriverB, buttonTextureArray[6] as Texture, ScaleMode.StretchToFill);	//truckdriver

		for(i=0; i<GameObject.Find("indestructable").GetComponent(globalScript).getScore("Truck_Chauffeur"); i++)
	{
		GUI.DrawTexture(Rect(truckDriverB.x + (10 * (i+1)) + 50 * i, truckDriverB.y + 140, 50,50), starTexture);
	}
	for(j=i; j<3; j++)
	{
		GUI.DrawTexture(Rect(truckDriverB.x + (10 * (j+1)) + 50 * j, truckDriverB.y + 140, 50, 50), starOpenTexture);
	}

	if(GUI.Button(airHostessB,"", guiStyle)) airHostess();
	GUI.DrawTexture(airHostessB, buttonTextureArray[7] as Texture, ScaleMode.StretchToFill);	//airhostess
	
		for(i=0; i<GameObject.Find("indestructable").GetComponent(globalScript).getScore("Stewardess"); i++)
	{
		GUI.DrawTexture(Rect(airHostessB.x + (10 * (i+1)) + 50 * i, airHostessB.y + 140, 50,50), starTexture);
	}
	for(j=i; j<3; j++)
	{
		GUI.DrawTexture(Rect(airHostessB.x + (10 * (j+1)) + 50 * j, airHostessB.y + 140, 50, 50), starOpenTexture);
	}
	
	if(GUI.Button(mechanicB,"", guiStyle)) mechanic();
	GUI.DrawTexture(mechanicB, buttonTextureArray[8] as Texture, ScaleMode.StretchToFill);		//mechanic
	
		for(i=0; i<GameObject.Find("indestructable").GetComponent(globalScript).getScore("Monteur"); i++)
	{
		GUI.DrawTexture(Rect(mechanicB.x + (10 * (i+1)) + 50 * i, mechanicB.y + 140, 50,50), starTexture);
	}
	for(j=i; j<3; j++)
	{
		GUI.DrawTexture(Rect(mechanicB.x + (10 * (j+1)) + 50 * j, mechanicB.y + 140, 50, 50), starOpenTexture);
	}
	
	if(GUI.Button(waiterB,"", guiStyle)) waiter();
	GUI.DrawTexture(waiterB, buttonTextureArray[9] as Texture, ScaleMode.StretchToFill);		//waiter
	
		for(i=0; i<GameObject.Find("indestructable").GetComponent(globalScript).getScore("Kelner"); i++)
	{
		GUI.DrawTexture(Rect(waiterB.x + (10 * (i+1)) + 50 * i, waiterB.y + 140, 50,50), starTexture);
	}
	for(j=i; j<3; j++)
	{
		GUI.DrawTexture(Rect(waiterB.x + (10 * (j+1)) + 50 * j, waiterB.y + 140, 50, 50), starOpenTexture);
	}
	
	GUI.Label(Rect(55, 20, Screen.width, 100), "Kies hier je baan", textStyle);
}

private function fireman()
{
	GameObject.Find("indestructable").GetComponent(globalScript).setJob("Fireman");
	GameObject.Find("indestructable").GetComponent(globalScript).setJobNaam("Brandweer");
	startGame();
}

private function army()
{
	GameObject.Find("indestructable").GetComponent(globalScript).setJob("Army");
	GameObject.Find("indestructable").GetComponent(globalScript).setJobNaam("Leger");
	startGame();
}

private function marine()
{
	GameObject.Find("indestructable").GetComponent(globalScript).setJob("Marine");
	GameObject.Find("indestructable").GetComponent(globalScript).setJobNaam("Marinier");
	startGame();
}

private function nurse()
{
	GameObject.Find("indestructable").GetComponent(globalScript).setJob("Nurse");
	GameObject.Find("indestructable").GetComponent(globalScript).setJobNaam("Verpleger");
	startGame();
}

private function police()
{
	GameObject.Find("indestructable").GetComponent(globalScript).setJob("Policeman");
	GameObject.Find("indestructable").GetComponent(globalScript).setJobNaam("Politie");
	startGame();
}

private function cleaner()
{
	GameObject.Find("indestructable").GetComponent(globalScript).setJob("Cleaner");
	GameObject.Find("indestructable").GetComponent(globalScript).setJobNaam("Schoonmaker");
	startGame();
}

private function truckDriver()
{
	GameObject.Find("indestructable").GetComponent(globalScript).setJob("Truckdriver");
	GameObject.Find("indestructable").GetComponent(globalScript).setJobNaam("Truck_Chauffeur");
	startGame();
}

private function airHostess()
{
	GameObject.Find("indestructable").GetComponent(globalScript).setJob("Airhostess");
	GameObject.Find("indestructable").GetComponent(globalScript).setJobNaam("Stewardess");
	startGame();
}

private function mechanic()
{
	GameObject.Find("indestructable").GetComponent(globalScript).setJob("Mechanic");
	GameObject.Find("indestructable").GetComponent(globalScript).setJobNaam("Monteur");
	startGame();
}

private function waiter()
{
	GameObject.Find("indestructable").GetComponent(globalScript).setJob("Waiter");
	GameObject.Find("indestructable").GetComponent(globalScript).setJobNaam("Kelner");
	startGame();
}

private function startGame():void
{
	Application.LoadLevel("jobScene");
}


//function searchButtonTexture(name:String):Texture2D
//{
//	var filePath:String = Application.dataPath + "/ButtonTextures/CityScene";
//	var fileInfo = Directory.GetFiles(filePath, name+".png" , SearchOption.AllDirectories);
//	
//	for(file in fileInfo)
//	{
//		//new WWW download
//		var wwwPNG = new WWW("file://"+file);
//	}
//	
//	return wwwPNG.texture;
//}




//private function readXML():IEnumerator
//{
//	//get correct filepath
//	var filePath:String = "";
//	//new XML document for reading
//	var xmlDoc:XmlDocument = new XmlDocument();
//
//	//create the arrays for the loading part
//	var jobNameArray:Array = new Array();
//	var textureArray:Array = new Array();
//	var buildingArray:Array = new Array();
//	var normalMapArray:Array = new Array();
//	
//	//look what mode it is... then set the filePath
//	if(GameObject.Find("indestructable").GetComponent(globalScript).getMode() == "Unity")
//	{
//		filePath = Application.dataPath + "\\Scripts\\City\\XML\\City.xml";
//	}
//	else filePath = Application.dataPath + "/Scripts/City/XML/City.xml";
//	
//	//if its still "" then something must've really gone wrong...
//	if(filePath == "")
//	{
//		Debug.LogError("something went really wrong reading the City.xml");
//	}
//
//
////	//check if the xml file exists
//	if(File.Exists(filePath))
//	{
//		//load the xml document
//		xmlDoc.Load(filePath);
//		
//		//get the root node of the xml
//		var rootNode:XmlNodeList = xmlDoc.GetElementsByTagName("root");
//		
//		//for every node in the root node
//		//<root>
//		//	<node>
//		//	</node>
//		//</root>
//		for each(var node:XmlNode in rootNode)
//		{
//			//save the childnodes in the list
//			var childNodes:XmlNodeList = node.ChildNodes;
//			
//			//for each of those building nodes
//			for each(var buildingNode:XmlNode in childNodes)
//			{
//				//save the stats of the building node
//				var buildingsStats:XmlNodeList = buildingNode.ChildNodes;
//				//for each stat node
//				for each(var stats:XmlNode in buildingsStats)
//				{
//					//if the node is called Name
//					if(stats.Name == "Name")
//					{
//						//push the stats to the array for the loader
//						buildingArray.push(stats.InnerText as String);
//					}
//					//if the node is called JobName
//					if(stats.Name == "JobName")
//					{
//						jobNameArray.push(stats.InnerText as String);
//					}
//					//if the node called TexturePath
//					if(stats.Name == "TexturePath")
//					{
//						//push the stats to the array for the loader
//						textureArray.push(stats.InnerText as String);
//					}
//					//if the node is called normalmap
//					if(stats.Name == "NormalMap")
//					{
//						//push the stats to the array for the loader
//						normalMapArray.push(stats.InnerText as String);
//					}
//				}
//			}
//		}
//		//loading part (with the filled arrays)
//		for(var i=0; i<buildingArray.length; i++)
//		{
//			//find the building by its name, set the main texture
//			if(buildingArray[i] != null && textureArray[i] != null && normalMapArray[i] != null)
//			{
//				//create new material to work on (bumped diffuse)
//				var material = new Material(Shader.Find("Bumped Diffuse"));
//				//file strings
//				var file1:String;
//				var file2:String;
//				
//				//if the mode is compiled mode
//				if(GameObject.Find("indestructable").GetComponent(globalScript).getMode() == "Compiled")
//				{
//					//assign the filePath
//					file1 = "file://" + Application.dataPath + "/" + textureArray[i] as String;
//					file2 = "file://" + Application.dataPath + "/" + normalMapArray[i] as String;
//					GameObject.Find("indestructable").GetComponent(globalScript).addToDebug(file1);
//				}
//				else
//				{
//					//assign filepath
//					file1 = "file://" + Application.dataPath + "/Resources/" + textureArray[i] as String;
//					file2 = "file://" + Application.dataPath + "/Resources/" + normalMapArray[i] as String;
//					GameObject.Find("indestructable").GetComponent(globalScript).addToDebug("executed while compiled");
//				}
//				
//				//www loading
//				var wwwMainTex = new WWW(file1);	//download my 1st file
//				//loading the texture takes time so wait for it till its done if it isn't already
//				if(wwwMainTex.isDone == false)
//				{
//					yield wwwMainTex;	//wait till its done
//				}
//				
//				var wwwNormalTex = new WWW(file2);	//download my 2nd file
//				
//				if(wwwNormalTex.isDone == false)
//				{
//					yield wwwNormalTex;	//wait till its done
//				}
//				
//				
//				//if the textures are done downloading
//				if(wwwMainTex.isDone && wwwNormalTex.isDone)
//				{
//					//set the main texture of the material
//					material.SetTexture("_MainTex", wwwMainTex.texture);
//					//set the normalmap of the material
//					material.SetTexture("_BumpMap", wwwNormalTex.texture);
//					
//					//apply the material to the building
//					GameObject.Find(buildingArray[i] as String).renderer.material = material;
//					//apply script to the building and initialize it
//					if(jobNameArray[i] != null)
//					{
//						GameObject.Find(buildingArray[i] as String).AddComponent(BuildingScript);
//						GameObject.Find(buildingArray[i] as String).GetComponent(BuildingScript).setJobName(jobNameArray[i] as String);
//					}
//				}
//				else Debug.LogError("something went wrong with loading wwwMainTex or wwwNormalTex");
//			}
//			else 
//			{
//				Debug.LogError("Either the buildingArray, textureArray or normalMapArray has failed to load...");
//				Debug.Log(buildingArray[i]);
//				Debug.Log(textureArray[i]);
//				Debug.LogError("breaking the operation");
//				break;
//			}
//		}
//	}
//	else Debug.LogError("The XML file was not found");//if it doesn't exist report it as an error
//}