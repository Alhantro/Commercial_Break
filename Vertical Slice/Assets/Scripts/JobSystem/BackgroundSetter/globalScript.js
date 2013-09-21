#pragma strict

private var jobString:String = "";

function Awake()
{
	DontDestroyOnLoad(this.gameObject);
}

public function setJob(job:String):void
{
	jobString = job;
}

public function getJobName():String
{
	return jobString;
}