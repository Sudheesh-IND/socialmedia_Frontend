import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  invalidDetails:string=''

  constructor(private fb:FormBuilder,private api:ApiService,private route:Router){}

  registerForm=this.fb.group({
    Name:['',[Validators.required,Validators.pattern('[A-Za-z]*')]],
    Email:['',[Validators.required,Validators.email]],
    Password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z/d$@$!%*?&].{8,}')]],
    pass2:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z/d$@$!%*?&].{8,}')]]

  })
  registerUser(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value)
      if(this.registerForm.value.Password==this.registerForm.value.pass2){
         let Name=this.registerForm.value.Name
         let Email=this.registerForm.value.Email
         let Password=this.registerForm.value.Password
      
      this.api.registerUser(Name,Email,Password).subscribe((response:any)=>{
         console.log(response)
  
        
         
         this.route.navigateByUrl('social/login')
      },(response:any)=>{
        this.invalidDetails=response.error.message;
        setTimeout(() => {
          this.invalidDetails=''
          this.registerForm.reset()
          
         }, 2000);
      })
        
      }else{
        this.invalidDetails='Passwords are not same'
        setTimeout(() => {
          this.invalidDetails=''
          this.registerForm.reset()
          
        }, 2000);
      }
    }else{
      this.invalidDetails='Please provide valid details'
      setTimeout(() => {
        this.invalidDetails=''
        this.registerForm.reset()
        
      }, 2000);
    }


  }
  

}
