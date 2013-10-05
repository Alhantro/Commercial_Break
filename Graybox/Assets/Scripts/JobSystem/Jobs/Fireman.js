#pragma strict

public class Fireman extends Jobs
{
	override function fillSlots()
	{
		//fill slots with correct things according to the difficulty
		
		//fill the rest of the slots with bad things
	}
	
	override function setTexture()
	{
		var texture:Texture2D = Resources.Load("Fireman", Texture2D);
		GameObject.Find("Background Image").GetComponent(setBackgroundTexture).setTexture(texture);
		//Debug.Log("setting texture");
	}
	
	override function endGame():void
	{
		diploma = true;
	}

}


//	override function spawnChoiceBox(xPos:float, yPos:float, zPos:float, correct:boolean, texture:Texture):void
//	{
//		var choiceBox:GameObject = GameObject.Instantiate(Resources.Load("ChoiceBox", GameObject));
//		choiceBox.GetComponent(Choice).setPosition(xPos, yPos, zPos);
//		choiceBox.GetComponent(Choice).setChoice(correct);
//		choiceBox.GetComponent(Choice).setTexture(texture);
//		choiceBox.name = "ChoiceBox";
//		choiceBox.transform.parent = GameObject.Find("ChoiceContainer").transform;
//	}