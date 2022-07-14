import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { Chart } from "chart.js";
import { Statistical } from "../../../@core/models/statistical";
import { TimeForm } from "../../../@core/models/timeForm";
import { StatisticalService } from "../../../@core/services/statistical.service";
import { jobS } from "./data";
@Component({
  selector: "ngx-statistical",
  templateUrl: "./statistical.component.html",
  styleUrls: ["./statistical.component.scss"],
})
export class StatisticalComponent implements OnInit {
  monthchosse = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  total_view_job = "";
  success_recruited_applicant = "";
  total_apply = "";
  waiting_for_interview = "";
  interviewing = "";
  all_job = "";
  statisticalObj: Statistical = new Statistical();
  data: number[] = new Array();
  jobSa: String[] = new Array();
  timeForm: TimeForm = new TimeForm();
  statisList: Statistical[];

  ppRegFaile = "6";
  jobFaile = "4";
  profileY = "2";
  profileN = "3";
  seachData: FormGroup;
  liveCharrt: any;

  constructor(
    private formBuilder: FormBuilder,
    private statisticalService: StatisticalService
  ) {
    Object.assign(this, { jobS });
  }
  ngOnInit(): void {
    this.initForm();
    this.chart();
    this.getAllUserJe();
    //console.log(this.liveCharrt.data);
  }

  initForm() {
    this.seachData = this.formBuilder.group({
      dateend: new FormControl("", [Validators.required]),
      datestart: new FormControl("", [Validators.required]),
      month: new FormControl("", [Validators.required]),
    });
  }

  getAllUserJe() {
    //console.log(this.seachData.value);

    this.statisticalService.getStatistical(this.seachData.value).subscribe(
      (res) => {
        this.statisticalObj = res[0];
        (this.data[0] = 5),
          (this.data[1] = 10),
          (this.data[2] = 11),
          (this.data[3] = 15),
          (this.data[4] = 21);
        //console.log(this.data);
      },
      (err) => {
        console.log("error while fetching data.");
      }
    );
  }
  selectMonth(month: number) {
    alert(month);
  }
  selectDateS(dateS: Date) {
    alert(dateS);
  }
  selectDateE(dateE: Date) {
    alert(dateE);
  }

  canvas: any;
  ctx: any;
  // @ViewChild("mychart") mychart: any;
  chart() {
    this.canvas = document.getElementById("myChart");
    this.ctx = this.canvas.getContext("2d");

    this.liveCharrt = new Chart(this.ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Số thành viên cần tuyển",
            data: this.data,
            borderColor: "#007ee7",
            fill: true,
          },
          {
            label: "Số ứng viên tuyển thành công",
            data: [0, 10, 20, 30, 40, 50, 60],
            borderColor: "#FEB139",
            fill: true,
          },
        ],
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      },
    });
  }

  jobS: any[];
  jobSalesMulti: any[];
  view: any[] = [600, 300];
  showLegend: boolean = true;
  showLabels: boolean = true;
  gradient: boolean = false;
  isDoughnut: boolean = true;
  legendPosition: string = "below";
  colorScheme = {
    domain: [
      "#704FC4",
      "#4B852C",
      "#B67A3D",
      "#CA4E79",
      "#FFF80A",
      "#293462",
      "#7A86B6",
      "377D71",
    ],
  };
  onActivate(data): void {
    console.log("Activate", JSON.parse(JSON.stringify(data)));
  }
  onDeactivate(data): void {
    console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }
  onSelect(data): void {
    console.log("Item clicked", JSON.parse(JSON.stringify(data)));
  }
}
