#pragma strict

import System.IO;

//public variables

//private variables
private var textureArray:Array = new Array();
private var textureNameArray:Array = new Array();
private var doneLoadingTextures:boolean = false;

static var LoadingScreenLoaded:boolean = false;

//loads button textures for the menu
public function buildTextureArrays():IEnumerator
{
	var filePath:String = Application.dataPath + "/ButtonTextures";
	var fileInfo = Directory.GetFiles(filePath, "*.png", SearchOption.AllDirectories);
	
	gameObject.GetComponent(globalScript).setAmountTexturesLoading(fileInfo.Length);
	Debug.Log("filling");
	
	for(file in fileInfo)
	{
		if(pngExistsInArray(file) == false)
		{
			var wwwPNG = new WWW("file://"+file);
			gameObject.GetComponent(globalScript).increaseCounter();
			yield wwwPNG;
			textureArray.push(wwwPNG.texture);
			textureNameArray.push(Path.GetFileNameWithoutExtension(file));
		}
		else
		{
			Debug.Log("already exists: " + Path.GetFileNameWithoutExtension(file));
		}
	}
	//textures are filled so ready to fill the buttons
	//GameObject.Find("ScriptHolder").GetComponent(MenuScript).fillButtonTextureArray();
	doneLoadingTextures = true;
}

public function doneLoadingTex():boolean
{
	return doneLoadingTextures;
}

private function pngExistsInArray(file:String):boolean
{
	for(var i:int = 0; i<textureNameArray.length; ++i)
	{
		var check:String = textureNameArray[i] as String;
		if(check == Path.GetFileNameWithoutExtension(file))
		{
			gameObject.GetComponent(globalScript).deductFromLoading();
			return true;
		}
	}
	
	return false;
}

public function getLoadingScreen():Texture2D
{
	if(LoadingScreenLoaded == false)
	{
		LoadingScreenLoaded = true;
		loadTexture("LoadingScreen");
	}
	return getTexture("LoadingScreen");
}

private function loadTexture(textureName:String):IEnumerator
{
	var filePath:String = Application.dataPath + "/MenuBackground";
	var fileInfo = Directory.GetFiles(filePath, textureName + ".png", SearchOption.AllDirectories);
	
	for(file in fileInfo)
	{
		if(pngExistsInArray(file))
		{
		
		}
		else
		{
			var wwwPNG = new WWW("file://"+file);
			
			textureArray.push(wwwPNG.texture);
			textureNameArray.push(Path.GetFileNameWithoutExtension(file));
		}
	}
	
	
}

public function loadTexture(filePath:String, loadOnRuntime:boolean):Texture2D
{
	var path:String = Application.dataPath + filePath;
	
	if(pngExistsInArray(path))
	{
		return getTexture(Path.GetFileNameWithoutExtension(path));
	}
	else
	{
		if(File.Exists(path))
		{
			var wwwPNG = new WWW("file://"+path);
			
			textureArray.push(wwwPNG.texture);
			textureNameArray.push(Path.GetFileNameWithoutExtension(path));
			
			return wwwPNG.texture;
		}
		else
		{
			Debug.Log("The file you wanted to load does not exist!" + Path.GetFileNameWithoutExtension(path));
		}
	}
	
	return null;
}

public function getTexture(textureName:String):Texture2D
{
	var texture:Texture2D = null;
	
	for(var i:int = 0; i<textureNameArray.length; ++i)
	{
		if(textureNameArray[i] == textureName)
		{
			texture = textureArray[i] as Texture2D;
			return texture;
		}
	}
	
	Debug.LogError("texture not found / not set: " + textureName);
	gameObject.GetComponent(globalScript).addToDebug("texture not found / not set");
	
	return texture;
}

public function getTextureName(tex:Texture2D):String
{
	for(var i:int = 0; i<textureArray.length; i++)
	{
		var comparingTexture:Texture2D = textureArray[i] as Texture2D;
		
		if(comparingTexture == tex)
		{
			return textureNameArray[i] as String;
		}
	}
	return "";
}