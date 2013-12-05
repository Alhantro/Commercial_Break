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
private var starTexture:Texture2D;
private var starOpenTexture:Texture2D;
private var guiStyle:GUIStyle = new GUIStyle();

function Awake()
{
	guiStyle.fontSize = 24;
	endJobButtonTexture = GameObject.Find("indestructable").GetComponent(TextureLoader).getTexture("JobBackbutton");
	endJobCertificate = GameObject.Find("indestructable").GetComponent(TextureLoader).getTexture("Certificate");
	starTexture = GameObject.Find("indestructable").GetComponent(TextureLoader).getTexture("StarClosed");
	starOpenTexture = GameObject.Find("indestructable").GetComponent(TextureLoader).getTexture("StarOpen");
}

public function endJob():void
{
	//Function for Certificate & Score
	//For Score we can also use a multiplication by time or other things to calculate a score.
	if(score == 0)
	{
		endString = "Helaas,\nmet de gekozen items kun je de baan niet uitvoeren.\nProbeer het nog een keer.";
	}
	else if(score == 1)
	{
		endString = "We kunnen op z'n minst één voorwerp gebruiken.\ngeef niet op je komt er wel!\nJe verdient 1 ster!";
	}
	else if(score == 2)
	{
		endString = "Netjes, maar we missen nog één voorwerp.\nJe verdient 2 sterren!";
	}
	else if(score == 3)
	{
		endString = "Deze Baan is succesvol door jou uitgevoerd!\nUitstekend gedaan!\nJe verdient 3 sterren!";
	}
	//write the score to XML
	GameObject.Find("indestructable").GetComponent(globalScript).writeScoreToXML();
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
		GUI.DrawTexture(endTextRect, endJobCertificate);						//certificate texture
		GUI.DrawTexture(endRect, endJobButtonTexture, ScaleMode.StretchToFill);	//ending job button
		GUI.Label(Rect(endTextRect.x + 20, endTextRect.y + 20, endTextRect.width - 20, endTextRect.height - 20), endString, guiStyle);
		
		for(var i:int=0; i<score; i++)
		{
			GUI.DrawTexture(Rect((endTextRect.x + 50 + (175 * i)), (endTextRect.y + endTextRect.height / 2 - 75), endTextRect.width / 4, 150), starTexture);
		}
		for(var j:int=i; j<3; j++)
		{
			GUI.DrawTexture(Rect((endTextRect.x + 50 + (175 * j)), (endTextRect.y + endTextRect.height / 2 - 75), endTextRect.width / 4, 150), starOpenTexture);
		}
		
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

private function backToSelect():void
{
	GameObject.Find("indestructable").GetComponent(globalScript).setJobSceneBool(false);
	Application.LoadLevel("CityScene");
}