#pragma strict

public var proceedBoolean:boolean;

function OnMouseUp()
{
	if(proceedBoolean) Debug.Log("correct!");
	else Debug.Log("wrong one");
}