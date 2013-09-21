#pragma strict

function OnMouseUp()
{
	setJob();
	Application.LoadLevel("JobScene");
}

function setJob()
{
	var jobName:String = "Fireman";				//still needs some thought
	GameObject.Find("indestructable").GetComponent(globalScript).setJob(jobName);
}