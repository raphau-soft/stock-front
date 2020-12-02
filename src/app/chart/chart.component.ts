import { Component, OnInit } from '@angular/core';
import { Test } from '../dto/test'
import { TestStock } from '../dto/testStock';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { UserService } from '../_services/user.service';
import { jsPDF } from 'jspdf';
import { ExcelData } from '../dto/excelData'
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chartTestStock: TestStock;
  dataset: Test[];
  excelData: ExcelData[];
  testStocks: TestStock[];
  data: Test[];
  names: string[] = [];
  name: string = '';

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
  lineChartData2: ChartDataSets[] = [];
  lineChartData3: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  lineChartLabels2: Label[] = [];
  lineChartLabels3: Label[] = [];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'bar';


  captureScreen() {  
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  

    var chart1=document.getElementById("chart1") as HTMLCanvasElement;
    var data1=chart1.toDataURL("image/png");

    var chart2=document.getElementById("chart2") as HTMLCanvasElement;
    var data2=chart2.toDataURL("image/png");

    var chart3=document.getElementById("chart3") as HTMLCanvasElement;
    var data3=chart3.toDataURL("image/png");

    let width1 = 208;
    let height1 = width1 * chart1.offsetHeight / chart1.offsetWidth;
    let width2 = 150;
    let height2 = width2 * chart2.offsetHeight / chart2.offsetWidth;
    let width3 = 58;
    let height3 = width3 * chart3.offsetHeight / chart3.offsetWidth;

    pdf.addImage(data1, 'PNG', 0, 0, width1, height1);
    pdf.addImage(data2, 'PNG', 0, height1, width2, height2);
    pdf.addImage(data3, 'PNG', 0, height1 + height2, width3, height3);
    pdf.save(this.name + ".pdf"); // Generated PDF    
  }  

  // exportToExcel(){
  //   let element = document.getElementById('excel-table'); 
  //   const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   XLSX.writeFile(wb, this.name + ".xlsx");
  // }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public exportExcel(): void {
    this.excelData = [];
    for(let i = 0; i < this.dataset.length; i++){
      this.excelData.push(new ExcelData(i + 1, this.dataset[i].endpoint.endpoint, this.dataset[i].apiTime, this.dataset[i].applicationTime, this.dataset[i].databaseTime, this.dataset[i].numberOfRequests));
    }
    this.excelData.push(new ExcelData(this.dataset.length + 1, "transaction", 0, this.chartTestStock.applicationTime, this.chartTestStock.databaseTime, 0));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.excelData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, this.name);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }
  
  refreshChart(name: string) {
    this.name = name;
    this.dataset = [];
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].name == name) {
        this.dataset.push(this.data[i]);
      }
    }
    this.lineChartData = [];
    this.lineChartData2 = [];
    for (var i = 0; i < this.dataset.length; i++) {
      this.lineChartData.push(
        { data: [this.dataset[i].apiTime, this.dataset[i].applicationTime, this.dataset[i].databaseTime], label: '' + this.dataset[i].endpoint.endpoint }
      )
      this.lineChartData2.push(
        { data: [this.dataset[i].numberOfRequests], label: '' + this.dataset[i].endpoint.endpoint }
      )
    }
    this.lineChartLabels = ['Api time', 'App time', 'DB time'];
    this.lineChartLabels2 = ['Number of requests'];
    this.lineChartLabels3 = ['Aplication time', 'Database time'];

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
    this.lineChartData3 = [];
    this.lineChartData3.push(
      { data: [this.chartTestStock.applicationTime, this.chartTestStock.databaseTime], label: 'Transaction'}
    )
  }
}
