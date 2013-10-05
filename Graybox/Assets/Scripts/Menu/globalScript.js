#pragma strict

private var jobString:String = "Fireman";	//change to "" when other jobs are implemented
private var amount_Correct:int = 3;			//standard correct is 3
private var amount_Boxes:int = 5;			//standard amount of boxes is 5
private var mode:String = "Unity";
//private var mode:String = "Compiled";	//change this when needed

function Awake()
{
	DontDestroyOnLoad(this.gameObject);		//make sure this object is not destroyed on load!
}

//
//	Setters
//
public function setJob(job:String):void
{
	jobString = job;
}

public function setAmountCorrect(value:int)
{
	amount_Correct = value;
}

public function setAmountBoxes(value:int)
{
	amount_Boxes = value;
}

//
//	Getters
//
public function getJobName():String
{
	return jobString;
}

public function getAmountCorrect():int
{
	return amount_Correct;
}

public function getAmountBoxes():int
{
	//check first if its higher than 10, the game is not built for higher than 10
	if(amount_Boxes > 10) setAmountBoxes(10);
	return amount_Boxes;
}

public function getMode():String
{
	return mode;
}