import {Game} from '../../models/game.model';
import {GameService} from '../../services/game.service';
import {AudioService} from '../../services/audio.service';

interface EditGameControllerScope extends angular.IScope {
  editGameForm: angular.IFormController;
}

interface AudioFile extends File {
  path: string;
}

export class EditGameController {
  private game: Game;
  private success: boolean;
  private saving: boolean;
  private deleting: boolean;
  private playAudioFile: AudioFile;

  /*@ngInject*/
  constructor (
    private $scope: EditGameControllerScope,
    private $state: angular.ui.IStateService,
    private GameService: GameService,
    private AudioService: AudioService
  ) {
    this.game = this.GameService.getCurrentGame();
  }

  save (): void {
    if (this.playAudioFile) {
      let path = this.playAudioFile.path;
      this.AudioService.registerSound('play', path);
      this.game.playAudioFilePath = path;
    }

    this.saving = true;
    this.GameService.save()
      .then(() => {
        this.$scope.$apply(() => {
          this.success = true;
          this.saving = false
        });
      });
  }

  savedSuccess (): boolean {
    return !this.saving && this.success;
  }

  isInvalid (field: angular.INgModelController): boolean {
    return (field.$touched && field.$invalid) && this.$scope.editGameForm.$submitted;
  }

  deleteGame (): void {
    this.deleting = true;
  }

  cancelDelete (): void {
    this.deleting = false;
  }

  confirmDelete (): void {
    this.GameService.remove()
      .then(() => {
        this.deleting = false;
        this.$state.go('select');
      });
  }
}
