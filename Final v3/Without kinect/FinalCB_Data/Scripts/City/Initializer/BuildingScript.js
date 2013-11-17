#pragma strict

private var jobName:String = "";

function OnMouseUp()
{
	setJobInGlobalScript();
	Application.LoadLevel("JobScene");
}

private function setJobInGlobalScript():void
{
	GameObject.Find("indestructable").GetComponent(globalScript).setJob(jobName);
}

public function setJobName(value:String):void
{
	jobName = value;
}