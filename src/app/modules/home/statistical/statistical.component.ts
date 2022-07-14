import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { Chart } from "chart.js";
import { StatisticalService } from "../../../@core/services/statistical.service";
import { jobS } from "./data";
@Component({
  selector: "ngx-statistical",
  templateUrl: "./statistical.component.html",
  styleUrls: ["./statistical.component.scss"],
})
export class StatisticalComponent implements OnInit {
  [x: string]: any;
  monthchosse = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  todate = "";
  fromdate = "";
  total_view_job = "7";
  success_recruited_applicant = "1";
  total_apply = "16";
  
  ppRegFaile = "2";
  all_job = "8";
  jobFaile = "4";
  profileY = "2";
  profileN = "3";
  seachData: FormGroup;
  dataS = [];
  

  constructor(
    private formBuilder: FormBuilder,
    private statisticalService: StatisticalService
  ) {
    Object.assign(this, { jobS });
  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.seachData = this.formBuilder.group({
      month: "",
      dateS: "",
      dateE: "",
    });
  }

  getAllUserJe() {
    this.statisticalService.getStatistical(this.seachData.value).subscribe(
      (res) => {
        this.dataS = res;
        
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
  @ViewChild("mychart") mychart: any;
  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext("2d");

    new Chart(this.ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Số thành viên cần tuyển",
            data: [0, 20, 25, 30, 40, 50, 51],
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
