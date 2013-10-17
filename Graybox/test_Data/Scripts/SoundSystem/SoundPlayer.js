#pragma strict

private var loop:boolean = false;

public function playMusic(clip:AudioClip):void
{
	if(audio.isPlaying == false)
	{
		//audio is not playing yet
		loop = true;
		loopMusic(clip);
	}
	else
	{
		//audio is playing so stop that first
		stopMusic();
		playMusic(clip);
	}
}

private function loopMusic(clip:AudioClip):void
{
	while(loop == true)
	{
		if(audio.isPlaying == false)
		{
			Debug.Log("Looping music");
			audio.PlayOneShot(clip);
		}
	}
}

public function playSound(clip:AudioClip):void
{
	audio.PlayOneShot(clip);
}

public function stopMusic():void
{
	loop = false;
	audio.Stop();
}

public function stopSound():void
{
	audio.Stop();
}

public function setVolume(value:float):void
{
	if(value > 1) value = 1;
	if(value < 0) value = 0;
	audio.volume = value;
}