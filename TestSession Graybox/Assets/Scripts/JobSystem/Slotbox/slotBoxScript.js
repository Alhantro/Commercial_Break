#pragma strict

private var correct:boolean = false;
private var selected:boolean = false;
private var selectNumber:int;

public function Update():void
{
	if(selected)
	{
		isSelected(selectNumber);
	}
}

public function setCorrect():void
{
	correct = true;
}

public function setFalse():void
{
	correct = false;
}

public function setTexture(texture:Texture2D):void
{
	//Debug.Log("texture setter");
	this.renderer.material.mainTexture = texture;
}

public function getTexture():Texture2D
{
	return this.renderer.material.mainTexture as Texture2D;
}

public function OnMouseUp():void
{
	var jobScore = GameObject.Find("ScriptHolder").GetComponent(JobScore);
	
	if(jobScore.getSelected() != GameObject.Find("indestructable").GetComponent(globalScript).getAmountCorrect())
	{
		if(selected == false)
		{
			if(correct)
			{
				jobScore.setScore(1);			//Correct! Score + 1
				jobScore.setSelected(1);
				selected = true;
				//jobScore.addRightChoice(this.getTexture());
				Debug.Log(getTexture());
			}
			else
			{
				jobScore.setScore(0);			//False! Score +_0
				jobScore.setSelected(1);
				selected = true;
				//jobScore.addWrongChoice(this.getTexture());
			}
			
			selectNumber = jobScore.getSelected();
		}
	}
	Debug.Log("Score : " + jobScore.getScore());
	Debug.Log("Selected : " + jobScore.getSelected());
	
	if(jobScore.getSelected() == GameObject.Find("indestructable").GetComponent(globalScript).getAmountCorrect())
	{
		jobScore.endJob();
	}
}

private function isSelected(amount:int):void
{
	var newPosition : Vector3;
	
	//Debug.Log(transform.position);
   	if(amount == 1){
   		newPosition = new Vector3(-1.0, 0.0, 1.0);
   	}
   	if(amount == 2){
   		newPosition = new Vector3(1.0, 0.0, 1.0);
   	}
   	if(amount == 3){
   		newPosition = new Vector3(0.0, 0.0, 1.0);
   	}
   	
    
    transform.position = Vector3.Lerp(transform.position, newPosition, Time.deltaTime);
	
}