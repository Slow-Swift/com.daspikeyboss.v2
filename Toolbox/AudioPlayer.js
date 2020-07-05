class AudioPlayer {

  static playingAudios = [];

  static listenerLocation = Vector2.Zero;

  static playAudio(audio, location, zeroDst, maxVolume, listenerLocation) {
    listenerLocation = listenerLocation || AudioPlayer.listenerLocation;
    let dst = location.clone.Subtract(listenerLocation).magnitude;
    let volume = Mathf.Interpolate(maxVolume, 0, dst / zeroDst);
    audio.volume = volume;
    audio.play();
  }

  static playAdaptiveAudio(audio, location, zeroDst, maxVolume, iterations = 1) {
    let a = {audio: audio, location: location, zeroDst: zeroDst, maxVolume: maxVolume, startTime: Time.time};
    if(iterations > 1)
      audio.loop = true;
    this.playingAudios.push(a);
    audio.play();
    return a;
  }

  static UpdateAudios() {
    for (var a of AudioPlayer.playingAudios) {
      let dst = a.location.clone.Subtract(AudioPlayer.listenerLocation).magnitude;
      let volume = Mathf.Interpolate(a.maxVolume, 0, dst / a.zeroDst);
      a.audio.volume = volume;

      if(Time.time - a.startTime >= a.audio.duration * a.iterations) {
        a.audio.pause();
        ArrayTools.RemoveItem(AudioPlayer.playingAudios, AudioPlayer.playingAudios.indexOf(a));
      }
    }
  }

  static Setup() {
    this._bndUpdate = this.UpdateAudios.bind(this);
    Loop.Subscribe(this._bndUpdate, true);
  }

  static Cleanup() {
    Loop.Unsubscribe(this._bndUpdate, true);
  }
}
