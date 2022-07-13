import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Chart } from 'chart.js';
@Component({
  selector: "ngx-statistical",
  templateUrl: "./statistical.component.html",
  styleUrls: ["./statistical.component.scss"],
})

export class StatisticalComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}
