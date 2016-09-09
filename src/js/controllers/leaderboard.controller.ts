import {GameService} from '../services/game.service';
import {Player} from '../models/player.model';

export class LeaderboardController {
  private players: Player[];
  private currentPlayer: Player;
  private position: number;
  private show: boolean;

  /*@ngInject*/
  constructor (
    private $location: angular.ILocationService,
    private $anchorScroll,
    private GameService: GameService
  ) {

    this.players = GameService.getPlayers().slice(0, 8);
    this.currentPlayer = GameService.getCurrentPlayer();
    this.position = GameService.getPlayerPosition(this.currentPlayer);

    this.show = true;

    if (this.position > 8) {
      this.load();
    }

    this.goTo(this.position);
  }

  arePlayers (): boolean {
    return this.players.length > 0;
  }

  load (): void {
    var restPlayers = this.players.slice(8);
    this.players = this.players.concat(restPlayers);
    this.show = false;
  }

  less (): void {
    this.players = this.players.slice(0, 8);
    this.show = true;
  }

  isActive (index: number): boolean {
    return index === this.position;
  }

  shouldShowMore (): boolean {
    return this.players.length > 8;
  }

  isFirst (index: number): boolean {
    return index === 0;
  }

  goTo (position: number): void {
    if (angular.isUndefined(position)) {
      return;
    }

    let to = position > 4 ? position - 4 : position;
    this.$location.hash(to.toString());
    this.$anchorScroll();
  }
}
