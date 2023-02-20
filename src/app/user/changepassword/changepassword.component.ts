import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  changePassword: FormGroup = new FormGroup({
    CurrentPassword: new FormControl('', [Validators.required]),
    NewPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmpassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  public selectedField = "";
  onFocus(identifier: string) {
    this.selectedField = identifier;
  }

  onBlur() {
    this.selectedField = "";
  }

  onChange() {
    if (this.changePassword.controls['conpassword'].value == this.changePassword.controls['password'].value)
      this.changePassword.controls['conpassword'].setErrors(null);
    else
      this.changePassword.controls['conpassword'].setErrors({ mismatch: true });

  }

  submit() {
    this.auth.changePassword(this.changePassword.value);

  }

}
