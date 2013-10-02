#pragma strict

import System.Xml;
import System.IO;

function Awake()
{
	var City:GameObject = Instantiate(Resources.Load("City", GameObject));
	City.name = "City";
	readXML();
}

private function readXML()
{
	//get correct filepath
	var filePath:String = "";
	var xmlDoc:XmlDocument = new XmlDocument();

	var textureArray:Array = new Array();
	var buildingArray:Array = new Array();

	filePath = Application.dataPath + "\\Scripts\\City\\XML\\City.xml";


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
					//if the node called TexturePath
					if(stats.Name == "TexturePath")
					{
						//push the stats to the array for the loader
						textureArray.push(stats.InnerText as String);
					}
				}
			}
		}
		for(var i=0; i<buildingArray.length; i++)
		{
			//find the building by its name, set the main texture
			if(buildingArray[i] != null && textureArray[i] != null)
			{
				GameObject.Find(buildingArray[i] as String).renderer.material.mainTexture = Resources.Load(textureArray[i] as String, Texture2D);
			}
			else 
			{
				Debug.LogError("Either the buildingArray or TextureArray has failed to load...");
				Debug.Log(buildingArray[i]);
				Debug.Log(textureArray[i]);
				Debug.Log("breaking the operation");
				break;
			}
		}
		
	}
	else Debug.LogError("The XML file was not found");//if it doesn't exist report it as an error
}