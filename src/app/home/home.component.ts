import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  userId:string=''
  followList:any={}
  singleId:string=''
  allposts:any[]=[]
  singlePost:any={}
  forName:any={}
  showComment:boolean=false
  commentInput:String=''
  comments:any={}
  isCommentPresent:boolean=false
  isYourComment:boolean=false

  toLike:boolean=true
  isLikePresent:boolean=false
  isFollowingAnyone:boolean=false
  profilepic:String=''
  commentsCount:String=''
  isSettingsShown:Boolean=false

 
  constructor(private activatedRoute:ActivatedRoute,private api:ApiService,private fb:FormBuilder,
    private route:Router){}

  // commentGroup=this.fb.group({
  //       comment:['',[Validators.required,Validators.pattern('[A-Za-z0-9]*')]]
  // })
  ngOnInit(): void {

    //code for reloading the the same page
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;


    this.activatedRoute.params.subscribe((data:any)=>{
         this.userId=data.InstaId
    })
    this.getDetails()
   

  }
  getDetails(){
    this.api.getDetails(this.userId).subscribe((data:any)=>{
       
      this.followList=data.details.Followers
      this.profilepic=data.details.profilepic[0].path
      if(this.followList.length==0){
        this.isFollowingAnyone=true
      }
     //  console.log(this.followList)
      for(let i=0;i<this.followList.length;i++){
       this.singleId=this.followList[i].followId
       // console.log(this.singleId)

       this.api.getDetails(this.singleId).subscribe((data:any)=>{
         // console.log(data.details.posts)
         this.forName=data.details.posts
         for(let j=0;j<this.forName.length;j++){
          
           this.forName[j]['name']=data.details.Name
           this.forName[j]['personalId']=data.details._id
           this.forName[j]['profilepath']=data.details.profilepic[0].path
           // console.log(this.forName[j])
           this.allposts.push(this.forName[j])
           console.log(this.allposts)

          
         
           // console.log(this.singlePost)

           this.singlePost=this.allposts.sort((a:any, b:any) => (a.date > b.date ? -1 : 1));
           // console.log(this.singlePost)
           for(let i=0;i<this.singlePost.length;i++){
             this.api.getLikes(this.singlePost[i].filename).subscribe((response:any)=>{
               if(response){
                 this.singlePost[i]['likescount']=response.response.likes.length
                 console.log(response.response.likes)
                
                 
               }
               
              
              
               
             },(response:any)=>{
               this.singlePost[i]['likescount']=0
               this.isFollowingAnyone=false
             })
           }

           //adding comments count
           for(let i=0;i<this.singlePost.length;i++){
            this.api.readComments(this.singlePost[i].filename).subscribe((response:any)=>{
              
              this.singlePost[i]['commentsCount']=response.details.length
             
              
            })
           }
          
         }
         
       })
       
   }
   
   })

  }

  readComments(filename:String){
    // console.log(filename)
    this.api.readComments(filename).subscribe((response:any)=>{
      // console.log(response.details)
      
      this.comments=response.details
      this.showComment=!this.showComment
      if(response.details.length<1){
        this.isCommentPresent=true
      }

      //inserting name and profilepic of comments
      for(let i=0;i<this.comments.length;i++){
        console.log(this.comments[i].from_id)
        this.api.getDetails(this.comments[i].from_id).subscribe((response:any)=>{
          console.log(response.details.profilepic[0].path)
          this.comments[i]['fromprofilepic']=response.details.profilepic[0].path
          this.comments[i]['fromname']=response.details.Name
          console.log(this.comments)
          // if(this.userId==this.comments[i].from_id){
          //        this.isYourComment=true
          // }
        })
      }
      

     })
     
    
  }

  addComments(filename:String,to_id:String){
      this.api.addComments(filename,this.userId,to_id,this.commentInput).subscribe((response:any)=>{
        
      
        this.commentInput=''
        this.readComments(filename)
        
        
      })
    }

  refresh(){
    this.route.navigateByUrl(`social/home/${this.userId}`)
  }

  ///api call for ading likes
  likes(filename:any){
    this.api.likes(filename,this.userId).subscribe((response:any)=>{
      this.getLikes(filename)
     
      console.log(response)
     
    })
  }

  //getting like number
  getLikes(filename:any){
    for(let i=0;i<this.singlePost.length;i++){
      this.api.getLikes(filename).subscribe((response:any)=>{
        if(this.singlePost[i].filename==filename){
          this.singlePost[i]['likescount']=response.response.likes.length
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
