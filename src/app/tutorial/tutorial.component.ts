import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss', './markdown.scss']
})
export class TutorialComponent implements OnInit {

  @ViewChild('description')
  tutorialDescription;

  showFiller = false;

  constructor() { }

  ngOnInit() {
    this.tutorialDescription.nativeElement.innerHTML = mockDescription;
  }

}

// tslint:disable-next-line:one-variable-per-declaration
const mockDescription =
`
## Lesson 1 Hello World

#### You can navigate to other tutorials by click the menu icon on the upper left corner.

### Goal: make a web page that says "Hello World!".

Let's start with the simplest possible program: one that just prints "Hello, world" (albeit on a Web page). The starter code will not work right away, but you can fix it real quick!

This is a tiny bit more complicated than you might expect. Let's go through the main components of the program:

The \`mainPage\` function defines what to do to render the main page of the program. The keyword fun starts a function definition, and we write \`(_)\` to indicate that there is one argument but that we don't care about its value. (The underscore \`_\` is a wildcard that can be used as a variable if we don't care about the variable's value.) The body of the function is enclosed in curly braces.

The body of the function defines the return value. In Links, the body of a function is evaluated to a value, which is returned. In this case, the return value is a *page*, defined using the \`page\` keyword. Pages can be defined using XML literals; for example, here we write \`<html>\` and \`<body>\` tags, then the appropriate closing tags. The difference between a \`page\` and an \`XML\` value is that a page has additional structure needed for Links to render the page as the result of a web request (for example to handle any forms embedded in the page).

The \`main\` function calls \`addRoute\` to install the \`mainPage\` handler as the default response to any HTTP request, and \`startServer()\` starts the Links web server.

If you run the program now, it would show an empty page. Change the \`page\` returned by \`mainPage\` to include a \`<h1>\` tag that has the text "Hello World!". Once you have done that. Click the "Compile" button and see the result!

If you don't see the page and got some errors, double check you have your tags properly closed.

### Exercises

1. Change the program by modifying the content of the HTML body, or adding content (such as a page title) under the \`<head>\` tag. Does this work? What happens if you add HTML with unbalanced tags, e.g. \`<p> test <b> bold </p>\`?

2. In Links, there is a difference between a \`page\` (which is a legitimate response to an HTTP request) and plain XML. What happens if you omit the keyword \`page\` from \`mainPage\`?

3. If you are familiar with CSS or JavaScript, what happens if you include a \`<style>\` or \`<script>\` tag in the page content?

#### You can find the solution to this tutorial here

<https://github.com/links-lang/links-tutorial/wiki/Lesson-1%3A-Hello%2C-world%21>

`;
