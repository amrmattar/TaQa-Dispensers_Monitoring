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
import {
  ViewEncapsulation,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import {
  DashboardLayoutComponent,
  PanelModel,
} from '@syncfusion/ej2-angular-layouts';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  templateDropdown: string;
  uuidValue: string;
  customEnable: boolean = false;
  allowResizing: boolean = false;
  allowDragging: boolean = false;
  public position1: object = { Y: 100 };
  public panals: string[] = ['value-cards', 'Chart-List', 'Radar-data'];
  // set placeholder text to DropDownList input element
  public placeholder: string = 'Select a Panal';
  public allowFloating: boolean = true;
  public cellAspectRatio: number = 100 / 75;
  public cellSpacing: number[] = [10, 10];
  @ViewChild('dashboard', { static: true })
  public Dashboard: DashboardLayoutComponent;
  @ViewChild('saveBtn') saveBtn: ButtonComponent;
  public count: number = 50;
  public count1: number = 0;
  public restoreModel: any = [];
  public targetElement: HTMLElement;
  public hidden: Boolean = false;
  @ViewChild('viewContainer', { read: ViewContainerRef, static: true })
  viewContainer: ViewContainerRef;
  @ViewChild('CustomTemplate1', { static: true })
  CustomTemplate1: TemplateRef<any>;
  @ViewChild('CustomTemplate2', { static: true })
  CustomTemplate2: TemplateRef<any>;
  @ViewChild('CustomTemplate4', { static: true })
  CustomTemplate4: TemplateRef<any>;
  allow: any = false;

  BtnClick() {
    this.uuidValue = UUID.UUID();
    // adding panel dynamically

    //rendes the (CustomTemplate) temaplte in dom
    if (this.templateDropdown == 'value-cards') {
      let panel: PanelModel[] = [
        {
          id: this.templateDropdown + '_' + this.uuidValue,
          sizeX: 37,
          sizeY: 6,
          row: 0,
          col: 0,
        },
      ];
      this.Dashboard.addPanel(panel[0]);
      // // console.log(this.uuidValue);
      const templateValue = this.CustomTemplate1.createEmbeddedView(null);
      this.viewContainer.insert(templateValue);
      let panel_Content = document.getElementById(
        this.templateDropdown + '_' + this.uuidValue + '_content'
      );
      panel_Content.appendChild(templateValue.rootNodes[0]);
    } else if (this.templateDropdown == 'Chart-List') {
      let panel: PanelModel[] = [
        {
          id: this.templateDropdown + '_' + this.uuidValue,
          sizeX: 37,
          sizeY: 18,
          row: 0,
          col: 0,
        },
      ];
      this.Dashboard.addPanel(panel[0]);
      // // console.log(this.uuidValue);
      const templateValue = this.CustomTemplate2.createEmbeddedView(null);
      this.viewContainer.insert(templateValue);
      let panel_Content = document.getElementById(
        this.templateDropdown + '_' + this.uuidValue + '_content'
      );
      panel_Content.appendChild(templateValue.rootNodes[0]);
    } else if (this.templateDropdown == 'Radar-data') {
      let panel: PanelModel[] = [
        {
          id: this.templateDropdown + '_' + this.uuidValue,
          sizeX: 12,
          sizeY: 24,
          row: 0,
          col: 32,
        },
      ];
      this.Dashboard.addPanel(panel[0]);
      // // console.log(this.uuidValue);
      const templateValue = this.CustomTemplate4.createEmbeddedView(null);
      this.viewContainer.insert(templateValue);
      let panel_Content = document.getElementById(
        this.templateDropdown + '_' + this.uuidValue + '_content'
      );
      panel_Content.appendChild(templateValue.rootNodes[0]);
    }
    this.count = this.count + 1;
    this.ejDialog1.hide();
    this.panals = ['value-cards', 'Chart-List', 'Radar-data'];
    for (let i = 0; i < this.Dashboard.panels.length; i++) {
      this.panals.splice(
        this.panals.indexOf(this.Dashboard.panels[i].id.split('_')[0]),
        1
      );
    }
  }

  onCloseIconHandler(event: any): void {
    if ((<HTMLElement>event.target).offsetParent) {
      this.Dashboard.removePanel((<HTMLElement>event.target).offsetParent.id);
    }
    this.panals = ['value-cards', 'Chart-List', 'Radar-data'];
    for (let i = 0; i < this.Dashboard.panels.length; i++) {
      this.panals.splice(
        this.panals.indexOf(this.Dashboard.panels[i].id.split('_')[0]),
        1
      );
    }
  }

  onSaveClick(arg) {
    this.restoreModel = this.Dashboard.serialize();
    for (let i = this.restoreModel.length - 1; i >= 0; i--) {
      let x = 0;
      this.restoreModel[i].content = this.Dashboard.panels[x].content;
      x++;
    }
    const circularReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return 'Object';
          }
          seen.add(value);
        }
        return value;
      };
    };

    var jsonString = JSON.stringify(this.restoreModel, circularReplacer());
    // // // console.log(this.restoreModel[0].content);
    // // console.log(jsonString);
    localStorage.setItem('datas_taqa', jsonString);
  }
  onallowClick(arg) {
    this.allowDragging = !this.allowDragging;
    this.allowResizing = !this.allowResizing;
  }
  ngOnInit(): void {
    setTimeout(() => {
      let data = JSON.parse(localStorage.getItem('datas_taqa'));
      for (let index = 0; index < data.length; index++) {
        data[index];
        let panel: PanelModel[] = [
          {
            id: data[index].id,
            sizeX: data[index].sizeX,
            sizeY: data[index].sizeY,
            row: data[index].row,
            col: data[index].col,
          },
        ];
        this.Dashboard.addPanel(panel[0]);
        // // // console.log(data[index].id.split('_')[0]);

        if (data[index].id.split('_')[0] == 'value-cards') {
          const templateValue = this.CustomTemplate1.createEmbeddedView(null);
          this.viewContainer.insert(templateValue);
          let panel_Content = document.getElementById(
            data[index].id + '_content'
          );
          panel_Content.appendChild(templateValue.rootNodes[0]);
        } else if (data[index].id.split('_')[0] == 'Chart-List') {
          const templateValue = this.CustomTemplate2.createEmbeddedView(null);
          this.viewContainer.insert(templateValue);
          let panel_Content = document.getElementById(
            data[index].id + '_content'
          );
          panel_Content.appendChild(templateValue.rootNodes[0]);
        } else if (data[index].id.split('_')[0] == 'Radar-data') {
          const templateValue = this.CustomTemplate4.createEmbeddedView(null);
          this.viewContainer.insert(templateValue);
          let panel_Content = document.getElementById(
            data[index].id + '_content'
          );
          panel_Content.appendChild(templateValue.rootNodes[0]);
        }
      }
    }, 50);

    setTimeout(() => {
      // // console.log(this.Dashboard.panels.length);
      if (this.Dashboard.panels.length == 0) {
        setTimeout(() => {
          this.templateDropdown = 'Radar-data';
          this.BtnClick();
        }, 150);

        setTimeout(() => {
          this.templateDropdown = 'Chart-List';
          this.BtnClick();
        }, 300);
        setTimeout(() => {
          this.templateDropdown = 'value-cards';
          this.BtnClick();
          for (let i = 0; i < this.Dashboard.panels.length; i++) {
            this.panals.splice(
              this.panals.indexOf(this.Dashboard.panels[i].id.split('_')[0]),
              1
            );
          }
        }, 500);
      }
    }, 100);
    this.http
      .get(`${environment.sourceURL}/SettingTargets/1`)
      .subscribe((Response) => {
        this.pricing = JSON.parse(JSON.stringify(Response)).valueRate;
      });
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.getAllStationsVlaueDefault();
    }, 20000);
    this.getAllStationsVlaueDefault();
    this.getLastReadDefault();
    this.getAllStationsDefault();
    this.getConsumptionDataDefault();
    this.currentTime();
    this.currentTime2();
    this.GetAllUserPre();
  }

  @ViewChild('ejDialog1') ejDialog1: DialogComponent;
  public onOpenDialog1 = function (event: any): void {
    // Call the show method to open the Dialog
    this.ejDialog1.show();
  };
  public hideDialog: EmitType<object> = () => {
    this.ejDialog1.hide();
  };
  public onOverlayClick: EmitType<object> = () => {
    this.ejDialog1.hide();
  };
  public btnclick2() {
    this.ejDialog1.hide();
  }
  @ViewChild('ddlelement')
  public dropDownListObject: DropDownListComponent;
  onChange(args): void {
    this.templateDropdown = args.value;
  }

  onResizeStart(args: any) {
    // // console.log(args.element.id.split('_')[0]);
  }
  onallow(arg) {
    this.customEnable = !this.customEnable;
    this.allow = this.customEnable;
  }

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
  pricing = 3.75;
  onTabClick(index) {
    this.tabIndex = index;
    this.tabIndex1 = index;
    this.tabIndex2 = index;
  }
  // log()
  // {
  //   // // console.log(this.selectedDate);
  // }

  constructor(
    fb: FormBuilder,
    private stationService: StationService,
    private http: HttpClient,
    private router: Router
  ) {
    // // // console.log("dash",this.Dashboard.panels)
    // // // console.log(router.url);
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
            // // // console.log(chart, w, e)
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
            // // // console.log(chart, w, e)
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
            // // // console.log(chart, w, e)
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
    // // console.log(this.toppings.value);
  }
  // ngOnInit(): void {

  // }

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
        // // console.log(this.toppings.value);
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
    // this.data = null;
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
      // // console.log(this.hourlyChart);
    });
  }
  getConsumptionDataTime(time) {
    // this.data = null;
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
        // this.data = this.inChart.series[0].data;
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
    // this.data = null;
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
      // // console.log(this.valuesOfStation);
    });
  }

  getAllStationsVlaueTime(time) {
    clearInterval(this.interval);
    this.stationService.getGetAllStationsVlaue(time).subscribe((res) => {
      this.valuesOfStation = JSON.parse(JSON.stringify(res));
      // // console.log(this.valuesOfStation);
    });
  }
  getAllStationsVlaueDate(from, to) {
    clearInterval(this.interval);
    this.stationService
      .getGetAllStationsVlaueDate(from, to)
      .subscribe((res) => {
        this.valuesOfStation = JSON.parse(JSON.stringify(res));
        // // console.log(this.valuesOfStation);
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
      // // console.log(res);
      // // console.log(this.allStations);
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
      // // console.log(this.salesChart);
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
      // // console.log(this.allStations);
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
      // // console.log(this.allStations);
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

    // // console.log(this.From);
  }
  shiftFromToday(ee) {
    this.shiftFrom = new Date(
      new Date().setHours(parseInt(ee) + 2, 0, 0)
    ).toISOString();
    // // console.log(this.shiftFrom);
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

    // // console.log(this.shiftTo);
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
