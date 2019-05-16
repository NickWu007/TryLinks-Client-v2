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

  constructor() { }

  ngOnInit() {
    // TODO: remove the mock
    this.allLines = [
      new ShellLineModel(LineType.introduction, 'introduction'),
      new ShellLineModel(LineType.userInput, 'user input'),
      new ShellLineModel(LineType.stdout, 'stdout'),
      new ShellLineModel(LineType.stderr, 'stderr'),
    ];
  }

}
