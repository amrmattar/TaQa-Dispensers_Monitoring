import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-control-room',
  templateUrl: './control-room.component.html',
  styleUrls: ['./control-room.component.css'],
})
export class ControlRoomComponent implements OnInit {
  public inChart: Partial<ChartOptions>;
  public outChart: Partial<ChartOptions>;
  public oilChart: Partial<ChartOptions>;
  public hourlyChart: Partial<ChartOptions>;
  public consumptionChart: Partial<ChartOptions>;
  public circleChart: Partial<ChartOptions>;

  inChartRender = false;
  outChartRender = false;
  oilChartRender = false;
  consumptionChartRender = true;
  vehicleData: any;

  valuesOfStation: any;
  ptReads: any;
  lastRead: any;
  state: string;
  data: any;
  alarms = [];
  alarmReads: any;
  tabIndex: 0;
  tabIndex1: 1;
  tabIndex2: 2;
  allStations: any;
  dateControl = new FormControl('');
  dateControl2 = new FormControl('');
  showSpinners: any;
  showSeconds: any;
  stepHour: any;
  stepMinute: any;
  stepSecond: any;
  touchUi: any;
  From: any;
  To: any;
  currentRead: any;
  maxMinRead: any;
  maxMinReadP: any;
  maxMinReadT: any;
  shiftFrom: any;
  shiftTo: any;
  interval: any;
  lastHour: any;
  noStation: any;
  settings: any;
  shift = 1;
  acc = null;
  dis = null;
  war = null;
  desc = null;

  onTabClick(index) {
    this.tabIndex = index;
    this.tabIndex1 = index;
    this.tabIndex2 = index;
  }
  // log()
  // {
  //   // console.log(this.selectedDate);
  // }

  constructor(
    private stationService: StationService,
    private http: HttpClient,
    private router: Router
  ) {
    this.inChart = {
      series: [
        {
          name: 'State',
          data: [],
        },
      ],
      chart: {
        height: 550,
        type: 'line',
      },
      title: {
        text: 'State Profile 1 = online, 0 = offline',
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
    this.outChart = {
      series: [
        {
          name: 'Pressure',
          data: [],
        },
        {
          name: 'Temprature',
          data: [],
        },
      ],
      chart: {
        height: 550,
        type: 'line',
      },
      title: {
        text: 'Compresor Out Pressure and Temprature',
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
    this.oilChart = {
      series: [
        {
          name: 'Pressure',
          data: [],
        },
        {
          name: 'Temprature',
          data: [],
        },
      ],
      chart: {
        height: 550,
        type: 'line',
      },
      title: {
        text: 'Compresor Oil Pressure and Temprature',
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
    this.hourlyChart = {
      series: [],
      chart: {
        height: 350,
        type: 'radar',
        toolbar: {
          show: false,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            customIcons: [],
          },
          export: {
            csv: {
              filename: undefined,
              columnDelimiter: ',',
              headerCategory: 'category',
              headerValue: 'value',
              dateFormatter(timestamp) {
                return new Date(timestamp).toDateString();
              },
            },
            svg: {
              filename: undefined,
            },
            png: {
              filename: undefined,
            },
          },
          autoSelected: 'zoom',
        },
      },

      plotOptions: {
        radar: {
          size: 140,
          polygons: {
            fill: {
              colors: ['#f8f8f8', '#fff'],
            },
          },
        },
      },

      colors: ['#009ACF', '#009ACF33'],
      markers: {
        size: 2,
        colors: ['#fff'],
        strokeColors: ['#FF4560'],
        strokeWidth: 2,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + ' ' + 'm3';
          },
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        tickAmount: 7,
        show: false,
      },
    };
    this.circleChart = {
      series: [70],
      chart: {
        height: 130,
        type: 'radialBar',
      },
      colors: ['#FF7F5C'],
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              fontSize: '20',
            },
          },
          hollow: {
            size: '70%',
          },
        },
      },
      labels: ['Cricket'],
    };
  }
  log(id) {
    // console.log(id);
  }
  ngOnInit(): void {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.getAllStationsVlaueDefault();
      //this.getAllStationsDefault();
    }, 20000);
    this.getAllStationsVlaueDefault();
    this.getAllStationsDefault();

    this.currentTime();
    this.currentTime2();
  }

  currentTime() {
    var date = new Date(); /* creating object of Date class */
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    hour = this.updateTime(hour);
    min = this.updateTime(min);
    sec = this.updateTime(sec);
    document.getElementById('clock').innerText =
      hour + ' : ' + min + ' : ' + sec; /* adding time to the div */
    var t = setTimeout(() => {
      this.currentTime();
    }, 1000); /* setting timer */
  }

  currentTime2() {
    var date = new Date(); /* creating object of Date class */
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    hour = this.updateTime(hour);
    min = this.updateTime(min);
    sec = this.updateTime(sec);
    document.getElementById('clock2').innerText =
      hour + ' : ' + min + ' : ' + sec; /* adding time to the div */
    var t = setTimeout(() => {
      this.currentTime2();
    }, 20000); /* setting timer */
  }

  updateTime(k) {
    if (k < 10) {
      return '0' + k;
    } else {
      return k;
    }
  }
  changeTab(tab) {
    if (tab.index == 0) {
      this.inChartRender = true;
      this.oilChartRender = false;
      this.outChartRender = false;
      this.consumptionChartRender = false;
    } else if (tab.index == 1) {
      this.inChartRender = false;
      this.oilChartRender = false;
      this.outChartRender = true;
      this.consumptionChartRender = false;
    } else if (tab.index == 2) {
      this.inChartRender = false;
      this.oilChartRender = true;
      this.outChartRender = false;
      this.consumptionChartRender = false;
    }
  }
  getCurrentRead() {
    this.stationService.getGetCurrentRead(1).subscribe((res) => {
      this.currentRead = JSON.parse(JSON.stringify(res));
    });
  }
  getMaxMinRead() {
    this.stationService.getGetMaxMinRead(1).subscribe((res) => {
      this.maxMinRead = JSON.parse(JSON.stringify(res));
    });
  }
  getMaxMinReadP() {
    this.stationService.getGetMaxMinReadP().subscribe((res) => {
      this.maxMinReadP = JSON.parse(JSON.stringify(res));
    });
  }
  getMaxMinReadT() {
    this.stationService.getGetMaxMinReadT().subscribe((res) => {
      this.maxMinReadT = JSON.parse(JSON.stringify(res));
    });
  }
  getConsumptionDataDefault() {
    this.data = null;
    this.vehicleData = null;
    this.stationService.getGetHourlyReads(1).subscribe((res) => {
      JSON.parse(JSON.stringify(res)).forEach((element, i) => {
        this.hourlyChart.series.push({
          name: element.name,
          data: [],
        });
        element.consumptions.forEach((ele) => {
          this.hourlyChart.series[i].data.push(ele.totalConsumption);
        });
      });
      JSON.parse(JSON.stringify(res))[0].consumptions.forEach((element) => {
        this.hourlyChart.xaxis.categories.push(
          new Date(element.timeStamp).getHours()
        );
      });
      this.vehicleData = this.hourlyChart.series[0].data;
      // console.log(this.hourlyChart);
    });
  }
  getConsumptionDataTime(time) {
    this.data = null;
    this.vehicleData = null;
    this.hourlyChart.series[0].data = [];
    this.hourlyChart.xaxis.categories = [];
    this.stationService.getGetHourlyReads(time).subscribe((res) => {
      if (time == 3) {
        JSON.parse(JSON.stringify(res)).forEach((element, i) => {
          this.hourlyChart.series.push({
            name: element.name,
            data: [],
          });
          element.consumptions.forEach((ele) => {
            this.hourlyChart.series[i].data.push(ele.totalConsumption);
          });
        });
        JSON.parse(JSON.stringify(res))[0].consumptions.forEach((element) => {
          this.hourlyChart.xaxis.categories.push(
            new Date(element.timeStamp).getDate()
          );
        });
        this.data = this.inChart.series[0].data;
        this.vehicleData = this.hourlyChart.series[0].data;
      } else {
        JSON.parse(JSON.stringify(res)).forEach((element, i) => {
          this.hourlyChart.series.push({
            name: element.name,
            data: [],
          });
          element.consumptions.forEach((ele) => {
            this.hourlyChart.series[i].data.push(ele.totalConsumption);
          });
        });
        JSON.parse(JSON.stringify(res))[0].consumptions.forEach((element) => {
          this.hourlyChart.xaxis.categories.push(
            new Date(element.timeStamp).getHours()
          );
        });

        this.vehicleData = this.hourlyChart.series[0].data;
      }
    });
  }
  getConsumptionDataDate(from, to) {
    this.data = null;
    this.vehicleData = null;
    this.hourlyChart.series[0].data = [];
    this.hourlyChart.xaxis.categories = [];
    this.stationService.getGetHourlyReadsDate(from, to).subscribe((res) => {
      JSON.parse(JSON.stringify(res)).forEach((element, i) => {
        this.hourlyChart.series.push({
          name: element.name,
          data: [],
        });
        element.consumptions.forEach((ele) => {
          this.hourlyChart.series[i].data.push(ele.totalConsumption);
        });
      });
      JSON.parse(JSON.stringify(res))[0].consumptions.forEach((element) => {
        this.hourlyChart.xaxis.categories.push(
          new Date(element.timeStamp).getDate()
        );
      });
      this.vehicleData = this.hourlyChart.series[0].data;
    });
  }
  getAllStationsVlaueDefault() {
    this.tabIndex = 0;
    this.stationService.getGetAllStationsVlaue(1).subscribe((res) => {
      this.valuesOfStation = JSON.parse(JSON.stringify(res));
      // console.log(this.valuesOfStation);
    });
  }
  getlastHourDefault() {
    this.tabIndex = 0;
    this.stationService.getGetAllStationsVlaue(1).subscribe((res) => {
      this.lastHour = JSON.parse(JSON.stringify(res)).lastHourTransaction;
      // console.log(this.valuesOfStation);
    });
    this.stationService.getGetAllStations(1).subscribe((res) => {
      this.noStation = JSON.parse(JSON.stringify(res)).length;
      // console.log(this.allStations);
    });
  }
  getAllStationsVlaueTime(time) {
    clearInterval(this.interval);
    this.stationService.getGetAllStationsVlaue(time).subscribe((res) => {
      this.valuesOfStation = JSON.parse(JSON.stringify(res));
      // console.log(this.valuesOfStation);
    });
  }
  getAllStationsVlaueDate(from, to) {
    clearInterval(this.interval);
    this.stationService
      .getGetAllStationsVlaueDate(from, to)
      .subscribe((res) => {
        this.valuesOfStation = JSON.parse(JSON.stringify(res));
        // console.log(this.valuesOfStation);
      });
  }

  // getPTReadsDefault(){
  //   this.tabIndex = 0;
  //   this.ptReads = [];
  //   this.data=null;

  //   this.inChart.series[0].data = [];
  //   this.inChart.series[1].data = [];
  //   this.inChart.xaxis.categories = [];

  //   this.outChart.series[0].data = [];
  //   this.outChart.series[1].data = [];
  //   this.outChart.xaxis.categories = [];

  //   this.oilChart.series[0].data = [];
  //   this.oilChart.series[1].data = [];
  //   this.oilChart.xaxis.categories = [];

  //   this.stationService.getGetPTReads(1)
  //   .subscribe(
  //     (res) => {
  //       this.ptReads = JSON.parse(JSON.stringify(res));
  //       this.ptReads.ptReads.forEach(element => {
  //         this.inChart.series[0].data.push(element.in_Pressure);
  //         this.inChart.series[1].data.push(element.in_Temprature);

  //         this.outChart.series[0].data.push(element.out_Pressure);
  //         this.outChart.series[1].data.push(element.out_Temprature);

  //         this.oilChart.series[0].data.push(element.oil_Pressure);
  //         this.oilChart.series[1].data.push(element.oil_Temprature);

  //         this.inChart.xaxis.categories.push(new Date(element.timeStamp).setHours( new Date(element.timeStamp).getHours() + 2 ));
  //         this.outChart.xaxis.categories.push(new Date(element.timeStamp).setHours( new Date(element.timeStamp).getHours() + 2 ));
  //         this.oilChart.xaxis.categories.push(new Date(element.timeStamp).setHours( new Date(element.timeStamp).getHours() + 2 ));
  //       });
  //       this.data = this.inChart.series[0].data;
  //       // console.log(this.ptReads);
  //     }
  //   )
  // }
  // getPTReadsTime(time){
  //   this.ptReads = [];
  //   this.data=null;

  //   this.inChart.series[0].data = [];
  //   this.inChart.series[1].data = [];
  //   this.inChart.xaxis.categories = [];

  //   this.outChart.series[0].data = [];
  //   this.outChart.series[1].data = [];
  //   this.outChart.xaxis.categories = [];

  //   this.oilChart.series[0].data = [];
  //   this.oilChart.series[1].data = [];
  //   this.oilChart.xaxis.categories = [];

  //   this.stationService.getGetPTReads(time)
  //   .subscribe(
  //     (res) => {
  //       this.ptReads = JSON.parse(JSON.stringify(res));
  //       this.ptReads.ptReads.forEach(element => {
  //         this.inChart.series[0].data.push(element.in_Pressure);
  //         this.inChart.series[1].data.push(element.in_Temprature);

  //         this.outChart.series[0].data.push(element.out_Pressure);
  //         this.outChart.series[1].data.push(element.out_Temprature);

  //         this.oilChart.series[0].data.push(element.oil_Pressure);
  //         this.oilChart.series[1].data.push(element.oil_Temprature);

  //         this.inChart.xaxis.categories.push(element.timeStamp);
  //         this.outChart.xaxis.categories.push(element.timeStamp);
  //         this.oilChart.xaxis.categories.push(element.timeStamp);
  //       });
  //       this.data = this.inChart.series[0].data;
  //       // console.log(this.ptReads);
  //     }
  //   )
  // }

  // getPTReadsDate(from,to){
  //   this.ptReads = [];
  //   this.data=null;

  //   this.inChart.series[0].data = [];
  //   this.inChart.series[1].data = [];
  //   this.inChart.xaxis.categories = [];

  //   this.outChart.series[0].data = [];
  //   this.outChart.series[1].data = [];
  //   this.outChart.xaxis.categories = [];

  //   this.oilChart.series[0].data = [];
  //   this.oilChart.series[1].data = [];
  //   this.oilChart.xaxis.categories = [];

  //   this.stationService.getGetPTReadsDate(from,to)
  //   .subscribe(
  //     (res) => {
  //       this.ptReads = JSON.parse(JSON.stringify(res));
  //       this.ptReads.ptReads.forEach(element => {
  //         this.inChart.series[0].data.push(element.in_Pressure);
  //         this.inChart.series[1].data.push(element.in_Temprature);

  //         this.outChart.series[0].data.push(element.out_Pressure);
  //         this.outChart.series[1].data.push(element.out_Temprature);

  //         this.oilChart.series[0].data.push(element.oil_Pressure);
  //         this.oilChart.series[1].data.push(element.oil_Temprature);

  //         this.inChart.xaxis.categories.push(new Date(element.timeStamp).setHours( new Date(element.timeStamp).getHours() + 2 ));
  //         this.outChart.xaxis.categories.push(new Date(element.timeStamp).setHours( new Date(element.timeStamp).getHours() + 2 ));
  //         this.oilChart.xaxis.categories.push(new Date(element.timeStamp).setHours( new Date(element.timeStamp).getHours() + 2 ));
  //       });
  //       this.data = this.inChart.series[0].data;
  //       // console.log(this.ptReads);
  //     }
  //   )
  // }
  getLastReadDefault() {
    this.tabIndex = 0;
    this.lastRead = [];
    this.alarms = [];
    this.stationService.getGetLastRead(1, 1).subscribe((res) => {
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
  getLastReadtime(time) {
    clearInterval(this.interval);
    this.lastRead = [];
    this.alarms = [];
    this.stationService.getGetLastRead(1, time).subscribe((res) => {
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

  redirect(id) {
    this.router.navigate(['../detailed-station/' + id]);
  }
  redirect2(id) {
    this.router.navigate(['../alarm/' + id]);
  }
  getAllStationsDefault() {
    this.allStations = [];
    this.stationService.getGetAllStations(1).subscribe((res) => {
      this.allStations = JSON.parse(JSON.stringify(res));
      // console.log(this.allStations);
    });
    // this.stationService.SettingTargets()
    // .subscribe(
    //   (res) => {
    //     this.settings = JSON.parse(JSON.stringify(res));
    //     // console.log(this.settings);
    //   }
    // )
  }

  redirect3() {
    this.router.navigate(['../settings-target']);
  }
  getAllStationsDefaultId(id) {
    this.inChart.series[0].data = [];
    this.inChart.xaxis.categories = [];
    this.vehicleData = null;

    if (id == 1) {
      this.allStations[0].statuses.forEach((element) => {
        this.inChart.series[0].data.push(element.status);
        this.inChart.xaxis.categories.push(element.timeStamp);
      });
      this.vehicleData = this.inChart.series[0].data;
    } else if (id == 2) {
      this.allStations[1].statuses.forEach((element) => {
        this.inChart.series[0].data.push(element.status);
        this.inChart.xaxis.categories.push(element.timeStamp);
      });
      this.vehicleData = this.inChart.series[0].data;
    }
  }
  getAllStationsTime(time) {
    clearInterval(this.interval);
    this.allStations = [];
    this.stationService.getGetAllStations(time).subscribe((res) => {
      this.allStations = JSON.parse(JSON.stringify(res));
      // console.log(this.allStations);
    });
  }
  getAllStationsDate(from, to) {
    clearInterval(this.interval);
    this.allStations = [];
    this.stationService.getGetAllStationsDate(from, to).subscribe((res) => {
      this.allStations = JSON.parse(JSON.stringify(res));
      // console.log(this.allStations);
    });
  }
  DateChange(time) {
    return new Date(time).toLocaleString();
  }
  getTime(time) {
    return new Date(time).toDateString();
  }
  getTimeDiff(time, time2) {
    if (new Date(time).getDate() == new Date(time2).getDate()) {
      return true;
    } else {
      return false;
    }
  }
  fromDate(ee) {
    this.From = new Date(
      ee.value.setHours(new Date(ee.value).getHours() + 2)
    ).toISOString();

    // console.log(this.From);
  }
  shiftFromToday(ee) {
    this.shiftFrom = new Date(
      new Date().setHours(parseInt(ee) + 2, 0, 0)
    ).toISOString();
    // console.log(this.shiftFrom);
  }
  shiftToToday(ee) {
    this.shiftTo = new Date(
      new Date().setHours(parseInt(ee) + 2, 0, 0)
    ).toISOString();
    this.getAllStationsDate(
      this.shiftFrom.substring(0, this.shiftFrom.length - 1),
      this.shiftTo.substring(0, this.shiftTo.length - 1)
    );

    // console.log(this.shiftTo);
  }
  toDate(ee) {
    this.To = new Date(
      ee.value.setHours(new Date(ee.value).getHours() + 2)
    ).toISOString();

    this.getAllStationsDate(
      this.From.substring(0, this.From.length - 1),
      this.To.substring(0, this.To.length - 1)
    );
  }
  widthNow(width) {
    return width;
  }
  sortArr(arr, val) {
    if (val == 1 && this.acc != null) {
      arr.sort(function (a, b) {
        return b.alarmCounts - a.alarmCounts;
      });
    } else if (val == 1 && this.acc == null) {
      arr.sort(function (a, b) {
        return a.alarmCounts - b.alarmCounts;
      });
    } else if (val == 2 && this.war != null) {
      arr.sort(function (a, b) {
        return b.warningCounts - a.warningCounts;
      });
    } else if (val == 2 && this.war == null) {
      arr.sort(function (a, b) {
        return a.warningCounts - b.warningCounts;
      });
    } else if (val == 3 && this.dis != null) {
      arr.sort(function (a, b) {
        return b.noActiveDispenser - a.noActiveDispenser;
      });
    } else if (val == 3 && this.dis == null) {
      arr.sort(function (a, b) {
        return a.noActiveDispenser - b.noActiveDispenser;
      });
    }
  }
}
