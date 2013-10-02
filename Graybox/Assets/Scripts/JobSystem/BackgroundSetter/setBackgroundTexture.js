#pragma strict

public var texture:Texture2D;

public function setTexture(tex:Texture2D)
{
	texture = tex;
	if(texture != null)
	{
		//GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), texture, ScaleMode.StretchToFill, true, 1.0f);
		guiTexture.texture = texture;
	}
}