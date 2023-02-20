import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'src/app/Services/role.service';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css']
})
export class ManageRoleComponent implements OnInit {
  @ViewChild('callDeleteDialog') callDeleteDialog!: TemplateRef<any>
  @ViewChild('callAddRole') callAddRole! :TemplateRef<any>
  constructor(public role:RoleService,private toastr:ToastrService,private dialog :MatDialog) { }
  model:any={};
  p:number=1;
  ngOnInit(): void {
  this.getAllRole();
  }


  getAllRole(){
    this.role.getAllRoles();
   
  }

  openDeleteDialog(id: any) {
    const dialogRef = this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((res) => {
      if (res !== undefined) {
        if (res == "yes")
          this.role.deleteRole(id);
      }
    })

  }

  // deleterole(id:any){
  //   console.log(id);
  //   this.role.deleteRole(id);
  // }

  openAddDialogRole(){
this.dialog.open(this.callAddRole);
  }


  AddRole(){
    this.role.AddRole(this.model).subscribe(()=>{

      console.log('Role Added Successfully');
      this.toastr.success("Role Added Successfully")
      this.getAllRole();

    },error=>{
      console.log('not Added ');
      this.toastr.error("Failed to Added")
    });
   
  }

}
