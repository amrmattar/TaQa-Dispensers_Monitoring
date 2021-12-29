import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexFill,
  ApexGrid,
  ApexAnnotations,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStates,
  ApexTheme,
  ApexLegend,
} from 'ng-apexcharts';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';
import { StationService } from '../services/station/station.service';
import { environment } from 'src/environments/environment.prod';
export type ChartOptions = {
  chart: ApexChart;
  annotations: ApexAnnotations;
  colors: string[];
  dataLabels: ApexDataLabels;
  series: any;
  stroke: ApexStroke;
  labels: string[];
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: any;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  states: ApexStates;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  theme: ApexTheme;
  markers: any;
};
@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css'],
})
export class AlarmComponent implements OnInit {
  public barChart: Partial<ChartOptions>;
  public barChart2: Partial<ChartOptions>;
  public barChart3: Partial<ChartOptions>;
  public barChart4: Partial<ChartOptions>;
  public pieChart: Partial<ChartOptions>;
  public lineChart: Partial<ChartOptions>;
  public chartOptions: Partial<ChartOptions>;
  allStations = [
    { name: 'All', value: 3 },
    { name: 'Alarms', value: 1 },
    { name: 'Warnings', value: 2 },
  ];
  searchTypes = [
    { name: 'Class', value: 1 },
    { name: 'Category', value: 2 },
  ];
  classNames: any;
  searchTypeValue = 2;
  alarmReads: any;
  lastRead: any;
  state: any;
  allStatus: any;
  data: any;
  id: any;
  stationId: any;
  pieData: any;
  inChartRender = true;
  outChartRender = false;
  message: any;
  alramValue = 3;
  searchfilter2;
  searchfilter4;
  data2;
  alldata;
  constructor(
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private stationService: StationService,
    private http: HttpClient
  ) {
    this.barChart2 = {
      series: [
        {
          name: 'Status',
          data: [],
        },
      ],

      title: {
        text: 'Alarm Classcification',
        align: 'center',
      },
      chart: {
        height: 550,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // // console.log(chart, w, e)
          },
        },
      },
      colors: [
        '#008FFB',
        '#00E396',
        '#FEB019',
        '#FF4560',
        '#775DD0',
        '#546E7A',
        '#26a69a',
        '#D10CE8',
        '#008FFB',
      ],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return +val + '%';
          },
        },
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: [
              '#008FFB',
              '#00E396',
              '#FEB019',
              '#FF4560',
              '#775DD0',
              '#546E7A',
              '#26a69a',
              '#D10CE8',
              '#008FFB',
            ],
            fontSize: '12px',
          },
        },
      },
    };
    this.barChart3 = {
      series: [
        {
          name: 'Status',
          data: [],
        },
      ],

      title: {
        text: 'Alarm Classcification',
        align: 'center',
      },
      chart: {
        height: 550,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // // console.log(chart, w, e)
          },
        },
      },
      colors: [
        '#008FFB',
        '#00E396',
        '#FEB019',
        '#FF4560',
        '#775DD0',
        '#546E7A',
        '#26a69a',
        '#D10CE8',
        '#008FFB',
      ],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return +val + '%';
          },
        },
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: [
              '#008FFB',
              '#00E396',
              '#FEB019',
              '#FF4560',
              '#775DD0',
              '#546E7A',
              '#26a69a',
              '#D10CE8',
              '#008FFB',
            ],
            fontSize: '12px',
          },
        },
      },
    };
    this.barChart4 = {
      series: [
        {
          name: 'Status',
          data: [],
        },
      ],

      title: {
        text: 'Alarm Classcification',
        align: 'center',
      },
      chart: {
        height: 550,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // // console.log(chart, w, e)
          },
        },
      },
      colors: [
        '#008FFB',
        '#00E396',
        '#FEB019',
        '#FF4560',
        '#775DD0',
        '#546E7A',
        '#26a69a',
        '#D10CE8',
        '#008FFB',
      ],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return +val + '%';
          },
        },
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: [
              '#008FFB',
              '#00E396',
              '#FEB019',
              '#FF4560',
              '#775DD0',
              '#546E7A',
              '#26a69a',
              '#D10CE8',
              '#008FFB',
            ],
            fontSize: '12px',
          },
        },
      },
    };
    this.barChart = {
      series: [
        {
          name: 'Status',
          data: [],
        },
      ],
      title: {
        text: 'Compressor Status',
        align: 'center',
      },
      chart: {
        height: 550,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // // console.log(chart, w, e)
          },
        },
      },
      colors: [
        '#008FFB',
        '#00E396',
        '#FEB019',
        '#FF4560',
        '#775DD0',
        '#546E7A',
        '#26a69a',
        '#D10CE8',
        '#008FFB',
      ],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return +val + '%';
          },
        },
      },
      xaxis: {
        categories: [],
        labels: {
          formatter: function (val) {
            return val + '%';
          },
          style: {
            colors: [
              '#008FFB',
              '#00E396',
              '#FEB019',
              '#FF4560',
              '#775DD0',
              '#546E7A',
              '#26a69a',
              '#D10CE8',
              '#008FFB',
            ],
            fontSize: '12px',
          },
        },
      },
    };
    this.pieChart = {
      series: [],
      chart: {
        width: 480,
        type: 'pie',
      },
      labels: [],
      title: {
        text: 'Number of Warnings in Alarms',
        align: 'center',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
    this.lineChart = {
      series: [],
      chart: {
        height: 550,
        type: 'line',
      },
      title: {
        text: 'Compresor Status over the Day',
        align: 'center',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%',
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        type: 'datetime',
        categories: [],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return +val + '%';
          },
        },
      },
      legend: {
        position: 'right',
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    };
  }

  ngOnInit(): void {
    this.stationId = this._Activatedroute.paramMap.subscribe((params) => {
      // console.log(params);
      this.id = params.get('id');
    });
    this.getLastAlarm(this.id);
    this.getLastReadDefault(this.id);
    this.getAllStatus(this.id);
    //this.getGetLastAllAlarmsClass("M1");
    this.AllClassName();
  }
  getLastAlarm(id) {
    this.pieData = null;
    this.pieChart.series = [];
    this.pieChart.labels = [];

    this.barChart2.series = [
      {
        name: 'Status',
        data: [],
      },
    ];
    this.barChart2.xaxis.categories = [];
    this.stationService.getGetLastAlarms(id).subscribe((res) => {
      this.alarmReads = JSON.parse(JSON.stringify(res));
      this.pieChart.series.push(
        this.alarmReads.warningLowCount,
        this.alarmReads.warningHighCount
      );
      this.pieChart.labels.push('Warning Low', 'Warning High');
      this.alldata = this.alarmReads.compressors;
      this.alarmReads.pressures.forEach((element) => {
        if (this.alarmReads.alarmCounts2 != 0) {
          this.barChart2.series[0].data.push(
            (
              (element.percentage / this.alarmReads.alarmCounts2) *
              100
            ).toFixed()
          );
        } else {
          this.barChart2.series[0].data.push(0);
        }
        this.barChart2.xaxis.categories.push(element.className);
        // console.log(this.alarmReads);
      });
      this.pieData = this.barChart2.series[0].data;
      // console.log(this.pieData);
    });
  }
  getresetAllAlarm(type) {
    this.stationService.resetAlarm(this.id, type).subscribe((res) => {
      this.message = JSON.parse(JSON.stringify(res));
    });
  }
  getresetSpecific(id) {
    this.stationService.resetSpecific(id).subscribe((res) => {
      this.message = JSON.parse(JSON.stringify(res));
    });
  }
  AllClassName() {
    this.stationService.AllClassName().subscribe((res) => {
      this.classNames = JSON.parse(JSON.stringify(res));
    });
  }
  getLastAllAlarm(type) {
    this.pieData = null;
    this.pieChart.series = [];
    this.pieChart.labels = [];
    this.barChart2.series = [
      {
        name: 'Status',
        data: [],
      },
    ];
    this.barChart2.xaxis.categories = [];
    this.stationService.getGetLastAllAlarms(this.id, type).subscribe((res) => {
      this.alarmReads = JSON.parse(JSON.stringify(res));
      this.pieChart.series.push(
        this.alarmReads.warningLowCount,
        this.alarmReads.warningHighCount
      );
      this.pieChart.labels.push('Warning Low', 'Warning High');
      this.alldata = this.alarmReads.compressors;
      this.alarmReads.pressures.forEach((element) => {
        if (this.alarmReads.alarmCounts2 != 0) {
          this.barChart2.series[0].data.push(
            (
              (element.percentage / this.alarmReads.alarmCounts2) *
              100
            ).toFixed()
          );
        } else {
          this.barChart2.series[0].data.push(0);
        }
        this.barChart2.xaxis.categories.push(element.className);
        // console.log(this.barChart2);
      });
      this.pieData = this.barChart2.series[0].data;
      // console.log(this.pieData);
    });
  }

  // getGetLastAllAlarmsClass(type){
  //   this.pieData = null;
  //   this.barChart2.series = [
  //     {
  //       name: "Status",
  //       data: []
  //     }
  //   ];
  //   this.barChart2.xaxis.categories = [];
  //   this.barChart3.series = [
  //     {
  //       name: "Status",
  //       data: []
  //     }
  //   ];
  //   this.barChart3.labels = [];
  //   this.barChart4.series = [
  //     {
  //       name: "Status",
  //       data: []
  //     }
  //   ];
  //   this.barChart4.labels = [];
  //   // console.log(type);
  //   this.stationService.getGetLastAllAlarmsClass(this.id,type)
  //   .subscribe(
  //     (res) => {
  //       var alarmReads2 = JSON.parse(JSON.stringify(res));
  //       // console.log(alarmReads2);
  //       alarmReads2.pressures.forEach(element => {
  //         if(alarmReads2.alarmCounts2 != 0)
  //         {
  //           this.barChart2.series[0].data.push(((element.percentage/alarmReads2.alarmCounts2)*100).toFixed());
  //         }
  //         else
  //         {
  //           this.barChart2.series[0].data.push(0);
  //         }

  //        this.barChart2.xaxis.categories.push(element.className);
  //      });
  //      // console.log(this.barChart2);
  //      this.pieData = this.barChart2.series[0].data;

  //     }
  //   )
  // }
  getLastAllAlarmP() {
    this.pieData = null;
    this.pieChart.series = [];
    this.pieChart.labels = [];
    this.stationService.getGetLastAllAlarms(this.id, 1).subscribe((res) => {
      var alarmReads2 = JSON.parse(JSON.stringify(res));
      alarmReads2.pressures.forEach((element) => {
        this.barChart2.series[0].data.push(
          ((element.percentage / alarmReads2.alarmCounts2) * 100).toFixed()
        );
        this.barChart2.xaxis.categories.push(element.className);
      });
      // console.log(alarmReads2);
    });
  }
  getAllStations() {
    this.http.get(`${environment.sourceURL}/Stations`).subscribe((Response) => {
      this.allStations = JSON.parse(JSON.stringify(Response));
      // console.log(this.allStations);
      // this.routeSummary = data.routeSummary;
      //this.processesSummaryList = data.processesSummaryList;
    });
  }
  getLastReadDefault(id) {
    this.lastRead = [];
    this.stationService.getGetLastRead(id, 1).subscribe((res) => {
      this.lastRead = JSON.parse(JSON.stringify(res));
      if (this.lastRead.lastReadAlarm.operation_status == 0) {
        this.state = 'Offline';
      } else if (this.lastRead.lastReadAlarm.operation_status == 1) {
        this.state = 'Idle';
      } else if (this.lastRead.lastReadAlarm.operation_status == 2) {
        this.state = 'Starting';
      } else if (this.lastRead.lastReadAlarm.operation_status == 3) {
        this.state = 'Compression';
      } else if (this.lastRead.lastReadAlarm.operation_status == 4) {
        this.state = 'Recirculating';
      } else if (this.lastRead.lastReadAlarm.operation_status == 5) {
        this.state = 'Alarm';
      } else if (this.lastRead.lastReadAlarm.operation_status == 6) {
        this.state = 'Start delay';
      } else if (this.lastRead.lastReadAlarm.operation_status == 7) {
        this.state = 'Force';
      } else if (this.lastRead.lastReadAlarm.operation_status == 8) {
        this.state = 'Lockout';
      }
    });
  }
  getAllStatus(id) {
    this.data = null;
    this.barChart.series[0].data = [];
    this.barChart.xaxis.categories = [];
    this.stationService.getGetAllStatus(id).subscribe((res) => {
      this.allStatus = JSON.parse(JSON.stringify(res)).compressors;
      this.allStatus.forEach((element) => {
        this.barChart.series[0].data.push(
          ((element.noState / element.totalStateHourly) * 100).toFixed()
        );
        this.barChart.xaxis.categories.push(element.name);
      });

      JSON.parse(JSON.stringify(res)).compressors2.forEach((element, i) => {
        this.chartOptions.series.push({
          name: element.name,
          data: [],
        });
        element.status.forEach((ele, j) => {
          this.chartOptions.series[i].data.push(
            ((ele.noState / ele.totalStateHourly) * 100).toFixed()
          );
        });
      });
      JSON.parse(JSON.stringify(res)).compressors2[0].status.forEach(
        (element) => {
          this.chartOptions.xaxis.categories.push(
            new Date(element.timeStamp).setHours(
              new Date(element.timeStamp).getHours() + 2
            )
          );
        }
      );
      this.data = this.barChart.series;
    });
  }
  getTime(time) {
    return new Date(time).toLocaleString();
  }
  redirect() {
    this.router.navigate(['../detailed-station/' + this.id]);
  }
  changeTab2(tab) {
    if (tab.index == 0) {
      this.inChartRender = true;
      this.outChartRender = false;
    } else if (tab.index == 1) {
      this.inChartRender = false;
      this.outChartRender = true;
    }
  }
  searchfilter(e) {
    // console.log(e.target.value);

    if (typeof e == 'object') {
      this.searchfilter2 = e.target.value;
      if (e.target.value.length > 0) {
        this.alarmReads.compressors = this.alarmReads.compressors.filter((x) =>
          x.className.toLowerCase().includes(e.target.value.toLowerCase())
        );
        // console.log(this.alarmReads.compressors,this.alldata);
      } else {
        this.alarmReads.compressors = this.alldata;
        // console.log(this.alarmReads.compressors,this.alldata);
      }
    } else {
      if (e.length > 0) {
        this.alarmReads.compressors = this.alarmReads.compressors.filter((x) =>
          x.className.toLowerCase().includes(e.toLowerCase())
        );
      } else {
        this.alarmReads.compressors = this.alldata;
        // console.log(this.alarmReads.compressors,this.alldata);
      }
      return this.alarmReads.compressors;
      // console.log(this.alarmReads.compressors,this.alldata);
    }
  }
  searchfilter3(e) {
    // console.log( e.target.value);

    if (typeof e == 'object') {
      this.searchfilter4 = e.target.value;
      if (e.target.value.length > 0) {
        if (
          this.alarmReads.compressors.filter((x) =>
            x.classCode.toLowerCase().includes(e.target.value.toLowerCase())
          ).length == 0
        ) {
          if (this.id == 1) {
            this.alarmReads.compressors = [
              {
                id: 0,
                compressorCode: 'Most_Comp',
                className: null,
                classCode: null,
                name: null,
                noAlarms: 0,
                timeStamp: '0001-01-01T00:00:00',
                value: 0,
              },
            ];
          } else {
            this.alarmReads.compressors = [
              {
                id: 0,
                compressorCode: 'Rehab_Comp',
                className: null,
                classCode: null,
                name: null,
                noAlarms: 0,
                timeStamp: '0001-01-01T00:00:00',
                value: 0,
              },
            ];
          }
        } else {
          this.alarmReads.compressors = this.alarmReads.compressors.filter(
            (x) =>
              x.classCode.toLowerCase().includes(e.target.value.toLowerCase())
          );
        }
        // console.log(this.alarmReads.compressors,this.alldata);
      } else {
        this.alarmReads.compressors = this.alldata;
        // console.log(this.alarmReads.compressors,this.alldata);
      }
    } else {
      if (e.length > 0) {
        this.alarmReads.compressors = this.alarmReads.compressors.filter((x) =>
          x.classCode.toLowerCase().includes(e.toLowerCase())
        );
      } else {
        this.alarmReads.compressors = this.alldata;
        // console.log(this.alarmReads.compressors,this.alldata);
      }
      return this.alarmReads.compressors;
    }
  }
}
