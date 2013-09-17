#pragma strict

public var proceedBoolean:boolean;

function OnMouseUp()
{
	if(proceedBoolean) Debug.Log("correct! yes!");
	else Debug.Log("wrong one");
}