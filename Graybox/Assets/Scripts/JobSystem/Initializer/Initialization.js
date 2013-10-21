#pragma strict

import System.IO;

private var job:Jobs;

//fireman
private var assetsArray:Array = new Array();
private var assetName:Array = new Array();


function Awake()
{
	
	if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Fireman")			//Fireman
	{
		job = new Fireman();
	}
	/*if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Policeman")		//Policeman
	{
		job = new Policeman();
	}
	if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Nurse")			//Nurse
	{
		job = new Nurse();
	}
	if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Army")				//Army
	{
		job = new Army();
	}
	if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Cleaner")			//Cleaner
	{
		job = new Cleaner();
	}
	if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Secretary")		//Secretary
	{
		job = new Secretary();
	}*/
	
	//load the assets
	loadAssets();
}

private function loadAssets()
{
	//var filePath:String = "";
	var filePath:String = Application.dataPath + "/JobTextures";
	var fileInfo = Directory.GetFiles(filePath, "*.*" , SearchOption.AllDirectories);
	
	for(file in fileInfo)
	{
		//new WWW download
		var wwwPNG = new WWW("file://"+file);
		//wait for it to download
		yield wwwPNG;
		//push it into the array
		assetsArray.push(wwwPNG.texture);
		assetName.push(getFileName(file));
		//Debug.Log("File: " + file);
		//Debug.Log("getting back as name: " + getFileName(file));
	}
	//load the rest of the assets
	job.setTexture();
	job.createSlots();
	job.fillSlots();
}

private function getFileName(file:String):String
{
	var result:String;
	
	var a_Split:Array = file.Split( "/"[0] );		// First split at each "/"
	var t_string:String;							// Second Array, containing JobTexures folder + subfolders

	var f_Split:Array;		// Second Split at each "\"    _<-- Had to use "&" in this example (or another symbol)

	//Debug.Log( file );
	//Debug.Log( file.Length );
	//Debug.Log( a_Split.length );
	
	t_string = a_Split[a_Split.length - 1] as String;		//setting first splitted string cut off at texture folder
		//Debug.Log( t_string );
	
	f_Split = t_string.Split( "\\"[0] );			//getting the second array with all texture folders and texures
		//Debug.Log( f_Split.length );
	
	result = f_Split[f_Split.length - 1] as String; 	//Getting the final string with the png name

	return result;
}

public function getAssetArray():Array
{
	return assetsArray;
}

public function getAssetNameArray():Array
{
	return assetName;
}