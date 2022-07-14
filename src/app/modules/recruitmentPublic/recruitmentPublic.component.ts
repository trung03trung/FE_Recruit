import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "ngx-recruitment-public",
  templateUrl: "./recruitmentPublic.component.html",
  styleUrls: ["./recruitmentPublic.component.scss"],
})
export class recruitmentPublicComponent implements OnInit {
  userDetail!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {}
}
