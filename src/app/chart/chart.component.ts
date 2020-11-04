import { Component, OnInit } from '@angular/core';
import { Test } from '../dto/test'
import { TestStock } from '../dto/testStock';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chartTestStock: TestStock;
  dataset: Test[];
  testStocks: TestStock[];
  data: Test[];
  names: string[] = [];
  name: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getTest().subscribe(
      data => {
        this.data = data.tests;
        this.data.forEach(element => {
          if (!(this.names.indexOf(element.name) > -1)) {
            this.names.push(element.name);
          }
        });
      }
    )
    this.userService.getStockTest().subscribe(
      data => {
        this.testStocks = data;
      },
      err => {
        console.log(err);
      }
    )
  }
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'bar';

  refreshChart(name: string) {
    this.name = name;
    this.dataset = [];
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].name == name) {
        this.dataset.push(this.data[i]);
      }
    }
    this.lineChartData = [];
    for (var i = 0; i < this.dataset.length; i++) {
      this.lineChartData.push(
        { data: [this.dataset[i].apiTime, this.dataset[i].applicationTime, this.dataset[i].databaseTime], label: '' + this.dataset[i].endpoint.endpoint }
      )
    }
    this.lineChartLabels = ['Api time', 'App time', 'DB time'];

    var testStocksDataSet = this.testStocks.filter(
      test => test.name === this.name
    );
    this.chartTestStock = new TestStock();
    this.chartTestStock.name = this.name;
    this.chartTestStock.databaseTime = 0;
    this.chartTestStock.applicationTime = 0;
    for (let test of testStocksDataSet) {
      this.chartTestStock.databaseTime += test.databaseTime;
      this.chartTestStock.applicationTime += test.applicationTime;
    }
    this.chartTestStock.databaseTime = Math.round(this.chartTestStock.databaseTime / testStocksDataSet.length);
    this.chartTestStock.applicationTime = Math.round(this.chartTestStock.applicationTime / testStocksDataSet.length);
  }
}
