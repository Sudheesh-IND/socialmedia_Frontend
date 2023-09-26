import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  constructor(private fb:FormBuilder,private api:ApiService){}

  resetForm=this.fb.group({
    Email:['',[Validators.required,Validators.email]],
    Password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z/d$@$!%*?&].{8,}')]],
    Pass1:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z/d$@$!%*?&].{8,}')]],

  })

  resetPassword(){
    if(this.resetForm.valid){
        if(this.resetForm.value.Password==this.resetForm.value.Pass1){
         let Email=this.resetForm.value.Email
         let Password=this.resetForm.value.Password

         this.api.changePassword(Email,Password).subscribe((response:any)=>{
          alert('Updated')
         })

        }else{
          alert('Password does not match')
        }
    }
  }
   

}
