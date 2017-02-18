import {AudioService} from './audio.service';

describe('audio.service', function () {
  beforeEach(function () {
    this.ngAudio = jasmine.createSpyObj('ngAudio', ['load']);
    this.service = new AudioService(this.ngAudio, {
      foo: 'bar'
    });
    this.service.sounds = {
      foo: {
        play: jasmine.createSpy('play'),
        stop: jasmine.createSpy('stop'),
        muting: false
      }
    };
  });

  describe('setupSounds', function () {
    it('sets sounds object with type and audio file path from sounds config', function () {
      spyOn(this.service, 'loadSound').and.returnValue('sounds/bax');
      const sounds = this.service.setupSounds({
        baz: 'bax'
      });
      expect(this.service.loadSound).toHaveBeenCalledWith('bax');
      expect(sounds.baz).toBe('sounds/bax');
    });
  });

  describe('loadSound', function () {
    it('loads sound using path', function () {
      this.service.loadSound('foo');
      expect(this.ngAudio.load).toHaveBeenCalledWith('bar');
    });
  });

  describe('playSound', function () {
    it('plays the sound', function () {
      this.service.playSound('foo');
      expect(this.service.sounds.foo.play).toHaveBeenCalled();
    });
  });

  describe('stopSound', function () {
    it('stops the sound', function () {
      this.service.stopSound('foo');
      expect(this.service.sounds.foo.stop).toHaveBeenCalled();
    });
  });

  describe('toggleSound', function () {
    it('toggles muting of the sound', function () {
      this.service.toggleSound('foo');
      expect(this.service.sounds.foo.muting).toBe(true);
    });
  });

  describe('isSoundMuted', function () {
    it('returns the muting state of sound', function () {
      let muting = this.service.isSoundMuted('foo');
      expect(muting).toBe(false);
      this.service.toggleSound('foo');
      muting = this.service.isSoundMuted('foo');
      expect(muting).toBe(true);
    });
  });

  describe('registerSound', function () {
    it('registers sound in sounds object and calls loadPath', function () {
      spyOn(this.service, 'loadSound').and.returnValue({
        muting: true
      });
      this.service.registerSound('play', 'play.mp3');
      expect(this.service.loadSound).toHaveBeenCalledWith('play.mp3');
      expect(this.service.sounds.play.muting).toBe(true);
    });
  });
});
