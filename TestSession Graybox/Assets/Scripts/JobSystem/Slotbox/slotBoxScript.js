#pragma strict

private var correct:boolean = false;
private var selected:boolean = false;

public function Update(){
	if(selected)
	{
		isSelected();
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

public function OnMouseUp()
{
	var jobScore = GameObject.Find("ScriptHolder").GetComponent(JobScore);
	
	if(selected == false)
	{
		if(correct)
		{
			jobScore.setScore(1);			//Correct! Score + 1
			jobScore.setSelected(1);
			selected = true;
		}
		else
		{
			jobScore.setScore(0);			//False! Score +_0
			jobScore.setSelected(1);
			selected = true;
		}
	}
	Debug.Log("Score : " + jobScore.getScore());
	Debug.Log("Selected : " + jobScore.getSelected());
	
	if(jobScore.getSelected() == GameObject.Find("indestructable").GetComponent(globalScript).getAmountCorrect())
	{
		jobScore.endJob();
	}
}

private function isSelected():void
{
	//Debug.Log(transform.position);
   	var newPosition : Vector3 = new Vector3(0.0, 0.0, 1.0);
    
    transform.position = Vector3.Lerp(transform.position, newPosition, Time.deltaTime);
	
}