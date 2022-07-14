import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "ngx-profileUserP",
  templateUrl: "./profileUserP.component.html",
  styleUrls: ["./profileUserP.component.scss"],
})
export class ProfileUserPComponent implements OnInit {
  userDetail!: FormGroup;
  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {}
}
