#pragma strict

public var texture:Texture2D;

public function setTexture(tex:Texture2D)
{
	texture = tex;
	if(texture != null)
	{
		//GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), texture, ScaleMode.StretchToFill, true, 1.0f);
		guiTexture.texture = texture;
		guiTexture.pixelInset.x = -(Screen.width / 2);
		guiTexture.pixelInset.y = -(Screen.height / 2);
		guiTexture.pixelInset.width = Screen.width;
		guiTexture.pixelInset.height = Screen.height;
	}
}