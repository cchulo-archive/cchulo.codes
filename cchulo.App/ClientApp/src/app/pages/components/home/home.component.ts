import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Unsubscribable, timer } from 'rxjs';
import { ClientSettingsService } from 'src/app/core/services/client-settings.service';
import { ETheme, EWindow } from 'src/app/core/shared/common';
import { ClientWindowService } from 'src/app/core/services/client-window.service';
import { fadeInOut, slideRightLeft, slideLeftRight } from 'src/app/core/shared/animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ fadeInOut, slideRightLeft, slideLeftRight ]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  commands = [
    'Hello world!',
    'My name is Carlos Chulo',
    'I am a Software Engineer',
    'I am a Computer Scientist',
    'I am a Maker',
    'Welcome to my page'
  ];
  
  cursor = '█';
  command = '';
  commandToShow = '';
  showCursor = false;
  commandTyped = true;
  commandIndex = -1;
  commandStringIndex = 0;
  
  isDarkMode = false;

  font = '24px Inconsolata, monospace';
  height = 72;

  private _timerSub: Unsubscribable;
  private _clientSettingsSub: Unsubscribable;
  private _clientWindowSub: Unsubscribable;

  constructor(
    private _clientSettingsService: ClientSettingsService,
    private _clientWindowService: ClientWindowService
    ) { }

  ngOnInit(): void {
    this._clientSettingsSub = this._clientSettingsService.theme.subscribe(theme => {
      switch (theme) {
        case ETheme.dark:
          this.isDarkMode = true;
          break;
      
        default:
          this.isDarkMode = false;
          break;
      }
    });

    this._clientWindowSub = this._clientWindowService.windowResizeEvent.subscribe(state => {
      if (state <= EWindow.sm) {
        this.font = '12px Inconsolata, monospace';
        this.height = 36;
      }
      else if (state === EWindow.md) {
        this.font = '18px Inconsolata, monospace';
        this.height = 54;
      }
      else {
        this.font = '24px Inconsolata, monospace';
        this.height = 72;
      }
    });
  }

  ngAfterViewInit() {
    this.setupTerminal();
  }

  ngOnDestroy() {
    if (this._timerSub) {
      this._timerSub.unsubscribe();
    }

    if (this._clientSettingsSub) {
      this._clientSettingsSub.unsubscribe();
    }

    if (this._clientWindowSub) {
      this._clientWindowSub.unsubscribe();
    }
  }

  displayCursor(force: boolean = false) {
    this.showCursor = force || !this.showCursor;
    if (this.showCursor) {
      this.commandToShow = this.command + this.cursor;
    } else {
      this.commandToShow = this.command;
    }
  }

  setupTerminal() {
    const timerInterval = 1;

    const cursorInterval = 100;
    const typeSpeed = 25;

    let tick = -1;
    let typing = false;
    let cursorTicks = 0;
    const maxCursorTicks = 5;
    this._timerSub = timer(timerInterval, timerInterval)
      .subscribe(() => {

        tick = (tick + 1) % 10000;

        // if we are not typing, and a command has been typed, backspace it
        if ((tick % (Math.round(typeSpeed / 2))) === 0 && !typing && this.command.length > 0) {
          this.command = this.command.substring(0, this.command.length - 1);
          this.commandStringIndex--;
          this.displayCursor(true);
          return;
        }

        if ((tick % cursorInterval) === 0 && !typing) {
          
          this.displayCursor();

          if (cursorTicks === maxCursorTicks) {
            typing = true;
            cursorTicks = 0;
            this.commandIndex = (this.commandIndex + 1) % this.commands.length;
            return;
          }

          cursorTicks++;
        }

        if ((tick % typeSpeed) === 0 && typing) {
          const currCommand = this.commands[this.commandIndex];
          
          if (this.commandStringIndex < currCommand.length) {
            const char = currCommand[this.commandStringIndex];
            this.commandStringIndex++;
            this.command += char;
            this.displayCursor(true);
          }
          
        }

        if ((tick % cursorInterval) === 0 && typing ) {
          const currCommand = this.commands[this.commandIndex];
          
          if (this.commandStringIndex === currCommand.length) {
            this.displayCursor();

            if (cursorTicks === maxCursorTicks) {
              typing = false;
              cursorTicks = 0;
              return;
            }
    
            cursorTicks++;
          }
          
        }
      
      });
  }
}
