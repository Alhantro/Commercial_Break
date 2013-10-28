#pragma strict

public var score : int;
public var amountSelected : int;

private var setButton = false;
private var endString : String;

public function endJob()
{
	//Function for Certificate & Score
	//For Score we can also use a multiplication by time or other things to calculate a score.
	
	endString = ("Deze Baan is succesvol door jou uitgevoerd! Goed gedaan! \n Jouw Score is : " + score);
	setButton = true;
	//Debug.Log("Jouw Score is : " + score);
	//Debug.Log("Deze Baan is succesvol door jou uitgevoerd! Goed gedaan!");
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
	if(setButton)
	{
		GUI.Button (Rect ((Screen.width / 2 - 300), (Screen.height / 2 - 200), 600, 400), endString);
		
		if(GUI.Button(Rect((Screen.width - 200), (Screen.height - 150), 200, 150) , "Op zoek naar ander werk"))
		{
			Application.LoadLevel("CityScene");
		}
	}
}