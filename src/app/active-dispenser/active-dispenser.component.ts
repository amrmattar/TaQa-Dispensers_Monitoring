import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
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
  selector: 'app-active-dispenser',
  templateUrl: './active-dispenser.component.html',
  styleUrls: ['./active-dispenser.component.css'],
})
export class ActiveDispenserComponent implements OnInit {
  public inChart: Partial<ChartOptions>;
  public outChart: Partial<ChartOptions>;
  public oilChart: Partial<ChartOptions>;
  public hourlyChart: Partial<ChartOptions>;
  public consumptionChart: Partial<ChartOptions>;
  public circleChart: Partial<ChartOptions>;
  inChartRender = true;
  outChartRender = false;
  oilChartRender = false;
  id: any;
  valuesOfStation: any;
  valueOfStation: any;
  ptReads: any;
  lastRead: any;
  state: string;
  data: any;
  data2: any;
  alarms = [];
  alarmReads: any;
  tabIndex: 0;
  tabIndex1: 1;
  tabIndex2: 2;
  allStations: any;
  stations: any;
  machines: any;
  dispensers: any;
  stationsRender = true;
  stationRender = false;
  dispensersRender = false;
  dispenserRender = false;
  allDispensers: any;
  vehicleData: any;
  consumptionData: any;
  stationId: any;
  From: any;
  To: any;
  currentRead: any;
  maxMinRead: any;
  shiftFrom: any;
  shiftTo: any;
  interval: any;
  data3: any;

  constructor(
    private formBuilder: FormBuilder,
    private _Activatedroute: ActivatedRoute,
    private stationService: StationService,
    private http: HttpClient,
    private router: Router
  ) {
    this.inChart = {
      series: [],
      chart: {
        height: 550,
        type: 'line',
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
      yaxis: {
        labels: {
          formatter: function (value) {
            return value + ' ' + 'v/h';
          },
        },
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };
    this.outChart = {
      series: [],
      chart: {
        height: 550,
        type: 'line',
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
      yaxis: {
        labels: {
          formatter: function (value) {
            return value + ' ' + 'm3';
          },
        },
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };
    this.oilChart = {
      series: [],
      chart: {
        height: 550,
        type: 'line',
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
      yaxis: {
        labels: {
          formatter: function (value) {
            return value + ' ' + 'EGP';
          },
        },
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };
    this.hourlyChart = {
      series: [
        {
          name: 'Series 1',
          data: [],
        },
      ],
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
        size: 1,
        colors: ['#fff'],
        strokeColors: ['#FF4560'],
        strokeWidth: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
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
  }

  ngOnInit(): void {
    this.stationId = this._Activatedroute.paramMap.subscribe((params) => {
      // console.log(params);
      this.id = params.get('id');
    });
    this.getAllStationsVlaueDefault();
    this.getAllStationsDefault();
    this.getAllDispensersDefault();
    this.getConsumptionDataDefault();
    this.getLastAlarm();
    this.getLastReadDefault();
    this.getStationVlaueDefault();
    this.getAllStations();
  }
  changeTab(tab) {
    if (tab.index == 0) {
      this.inChartRender = true;
      this.outChartRender = false;
      this.oilChartRender = false;
    } else if (tab.index == 1) {
      this.inChartRender = false;
      this.outChartRender = true;
      this.oilChartRender = false;
    } else if (tab.index == 2) {
      this.inChartRender = false;
      this.outChartRender = false;
      this.oilChartRender = true;
    }
  }
  getLastReadDefault() {
    this.tabIndex = 0;
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
  getAllStations() {
    this.stations = [];
    this.http.get(`${environment.sourceURL}/Stations`).subscribe((Response) => {
      this.stations = JSON.parse(JSON.stringify(Response)).find(
        (element) => (element.id = this.id)
      ).name;
      // console.log(this.stations);
      // this.routeSummary = data.routeSummary;
      //this.processesSummaryList = data.processesSummaryList;
    });
  }
  getLastAlarm() {
    this.alarms = [];
    this.stationService.getGetLastAlarms(1).subscribe((res) => {
      this.alarmReads = JSON.parse(JSON.stringify(res)).alarmReads;

      // console.log(this.alarms);
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
  getStationVlaueDefault() {
    this.tabIndex = 0;
    this.stationService.getGetStationValue(this.id, 1).subscribe((res) => {
      this.valueOfStation = JSON.parse(JSON.stringify(res));
      // console.log(this.valueOfStation);
    });
  }
  getStationVlaueTime(time) {
    clearInterval(this.interval);
    this.stationService.getGetStationValue(this.id, time).subscribe((res) => {
      this.valueOfStation = JSON.parse(JSON.stringify(res));
      // console.log(this.valueOfStation);
    });
  }
  getStationVlaueDate(from, to) {
    clearInterval(this.interval);
    this.stationService
      .getGetStationValueDate(this.id, from, to)
      .subscribe((res) => {
        this.valueOfStation = JSON.parse(JSON.stringify(res));
        // console.log(this.valueOfStation);
      });
  }
  getAllStationsDefault() {
    this.tabIndex = 0;
    this.allStations = [];
    this.stationService.getGetAllStations(1).subscribe((res) => {
      this.allStations = JSON.parse(JSON.stringify(res));
      // console.log(this.allStations);
    });
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
  getAllDispensersDefault() {
    this.tabIndex = 0;
    this.allDispensers = [];
    this.inChart.series = [];
    this.inChart.xaxis.categories = [];
    this.data = null;
    this.data2 = null;
    this.stationService.getGetAllDesipenser(this.id, 1).subscribe((res) => {
      this.allDispensers = JSON.parse(JSON.stringify(res));
      this.allDispensers.vehicles.forEach((element, i) => {
        this.inChart.series.push({
          name: element.machineId + '-' + element.dispenser_No,
          data: [],
        });
        this.outChart.series.push({
          name: element.machineId + '-' + element.dispenser_No,
          data: [],
        });
        this.oilChart.series.push({
          name: element.machineId + '-' + element.dispenser_No,
          data: [],
        });
        element.vechileflows.forEach((el, j) => {
          this.inChart.series[i].data.push(el.total_Vechiles);
        });

        element.consumptionRates.forEach((el, j) => {
          this.outChart.series[i].data.push(
            el.total_Consumption_per_Transaction
          );
        });
        element.consumptionRates.forEach((el, j) => {
          this.oilChart.series[i].data.push(
            (el.total_Consumption_per_Transaction * 3.5).toFixed()
          );
        });
      });
      this.allDispensers.vehicles[0].vechileflows.forEach((elem) => {
        this.inChart.xaxis.categories.push(
          new Date(elem.timeStamp).setHours(
            new Date(elem.timeStamp).getHours() + 2
          )
        );
      });
      this.allDispensers.vehicles[0].consumptionRates.forEach((elem) => {
        this.outChart.xaxis.categories.push(
          new Date(elem.timeStamp).setHours(
            new Date(elem.timeStamp).getHours() + 2
          )
        );
      });
      this.allDispensers.vehicles[0].consumptionRates.forEach((elem) => {
        this.oilChart.xaxis.categories.push(
          new Date(elem.timeStamp).setHours(
            new Date(elem.timeStamp).getHours() + 2
          )
        );
      });
      this.data = this.inChart.series;
      this.data2 = this.outChart.series;
      this.data3 = this.oilChart.series;
      // console.log(this.inChart);
    });
  }
  getAllDispensersTime(time) {
    clearInterval(this.interval);
    this.allDispensers = [];
    this.inChart.series = [];
    this.inChart.xaxis.categories = [];
    this.outChart.series = [];
    this.outChart.xaxis.categories = [];
    this.oilChart.series = [];
    this.oilChart.xaxis.categories = [];
    this.data = null;
    this.data2 = null;
    this.stationService.getGetAllDesipenser(this.id, time).subscribe((res) => {
      this.allDispensers = JSON.parse(JSON.stringify(res));
      if (time == 1 || time == 2) {
        this.allDispensers = JSON.parse(JSON.stringify(res));
        this.allDispensers.vehicles.forEach((element, i) => {
          this.inChart.series.push({
            name: element.machineId + '-' + element.dispenser_No,
            data: [],
          });
          this.outChart.series.push({
            name: element.machineId + '-' + element.dispenser_No,
            data: [],
          });
          this.oilChart.series.push({
            name: element.machineId + '-' + element.dispenser_No,
            data: [],
          });
          element.vechileflows.forEach((el, j) => {
            this.inChart.series[i].data.push(el.total_Vechiles);
          });

          element.consumptionRates.forEach((el, j) => {
            this.outChart.series[i].data.push(
              el.total_Consumption_per_Transaction
            );
          });
          element.consumptionRates.forEach((el, j) => {
            this.oilChart.series[i].data.push(
              (el.total_Consumption_per_Transaction * 3.5).toFixed()
            );
          });
        });
        this.allDispensers.vehicles[0].vechileflows.forEach((elem) => {
          this.inChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.vehicles[0].consumptionRates.forEach((elem) => {
          this.outChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.vehicles[0].consumptionRates.forEach((elem) => {
          this.oilChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
      } else if (time == 3) {
        this.allDispensers = JSON.parse(JSON.stringify(res));
        this.allDispensers.vehicles.forEach((element, i) => {
          this.inChart.series.push({
            name: element.machineId + '-' + element.dispenser_No,
            data: [],
          });
          this.outChart.series.push({
            name: element.machineId + '-' + element.dispenser_No,
            data: [],
          });
          this.oilChart.series.push({
            name: element.machineId + '-' + element.dispenser_No,
            data: [],
          });
          element.dailyVechileflows.forEach((el, j) => {
            this.inChart.series[i].data.push(el.total_Vechiles);
          });

          element.dailyConsumptionRates.forEach((el, j) => {
            this.outChart.series[i].data.push(
              el.total_Consumption_per_Transaction
            );
          });
          element.dailyConsumptionRates.forEach((el, j) => {
            this.oilChart.series[i].data.push(
              (el.total_Consumption_per_Transaction * 3.5).toFixed()
            );
          });
        });
        this.allDispensers.vehicles[0].dailyVechileflows.forEach((elem) => {
          this.inChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.vehicles[0].dailyConsumptionRates.forEach((elem) => {
          this.outChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.vehicles[0].dailyConsumptionRates.forEach((elem) => {
          this.oilChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        // console.log(time);
      }
      this.data = this.inChart.series;
      this.data2 = this.outChart.series;
      this.data3 = this.oilChart.series;
    });
  }
  getAllDispensersDate(from, to) {
    clearInterval(this.interval);
    this.allDispensers = [];
    this.inChart.series = [];
    this.inChart.xaxis.categories = [];
    this.outChart.series = [];
    this.outChart.xaxis.categories = [];
    this.oilChart.series = [];
    this.oilChart.xaxis.categories = [];
    this.data = null;
    this.data2 = null;
    this.stationService
      .getGetAllDesipenserDate(this.id, from, to)
      .subscribe((res) => {
        this.allDispensers = JSON.parse(JSON.stringify(res));

        this.allDispensers = JSON.parse(JSON.stringify(res));
        this.allDispensers.vehicles.forEach((element, i) => {
          this.inChart.series.push({
            name: element.machineId + '-' + element.dispenser_No,
            data: [],
          });
          this.outChart.series.push({
            name: element.machineId + '-' + element.dispenser_No,
            data: [],
          });
          this.oilChart.series.push({
            name: element.machineId + '-' + element.dispenser_No,
            data: [],
          });
          element.vechileflows.forEach((el, j) => {
            this.inChart.series[i].data.push(el.total_Vechiles);
          });

          element.consumptionRates.forEach((el, j) => {
            this.outChart.series[i].data.push(
              el.total_Consumption_per_Transaction
            );
          });
          element.consumptionRates.forEach((el, j) => {
            this.oilChart.series[i].data.push(
              (el.total_Consumption_per_Transaction * 3.5).toFixed()
            );
          });
        });
        this.allDispensers.vehicles[0].vechileflows.forEach((elem) => {
          this.inChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.vehicles[0].consumptionRates.forEach((elem) => {
          this.outChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.vehicles[0].consumptionRates.forEach((elem) => {
          this.oilChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.data = this.inChart.series;
        this.data2 = this.outChart.series;
        this.data3 = this.oilChart.series;
      });
  }
  getConsumptionDataDefault() {
    this.tabIndex = 0;
    this.consumptionData = [];
    this.data = null;
    this.vehicleData = null;
    this.stationService
      .getGetHourlyStationReads(this.id, 1)
      .subscribe((res) => {
        this.consumptionData = JSON.parse(JSON.stringify(res));
        this.consumptionData.forEach((element, i) => {
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
        // console.log(this.consumptionData);
      });
  }
  getConsumptionDataTime(time) {
    clearInterval(this.interval);
    this.data = null;
    this.vehicleData = null;

    this.hourlyChart.series[0].data = [];
    this.hourlyChart.xaxis.categories = [];
    this.stationService
      .getGetHourlyStationReads(this.id, time)
      .subscribe((res) => {
        if (time == 3) {
          this.consumptionData = JSON.parse(JSON.stringify(res));
          this.consumptionData.forEach((element, i) => {
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
        } else {
          this.consumptionData = JSON.parse(JSON.stringify(res));
          this.consumptionData.forEach((element, i) => {
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

        // console.log(this.consumptionData);
      });
  }
  getConsumptionDataDate(from, to) {
    clearInterval(this.interval);
    this.data = null;
    this.vehicleData = null;

    this.hourlyChart.series[0].data = [];
    this.hourlyChart.xaxis.categories = [];
    this.stationService
      .getGetHourlyReadsStationDate(this.id, from, to)
      .subscribe((res) => {
        this.consumptionData = JSON.parse(JSON.stringify(res));
        this.consumptionData.forEach((element, i) => {
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

        // console.log(this.consumptionData);
      });
  }
}
