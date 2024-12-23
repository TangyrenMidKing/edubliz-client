import emailjs from 'emailjs-com';
import { Question, Option } from '../_models/question';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailUtil {
  private serviceId = 'service_dfrmtyb';
  private templateId = 'template_q0i8rr2';
  private userId = 'U09aG2P91J7xxoRzz';

  sendEmail(to: string, subject: string, body: string) {
    const emailData = {
      to: to,
      subject: subject,
      from: 'chenzhesun@gmail.com',
      message: body,
    };
    console.log(emailData);
    emailjs
      .send(this.serviceId, this.templateId, emailData, this.userId)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
      });
  }

  trainingTemplate() {
    return `<p>${localStorage.getItem(
      'userName'
    )} have completed a training session. Here are your results:</p>    

            <p>Chinese Training Accuracy: ${localStorage.getItem(
              'chinese-training-accuracy'
            )}%</p><br/>

            <p>Wrong Questions:</p>
            ${
              localStorage.getItem('chinese-training-wrong-questions') ??
              'All correct!<br/>'
            }

            <p>Spanish Training Accuracy: ${localStorage.getItem(
              'spanish-training-accuracy'
            )}%</p><br/>
            <p>Wrong Questions:</p>
            ${
              localStorage.getItem('spanish-training-wrong-questions') ??
              'All correct!<br/>'
            }
            <br>

            <p>Best regards, <br>
            Your Training Team</p>`;
  }

  wrongQuestionsStringify(q: Question, language: string) {
    return `<p>Question: ${q.image.description}, Options: ${q.Options.map(
      (o: Option) =>
        language === 'chinese'
          ? o.chinese.character +
            (o.isSelectedWrong ? '(Selected)' : '') +
            (o.isCorrect ? '(Correct)' : '')
          : o.spanish.character +
            (o.isSelectedWrong ? '(Selected)' : '') +
            (o.isCorrect ? '(Correct)' : '')
    ).join(', ')}</p><br/>`;
  }
}
