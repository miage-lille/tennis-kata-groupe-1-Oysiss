import { Player } from './player';
import { some, none, Option } from 'fp-ts/lib/Option';

export type Love = {
  kind: 'LOVE';
};

export const love = (): Love => ({
  kind: 'LOVE',
});

export type Fifteen = {
  kind: 'FIFTEEN';
};

export const fifteen = (): Fifteen => ({
  kind: 'FIFTEEN',
});

export type Thirty = {
  kind: 'THIRTY';
};

export const thirty = (): Thirty => ({
  kind: 'THIRTY',
});

export type Point = Love | Fifteen | Thirty;
export type PointsData = {
  PLAYER_ONE: Point;
  PLAYER_TWO: Point;
};

export type Points = {
  kind: 'POINTS';
  pointsData: PointsData;
};

export const points = (
  playerOnePoints: Point,
  playerTwoPoints: Point
): Points => ({
  kind: 'POINTS',
  pointsData: {
    PLAYER_ONE: playerOnePoints,
    PLAYER_TWO: playerTwoPoints,
  },
});

export const incrementPoint = (point: Point): Option<Point> => {
  switch (point.kind) {
    case 'LOVE':
      return some(fifteen());
    case 'FIFTEEN':
      return some(thirty());
    case 'THIRTY':
      return none;
  }
};

// Exerice 0: Write all type constructors of Points, Deuce, Forty and Advantage types.
export type Deuce = {
  kind: 'DEUCE';
};

export const deuce = (): Deuce => ({
  kind: 'DEUCE',
});

export type FortyData = {
  player: Player; // The player who have forty points
  otherPoint: Point; // Points of the other player
};

export type Forty = {
  kind: 'FORTY';
  fortyData: FortyData;
};

export const forty = (player: Player, otherPoint: Point): Forty => ({
  kind: 'FORTY',
  fortyData: {
    player,
    otherPoint,
  },
});

export type Advantage = {
  kind: 'ADVANTAGE';
  player: Player;
};

export const advantage = (player: Player): Advantage => ({
  kind: 'ADVANTAGE',
  player,
});

export type Game = {
  kind: 'GAME';
  player: Player; // Player has won
};

export const game = (winner: Player): Game => ({
  kind: 'GAME',
  player: winner,
});

export const pointToString = (point: Point): string => {
  switch (point.kind) {
    case 'LOVE':
      return 'Love';
    case 'FIFTEEN':
      return 'Fifteen';
    case 'THIRTY':
      return 'Thirty';
    default:
      return '';
  }
};

export const scoreToString = (score: Score): string => {
  switch (score.kind) {
    case 'POINTS':
      return `Player One: ${pointToString(score.pointsData.PLAYER_ONE)}, Player Two: ${pointToString(score.pointsData.PLAYER_TWO)}`;
    case 'FORTY':
      return `Forty - ${score.fortyData.player} (${pointToString(score.fortyData.otherPoint)})`;
    case 'DEUCE':
      return 'Deuce';
    case 'ADVANTAGE':
      return `Advantage - ${score.player}`;
    case 'GAME':
      return `Game - ${score.player}`;
    default:
      return '';
  }
};

export type Score = Points | Forty | Deuce | Advantage | Game;
