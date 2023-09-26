import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.css']
})
export class OtherProfileComponent implements OnInit{

  profileId:String=''
  profileDetails:any={}
  noPosts:boolean=false
  totalPosts:any={}
  isSameUser:boolean=true
  isFollowing=true
  unFollowBtn:boolean=false
  profilepic:String=''
  isSettingsShown:Boolean=false
  userId:any=window.localStorage.getItem('InstaFlixId')
  constructor(private activatedRoute:ActivatedRoute,private api:ApiService,private route:Router){}
  ngOnInit(): void {
   this.getOtherDetails()
  
   if(this.userId==this.profileId){
    this.isSameUser=false
   }
    
  }
  getOtherDetails(){
    let userId=window.localStorage.getItem('InstaFlixId')
    
    this.activatedRoute.params.subscribe((data:any)=>{
      this.profileId=data.otherId
      console.log(this.profileId)
      
  
      this.api.getDetails(this.profileId).subscribe((response:any)=>{
        
        console.log(response.details)
        this.profileDetails=response.details
        this.totalPosts=response.details.posts
        console.log(this.totalPosts)
       
      })
      this.api.getDetails(userId).subscribe((response:any)=>{
        console.log(response.details.Followers)
        this.profilepic=response.details.profilepic[0].path
          for(let i=0;i<response.details.Followers.length;i++){
            if(this.profileId==response.details.Followers[i].followId){

                 this.isFollowing=false
                 this.unFollowBtn=true
                 
            }
          }
      })
    })
  }
  toHome(){
    let userId=window.localStorage.getItem('InstaFlixId')
   this.route.navigateByUrl(`social/home/${userId}`)
  }
  addPostPage(){
    let userId=window.localStorage.getItem('InstaFlixId')
    this.route.navigateByUrl(`social/uploadpost/${userId}`)

  }
  toMessage(){
    let userId=window.localStorage.getItem('InstaFlixId')
    this.route.navigateByUrl(`social/messages/${userId}`)

  }
  toProfile(){
    let userId=window.localStorage.getItem('InstaFlixId')
    this.route.navigateByUrl(`social/myprofile/${userId}`)

  }
  followUser(){
    let personalId=localStorage.getItem('InstaFlixId')
    this.api.followUser(personalId,this.profileId).subscribe((response:any)=>{
      
      this.getOtherDetails()
    },(response:any)=>{
      this.getOtherDetails()
      
    })
  }

  unFollow(){
    let userId=window.localStorage.getItem('InstaFlixId')
    this.api.unFollow(userId,this.profileId).subscribe((response:any)=>{
      this.getOtherDetails()
      this.isFollowing=true
      this.unFollowBtn=false
    },(response:any)=>{
     this.getOtherDetails()
    })

  }

  logOut(){
   
    this.route.navigateByUrl(`/social/logout/${this.userId}`)
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
