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
		Debug.Log(assetName[0]);
	}
	//load the rest of the assets
	job.setTexture();
	job.createSlots();
	job.fillSlots();
}

private function getFileName(file:String):String
{
	var result:String = file;
	
	return result;
}

public function getAssetArray():Array
{
	return assetsArray;
}