export class AudioService {
  sounds: {[key: string]: any};

  /*@ngInject*/
  constructor (private ngAudio) {
    this.sounds = {
      'buzzer': this.loadSound('dist/sounds/buzzer.mp3'),
      'first': this.loadSound('dist/sounds/first.mp3'),
      '1': this.loadSound('dist/sounds/1.mp3'),
      '2': this.loadSound('dist/sounds/2.mp3'),
      '3': this.loadSound('dist/sounds/3.mp3'),
      '4': this.loadSound('dist/sounds/4.mp3'),
      '5': this.loadSound('dist/sounds/5.mp3')
    };
  }

  loadSound (path: string): void {
    return this.ngAudio.load(path);
  }

  /**
   * Play a sound.
   *
   * @param  {String} sound The sound string id.
   */
  playSound (sound: string): void {
    let audio = this.sounds[sound];

    if (angular.isUndefined(audio)) {
      return;
    }

    audio.play();
  }

  /**
   * Stop a sound.
   *
   * @param  {String} sound The sound string id.
   */
  stopSound (sound: string): void {
    let audio = this.sounds[sound];

    if (angular.isUndefined(audio)) {
      return;
    }

    audio.stop();
  }

  toggleSound (sound: string): void {
    let audio = this.sounds[sound];

    if (angular.isUndefined(audio)) {
      return;
    }

    audio.muting = !audio.muting;
  }

  isSoundMuted (sound: string): boolean {
    let audio = this.sounds[sound];

    if (angular.isUndefined(audio)) {
      return;
    }

    return audio.muting;
  }
}
