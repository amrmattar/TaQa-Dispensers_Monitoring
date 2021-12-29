import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
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
import { StationService } from '../../services/station/station.service';
import { environment } from 'src/environments/environment.prod';
//import { FormGroup, FormControl } from '@angular/forms';
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
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.css'],
})
export class DashboardCardsComponent implements OnInit {
  public inChart: Partial<ChartOptions>;
  public outChart: Partial<ChartOptions>;
  public oilChart: Partial<ChartOptions>;
  public hourlyChart: Partial<ChartOptions>;
  public consumptionChart: Partial<ChartOptions>;
  public circleChart: Partial<ChartOptions>;

  public trasnactionChart: Partial<ChartOptions>;
  public salesChart: Partial<ChartOptions>;
  public valueChart: Partial<ChartOptions>;

  totalSales = true;
  transCount = true;
  totalVal = true;
  maxTransCount = true;
  compStatus = true;
  inChartRender = false;
  outChartRender = false;
  oilChartRender = false;
  consumptionChartRender = true;
  vehicleData: any;
  toppings: FormGroup;
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
  fb: FormBuilder;
  pre: any;
  shift = 1;
  graph = 1;

  trasnactionRender = false;
  salesRender = true;
  valueRender = false;

  trasnactionData = null;
  salesData = null;
  valueData = null;
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
    fb: FormBuilder,
    private stationService: StationService,
    private http: HttpClient,
    private router: Router
  ) {
    // console.log(router.url);
    this.toppings = fb.group({
      totalSales: true,
      transCount: true,
      totalVal: true,
      maxTransCount: true,
      compStatus: true,
    });

    this.inChart = {
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
        text: 'Compresor In Pressure and Temprature',
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
    this.trasnactionChart = {
      series: [
        {
          name: 'Total Trasnaction',
          data: [],
        },
      ],
      chart: {
        height: 280,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // // console.log(chart, w, e)
          },
        },
      },
      colors: ['#FF7F5C'],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
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
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: ['#FF7F5C'],
            fontSize: '12px',
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + ' ' + 'v/h';
          },
        },
      },
    };
    this.salesChart = {
      series: [
        {
          name: 'Total Sales',
          data: [],
        },
      ],
      chart: {
        height: 280,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // // console.log(chart, w, e)
          },
        },
      },
      colors: ['#FF7F5C'],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
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
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: ['#FF7F5C'],
            fontSize: '12px',
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + ' ' + 'm3';
          },
        },
      },
    };
    this.valueChart = {
      series: [
        {
          name: 'Total Value',
          data: [],
        },
      ],
      chart: {
        height: 280,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // // console.log(chart, w, e)
          },
        },
      },
      colors: ['#FF7F5C'],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
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
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: ['#FF7F5C'],
            fontSize: '12px',
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + ' ' + 'egp';
          },
        },
      },
    };
  }

  log() {
    // console.log(this.toppings.value);
  }
  ngOnInit(): void {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.getAllStationsVlaueDefault();
      //this.getAllStationsDefault();
    }, 20000);
    this.getAllStationsVlaueDefault();
    this.getLastReadDefault();
    this.getAllStationsDefault();
    this.getConsumptionDataDefault();

    this.currentTime();
    this.currentTime2();
    this.GetAllUserPre();
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
      this.salesRender = true;
      this.trasnactionRender = false;
      this.valueRender = false;
    } else if (tab.index == 1) {
      this.salesRender = false;
      this.valueRender = false;
      this.trasnactionRender = true;
    } else if (tab.index == 2) {
      this.salesRender = false;
      this.valueRender = true;
      this.trasnactionRender = false;
    }
  }
  GetAllUserPre() {
    this.stationService
      .GetAllUserPre(localStorage.getItem('id'))
      .subscribe((res) => {
        this.pre = JSON.parse(JSON.stringify(res));
        JSON.parse(JSON.stringify(res)).forEach((element) => {
          if (element.preferenceId == 1) {
            this.toppings.value.totalSales = element.bool;
          }
          if (element.preferenceId == 2) {
            this.toppings.value.transCount = element.bool;
          }
          if (element.preferenceId == 3) {
            this.toppings.value.totalVal = element.bool;
          }
          if (element.preferenceId == 4) {
            this.toppings.value.maxTransCount = element.bool;
          }
          if (element.preferenceId == 5) {
            this.toppings.value.compStatus = element.bool;
          }
        });
        // console.log(this.toppings.value);
      });
  }
  removeUserPre(id) {
    this.stationService
      .RemovePreferences(localStorage.getItem('id'), id)
      .subscribe((res) => {});
  }
  AddUserPre(id) {
    this.stationService
      .AddPreferences(localStorage.getItem('id'), id, true)
      .subscribe((res) => {});
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
          this.hourlyChart.series[i].data.push(
            (ele.totalConsumption / 0.744).toFixed()
          );
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
            this.hourlyChart.series[i].data.push(
              (ele.totalConsumption / 0.744).toFixed()
            );
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
            this.hourlyChart.series[i].data.push(
              (ele.totalConsumption / 0.744).toFixed()
            );
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
          this.hourlyChart.series[i].data.push(
            (ele.totalConsumption / 0.744).toFixed()
          );
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
  getAllStationsDefault() {
    this.salesData = null;
    this.trasnactionData = null;
    this.valueData = null;
    this.trasnactionChart.series[0].data = [];
    this.salesChart.series[0].data = [];
    this.valueChart.series[0].data = [];

    this.trasnactionChart.xaxis.categories = [];
    this.salesChart.xaxis.categories = [];
    this.valueChart.xaxis.categories = [];

    this.allStations = [];
    this.stationService.getGetAllStations(1).subscribe((res) => {
      this.allStations = JSON.parse(JSON.stringify(res));
      // console.log(res);
      // console.log(this.allStations);
      this.allStations.forEach((element) => {
        this.trasnactionChart.series[0].data.push(
          parseInt(element.totalFlow.toFixed())
        );
        this.salesChart.series[0].data.push(
          parseInt((element.totalConsumption / 0.744).toFixed())
        );
        this.valueChart.series[0].data.push(
          parseInt(((element.totalConsumption / 0.744) * 3.5).toFixed())
        );

        this.trasnactionChart.xaxis.categories.push(element.name);
        this.salesChart.xaxis.categories.push(element.name);
        this.valueChart.xaxis.categories.push(element.name);
      });
      this.salesData = this.salesChart.series[0].data;
      this.trasnactionData = this.trasnactionChart.series[0].data;
      this.valueData = this.valueChart.series[0].data;
      // console.log(this.salesChart);
    });
  }
  getAllStationsTime(time) {
    this.salesData = null;
    this.trasnactionData = null;
    this.valueData = null;
    this.trasnactionChart.series[0].data = [];
    this.salesChart.series[0].data = [];
    this.valueChart.series[0].data = [];

    this.trasnactionChart.xaxis.categories = [];
    this.salesChart.xaxis.categories = [];
    this.valueChart.xaxis.categories = [];
    clearInterval(this.interval);
    this.allStations = [];
    this.stationService.getGetAllStations(time).subscribe((res) => {
      this.allStations = JSON.parse(JSON.stringify(res));
      this.allStations.forEach((element) => {
        this.trasnactionChart.series[0].data.push(
          parseInt(element.totalFlow.toFixed())
        );
        this.salesChart.series[0].data.push(
          parseInt((element.totalConsumption / 0.744).toFixed())
        );
        this.valueChart.series[0].data.push(
          parseInt(((element.totalConsumption / 0.744) * 3.5).toFixed())
        );

        this.trasnactionChart.xaxis.categories.push(element.name);
        this.salesChart.xaxis.categories.push(element.name);
        this.valueChart.xaxis.categories.push(element.name);
      });
      this.salesData = this.salesChart.series[0].data;
      this.trasnactionData = this.trasnactionChart.series[0].data;
      this.valueData = this.valueChart.series[0].data;
      // console.log(this.allStations);
    });
  }
  getAllStationsDate(from, to) {
    this.salesData = null;
    this.trasnactionData = null;
    this.valueData = null;
    this.trasnactionChart.series[0].data = [];
    this.salesChart.series[0].data = [];
    this.valueChart.series[0].data = [];

    this.trasnactionChart.xaxis.categories = [];
    this.salesChart.xaxis.categories = [];
    this.valueChart.xaxis.categories = [];
    clearInterval(this.interval);
    this.allStations = [];
    this.stationService.getGetAllStationsDate(from, to).subscribe((res) => {
      this.allStations = JSON.parse(JSON.stringify(res));
      this.allStations.forEach((element) => {
        this.trasnactionChart.series[0].data.push(
          parseInt(element.totalFlow.toFixed())
        );
        this.salesChart.series[0].data.push(
          parseInt((element.totalConsumption / 0.744).toFixed())
        );
        this.valueChart.series[0].data.push(
          parseInt(((element.totalConsumption / 0.744) * 3.5).toFixed())
        );

        this.trasnactionChart.xaxis.categories.push(element.name);
        this.salesChart.xaxis.categories.push(element.name);
        this.valueChart.xaxis.categories.push(element.name);
      });
      this.salesData = this.salesChart.series[0].data;
      this.trasnactionData = this.trasnactionChart.series[0].data;
      this.valueData = this.valueChart.series[0].data;
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
    this.getAllStationsVlaueDate(
      this.shiftFrom.substring(0, this.shiftFrom.length - 1),
      this.shiftTo.substring(0, this.shiftTo.length - 1)
    );
    //this.getConsumptionDataDate(this.shiftFrom.substring(0,this.shiftFrom.length-1),this.shiftTo.substring(0,this.shiftTo.length-1));
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

    this.getAllStationsVlaueDate(
      this.From.substring(0, this.From.length - 1),
      this.To.substring(0, this.To.length - 1)
    );
    this.getConsumptionDataDate(
      this.From.substring(0, this.From.length - 1),
      this.To.substring(0, this.To.length - 1)
    );
    this.getAllStationsDate(
      this.From.substring(0, this.From.length - 1),
      this.To.substring(0, this.To.length - 1)
    );
  }
}
