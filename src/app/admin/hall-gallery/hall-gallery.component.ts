import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog  } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { HallImagesService } from 'src/app/Services/hall-images.service';
import { HallService } from 'src/app/Services/hall.service';

@Component({
  selector: 'app-hall-gallery',
  templateUrl: './hall-gallery.component.html',
  styleUrls: ['./hall-gallery.component.css']
})
export class HallGalleryComponent implements OnInit {
  @ViewChild('imageDeleteDialog') imageDeleteDialog! :TemplateRef<any>
  @ViewChild('imageaddDialog') imageaddDialog! :TemplateRef<any>
  p:number=1;
  images : string[] = [];
  imagesRead : string[] = [];

 
  ImageForm : FormGroup=new  FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    hallid:new  FormControl('')
  })
 
  constructor(public hall:HallService,private dialog :MatDialog,public image: HallImagesService,private route:ActivatedRoute) { }

  
  ngOnInit(): void {
    this.hall.getHallImages(this.route.snapshot.params['id']);
    this.hall.getHallById(this.route.snapshot.params['id']);

  }

    



  openDeleteImageDialog(id:number){
    debugger;
    console.log(id);
    const dialogRef=this.dialog.open(this.imageDeleteDialog);
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes")
        {
        this.image.deleteHall(id);
        setTimeout(() => {
          this.hall.getHallImages(this.route.snapshot.params['id']);
        }, 3000);
        }
        
      }
    })

  }
  onFileChange(event:any)
  {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
              var reader = new FileReader();
  
              reader.onload = (event:any) => {
                console.log('image read--');
                console.log(event.target.result);
                 this.imagesRead.push(event.target.result); 
  
                 
              }
 
              reader.readAsDataURL(event.target.files[i]);
      }
  }
    debugger;
  for (var i = 0; i < event.target.files.length; i++) {  
    this.images.push(event.target.files[i]);  
    this.ImageForm.patchValue({
      fileSource: this.images
  } )

  

}
console.log(this.images)
} 

  openAddImageDialog(){
    this.ImageForm.patchValue({
      hallid: this.hall.hallid
  } )
    const dialogRef=this.dialog.open(this.imageaddDialog);
   
  }
  addimage()
  {
    this.hall.addImages(this.ImageForm.value);   
    this.dialog.closeAll();

    setTimeout(() => {
      this.hall.getHallImages(this.route.snapshot.params['id']);
    }, 3000);
  }

}