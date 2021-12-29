import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StationService } from '../services/station/station.service';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
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
  selector: 'app-user-alert-settings',
  templateUrl: './user-alert-settings.component.html',
  styleUrls: ['./user-alert-settings.component.css'],
})
export class UserAlertSettingsComponent implements OnInit {
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
  id = null;
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
  alarms: any;
  SettingsForm: FormGroup;
  SettingsForm2: FormGroup;
  alarm = {
    name: '',
    type: '',
    threshold: 0.0,
    message: '',
    email: '',
  };
  idName: any;
  shift = 1;
  temp = [
    { value: 2, name: 'Inlet Pressure' },
    { value: 3, name: 'Oil Pressure' },
    { value: 4, name: 'Stage1 Pressure' },
    { value: 5, name: 'Stage2 Pressure' },
    { value: 6, name: 'Stage3 Pressure' },
    { value: 7, name: 'Stage4 Pressure' },
    { value: 8, name: 'Stage5 Pressure' },
    { value: 9, name: 'Discharge Temperature' },
    { value: 10, name: 'Oil Temperature' },
    { value: 11, name: 'Stage1 Temperature' },
    { value: 12, name: 'Stage2 Temperature' },
    { value: 13, name: 'Stage3 Temperature' },
    { value: 14, name: 'Stage4 Temperature' },
    { value: 15, name: 'Stage5 Temperature' },
  ];
  types = [
    { value: 2, name: '>' },
    { value: 3, name: '<' },
    { value: 4, name: '=' },
    { value: 5, name: '>=' },
    { value: 6, name: '<=' },
  ];
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _Activatedroute: ActivatedRoute,
    private stationService: StationService,
    private router: Router
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
    this.SettingsForm = this.formBuilder.group({
      name: [''],
      type: [''],
      thv: [''],
      message: [''],
      email: [''],
    });
    this.getAllStationsDefault();
  }
  get in() {
    return this.SettingsForm.controls;
  }
  getMaxMinRead2() {
    this.alarm.name = this.in.name.value;
    this.alarm.type = this.in.type.value;
    this.alarm.threshold = this.in.thv.value;
    this.alarm.message = this.in.message.value;
    this.alarm.email = this.in.email.value;

    this.stationService.NewAlarm(this.alarm).subscribe((res) => {
      // console.log(res);
      // if(res)
      // this.toastr.success('Hello world!', 'Toastr fun!');
    });
  }
  getAllStatus() {
    this.stationService.getGetAllStatus(this.id).subscribe((res) => {
      this.allStatus = JSON.parse(JSON.stringify(res)).compressors;
    });
  }
  getLastReadDefault() {
    this.lastRead = [];
    this.alarms = [];
    this.stationService.getGetLastRead(this.id, 1).subscribe((res) => {
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
  getAllStationsDefault() {
    this.allStations = [];
    this.stationService.getGetAllStations(1).subscribe((res) => {
      this.allStations = JSON.parse(JSON.stringify(res));
      // console.log(this.allStations);
    });
  }
  getLastAlarm() {
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
    this.stationService.getGetLastAlarms(this.id).subscribe((res) => {
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
  getLastAllAlarmDefault() {
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
    this.stationService.getGetLastAllAlarms(this.id, 1).subscribe((res) => {
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
    this.alarmReads = [];
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
  getTime(time) {
    return new Date(time).toLocaleString();
  }
}
