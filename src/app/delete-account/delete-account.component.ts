import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {

  isDeletionStarted:boolean=false
  isDeleted:boolean=false
  userId:String=''

  constructor(private api:ApiService,private activatedRoute:ActivatedRoute,private fb:FormBuilder,private route:Router){}



  deleteAccount(){
    this.activatedRoute.params.subscribe((response:any)=>{
      this.userId=response.InstaId
    })
     
    
        this.api.deleteAccount(this.userId).subscribe((response:any)=>{
          console.log(response)
          this.isDeletionStarted=true

          setTimeout(() => {
            this.isDeletionStarted=false
            this.route.navigateByUrl('/')
            
          }, 3000);
        //  if(this.isDeletionStarted!=true){
        //        this.isDeleted=true
        //        setTimeout(() => {
        //       
        //         this.isDeleted=false
        //        }, 2000);
        //  }

        })
      
  }

  cancelAccountDeletion(){
    this.activatedRoute.params.subscribe((response:any)=>{
          this.userId=response.InstaId
    })

    this.route.navigateByUrl(`/social/home/${this.userId}`)
  }

}
