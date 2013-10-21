#pragma strict
import UnityEditor.Callbacks;

	static var m_scriptMap:String = "Scripts";
	static var m_cityMap:String = "City";
@PostProcessBuild
static function OnPostprocessBuild( target : BuildTarget, pathToBuiltProject : String ) {
	//Debug.Log("-->"+ pathToBuiltProject.Replace(".exe", "_Data" ) + "\\" + filename);
	//Debug.Log(Application.dataPath + "\\" + filename);
	FileUtil.CopyFileOrDirectory(Application.dataPath + "\\" + m_scriptMap,  pathToBuiltProject.Replace(".exe", "_Data" ) + "\\" + m_scriptMap);
	FileUtil.CopyFileOrDirectory(Application.dataPath + "\\" + m_cityMap,  pathToBuiltProject.Replace(".exe", "_Data" ) + "\\" + m_cityMap);
}