import * as angular from 'angular';
import * as _ from 'lodash';

export class AudioService {
  sounds: {[key: string]: any} = {};

  /*@ngInject*/
  constructor (private ngAudio, sounds) {
    this.sounds = this.setupSounds(sounds);
  }

  setupSounds (sounds) {
    const setupSounds = {};
    _.map(sounds, (soundAudioFiePath: string, soundType: string) => {
      setupSounds[soundType] = this.loadSound(soundAudioFiePath);
    });
    return setupSounds;
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

  registerSound (type: string, path: string) {
    this.sounds[type] = this.loadSound(path);
  }
}
