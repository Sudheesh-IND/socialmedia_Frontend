import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.css']
})
export class RightSideBarComponent implements OnInit{

  userDetails:any={}
  userId:String=''
  isFollowed:boolean=false
  suggestionDetails:any={}
  postDetails:any={}
  searchTerm:String=''

  constructor(private api:ApiService,private activatedroute:ActivatedRoute){}
  ngOnInit(): void {
    this.api.getAllUsers().subscribe((response:any)=>{
      console.log(response.Details)
      this.userDetails=response.Details
    })
    this.activatedroute.params.subscribe((response:any)=>{
      this.userId=response.InstaId
    })
  }
  viewSuggestion(suggestionId:String){
    this.api.viewSuggestion(suggestionId).subscribe((response:any)=>{
      console.log(response.details.Name)
      this.suggestionDetails=response.details
      this.postDetails=response.details.posts
      console.log(this.postDetails)
      // for(var i=0;i<=this.postDetails.length;i++){
      //   console.log(this.postDetails[i].filename)
      // }
    })
  }

  followUser(followId:String){
    console.log(followId)
       this.api.followUser(this.userId,followId).subscribe((response:any)=>{
        console.log(response)
        if(response){
          this.isFollowed=!this.isFollowed
        }
       },(response:any)=>{
        alert(response.error.message)
       })  
  }

}
