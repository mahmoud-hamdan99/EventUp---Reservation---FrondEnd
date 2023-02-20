import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxGalleryAction, NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { HallService } from 'src/app/Services/hall.service';
import { EditHallComponent } from '../edit-hall/edit-hall.component';

@Component({
  selector: 'app-manage-hall',
  templateUrl: './manage-hall.component.html',
  styleUrls: ['./manage-hall.component.css']
})
export class ManageHallComponent implements OnInit {
  @ViewChild('hallDeleteDialog') hallDeleteDialog! :TemplateRef<any>

  nameSearch:any;
  usageSearch:any;
  capacitySearch:number=0;
  priceSearch:number=0;
  p:number=1;
  
  constructor(public hall:HallService,private dialog :MatDialog,private router:Router) { }
  hallimage:any=[];
  
  
  ngOnInit(): void {
   
    this.getAllHalls();

    

  }

  
  getAllHalls(){
    this.hall.getAllHalls();
    console.log(this.hall.allHalls)
     
  }

 
     
  


  openCreatedialog(){
    this.router.navigate(['admin/createHall'])

  }

  openGallery(id:any){
     this.hall.hallid=id;
   
    this.router.navigate([`admin/hallGallery/${id}`]);
  }


  openEditDialog(id:any){
    this.hall.getHallById(id);
    this.dialog.open(EditHallComponent)
  }


  viewHallDetails(id:any){
    this.hall.getHallById(id);
  }


  openDeleteDialog(id:any){
    const dialogRef=this.dialog.open(this.hallDeleteDialog);
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes")
        this.hall.deleteHall(id);
        else if(res=="no")
        console.log("Thank you ");
        
      }
    })

  }


  search(){
    
    if(this.nameSearch != "" && this.nameSearch != null)
    {
      this.hall.getHallByName(this.nameSearch.toLocaleLowerCase());
    }
    else if(this.usageSearch != "" && this.usageSearch != null)
    {
      this.hall.getHallByUsage(this.usageSearch.toLocaleLowerCase());
    }
    else if(this.capacitySearch != 0 && this.capacitySearch != null)
    {
      this.hall.getHallByCapicity(this.capacitySearch);
    }
    else if(this.priceSearch != 0 && this.priceSearch != null)
    {
      debugger
      this.hall.getHallByPrice(this.priceSearch);
    }
    else{
      this.ngOnInit();
    }
  }

}
