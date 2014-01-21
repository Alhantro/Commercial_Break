#pragma strict

public var rightHand : GameObject;
public var mouseHand : Texture;
private var position : Vector3;

private var midScreen : Vector3 = Vector3(Screen.width/2,Screen.height/2,0);

private var handPosition : Vector3;
private var finalPos : Vector3;
private var finalHandPos : Vector3;

private var jobScene:boolean = false;

private var timer:float;
private var seconds:float;

private var lastHit : String;

private var handSelector:Array = [];

function Start ()
{
}

function Update ()
{
	//Debug.Log(calculateHand());
	
	jobScene = GameObject.Find("indestructable").GetComponent(globalScript).getJobSceneBool();
	
	//Debug.Log(jobScene);
	
	position = Camera.main.WorldToScreenPoint(rightHand.transform.position);
	
	//Debug.Log(position);
	handPosition = scalePosition(midScreen, position);
	
	finalPos.x = handPosition.x;
	finalPos.y = (Screen.height - handPosition.y);
	finalPos.z = handPosition.z;
	
	//print(Input.mousePosition.y + "   -   " + (Screen.height - Input.mousePosition.y));
	if(handSelector.length < 15)
	{
		handSelector.Add(finalPos);
		//Debug.Log(handSelector.length);
	}
	else
	{
		addToArray(finalPos);
	}
	
	
	finalHandPos = calculateHand();	//With Kinect
	//finalHandPos = Vector3((Input.mousePosition.x), (Screen.height - Input.mousePosition.y), 0.0f);	//With mouse
	
	GameObject.Find("indestructable").GetComponent(globalScript).setHand(finalHandPos);			//Activate this one for kinect controls
	//Debug.Log(GameObject.Find("indestructable").GetComponent(globalScript).getHand());
	
	//GameObject.Find("indestructable").GetComponent(globalScript).setHand(finalHandPos);		//Activate this one for mouse controls
	
	
	var ray:Ray = Camera.main.ScreenPointToRay(Vector3(finalHandPos.x, (Screen.height - finalHandPos.y), finalHandPos.z));
	//print(ray);
	
	var hit : RaycastHit;
	
	if(jobScene == true)
	{
		if(Physics.Raycast(ray, hit, 20.0)){
			//Debug.Log(hit.collider.name);
			//Debug.Log("lastHit " + lastHit);
			
			if(lastHit != hit.collider.name){
				lastHit = hit.collider.name;
				seconds = 0;
				timer = 0;
			}
			
			//if it hits an slotbox.. start timer
			if(lastHit == hit.collider.name)
			{
				if(seconds == 3){
					seconds = 0;
					timer = 0;
					GameObject.Find(hit.collider.name).GetComponent(slotBoxScript).OnMouseUp();	// Mouse up event here
				} 
				else increaseTimer();
			}
		}
		
		Debug.DrawLine (ray.origin, hit.point, Color.green);
	}	
}

private function increaseTimer()
{
	timer += Time.deltaTime;
	
	seconds = Mathf.RoundToInt(timer%60);
	
	//Debug.Log(seconds);
}

function OnGUI()
{
	GUI.depth = 0;
	GUI.DrawTexture(Rect((finalHandPos.x - 32.0), (finalHandPos.y - 32.0), 64, 64), mouseHand, ScaleMode.ScaleToFit, true);		//Activate this one for kinect controls
	//GUI.DrawTexture(Rect((Input.mousePosition.x - 32.0), (Screen.height - Input.mousePosition.y - 32.0), 64, 64), mouseHand, ScaleMode.ScaleToFit, true);		//Activate this one for mouse controls
}

function scalePosition(midScreenPos:Vector3, position:Vector3):Vector3
{
	var difference = position - midScreenPos;
	var newPos = midScreenPos + (difference * 2);
	
	if(newPos.x < 0) newPos.x = 0;
	if(newPos.x > Screen.width) newPos.x = Screen.width;
	if(newPos.y < 0) newPos.y = 0;
	if(newPos.y > Screen.height) newPos.y = Screen.height;
	
	
	return newPos;
}

function addToArray(newPosition:Vector3):void
{
	for (var i=0;i<handSelector.length;i++)
	{
		if(i<14)						// Array of last 10 positions moving 1 forward.
		{
			handSelector[i] = handSelector[i+1];
			//Position 1 becomes 2, 2 becomes 3.. etc.
		}
		if(i==14)						// Add latest position
		{
			/*var tempPos:Vector3 = handSelector[i];
			
			if((newPosition.x - tempPos.x) < 200 && (newPosition.x - tempPos.x) > -150){
				tempPos.x = newPosition.x;
			}
			if((newPosition.y - tempPos.y) < 200 && (newPosition.y - tempPos.y) > -150){
				tempPos.y = newPosition.y;
			}
			
			tempPos.z = newPosition.z;
			
			handSelector[i] = tempPos;*/
			
			handSelector[i] = newPosition;
			
			//Debug.Log(tempPos);
			//Positon 10 becomes latest position captured.
		}
	}
}

function calculateHand():Vector3
{
	var calculatedHandPosition:Vector3;
	
	for (var j=0;j<handSelector.length;j++)
	{
		var tempVec3:Vector3 = handSelector[j];
		calculatedHandPosition += tempVec3;
	}
	
	calculatedHandPosition.x = (calculatedHandPosition.x / handSelector.length);
	calculatedHandPosition.y = (calculatedHandPosition.y / handSelector.length);
	calculatedHandPosition.z = (calculatedHandPosition.z / handSelector.length);
	

	return calculatedHandPosition;
}