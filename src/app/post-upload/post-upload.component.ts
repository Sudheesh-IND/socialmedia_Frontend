import { Component, OnInit } from '@angular/core';

import {profile} from '../../../model/profile'
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-post-upload',
  templateUrl: './post-upload.component.html',
  styleUrls: ['./post-upload.component.css']
})
export class PostUploadComponent implements OnInit{

   userId:string=''
   profilepic:String=''
   isAdded:boolean=false
   isUploading:boolean=false
   isSettingsShown:Boolean=false
   

  constructor(private http: HttpClient,private api:ApiService,private activatedRoute:ActivatedRoute,
    private route:Router) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((response:any)=>{
       this.userId=response.InstaId
    })
    this.api.getDetails(this.userId).subscribe((response:any)=>{
      this.profilepic=response.details.profilepic[0].path
    })
  }

  onFileSelected(event:any){
    if(event.target.files.length>0){
      this.isUploading=true
      const file=event.target.files[0]
      const formData=new FormData
      formData.append('file',file)

      this.api.uploadPost(formData,this.userId).subscribe((response:any)=>{
      console.log(response)
      if(response){
        this.isAdded=true
       
      
        setTimeout(() => {
          this.route.navigateByUrl(`social/myprofile/${this.userId}`)
          this.isAdded=false
         
          

         }, 2000);
        
      }
     })

    }
   

  }
 


  
  showSettings(){
    this.isSettingsShown=!this.isSettingsShown
    const settings:any=document.getElementById('setting')
    settings.style.backgroundColor='white'
    settings.style.color='#194954'

    if(this.isSettingsShown==false){
      settings.style.backgroundColor='#194954'
    settings.style.color='white'
    }
}
  
 
  

}
