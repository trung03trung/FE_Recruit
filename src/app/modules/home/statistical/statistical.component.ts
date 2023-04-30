import { formatDate } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { Chart } from "chart.js";
import { Statistical } from "../../../@core/models/statistical";
import { StatisticalService } from "../../../@core/services/statistical.service";
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from "ng-apexcharts";
import { PieChartOptions, job } from "../../../@core/models/job";
import { JobService } from "../../../@core/services/job.service";
import { Router } from "@angular/router";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};



@Component({
  selector: "ngx-statistical",
  templateUrl: "./statistical.component.html",
  styleUrls: ["./statistical.component.scss"],
})
export class StatisticalComponent implements OnInit {
  monthchosse = [2017, 2018, 2019, 2020, 2021,2022,2023];
  total_view_job = 0;
  success_recruited_applicant = 0;
  total_apply = 0;
  waiting_for_interview = 0;
  interviewing = 0;
  all_job = 0;
  month = 1;
  setdateS = "01012022";
  false_applicant = 0;
  jobFaile = "4";
  seachData: FormGroup;
  liveCharrt: any;
  jobs: any;
  myDate = new Date();
  cValue = formatDate(this.myDate, "ddMMyyyy", "en-US");

  statisticalObj: Statistical = new Statistical();
  lineChartObj: any;
  data: number[] = new Array();
  datapip: number[] = new Array();
  jobSa: String[] = new Array();
  statisList: Statistical[];
  @ViewChild("chart") columnChart: ChartComponent;
  public columnChartOptions: Partial<ChartOptions>;
  public pieChartOptions: Partial<PieChartOptions>;
  constructor(
    private formBuilder: FormBuilder,
    private statisticalService: StatisticalService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllUserJe();
    this.getDataLineChart();
    this.getDataColumnChart();
  }

  initForm() {
    this.seachData = this.formBuilder.group({
      dateend: new FormControl("20072023", [Validators.required]),
      datestart: new FormControl("01012022", [Validators.required]),
      month: new FormControl("1", [Validators.required]),
    });
  }
  dateS(event: any) {
    const s = event.target.value;
    const sx = s.split("-");
    this.seachData.value.datestart = sx[2] + sx[1] + sx[0];
    this.setdateS = this.seachData.value.datestart;
  }
  dateE(event: any) {
    if (!this.seachData.value.datestart) {
      this.seachData.value.datestart = "01012022";
    } else {
      this.seachData.value.datestart = this.setdateS;
    }
    const s = event.target.value;
    const sx = s.split("-");
    this.seachData.value.dateend = sx[2] + sx[1] + sx[0];
    console.log(this.seachData.value);

    this.getAllUserJe();
  }

  date() {
    if ((this.seachData.value.datestart = null)) {
      this.seachData.value.datestart = "20220101";
    }
    if ((this.seachData.value.dateend = null)) {
      this.seachData.value.dateend = "20231212";
    }
    console.log(this.seachData.value);

    this.statisticalService
      .getStatistical(this.seachData.value)
      .subscribe((res) => {});
  }

  getAllUserJe() {
    this.statisticalService.getStatistical(this.seachData.value).subscribe(
      (res) => {
        this.statisticalObj = res[0];
        console.log(this.statisticalObj);
        
        this.total_apply = this.statisticalObj.total_apply;
        this.success_recruited_applicant =
          this.statisticalObj.success_recruited_applicant;
          this.false_applicant = this.statisticalObj.false_applicant
          this.pieChartOptions = {
            series: [this.success_recruited_applicant,this.false_applicant],
            chart: {
              width: 500,
              type: "pie"
            },
            labels: ["Đã tuyển", "Thất bại"],
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };

          (this.data[0] = 5),
          (this.data[1] = 10),
          (this.data[2] = 11),
          (this.data[3] = 15),
          (this.data[4] = 12),
          (this.data[5] = 5),
          (this.data[6] = 10),
          (this.data[7] = 11),
          (this.data[8] = 15),
          (this.data[9] = 21),
          (this.data[10] = 15),
          (this.data[11] = 21);
      },
      (err) => {
        console.log("error while fetching data.");
      }
    );
  }

  getDataLineChart(){
    this.statisticalService.getDataLineChart().subscribe(
      (res) => {
        console.log(res);
        
      this.canvas = document.getElementById("myChart");
      this.ctx = this.canvas.getContext("2d");

    this.liveCharrt = new Chart(this.ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Số ứng viên tuyển thành công",
            data: res.numberSuccessJob,
            borderColor: "#007ee7",
            fill: true,
          },
          {
            label: "Số thành viên cần tuyển",
            data: res.numberRecruit,
            borderColor: "#FEB139",
            fill: true,
          },
        ],
        labels: res.month,
      },
    });
      }
    );
  }

  getDataColumnChart(){
    this.statisticalService.getDataColumnChart().subscribe(
      (res) => {
        console.log(res);
        
      this.columnChartOptions = {
      series: [
        {
          name: "Số lượng cần tuyển",
          data: res.totalRecruit
        },
        {
          name: "Số ứng viên ứng tuyển",
          data: res.numberApply
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories:res.languages
      },
      yaxis: {
      
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + " ứng viên";
          }
        }
      }
    };
      }
    );
  }
  
  selectMonth(month: number) {
    alert(month);
  }
  canvas: any;
  ctx: any;

  jobSalesMulti: any[];
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