import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Unsubscribable, timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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
  
  timerSub: Unsubscribable;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    
    const timerInterval = 1;

    const cursorInterval = 100;
    const typeSpeed = 25;

    let tick = -1;
    let typing = false;
    let cursorTicks = 0;
    const maxCursorTicks = 5;
    this.timerSub = timer(timerInterval, timerInterval)
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

  ngOnDestroy() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
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

}
