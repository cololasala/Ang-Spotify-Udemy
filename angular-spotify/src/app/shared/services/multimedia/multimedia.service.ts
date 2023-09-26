import { EventEmitter, Injectable, effect, signal } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
@Injectable({
  providedIn: 'root',
})
export class MultimediaService { //Ang V16 uso de signals
  callBack: EventEmitter<any> = new EventEmitter<any>();
  public trackInfoSignal = signal<TrackModel | undefined>(undefined);
  public audio: HTMLAudioElement = new Audio(); // reproductor
  public timeElapsedSignal = signal<string>('00:00');
  public timeRemainingSignal = signal<string>('-00:00');
  public playerStatusSignal = signal<string>('pause');
  public playerPercentageSignal = signal<number>(0);

  constructor() {
    effect(() => {
      //Ang V16
      const dataInfo = this.trackInfoSignal();
      if (dataInfo) this.setAudio(dataInfo);
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
        this.playerStatusSignal.set('play');
        break;
      case 'playing':
        this.playerStatusSignal.set('playing');
        break;
      case 'pause':
        this.playerStatusSignal.set('pause');
        break;
      default:
        this.playerStatusSignal.set('ended');
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
    this.playerPercentageSignal.set(percentage);
  };

  setTimeElapsed(currentTime: number): void {
    const seconds = Math.floor(currentTime % 60); // tomo parte entera com Math.floor
    const minutes = Math.floor(currentTime / 60) % 60;

    // console.log('seg', seconds);
    // console.log('minutes', minutes);

    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

    this.timeElapsedSignal.set(`${displayMinutes}:${displaySeconds}`);
  }

  setTimeRemaining(currentTime: number, duration: number): void {
    const timeLeft = duration - currentTime;
    const seconds = Math.floor(timeLeft % 60);
    const minutes = Math.floor(timeLeft / 60) % 60;

    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

    this.timeRemainingSignal.set(`-${displayMinutes}:${displaySeconds}`);
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
