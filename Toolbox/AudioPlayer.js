/**
 * @class AudioPlayer
 * 
 * @author daspikeyboss
 * 
 * @classdesc Plays audio in a 2D environment.
 */
class AudioPlayer {

  static playingAudios = [];

  static listenerLocation = Vector2.Zero;

  /**
   * Plays the given audio clip with volume damping based on distance.
   * 
   * @param {Audio} audio The audio clip that needs to be played.
   * @param {Vector2} location The location that the audio emits from.
   * @param {number} zeroDst The distance at which the volume of the audio has dropped to zero.
   * @param {number} maxVolume The volume of the audio at a distance of zero.
   * @param {Vector2} listenerLocation (Optional) The location of the audio listener.
   */
  static playAudio(audio, location, zeroDst, maxVolume, listenerLocation) {
    listenerLocation = listenerLocation || AudioPlayer.listenerLocation;
    let dst = location.clone.Subtract(listenerLocation).magnitude;
    let volume = Mathf.Interpolate(maxVolume, 0, dst / zeroDst);
    audio.volume = volume;
    audio.play();
  }

  /**
   * Plays an audioclip that has properites that may change over time.
   * 
   * @param {Audio} audio The audio clip that needs to be played
   * @param {Vector2} location The original location that the audio emits from.
   * @param {number} zeroDst The original distance at which the volume of the audio reaches zero.
   * @param {number} maxVolume The original volume of the audio at a distance of zero.
   * @param {number} iterations The number of times the audio will loop.
   * 
   * @returns {Object} An object that can be used to change properties of the playing audio.
   */
  static playAdaptiveAudio(audio, location, zeroDst, maxVolume, iterations = 1) {
    let a = {audio: audio, location: location, zeroDst: zeroDst, maxVolume: maxVolume, startTime: Time.time};
    if(iterations > 1)
      audio.loop = true;
    this.playingAudios.push(a);
    audio.play();
    return a;
  }

  /**
   * Update the audios that are playing.
   */
  static _UpdateAudios() {
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

  /**
   * Subcribe _UpdateAudios to the main game loop.
   */
  static Setup() {
    this._bndUpdate = this._UpdateAudios.bind(this);
    Loop.Subscribe(this._bndUpdate, true);
  }

  /**
   * Unsubscribe _UpdateAudios from the main game loop.
   */
  static Cleanup() {
    Loop.Unsubscribe(this._bndUpdate, true);
  }
}
