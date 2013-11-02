#pragma strict
import UnityEditor.Callbacks;

	static var m_scriptMap:String = "Scripts";
	static var m_cityMap:String = "City";
	static var m_textureMap:String = "JobTextures";
	static var m_textureBackgroundMap:String = "JobBackgrounds";
	static var m_ButtonTextures:String = "ButtonTextures";
	static var m_MenuBackground:String = "MenuBackground";
@PostProcessBuild
static function OnPostprocessBuild( target : BuildTarget, pathToBuiltProject : String ) {
	//Debug.Log("-->"+ pathToBuiltProject.Replace(".exe", "_Data" ) + "\\" + filename);
	//Debug.Log(Application.dataPath + "\\" + filename);
	FileUtil.CopyFileOrDirectory(Application.dataPath + "\\" + m_scriptMap,  pathToBuiltProject.Replace(".exe", "_Data" ) + "\\" + m_scriptMap);
	FileUtil.CopyFileOrDirectory(Application.dataPath + "\\" + m_cityMap,  pathToBuiltProject.Replace(".exe", "_Data" ) + "\\" + m_cityMap);
	FileUtil.CopyFileOrDirectory(Application.dataPath + "\\" + m_textureMap,  pathToBuiltProject.Replace(".exe", "_Data" ) + "\\" + m_textureMap);
	FileUtil.CopyFileOrDirectory(Application.dataPath + "\\" + m_textureBackgroundMap,  pathToBuiltProject.Replace(".exe", "_Data" ) + "\\" + m_textureBackgroundMap);
	FileUtil.CopyFileOrDirectory(Application.dataPath + "\\" + m_ButtonTextures,  pathToBuiltProject.Replace(".exe", "_Data" ) + "\\" + m_ButtonTextures);
	FileUtil.CopyFileOrDirectory(Application.dataPath + "\\" + m_MenuBackground,  pathToBuiltProject.Replace(".exe", "_Data" ) + "\\" + m_MenuBackground);
}