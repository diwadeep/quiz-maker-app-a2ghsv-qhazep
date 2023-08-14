import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question, QuestionParams } from '../../models/question';
import { QuizAppService } from '../../services/quiz.app.service';

@Component({
  selector: 'app-quiz-entry',
  templateUrl: './quiz-entry.component.html',
  styleUrls: ['./quiz-entry.component.scss']
})
export class QuizEntryComponent implements OnInit {

  difficultyList!: String[]; 
  categoryList: Category[] = [];
  quizForm!: FormGroup;
  showQuestion!: Boolean;
  questionList: Question[] = [];

  constructor(private quizService: QuizAppService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
    this.difficultyList = this.quizService.questionLevels;
    this.getCategoryList();
  }

  buildForm() {
    this.quizForm = this.formBuilder.group({
        categorySelect: ['', [Validators.required]],
        difficultySelect: ['', [Validators.required]]
      }
    )
  }

  getCategoryList() {
    this.quizService.getCategoryList().subscribe(response => {
        this.categoryList = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  getQuestionList(params: QuestionParams) {
    this.quizService.getQuestionList(params).subscribe(response => {
        if(response.length > 0) {
          this.showQuestion = true;
          this.questionList = response;
          console.log(this.questionList);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  onSubmitQuizForm() {
    
    if(this.quizForm.valid) {
      const params = {'category': this.quizForm.controls['categorySelect'].value, 'difficulty': this.quizForm.controls['difficultySelect'].value}
      this.getQuestionList(params);
    }
    
  }

  


}
