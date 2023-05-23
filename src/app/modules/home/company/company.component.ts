import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Toaster } from "ngx-toast-notifications";
import { Company } from "../../../@core/models/company";
import { CompanyService } from "../../../@core/services/company.service";

@Component({
  selector: "ngx-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.scss"],
})
export class CompanyComponent implements OnInit {
  [x: string]: any;
  idCompany = 1;
  companyD: Company = new Company();
  filetoUpload:any;
  dbImage: any;
  filea:File;
  companyDetail = new FormGroup({
    name:new FormControl(""),
    email:new FormControl(""),
    hotLine:new FormControl(""),
    dateIncoporation:new FormControl(""),
    description: new FormControl(""),
    avatar:new FormControl(""),
    headOffice:new FormControl(""),
    numberStaff:new FormControl(""),
    backdropImg:new FormControl(""),
    linkWeb:new FormControl(""),
  });
  constructor(
    private toaster: Toaster,
    private companyService: CompanyService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCompany();
  }
  initForm() {
    this.companyDetail = this.formBuilder.group({
      name: new FormControl("", [Validators.required,Validators.maxLength(50)]),
      email: new FormControl("", [Validators.required,Validators.email]),
      hotLine: new FormControl("", [Validators.required,Validators.pattern("(84|0[3|5|7|8|9])+([0-9]{8})\\b"),]),
      dateIncoporation: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required,Validators.maxLength(2000),Validators.minLength(20)]),
      avatar: new FormControl("", [Validators.required,Validators.maxLength(100)]),
      headOffice: new FormControl("", [Validators.required,Validators.maxLength(100)]),
      numberStaff: new FormControl("", [Validators.required,Validators.maxLength(100)]),
      backdropImg: new FormControl("", [Validators.required,Validators.maxLength(100)]),
      linkWeb: new FormControl("", [Validators.required,Validators.maxLength(100)]),
    });
  }


  getCompany() {
    this.companyService.getCompanyById(this.idCompany).subscribe((data) => {
      this.companyD = data;
      this.infoCompany(this.companyD);
    });
  }

  updateCompany() {
    const formData=new FormData();
    var datestr = (new Date(this.companyDetail.controls.dateIncoporation.value)).toUTCString();
    formData.append("avatar",this.filea,this.filea.name)
    formData.append("name",this.companyDetail.controls.name.value)
    formData.append("email",this.companyDetail.controls.email.value)
    formData.append("hotLine",this.companyDetail.controls.hotLine.value)
    formData.append("dateIncoporation",datestr)
    formData.append("description",this.companyDetail.controls.description.value)
    formData.append("headOffice",this.companyDetail.controls.headOffice.value)
    formData.append("numberStaff",this.companyDetail.controls.numberStaff.value)
    formData.append("backdropImg",this.companyDetail.controls.backdropImg.value)
    formData.append("linkWeb",this.companyDetail.controls.linkWeb.value)
 
    this.companyService.createCompany(formData).subscribe(
      (data) => {
        this.getCompany();
        if (data.statusCode == "OK") {
          this.showToaster("Thêm mới thành công.", "success");
        }
        if (data.statusCode == "NOT_FOUND") {
          this.showToaster("Thay đổi không thành công.", "danger");
        }
      },
      (error) => {
        console.log(error);
        if (
          error.status == "500" ||
          error.status == "400" ||
          error.statusCode == "NOT_FOUND"
        ) {
          this.showToaster("Thay đổi không thành công.", "danger");
        }
      }
    );
  }
  
  onSelect(file: File) {
    this.fileToUpload = file[0];
    this.filea=file[0];
     console.log(this.filea);
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (event) => {
      this.dbImage = event.target.result;
      console.log(this.dbImage)
    };
   
  }

  showToaster(message: string, typea: any) {
    const type = typea;
    this.toaster.open({
      text: message,
      caption: "Status",
      type: type,
      duration: 3000,
    });
  }
}
