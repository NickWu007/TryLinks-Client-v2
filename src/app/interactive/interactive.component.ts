import { Component, OnInit, ViewChild } from '@angular/core';
import { ShellLineModel, LineType } from '../shell-line/shell-line.model';
import starterGuideDescriptions from './interactive.guide';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.scss']
})
export class InteractiveComponent implements OnInit {
  @ViewChild('shell') shell: any;

  inputPrompt = ' links> ';
  allLines: ShellLineModel[];
  currentCmd = '';
  currentInputLine = '';
  showLoadingDialog = false;
  introIndex

  constructor() {}

  ngOnInit() {
    // TODO: remove the mock
    this.allLines = [
      new ShellLineModel(LineType.introduction, 'introduction'),
      new ShellLineModel(LineType.userInput, 'user input'),
      new ShellLineModel(LineType.stdout, 'stdout'),
      new ShellLineModel(LineType.stderr, 'stderr')
    ];

    this.introIndex = 0;
    this.showNewGuide();
  }

  scrollToBottom(): void {
    const shell = this.shell.nativeElement;
    shell.scrollTop = shell.scrollHeight;
  }

  onInputChange(): void {
    this.scrollToBottom();

    this.currentCmd += '\n' + this.currentInputLine;
    if (this.currentCmd.trim() === 'skip intro;') {
      this.allLines.push(
        new ShellLineModel(
          LineType.stdout,
          'Syntax introduction series disabled. To enable, please refresh the page.'
        )
      );
      this.currentCmd = '';
    } else if (this.currentCmd.trim() === 'next tip;') {
      this.showNewGuide();
      this.currentCmd = '';
    } else if (this.currentCmd.trim() === 'go back;') {
      this.introIndex = this.introIndex > 1 ? this.introIndex - 2 : 0;
      this.showNewGuide();
      this.currentCmd = '';
    } else {
      this.allLines.push(
        new ShellLineModel(LineType.userInput, this.currentInputLine)
      );
      if (this.currentInputLine.endsWith(';')) {
        this.currentCmd.split(';').forEach(command => {
          if (command.length > 0) {
            const commandToSent = command + ';';
            console.log(commandToSent);
          //   socket.emit('new command', command + ';');
          }
        });
        this.inputPrompt = ' links > ';
        this.currentCmd = '';
      } else {
        this.inputPrompt = '...... ';
      }
    }
    this.currentInputLine = '';
  }

  showNewGuide(): void {
    if (this.introIndex < starterGuideDescriptions.length) {
      this.allLines
          .push(new ShellLineModel(LineType.introduction, starterGuideDescriptions[this.introIndex]));
      this.introIndex++;
    }
  }
}
