#pragma strict

import System.Xml;	//needed for XML reading
import System.IO;	//needed for File IO (example: File.Exists)

private var textStyle:GUIStyle = new GUIStyle();
public var buttonTexture:Texture2D[];

function Awake()
{
	textStyle.fontSize = 24;
	textStyle.normal.textColor = Color.white;
//	//spawn the city
//	var City:GameObject = Instantiate(Resources.Load("City", GameObject));
//	//give the city the name City (else it will be City(Clone)
//	City.name = "City";
//	//read the XML to texture our city
//	readXML();
}

function OnGUI()
{
	if(GUI.Button(Rect(Screen.width / 10, Screen.height / 10, 100, 100),"Brandweer"))
	{
		GameObject.Find("indestructable").GetComponent(globalScript).setJob("Fireman");
		startGame();
	}
	if(GUI.Button(Rect(Screen.width / 10 + 110, Screen.height / 10, 100, 100),"Leger"))
	{
		GameObject.Find("indestructable").GetComponent(globalScript).setJob("Army");
		startGame();
	}
	if(GUI.Button(Rect(Screen.width / 10 + 220, Screen.height / 10, 100, 100),"Marinier"))
	{
		GameObject.Find("indestructable").GetComponent(globalScript).setJob("Marine");
		startGame();
	}
	if(GUI.Button(Rect(Screen.width / 10 + 330, Screen.height / 10, 100, 100),"Verpleegster"))
	{
		GameObject.Find("indestructable").GetComponent(globalScript).setJob("Nurse");
		startGame();
	}
	if(GUI.Button(Rect(Screen.width / 10 + 440, Screen.height / 10, 100, 100),"Politie"))
	{
		GameObject.Find("indestructable").GetComponent(globalScript).setJob("Policeman");
		startGame();
	}
	
	GUI.Label(Rect(20, 20, Screen.width, 100), "Kies hier je baan", textStyle);


//
//buttons with textures (functionality implementation, got no textures from creative so commented out)
//
/*
	if(GUI.Button(Rect(Screen.width / 10, Screen.height / 10, 100, 100), buttonTexture[0]))
	{
		GameObject.Find("indestructable").GetComponent(globalScript).setJob("Fireman");
		startGame();
	}
	if(GUI.Button(Rect(Screen.width / 10 + 110, Screen.height / 10, 100, 100), buttonTexture[1]))
	{
		GameObject.Find("indestructable").GetComponent(globalScript).setJob("Army");
		startGame();
	}
	if(GUI.Button(Rect(Screen.width / 10 + 220, Screen.height / 10, 100, 100), buttonTexture[2]))
	{
		GameObject.Find("indestructable").GetComponent(globalScript).setJob("Marine");
		startGame();
	}
	if(GUI.Button(Rect(Screen.width / 10 + 330, Screen.height / 10, 100, 100), buttonTexture[3]))
	{
		GameObject.Find("indestructable").GetComponent(globalScript).setJob("Nurse");
		startGame();
	}
	if(GUI.Button(Rect(Screen.width / 10 + 440, Screen.height / 10, 100, 100), buttonTexture[4]))
	{
		GameObject.Find("indestructable").GetComponent(globalScript).setJob("Policeman");
		startGame();
	}
*/
	
}

private function startGame():void
{
	Application.LoadLevel("jobScene");
}

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