#pragma strict

private var correctChoice:boolean = false;	//is it the correct choice
private var choiceTexture:Texture;		//the texture of the choice box


function setPosition(xPos:float, yPos:float, zPos:float)
{
	this.gameObject.transform.position.x = xPos;
	this.gameObject.transform.position.y = yPos;
	this.gameObject.transform.position.z = zPos;
}

function setChoice(value:boolean):void
{
	correctChoice = value;					//sets the boolean if it is the correct choice box or not
}

function setTexture(texture:Texture):void
{
	choiceTexture = texture;				//sets the texture
	initializeTexture();					//initializes the texture
}

function initializeTexture():void
{
	if(choiceTexture != null)											//if the texture is not null
	{
		this.gameObject.renderer.material.mainTexture = choiceTexture;	//applies the texture
	}
	else Debug.LogError("This object has no texture assigned");			//if there is no texture give error
}