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
	
	private function randomCircle(i:int):Vector3{			//spawn the amount in a circle		* on the circle somewhere Vec3*/);
		var ang = (360 / GameObject.Find("indestructable").GetComponent(globalScript).getAmountBoxes() * i);			//360 degrees / items * itemNumber
		var radius = 5;						//position of the squares from the center
		
		var center : Vector3 = Vector3(0.0, 0.0, 1.0);
		center.x = GameObject.Find("Environment").transform.FindChild("Main Camera").transform.position.x;
		center.y = GameObject.Find("Environment").transform.FindChild("Main Camera").transform.position.y;	
		
		var pos : Vector3;		
		pos.x =	center.x + radius * Mathf.Sin(ang * Mathf.Deg2Rad);
		pos.y = center.y + radius * Mathf.Cos(ang * Mathf.Deg2Rad);
		pos.z = center.z;
//		Debug.Log(pos);
		return pos;
	}
	
	public function createSlots()
	{
		//check the amount
		var amount:int = GameObject.Find("indestructable").GetComponent(globalScript).getAmountBoxes();
		for(var i:int = 0; i<amount; i++)
		{
			var slot:GameObject = GameObject.Instantiate(Resources.Load("SlotBox", GameObject), randomCircle(i), Quaternion.identity);
			slot.name = "SlotBox"+i;		// name it SlotBox (else it will contain (Clone);
			slot.AddComponent(slotBoxScript);
			slot.gameObject.transform.parent = GameObject.Find("SlotContainer").transform;
			
			//put them into a (vector) array
			slotBoxArray.push(slot);		//add as child to SlotContainer
			//Debug.Log(slotBoxArray);
		}
		
	}
	
	public function fillSlots()
	{
		//amount of boxes
		var amountOfBoxes = GameObject.Find("indestructable").GetComponent(globalScript).getAmountBoxes();
		//amount of correct boxes
		var amountCorrect = GameObject.Find("indestructable").GetComponent(globalScript).getAmountCorrect();
		//number
		var boxesLeft:int = amountOfBoxes;
		//counter
		var correctLeft:int = amountCorrect;
		//random number
		var randomNumber:int;
		var correctNumber:int;
		
		for(var i=0; i<amountOfBoxes; i++)
		{
			randomNumber = Mathf.Floor(Random.value * 100);
			correctNumber = ((correctLeft * 100) / boxesLeft);
			var box:GameObject = slotBoxArray[i] as GameObject;
			
			if(correctLeft != 0)
			{
				if(randomNumber < correctNumber)
				{
					//correct box
					box.GetComponent(slotBoxScript).setCorrect();
					//set correct texture
					fillCorrect(box);
					
					//correct boxes left -1
					correctLeft --;
					//boxes left -1
					boxesLeft --;
				}
				else
				{
					//false box
					box.GetComponent(slotBoxScript).setFalse();
					//set false texture
					fillFalse(box);
					//boxes left -1
					boxesLeft --;
				}
			}
			else
			{
				//false box
				box.GetComponent(slotBoxScript).setFalse();
				//set false texture
				fillFalse(box);
				//boxes left
				boxesLeft --;
			}
		}
		
	}

	public function endGame()
	{}
	
	private function fillCorrect(box:GameObject):void
	{
		//the texture assets
		var assetArray:Array = GameObject.Find("JobInitializer").GetComponent(Initialization).getAssetArray();
		//the name of the png file
		var assetNameArray:Array = GameObject.Find("JobInitializer").GetComponent(Initialization).getAssetNameArray();
		//the job name
		var jobName:String = GameObject.Find("indestructable").GetComponent(globalScript).getJobName();
		
		for(var i:int=0; i<assetArray.length; i++)
		{
			//get the texture
			var texture:Texture2D = assetArray[i] as Texture2D;
			var textureName:String = assetNameArray[i] as String;
			//if the name of the texture contains
			if(textureName.Contains(jobName))
			{
				box.GetComponent(slotBoxScript).setTexture(texture);
				assetArray.RemoveAt(i);
				assetNameArray.RemoveAt(i);
				//found the texture so break it cause ur done
				break;
			}
		}
		
		if(box.GetComponent(slotBoxScript).getTexture() == null)
		{
			Debug.LogError("missing correct texture");
			GameObject.Find("indestructable").GetComponent(globalScript).addToDebug("Missing correct texture!");
		}
	}
	
	private function fillFalse(box:GameObject):void
	{
		//the texture assets
		var falseAssetArray:Array = GameObject.Find("JobInitializer").GetComponent(Initialization).getFalseAssetArray();
		//the name of the png file
		var falseAssetNameArray:Array = GameObject.Find("JobInitializer").GetComponent(Initialization).getFalseAssetNameArray();
		//there is a false texture available so do the while loop
		if(falseAssetArray.length != 0)
		{
			var randomNumber:int = Random.Range(0, falseAssetArray.length); 
		
			//get random texture
			var texture:Texture2D = falseAssetArray[randomNumber] as Texture2D;
			var textureName:String = falseAssetNameArray[randomNumber] as String;
				
			box.GetComponent(slotBoxScript).setTexture(texture);
			falseAssetArray.RemoveAt(randomNumber);
			falseAssetNameArray.RemoveAt(randomNumber);
		}
		else
		{
			Debug.LogError("Not enough false textures to load");
			GameObject.Find("indestructable").GetComponent(globalScript).addToDebug("Not enough false textures to load");
		}
	}
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