#pragma strict

import System.Xml;
import System.IO;

public class Jobs
{

	protected var diploma:boolean = false;
	protected var slotBoxArray:Array = new Array();

	public function Jobs()
	{}
	
	public function setTexture()
	{}
	
	public function createSlots()
	{
		//check the amount
		var amount:int = GameObject.Find("indestructable").GetComponent(globalScript).getAmountBoxes();
		for(var i:int = 0; i<amount; i++)
		{
			//spawn the amount in a circle
			//var slot:GameObject = Instantiate(Resources.Load("SlotBox", GameObject), /* on the circle somewhere Vec3*/);
			//name it SlotBox (else it will contain (Clone) in the name;
			//slot.name = SlotBox;
			//add as child to SlotContainer
			//slot.gameObject.transform.parent = GameObject.Find("SlotContainer").transform;
			//put them into a (vector) array
			//slotBoxArray.push(slot);
		}
		
	}
	
	public function fillSlots()
	{}

	public function endGame()
	{}

}



//	public function spawnChoiceBox(xPos:float, yPos:float, zPos:float, correct:boolean, texture:Texture)
//	{}

//	public function readXML()
//	{
//		//get filePath from indestructable (unity or outside unity);
//		//var filePath:String = "" + "jobnameGetter" + ".xml";
//		
//		//var filePath:String;
//		//if unity
//		//filePath = bla bla
//		//else
//		//filePath = bla bla
//		
//		//for demonstration purposes of fireman
//		var filePath:String = Application.dataPath + "\\Scripts\\JobSystem\\XML\\" + "Fireman.xml";
//		//create xml document
//		var xmlDoc:XmlDocument = new XmlDocument();
//		
//		//if the document exists
//		if(File.Exists(filePath))
//		{
//			//load the xml document
//			xmlDoc.Load(filePath);
//			
//			//get the root node
//			var root:XmlNodeList = xmlDoc.GetElementsByTagName("root");
//			
//			//for each child node of root
//			for each(var node:XmlNode in root)
//			{
//				//save the choiceBoxes as a list
//				var choiceBoxList:XmlNodeList = node.ChildNodes;
//				
//				for each(var box:XmlNode in choiceBoxList)
//				{
//					var choiceBox:XmlNodeList = box.ChildNodes;
//						
//					for each(var stats:XmlNode in choiceBox)
//					{
//						if(stats.Name == "x")
//						{
//							var xPos:float = float.Parse(stats.InnerText);
//							//Debug.Log("setting X");
//							continue;
//							
//						}
//						if(stats.Name == "y")
//						{
//							var yPos:float = float.Parse(stats.InnerText);
//							//Debug.Log("setting Y");
//							continue;
//							
//						}
//						if(stats.Name == "z")
//						{
//							var zPos:float = float.Parse(stats.InnerText);
//							//Debug.Log("setting Z");
//							continue;
//						}
//						if(stats.Name == "correct")
//						{
//							var bool:boolean = boolean.Parse(stats.InnerText);
//							//Debug.Log("setting boolean");
//							continue;
//							
//						}
//						if(stats.Name == "texturePath")
//						{
//							var texturePath:String = stats.InnerText.ToString();
//							//Debug.Log("setting texPath");
//						}
//						
//						if(xPos != null && yPos != null && zPos != null && bool != null && texturePath != null)
//						{
//							//Debug.Log("creating choicebox");
//							spawnChoiceBox(xPos, yPos, zPos, bool, Resources.Load(texturePath, Texture));
//						}
//						else Debug.LogError("can't build choicebox because stats are missing");
//					}
//				}
//			}
//			
//		}
//		else Debug.LogError("XML doesn't exist");
//		
//		
//	
//	}