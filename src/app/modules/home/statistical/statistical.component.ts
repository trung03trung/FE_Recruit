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
import { saveAs } from 'file-saver';

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
  isDateEnd = false;
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
      dateend: new FormControl("2023-12-30", [Validators.required]),
      datestart: new FormControl("2022-01-01", [Validators.required]),
      month: new FormControl("1", [Validators.required]),
    });
  }
  


  getAllUserJe() {
    this.statisticalService.getStatistical(this.seachData.value).subscribe(
      (res) => {
        this.statisticalObj = res[0];
        
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
      },
      (err) => {
        console.log("error while fetching data.");
      }
    );
  }

  getDataLineChart(){
    this.statisticalService.getDataLineChart(this.seachData.value).subscribe(
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
    this.statisticalService.getDataColumnChart(this.seachData.value).subscribe(
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
  onSubmit(){
    this.getAllUserJe();
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
  
  exportExcelFile(){
    this.statisticalService.exportData(this.seachData.value).subscribe(res => {
      const fileName = res.headers.get('Content-Disposition').split('=')[1];
      saveAs(new Blob([res.body]), fileName);
    });
  }
 
  more(){
    window.open("http://localhost:3000/d/eJaN5T_Vz/recruit?orgId=1&from=1686196517705&to=1686198317705&kiosk=tv", "_blank");
  }
}