import { Component, OnInit } from '@angular/core';
import { Test } from '../dto/test'
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  data: Test[];
  names: string[] = [];
  name: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getTest().subscribe(
      data => {
        this.data = data.tests;
        this.data.forEach(element => {
          if(!(this.names.indexOf(element.name) > -1)){
            this.names.push(element.name);
          }
        });
        this.refreshChart(this.names[0]);
      }
    )
  }

  lineChartData: ChartDataSets[]=[];

  lineChartLabels: Label[]=[];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[]=[];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'bar';

  refreshChart(name: string){
    this.name = name;
    var dataset = [];
    for(var i = 0; i < this.data.length; i++){
      if(this.data[i].name == name){
        dataset.push(this.data[i]);
      }
    }
    this.lineChartData = [];
    for(var i = 0; i < dataset.length; i++){
      console.log(dataset[i]);
      this.lineChartData.push(
        {data: [dataset[i].apiTime, dataset[i].applicationTime, dataset[i].databaseTime], label: '' + dataset[i].endpoint.endpoint}
      )
    }
    this.lineChartLabels = ['Api time', 'App time', 'DB time'];
  }

}
