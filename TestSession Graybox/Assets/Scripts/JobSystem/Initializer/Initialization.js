#pragma strict

import System.IO;

private var job:Jobs = null;

//list of assets
private var assetsArray:Array = new Array();
private var assetNameArray:Array = new Array();

//list of false assets
var falseAssetArray:Array = new Array();
//names of false assets
var falseAssetNameArray:Array = new Array();

function Awake()
{

	GameObject.Find("indestructable").GetComponent(globalScript).setJobSceneBool(true);			//Set false in jobscore after completing job
//	if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Fireman")			//Fireman
//	{
//		job = new Fireman();
//	}
//	if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Policeman")		//Policeman
//	{
//		job = new Policeman();
//	}
//	if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Nurse")			//Nurse
//	{
//		job = new Nurse();
//	}
//	if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Army")				//Army
//	{
//		job = new Army();
//	}
//	if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Cleaner")			//Cleaner
//	{
//		job = new Cleaner();
//	}
//	if(GameObject.Find("indestructable").GetComponent(globalScript).getJobName() == "Secretary")		//Secretary
//	{
//		job = new Secretary();
//	}
//	
//	//load the assets
//	if(job != null)
//	{
//		loadAssets();
//	}
//	else
//	{
//		GameObject.Find("indestructable").GetComponent(globalScript).addToDebug("Job is not initialized for some reason, might be wrong jobname!");
//		Debug.LogError("Job is not initialized for some reason, might be wrong jobname!");
//	}

	job = new Jobs();
	loadAssets();
}

private function loadAssets()
{
	//var filePath:String = "";
	var filePath:String = Application.dataPath + "/JobTextures";
	GameObject.Find("indestructable").GetComponent(globalScript).addToDebug(filePath);
	var fileInfo = Directory.GetFiles(filePath, "*.*" , SearchOption.AllDirectories);
	
	for(file in fileInfo)
	{
		//new WWW download
		var wwwPNG = new WWW("file://"+file);
		//wait for it to download
		yield wwwPNG;
		//push it into the array
		assetsArray.push(wwwPNG.texture);
		assetNameArray.push(getFileName(file));
		//Debug.Log("File: " + file);
		//Debug.Log("getting back as name: " + getFileName(file));
	}
	//load the rest of the assets
	buildFalseArray();
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

private function buildFalseArray():void
{
	for(var i=0; i<assetNameArray.length; i++)
	{
		var name:String = assetNameArray[i] as String;
		if(name.Contains(GameObject.Find("indestructable").GetComponent(globalScript).getJobName()) == false)
		{
			//copy the asset from the array to the false list
			falseAssetArray.push(assetsArray[i]);
			//copy the name of the asset from the array to the false list
			falseAssetNameArray.push(assetNameArray[i]);
		}
	}
}

public function removeFromFalseArray(value:int):void
{
	falseAssetArray.RemoveAt(value);
	falseAssetNameArray.RemoveAt(value);
}

public function getAssetArray():Array
{
	return assetsArray;
}

public function getAssetNameArray():Array
{
	return assetNameArray;
}

public function getFalseAssetArray():Array
{
	return falseAssetArray;
}

public function getFalseAssetNameArray():Array
{
	return falseAssetNameArray;
}