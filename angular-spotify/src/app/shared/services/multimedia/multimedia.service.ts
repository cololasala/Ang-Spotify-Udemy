import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MultimediaService {
  callBack: EventEmitter<any> = new EventEmitter<any>();

  public trackInfo$: BehaviorSubject<TrackModel | undefined> = new BehaviorSubject<TrackModel | undefined>(
    undefined
  ); // contiene las propiedades de la track
  public audio: HTMLAudioElement = new Audio(); // reproductor
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject(
    '-00:00'
  );
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('pause');
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    this.trackInfo$.subscribe((data) => {
     // console.log('recibiendo desde multiservice', data);
      if (data) {
        this.setAudio(data);
      }
    });

    this.listenAllEvents();
  }

  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
    this.audio.addEventListener('playing', this.setPlayerStatus, false);
    this.audio.addEventListener('play', this.setPlayerStatus, false);
    this.audio.addEventListener('pause', this.setPlayerStatus, false);
    this.audio.addEventListener('ended', this.setPlayerStatus, false);
  }

  private setPlayerStatus = (state: any) => {
    switch (state.type) {
      case 'play':
        this.playerStatus$.next('play');
        break;
      case 'playing':
        this.playerStatus$.next('playing');
        break;
      case 'pause':
        this.playerStatus$.next('pause');
        break;
      default:
        this.playerStatus$.next('ended');
    }
  };

  private calculateTime = () => {
    const { duration, currentTime } = this.audio;

    this.setTimeElapsed(currentTime);
    this.setTimeRemaining(currentTime, duration);
    this.setPercentage(currentTime, duration);
  };

  private setPercentage = (currentTime: number, duration: number) => {
    // duration es el 100% -> la cuenta es (currentTime * 100) / duration

    const percentage = (currentTime * 100) / duration;
    this. playerPercentage$.next(percentage);
  }

  setTimeElapsed(currentTime: number): void {
    const seconds = Math.floor(currentTime % 60); // tomo parte entera com Math.floor
    const minutes = Math.floor(currentTime / 60) % 60;

    // console.log('seg', seconds);
    // console.log('minutes', minutes);

    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

    this.timeElapsed$.next(`${displayMinutes}:${displaySeconds}`);
  }

  setTimeRemaining(currentTime: number, duration: number): void {
    const timeLeft = duration - currentTime;
    const seconds = Math.floor(timeLeft % 60);
    const minutes = Math.floor(timeLeft / 60) % 60;

    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

    this.timeRemaining$.next(`-${displayMinutes}:${displaySeconds}`);
  }

  public setAudio(track: TrackModel): void {
    this.audio.src = track.url;
    this.audio.play();
  }

  public setMuted(muted: boolean): void {
    this.audio.muted = muted;
  }

  public togglePlayer(): void {
    this.audio.paused ? this.audio.play() : this.audio.pause();
  }

  public seekAudio(percentageFromX: number): void {
    const { duration } = this.audio;
    const percentageToSeconds = (percentageFromX * duration) / 100;
    this.audio.currentTime = percentageToSeconds;
  }
}
