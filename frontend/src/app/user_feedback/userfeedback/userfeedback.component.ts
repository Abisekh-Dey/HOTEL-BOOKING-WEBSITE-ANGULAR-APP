import { Component } from '@angular/core';
import { Feedback } from '../../common/feedback';
import { FeedbackserviceService } from '../../services/feedbackservice.service'

@Component({
  selector: 'app-userfeedback',
  templateUrl: './userfeedback.component.html',
  styleUrl: './userfeedback.component.css'
})
export class UserfeedbackComponent {
  feedbacks:Feedback[]=[];
  errorstatus=0;

  constructor(private FeedbackserviceService:FeedbackserviceService) { }
  
  ngOnInit() {
    this.allfeedbacks();
  }

  allfeedbacks(){
    this.FeedbackserviceService.getallfeedbacks().subscribe(
      data => {
        this.feedbacks = data;
        console.log(this.feedbacks)
      }
    )
  }

}
