#pragma strict

private var job:Jobs;

function Awake()
{
	if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Fireman")
	{
		job = new Fireman();
	}
	
	job.setTexture();
	job.readXML();
}