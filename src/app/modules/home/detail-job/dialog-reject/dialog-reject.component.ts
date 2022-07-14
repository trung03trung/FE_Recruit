import { Component, DoCheck, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators ,FormBuilder} from "@angular/forms";
import { Users } from "../../../../@core/models/user";
import { JobService } from "../../../../@core/services/job.service";
import { ToastrService } from "ngx-toastr";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Toaster } from "ngx-toast-notifications";

@Component({
  selector: 'ngx-dialog-reject',
  templateUrl: './dialog-reject.component.html',
  styleUrls: ['./dialog-reject.component.scss']
})
export class DialogRejectComponent implements OnInit {
  code='Đã từ chối';
  formReason=new FormGroup({
    name:new FormControl(""),
  })
  constructor(private jobService: JobService,
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<DialogRejectComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private toaster:Toaster,) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.formReason=this.fb.group({
      name:["",Validators.required]
    })
  }
  rejectJob(){
    console.log(this.code)
    this.jobService.rejectJob(this.data.id,this.code,this.formReason.controls.name.value).subscribe((data) => {
      if (data != null) {
        this.showToaster('Từ chối duyệt thàng công','success');
      }
      else
      this.showToaster('Từ chối duyệt thất bại','danger');
    });
  }
  onNoClick(){
    this.dialogRef.close()
  }
  showToaster(message: string,typea:any) {
    const type = typea;
    this.toaster.open({
      text: message,
      caption: 'Thành công',
      type: type,
      duration: 3000
    });
  }

}
