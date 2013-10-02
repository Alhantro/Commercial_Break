#pragma strict

private var job:Jobs;

function Awake()
{
	if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Fireman")			//Fireman
	{
		job = new Fireman();
	}
	/*if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Policeman")		//Policeman
	{
		job = new Policeman();
	}
	if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Nurse")			//Nurse
	{
		job = new Nurse();
	}
	if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Army")				//Army
	{
		job = new Army();
	}
	if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Cleaner")			//Cleaner
	{
		job = new Cleaner();
	}
	if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Secretary")		//Secretary
	{
		job = new Secretary();
	}*/
	
	
	job.setTexture();
	job.readXML();
}