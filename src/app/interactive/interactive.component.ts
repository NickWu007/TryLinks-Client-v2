import { Component, OnInit } from '@angular/core';
import { ShellLineModel, LineType } from '../shell-line/shell-line.model';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.scss']
})
export class InteractiveComponent implements OnInit {
  inputPrompt = ' links> ';
  allLines: ShellLineModel[];
  currentCmd = '';
  currentInputLine = '';
  showLoadingDialog = false;

  constructor() {}

  ngOnInit() {
    // TODO: remove the mock
    this.allLines = [
      new ShellLineModel(LineType.introduction, 'introduction'),
      new ShellLineModel(LineType.userInput, 'user input'),
      new ShellLineModel(LineType.stdout, 'stdout'),
      new ShellLineModel(LineType.stderr, 'stderr')
    ];
  }

  scrollToBottom(): void {
    // Element shell = querySelector(".tl-interactive-shell");
    // shell.scrollTop = shell.scrollHeight;
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
      // _showNewIntro();
      this.currentCmd = '';
    } else if (this.currentCmd.trim() === 'go back;') {
      // introIndex = introIndex > 1 ? introIndex - 2 : 0;
      // _showNewIntro();
      this.currentCmd = '';
    } else {
      this.allLines.push(
        new ShellLineModel(LineType.userInput, this.currentInputLine)
      );
      if (this.currentInputLine.endsWith(';')) {
        this.currentCmd.split(';').forEach(command => {
          //   socket.emit('new command', command + ';');
        });
        this.inputPrompt = ' links > ';
        this.currentCmd = '';
      } else {
        this.inputPrompt = '...... ';
      }
    }
    this.currentInputLine = '';
  }
}
