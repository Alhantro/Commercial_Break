#pragma strict

private var job:Jobs;

function Awake()
{
	job = new Fireman();
	job.setTexture();
	job.readXML();
}