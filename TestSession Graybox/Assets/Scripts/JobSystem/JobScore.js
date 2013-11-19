#pragma strict


private var amountSelected : int;

private var setButton:boolean = false;
private var endString : String;
private var score : int;

private var handPos : Vector3;

private var endTextRect : Rect = Rect 	((Screen.width / 2 - 300), (Screen.height / 2 - 300), 600, 600);
private var endRect 	: Rect = Rect	((Screen.width / 2 - 100), (Screen.height / 2 + 150), 200, 100);

private var timer:float;
private var seconds:float;

private var endJobButtonTexture:Texture2D;
private var endJobCertificate:Texture2D;
private var guiStyle:GUIStyle = new GUIStyle();

function Awake()
{
	guiStyle.fontSize = 24;
	endJobButtonTexture = GameObject.Find("indestructable").GetComponent(TextureLoader).getTexture("JobBackbutton");
	endJobCertificate = GameObject.Find("indestructable").GetComponent(TextureLoader).getTexture("Certificate");
}

public function endJob():void
{
	//Function for Certificate & Score
	//For Score we can also use a multiplication by time or other things to calculate a score.
	
	endString = ("Deze Baan is succesvol door jou uitgevoerd! Goed gedaan! \n Jouw Score is : " + score);
	setButton = true;
	//Debug.Log("Jouw Score is : " + score);
	//Debug.Log("Deze Baan is succesvol door jou uitgevoerd! Goed gedaan!");
}

function Update()
{
	handPos = GameObject.Find("indestructable").GetComponent(globalScript).getHand();
	
	if(setButton == true)
	{
		//Debug.Log("setButton == true   ...  Can end.");
		if(endRect.Contains(handPos)){
			if(seconds == 3){
				seconds = 0;
				timer = 0;
				backToSelect();
			} 
			else increaseTimer();
		}
		else{
			seconds = 0;
			timer = 0;
		}
		//Debug.Log(seconds);
	}
}

private function increaseTimer()
{
	timer += Time.deltaTime;
	
	seconds = Mathf.RoundToInt(timer%60);
}

public function setScore(value:int):void
{
	score = score + value;
}

public function setSelected(value:int):void
{
	amountSelected = amountSelected + value;
}

public function getScore():int
{
	return score;
}

public function getSelected():int
{
	return amountSelected;
}

function OnGUI()
{
//	if(setButton)
//	{
//		GUI.Button (endTextRect, endString);
//		if(GUI.Button(endRect , "Klik hier om door te gaan naar een andere baan"))
//		{
//			backToSelect();
//		}
//	}
	
	if(setButton)
	{
		//GUI.Button (endTextRect, endString, guiStyle);
		GUI.DrawTexture(endTextRect, endJobCertificate);
		GUI.DrawTexture(endRect, endJobButtonTexture, ScaleMode.StretchToFill);	//ending job button
		if(GUI.Button(endRect , "", guiStyle))
		{
			backToSelect();
		}
	}
}

//function searchTexture(name:String):Texture2D
//{
//	var filePath:String = Application.dataPath + "/ButtonTextures/JobScene";
//	var fileInfo = Directory.GetFiles(filePath, name+".png" , SearchOption.AllDirectories);
//	
//	for(file in fileInfo)
//	{
//		//new WWW download
//		var wwwPNG = new WWW("file://"+file);
//		
//	}
//	
//	return wwwPNG.texture;
//}

private function backToSelect()
{
	GameObject.Find("indestructable").GetComponent(globalScript).setJobSceneBool(false);
	Application.LoadLevel("CityScene");
}