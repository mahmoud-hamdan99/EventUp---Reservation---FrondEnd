import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class CardService {
 userCard:any=[];
 url=environment.baseUrl;
   
  constructor(private http:HttpClient,private spinner:NgxSpinnerService,private toster:ToastrService) { }



  getUserCard(id:number){
     this.spinner.show();
    return this.http.get(this.url+"Card/GetCardById/"+id).subscribe((res)=>{
     this.userCard=res;
     this.spinner.hide();
     this.toster.success("Data Return");

    },err =>{
      this.spinner.hide();
      this.toster.error("Faild to Return Data ");

    });
  }

  addNewCard(model:any){
    console.log(model)
    const fromData=new FormData();
    fromData.append('Cardnumber',model.Cardnumber);
    fromData.append('Ccv',model.Ccv);
    fromData.append('Expirededate',model.Expirededate);
    fromData.append('Cardtype',model.Cardtype);
  debugger
    this.spinner.show();
    return this.http.post(this.url+"Card/AddCard",fromData).subscribe((res:any)=>{
      this.spinner.hide();
      this.toster.success("Card added");

     },err =>{
       this.spinner.hide();
       this.toster.error("Faild to Card added ");
 
     });

      
  }

  deleteCard(id:number){
    this.spinner.show();
    return this.http.delete(this.url+"Card/DeleteCard"+id).subscribe((res)=>
    {
        
        this.spinner.hide();
    },error=>{
      if(error.status==200)
      {
        this.toster.success('Card Deleted');
      
        this.spinner.hide();
      }
      else
      {
        this.toster.error('Card not Deleted');
        this.spinner.hide();

      }
     })


  }


  
   


}
