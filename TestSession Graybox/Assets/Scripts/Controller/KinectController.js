#pragma strict

public var rightHand : GameObject;
public var mouseHand : Texture;
private var position : Vector3;

private var midScreen : Vector3 = Vector3(Screen.width/2,Screen.height/2,0);

private var handPosition : Vector3;
private var finalPos : Vector3;
private var finalHandPos : Vector3;

private var jobScene:boolean = false;

function Start ()
{
}

function Update ()
{
	jobScene = GameObject.Find("indestructable").GetComponent(globalScript).getJobSceneBool();
	
	//Debug.Log(jobScene);
	
	position = Camera.main.WorldToScreenPoint(rightHand.transform.position);
	
	//Debug.Log(position);
	handPosition = scalePosition(midScreen, position);
	
	finalPos.x = (handPosition.x - 32.0);
	finalPos.y = (Screen.height - handPosition.y - 32.0);
	finalPos.z = handPosition.z;
	
	//print(Input.mousePosition.y + "   -   " + (Screen.height - Input.mousePosition.y));
	
	//finalHandPos = finalPos;	//With Kinect
	finalHandPos = Vector3((Input.mousePosition.x), (Screen.height - Input.mousePosition.y), 0.0f);	//With mouse
	
	//GameObject.Find("indestructable").GetComponent(globalScript).setHand(finalHandPos);			//Activate this one for kinect controls
	//Debug.Log(GameObject.Find("indestructable").GetComponent(globalScript).getHand());
	
	GameObject.Find("indestructable").GetComponent(globalScript).setHand(finalHandPos);		//Activate this one for mouse controls
	
	
	var ray:Ray = Camera.main.ScreenPointToRay(Vector3(finalHandPos.x, (Screen.height - finalHandPos.y), finalHandPos.z));
	//print(ray);
	
	var hit : RaycastHit;
	
	if(jobScene == true)
	{
		if(Physics.Raycast(ray, hit, 20.0)){
			Debug.Log(hit.collider.name);
		}
		
		Debug.DrawLine (ray.origin, hit.point, Color.green);
		
	}	
}

function OnGUI()
{
	//GUI.DrawTexture(Rect(finalPos.x, finalPos.y, 64, 64), mouseHand, ScaleMode.ScaleToFit, true);		//Activate this one for kinect controls
	GUI.DrawTexture(Rect((Input.mousePosition.x - 32.0), (Screen.height - Input.mousePosition.y - 32.0), 64, 64), mouseHand, ScaleMode.ScaleToFit, true);		//Activate this one for mouse controls
}

function scalePosition(midScreenPos:Vector3, position:Vector3):Vector3
{
	var difference = position - midScreenPos;
	var newPos = midScreenPos + (difference *2);
	
	if(newPos.x < 0) newPos.x = 0;
	if(newPos.x > Screen.width) newPos.x = Screen.width;
	if(newPos.y < 0) newPos.y = 0;
	if(newPos.y > Screen.height) newPos.y = Screen.height;
	
	
	return newPos;
}