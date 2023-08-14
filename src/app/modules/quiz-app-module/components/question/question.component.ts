import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Question } from '../../models/question';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() showAnswer!: Boolean;
  @Input() questionList!: Question[];
  @Input() totalCorrectAnswer!: Number[];
  totalAnswerQuestion: number = 0;
  @ViewChild('resultText') resultText!: ElementRef;
  
  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.totalAnswerQuestion = 0;  
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if(this.showAnswer && this.questionList.length > 0) {
      const nativeElement = this.resultText.nativeElement;
      if(this.totalCorrectAnswer.length <= 1) {
        nativeElement.classList.add('red');
      } else if(this.totalCorrectAnswer.length > 1 && this.totalCorrectAnswer.length <= 3) {
        nativeElement.classList.add('yellow');
      } else if(this.totalCorrectAnswer.length > 3) {
        nativeElement.classList.add('green');
      }
    }
  }
  
  selectAnswer(i: number, ans: string) {
    
    if(this.showAnswer == false) {
        if(!this.questionList[i].user_answer) {
          this.totalAnswerQuestion++;
        }
        this.questionList[i].user_answer =  ans;
        if(this.questionList[i].correct_answer == this.questionList[i].user_answer ) {
          this.totalCorrectAnswer.push(i);
        } else {
          const indexKey = this.totalCorrectAnswer.indexOf(i);
          if (indexKey > -1) {
            this.totalCorrectAnswer.splice(indexKey, 1); // Remove array element
          }
        }

    }
  }

  submitAnwser() {
    localStorage.setItem('question', JSON.stringify(this.questionList));
    localStorage.setItem('totalCorrectAnswer', JSON.stringify(this.totalCorrectAnswer));
    this.router.navigateByUrl('/result');
  }

  createNewQuiz() {
    localStorage.removeItem('question');
    localStorage.removeItem('totalCorrectAnswer');
    this.router.navigate(['']);
  }

}
