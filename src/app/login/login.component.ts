import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(2)]]
    });
  }
  
  startTraining(): void {
    if (this.loginForm.valid) {
      const trimmedUsername = this.loginForm.get('userName')?.value?.trim();
      
      if (trimmedUsername) {
        try {
          localStorage.setItem('username', trimmedUsername);
          
          this.router.navigate(['/training-chinese'])
            .catch(error => {
              console.error('Navigation error:', error);
              this.showError('Navigation failed. Please try again.');
            });
        } catch (error) {
          console.error('Storage error:', error);
          this.showError('Failed to save username. Please try again.');
        }
      } else {
        this.showError('Please enter your name to start the training.');
      }
    }
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}
