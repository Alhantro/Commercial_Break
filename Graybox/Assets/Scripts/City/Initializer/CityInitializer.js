#pragma strict

import System.Xml;	//needed for XML reading
import System.IO;	//needed for File IO (example: File.Exists)

function Awake()
{
	//spawn the city
	var City:GameObject = Instantiate(Resources.Load("City", GameObject));
	//give the city the name City (else it will be City(Clone)
	City.name = "City";
	//read the XML to texture our city
	readXML();
}

private function readXML():void
{
	//get correct filepath
	var filePath:String = "";
	//new XML document for reading
	var xmlDoc:XmlDocument = new XmlDocument();

	//create the arrays for the loading part
	var jobNameArray:Array = new Array();
	var textureArray:Array = new Array();
	var buildingArray:Array = new Array();
	var normalMapArray:Array = new Array();

	//look what mode it is... then set the filePath
	if(GameObject.Find("indestructable").GetComponent(globalScript).getMode() == "Unity")
	{
		filePath = Application.dataPath + "\\Scripts\\City\\XML\\City.xml";
	}
	else filePath = Application.dataPath + "/Scripts/City/XML/City.xml";
	
	//if its still "" then something must've really gone wrong...
	if(filePath == "")
	{
		Debug.LogError("something went really wrong reading the City.xml");
	}


//	//check if the xml file exists
	if(File.Exists(filePath))
	{
		//load the xml document
		xmlDoc.Load(filePath);
		
		//get the root node of the xml
		var rootNode:XmlNodeList = xmlDoc.GetElementsByTagName("root");
		
		//for every node in the root node
		//<root>
		//	<node>
		//	</node>
		//</root>
		for each(var node:XmlNode in rootNode)
		{
			//save the childnodes in the list
			var childNodes:XmlNodeList = node.ChildNodes;
			
			//for each of those building nodes
			for each(var buildingNode:XmlNode in childNodes)
			{
				//save the stats of the building node
				var buildingsStats:XmlNodeList = buildingNode.ChildNodes;
				//for each stat node
				for each(var stats:XmlNode in buildingsStats)
				{
					//if the node is called Name
					if(stats.Name == "Name")
					{
						//push the stats to the array for the loader
						buildingArray.push(stats.InnerText as String);
					}
					//if the node is called JobName
					if(stats.Name == "JobName")
					{
						jobNameArray.push(stats.InnerText as String);
					}
					//if the node called TexturePath
					if(stats.Name == "TexturePath")
					{
						//push the stats to the array for the loader
						textureArray.push(stats.InnerText as String);
					}
					//if the node is called normalmap
					if(stats.Name == "NormalMap")
					{
						//push the stats to the array for the loader
						normalMapArray.push(stats.InnerText as String);
					}
				}
			}
		}
		//loading part (with the filled arrays)
		for(var i=0; i<buildingArray.length; i++)
		{
			//find the building by its name, set the main texture
			if(buildingArray[i] != null && textureArray[i] != null && normalMapArray[i] != null)
			{
				//create new material to work on (bumped diffuse)
				var material = new Material(Shader.Find("Bumped Diffuse"));
				//set the main texture of the material
				material.SetTexture("_MainTex", Resources.Load(textureArray[i] as String, Texture2D));
				//set the normalmap of the material
				material.SetTexture("_BumpMap", Resources.Load(normalMapArray[i] as String, Texture2D));
				//apply the material to the building
				GameObject.Find(buildingArray[i] as String).renderer.material = material;
				//apply script to the building and initialize it
				if(jobNameArray[i] != null)
				{
					GameObject.Find(buildingArray[i] as String).AddComponent(BuildingScript);
					GameObject.Find(buildingArray[i] as String).GetComponent(BuildingScript).setJobName(jobNameArray[i] as String);
				}
			}
			else 
			{
				Debug.LogError("Either the buildingArray, textureArray or normalMapArray has failed to load...");
				Debug.Log(buildingArray[i]);
				Debug.Log(textureArray[i]);
				Debug.Log("breaking the operation");
				break;
			}
		}
	}
	else Debug.LogError("The XML file was not found");//if it doesn't exist report it as an error
}