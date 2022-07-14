import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { Chart } from "chart.js";
import { productSales, productSalesMulti } from "./data";
@Component({
  selector: "ngx-statistical",
  templateUrl: "./statistical.component.html",
  styleUrls: ["./statistical.component.scss"],
})
export class StatisticalComponent implements OnInit {
  monthchosse = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  viewJob = "7";
  todate = "";
  fromdate = "";
  ppRegSuccess = "1";
  ppRegFaile = "2";
  JobPost = "8";
  PpPAplicants = "16";
  jobFaile = "4";
  profileY = "2";
  profileN = "3";
  seachData: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    Object.assign(this, { productSales, productSalesMulti });
  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.seachData = this.formBuilder.group({
      month: '',
      dateS: '',
      dateE: '',
    });
  }
  selectMonth(month: number){
      alert(month);
  };
  selectDateS(dateS: Date){
      alert(dateS);
  }
  selectDateE(dateE:Date){
      alert(dateE)
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
            data: [0, 20, 40, 50],
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
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
      },
    });
  }

  productSales: any[];
  productSalesMulti: any[];
  view: any[] = [600, 300];
  showLegend: boolean = true;
  showLabels: boolean = true;
  gradient: boolean = false;
  isDoughnut: boolean = true;
  legendPosition: string = "below";
  colorScheme = {
    domain: ["#704FC4", "#4B852C", "#B67A3D"],
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
