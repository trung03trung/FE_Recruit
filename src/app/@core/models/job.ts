import { ApexChart, ApexNonAxisChartSeries, ApexResponsive } from "ng-apexcharts";
import { Users } from "./user";
import { User } from "./user.model";

export class job{
    id?: number;
    name?:String;
    jobPosition?:
        {
            id: number;
            code: String;
            description: String;
            isDelete: boolean;
        };
    numberExperience?: String;
    workingForm?: 
        {
            id: number;
            code: String;
            description: String;
            isDelete: boolean;
        }
    
    addressWork?: String;
    academicLevel?: 
        {
            id: number;
            code: String;
            description: String;
            isDelete: boolean;
        }
    rank?: 
        {
            id: number;
            code: String;
            description: String;
            isDelete: boolean;
        }
    qtyPerson?: number;
    startDate?: Date;
    dueDate?: Date;
    skills?: String;
    description?: String;
    interest?: String;
    jobRequirement?: String;
    salaryMin?: number;
    salaryMax?: number;
    userContact?: Users;
    userCreate?: Users;
    createdDate?: Date;
    userUpdate?: Users;
    statusJob?: 
        {
            id: number;
            code: String;
            description: String;
            isDelete: boolean;
        }
    views?: number;
    isDelete?: boolean;
    interrest?:String;
    company?:
    {
        avatar: string;
        description: string;
    }

}
export type PieChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
  };