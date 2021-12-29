import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { Options, LabelType } from 'ng5-slider';
import { ViewChild } from '@angular/core';
import {
  CircularGaugeComponent,
  ILoadedEventArgs,
  GaugeTheme,
} from '@syncfusion/ej2-angular-circulargauge';
import { Slider, SliderChangeEventArgs } from '@syncfusion/ej2-inputs';
import { Meter } from '../detailed-station/Meter';
let sliderValue: number = 40;
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
//import { parse } from 'path';
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
  selector: 'app-detailed-station',
  templateUrl: './detailed-station.component.html',
  styleUrls: ['./detailed-station.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailedStationComponent implements OnInit {
  flagheadtap: any = 'Finance';
  flaginnertap: any = 'Pressure';
  list_permissions: Array<string> = [];
  show_taps:boolean = false;
  headtaps(tap) {
    this.flagheadtap = tap;
  }
  innertaps(tap) {
    this.flaginnertap = tap;
  }

  @ViewChild('circulargauge')
  public circulargauge: CircularGaugeComponent;

  public lineStyle: Object = {
    width: 0,
  };
  //Initializing LabelStyle
  public labelStyle: Object = {
    position: 'Inside',
    useRangeColor: true,
    font: {
      size: '0px',
      color: 'white',
      fontFamily: 'Roboto',
      fontStyle: 'Regular',
    },
  };
  // custom code start
  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.gauge.theme = <GaugeTheme>(
      (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1))
    );
  }
  // custom code end
  public loaded(args: ILoadedEventArgs): void {
    let annotation: Element = document.getElementById(
      args.gauge.element.id + '_Annotations_0'
    );
    if (annotation) {
      this.annotationRender(
        'slider',
        this.circulargauge.axes[0].pointers[0].value
      );
    }
  }
  public ranges: Object[] = [
    {
      start: 0,
      end: 100,
      radius: '100%',
      startWidth: 15,
      endWidth: 15,
      color: '#E0E0E0',
      roundedCornerRadius: 5,
    },
  ];
  public pointers: Object[] = [
    {
      roundedCornerRadius: 5,
      value: 70,
      type: 'RangeBar',
      radius: '100%',
      color: '#FF7F5C',
      border: {
        color: 'grey',
        width: 0,
      },
      animation: {
        enable: false,
      },
      pointerWidth: 15,
    },
  ];

  public meters: Meter[];
  public metersT: Meter[];
  public titleStyle: Object = { size: '18px', weight: 'bold' };
  public title: string = 'Progress Tracker';
  public majorTicks: Object = {
    height: 0,
  };
  public minorTicks: Object = {
    height: 0,
  };
  public tail: Object = {
    length: '18%',
    color: '#757575',
  };
  public pointerCap: Object = {
    radius: 7,
    color: '#757575',
  };

  public annotaions: Object = [
    {
      content:
        '<div id="pointervalue" style="font-size:20px;width:60px;text-align:center">' +
        sliderValue.toString() +
        '/100</div>',
      angle: 0,
      zIndex: '1',
      radius: '10%',
    },
    {
      content: '<div id="slider" style="height:70px;width:250px;"></div>',
      angle: 0,
      zIndex: '1',
      radius: '-100%',
    },
  ];
  public annotationRender(id: string, sliderValue: number): void {
    let first: Slider = new Slider({
      // Set the value for slider
      min: 0,
      max: 100,
      type: 'MinRange',
      limits: { enabled: true, minStart: 0, minEnd: 100 },
      value: sliderValue,
      change: (args: SliderChangeEventArgs) => {
        sliderValue = args.value as number;
        if (!isNaN(sliderValue)) {
          this.circulargauge['isProtectedOnChange'] = true;
          if (sliderValue >= 0 && sliderValue < 20) {
            this.circulargauge.axes[0].pointers[0].color = '#ea501a';
          } else if (sliderValue >= 20 && sliderValue < 40) {
            this.circulargauge.axes[0].pointers[0].color = '#f79c02';
          } else if (sliderValue >= 40 && sliderValue < 60) {
            this.circulargauge.axes[0].pointers[0].color = '#e5ce20';
          } else if (sliderValue >= 60 && sliderValue < 80) {
            this.circulargauge.axes[0].pointers[0].color = '#a1cb43';
          } else if (sliderValue >= 80 && sliderValue < 100) {
            this.circulargauge.axes[0].pointers[0].color = '#82b944';
          }
          this.circulargauge.setPointerValue(0, 0, sliderValue);
          if (document.getElementById('pointervalue')) {
            document.getElementById('pointervalue').innerHTML =
              this.circulargauge.axes[0].pointers[0].value.toString() + '/100';
          }
        }
      },
    });
    first.appendTo('#' + id);
  }

  pressureNames: string[] = [
    'Inlet Pressure (Bar)',
    'Oil Pressure (Bar)',
    'Stage 1 Pressure (Bar)',
    'Stage 2 Pressure (Bar)',
    'Stage 3 Pressure (Bar)',
    'Stage 4 Pressure (Bar)',
    'Stage 5 Pressure (Bar)',
  ];
  temperatureNames: string[] = [
    'Discharge Temperature (C)',
    'Oil Temperature (C)',
    'Stage 1 Temperature (C)',
    'Stage 2 Temperature (C)',
    'Stage 3 Temperature (C)',
    'Stage 4 Temperature (C)',
    'Stage 5 Temperature (C)',
  ];

  public inChart: Partial<ChartOptions>;
  public outChart: Partial<ChartOptions>;
  public oilChart: Partial<ChartOptions>;
  public transChart: Partial<ChartOptions>;
  public consuChart: Partial<ChartOptions>;
  public valueChart: Partial<ChartOptions>;
  public hourlyChart: Partial<ChartOptions>;
  public hourlyStateChart: Partial<ChartOptions>;
  public consumptionChart: Partial<ChartOptions>;
  public circleChart: Partial<ChartOptions>;
  public chartOptions: Partial<ChartOptions>;
  public barChart: Partial<ChartOptions>;
  allStatus: any;
  InForm: FormGroup;
  oilForm: FormGroup;
  s1Form: FormGroup;
  s2Form: FormGroup;
  s3Form: FormGroup;
  s4Form: FormGroup;
  s5Form: FormGroup;

  InFormT: FormGroup;
  OutFormT: FormGroup;
  oilFormT: FormGroup;
  s1FormT: FormGroup;
  s2FormT: FormGroup;
  s3FormT: FormGroup;
  s4FormT: FormGroup;
  s5FormT: FormGroup;

  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min Pressure:</b> ' + value;
        case LabelType.High:
          return '<b>Max Pressure:</b> ' + value;
        default:
          return '' + value;
      }
    },
  };
  minValue2: number = 100;
  maxValue2: number = 400;
  options2: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min Tempreture:</b> ' + value;
        case LabelType.High:
          return '<b>Max Tempreture:</b> ' + value;
        default:
          return '' + value;
      }
    },
  };

  minIn = 0;
  maxIn = 100;
  checked = false;
  minOil = 0;
  maxOil = 100;

  minS1 = 0;
  maxS1 = 100;

  minS2 = 0;
  maxS2 = 100;

  minS3 = 0;
  maxS3 = 100;

  minS4 = 0;
  maxS4 = 100;

  minS5 = 0;
  maxS5 = 100;

  minOutT = 50;
  maxOutT = 300;

  minOilT = 50;
  maxOilT = 300;

  minS1T = 50;
  maxS1T = 300;

  minS2T = 50;
  maxS2T = 300;

  minS3T = 50;
  maxS3T = 300;

  minS4T = 50;
  maxS4T = 300;

  minS5T = 50;
  maxS5T = 300;

  minS6T = 50;
  maxS6T = 300;

  // inP: EChartsOption;
  // outP: EChartsOption;
  // oilP: EChartsOption;
  // s1P: EChartsOption;
  // s2P: EChartsOption;
  // s3P: EChartsOption;
  // s4P: EChartsOption;
  // s5P: EChartsOption;
  // s6P: EChartsOption;

  // inT: EChartsOption;
  // outT: EChartsOption;
  // oilT: EChartsOption;
  // s1T: EChartsOption;
  // s2T: EChartsOption;
  // s3T: EChartsOption;
  // s4T: EChartsOption;
  // s5T: EChartsOption;
  // s6T: EChartsOption;

  inP: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    textStyle: {
      fontSize: '10',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        min: this.minIn,
        max: this.maxIn,

        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#dbeb34'],
              [1, '#ed0f07'],
            ],
          },
        },
        detail: {
          formatter: '{value} Bar',
          fontSize: 12,
        },
        data: [
          {
            value: 30,
            name: '',
          },
        ],
        title: {
          show: true,
        },
      },
    ],
  };
  outP: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        detail: {
          formatter: '{value} Bar',
          fontSize: 12,
        },
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#dbeb34'],
              [1, '#ed0f07'],
            ],
          },
        },
        min: this.minIn,
        max: this.maxIn,
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        data: [
          {
            value: 30,
            name: 'SCORE',
          },
        ],
        title: {
          show: false,
        },
      },
    ],
  };
  oilP: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        min: this.minIn,
        max: this.maxIn,
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#dbeb34'],
              [1, '#ed0f07'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        detail: {
          formatter: '{value} Bar',
          fontSize: 12,
        },

        data: [
          {
            value: 30,
            name: 'SCORE',
          },
        ],
        title: {
          show: true,
        },
      },
    ],
  };
  s1P: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        min: this.minIn,
        max: this.maxIn,
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#dbeb34'],
              [1, '#ed0f07'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        detail: {
          formatter: '{value} Bar',
          fontSize: 12,
        },
        data: [
          {
            value: 30,
            name: 'SCORE',
          },
        ],
        title: {
          show: true,
        },
      },
    ],
  };
  s2P: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        min: this.minIn,
        max: this.maxIn,
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#dbeb34'],
              [1, '#ed0f07'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        detail: {
          formatter: '{value} Bar',
          fontSize: 12,
        },
        data: [
          {
            value: 30,
            name: 'SCORE',
          },
        ],
        title: {
          show: true,
        },
      },
    ],
  };
  s3P: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        min: this.minIn,
        max: this.maxIn,
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#dbeb34'],
              [1, '#ed0f07'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        detail: {
          formatter: '{value} Bar',
          fontSize: 12,
        },
        data: [
          {
            value: 30,
            name: 'SCORE',
          },
        ],
        title: {
          show: true,
        },
      },
    ],
  };
  s4P: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        min: this.minIn,
        max: this.maxIn,
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#dbeb34'],
              [1, '#ed0f07'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        detail: {
          formatter: '{value} Bar',
          fontSize: 12,
        },
        data: [
          {
            value: 30,
            name: 'SCORE',
          },
        ],
        title: {
          show: true,
        },
      },
    ],
  };
  s5P: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        min: this.minIn,
        max: this.maxIn,
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#dbeb34'],
              [1, '#ed0f07'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        detail: {
          formatter: '{value} Bar',
          fontSize: 12,
        },
        data: [
          {
            value: 30,
            name: 'SCORE',
          },
        ],
        title: {
          show: true,
        },
      },
    ],
  };
  s6P: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        min: this.minIn,
        max: this.maxIn,
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#dbeb34'],
              [1, '#ed0f07'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        detail: {
          formatter: '{value} Bar',
          fontSize: 12,
        },
        data: [
          {
            value: 30,
            name: 'SCORE',
          },
        ],
        title: {
          show: true,
        },
      },
    ],
  };

  inT: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    textStyle: {
      fontSize: '10',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        min: this.minIn,
        max: this.maxIn,

        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#dbeb34'],
              [1, '#ed0f07'],
            ],
          },
        },
        detail: {
          formatter: '{value} °C',
          fontSize: 12,
        },
        data: [
          {
            value: 30,
            name: '',
          },
        ],
        title: {
          show: true,
        },
      },
    ],
  };
  outT: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        detail: {
          formatter: '{value} °C',
          fontSize: 12,
        },
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#dbeb34'],
              [1, '#ed0f07'],
            ],
          },
        },
        min: this.minIn,
        max: this.maxIn,
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        data: [
          {
            value: 30,
            name: 'SCORE',
          },
        ],
        title: {
          show: true,
        },
      },
    ],
  };
  oilT: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        min: this.minIn,
        max: this.maxIn,
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#dbeb34'],
              [1, '#ed0f07'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        detail: {
          formatter: '{value} °C',
          fontSize: 12,
        },

        data: [
          {
            value: 30,
            name: 'SCORE',
          },
        ],
        title: {
          show: true,
        },
      },
    ],
  };
  s1T: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        min: this.minIn,
        max: this.maxIn,
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#dbeb34'],
              [1, '#ed0f07'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        detail: {
          formatter: '{value} °C',
          fontSize: 12,
        },
        data: [
          {
            value: 30,
            name: 'SCORE',
          },
        ],
        title: {
          show: true,
        },
      },
    ],
  };
  s2T: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        min: this.minIn,
        max: this.maxIn,
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#dbeb34'],
              [1, '#ed0f07'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        detail: {
          formatter: '{value} °C',
          fontSize: 12,
        },
        data: [
          {
            value: 30,
            name: 'SCORE',
          },
        ],
        title: {
          show: true,
        },
      },
    ],
  };
  s3T: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        min: this.minIn,
        max: this.maxIn,
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#dbeb34'],
              [1, '#ed0f07'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        detail: {
          formatter: '{value} °C',
          fontSize: 12,
        },
        data: [
          {
            value: 30,
            name: 'SCORE',
          },
        ],
        title: {
          show: true,
        },
      },
    ],
  };
  s4T: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        min: this.minIn,
        max: this.maxIn,
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#dbeb34'],
              [1, '#ed0f07'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        detail: {
          formatter: '{value} °C',
          fontSize: 12,
        },
        data: [
          {
            value: 30,
            name: 'SCORE',
          },
        ],
        title: {
          show: true,
        },
      },
    ],
  };
  s5T: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        min: this.minIn,
        max: this.maxIn,
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#dbeb34'],
              [1, '#ed0f07'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        detail: {
          formatter: '{value} °C',
          fontSize: 12,
        },
        data: [
          {
            value: 30,
            name: 'SCORE',
          },
        ],
        title: {
          show: true,
        },
      },
    ],
  };
  s6T: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        min: this.minIn,
        max: this.maxIn,
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#dbeb34'],
              [1, '#ed0f07'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        detail: {
          formatter: '{value} °C',
          fontSize: 12,
        },
        data: [
          {
            value: 30,
            name: 'SCORE',
          },
        ],
        title: {
          show: true,
        },
      },
    ],
  };

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
  pressureValues: number[] = [];
  inPInstance: any;
  outPInstance: any;
  oilPInstance: any;
  s1PInstance: any;
  s2PInstance: any;
  s3PInstance: any;
  s4PInstance: any;
  s5PInstance: any;
  s6PInstance: any;

  inTInstance: any;
  outTInstance: any;
  oilTInstance: any;
  s1TInstance: any;
  s2TInstance: any;
  s3TInstance: any;
  s4TInstance: any;
  s5TInstance: any;
  s6TInstance: any;
  tempRender = false;
  pressureRender = true;
  kpiRender = false;
  compressorRender = true;
  dispRender = false;
  data3: any;
  shift = 1;
  role: any;
  hourlyStateData = null;

  dateControl = new FormControl('');
  dateControl2 = new FormControl('');
  onTabClick(index) {
    this.tabIndex = index;
    this.tabIndex1 = index;
    this.tabIndex2 = index;
  }
  onChartInitIn(ec) {
    this.inPInstance = ec;
  }
  onChartInitOil(ec) {
    this.oilPInstance = ec;
  }
  onChartInitS1(ec) {
    this.s1PInstance = ec;
  }
  onChartInitS2(ec) {
    this.s2PInstance = ec;
  }
  onChartInitS3(ec) {
    this.s3PInstance = ec;
  }
  onChartInitS4(ec) {
    this.s4PInstance = ec;
  }
  onChartInitS5(ec) {
    this.s5PInstance = ec;
  }
  onChartInitS6(ec) {
    this.s6PInstance = ec;
  }
  forms() {
    this.InForm = this.formBuilder.group({
      max: [''],
      min: [''],
    });
    this.oilForm = this.formBuilder.group({
      max: [''],
      min: [''],
    });
    this.s1Form = this.formBuilder.group({
      max: [''],
      min: [''],
    });
    this.s2Form = this.formBuilder.group({
      max: [''],
      min: [''],
    });
    this.s3Form = this.formBuilder.group({
      max: [''],
      min: [''],
    });
    this.s4Form = this.formBuilder.group({
      max: [''],
      min: [''],
    });
    this.s5Form = this.formBuilder.group({
      max: [''],
      min: [''],
    });

    this.OutFormT = this.formBuilder.group({
      max: [''],
      min: [''],
    });
    this.oilFormT = this.formBuilder.group({
      max: [''],
      min: [''],
    });
    this.s1FormT = this.formBuilder.group({
      max: [''],
      min: [''],
    });
    this.s2FormT = this.formBuilder.group({
      max: [''],
      min: [''],
    });
    this.s3FormT = this.formBuilder.group({
      max: [''],
      min: [''],
    });
    this.s4FormT = this.formBuilder.group({
      max: [''],
      min: [''],
    });
    this.s5FormT = this.formBuilder.group({
      max: [''],
      min: [''],
    });
  }
  color: string;
  pricing = 3.75;

  charts() {}
  chartsT() {}
  constructor(
    private formBuilder: FormBuilder,
    private _Activatedroute: ActivatedRoute,
    private stationService: StationService,

    private http: HttpClient,
    private router: Router
  ) {
    this.meters = new Array<Meter>();
    this.metersT = new Array<Meter>();
    this.pressureValues = [];
    this.inChart = {
      series: [],
      chart: {
        height: 220,
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
        height: 220,
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
        height: 220,
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
    this.transChart = {
      series: [],
      chart: {
        height: 220,
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
    this.consuChart = {
      series: [],
      chart: {
        height: 220,
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
    this.valueChart = {
      series: [],
      chart: {
        height: 220,
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
        height: 330,
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
    this.hourlyStateChart = {
      series: [],
      chart: {
        height: 450,
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
  }
  ngOnInit() {
    setTimeout(() => {
      let Permissions = JSON.stringify(
        localStorage.getItem('Permissions_taqa')
      );
      for (let i = 0; i < Permissions.length; i++) {
        if (Permissions.split(',')[i] == undefined) {
          break;
        }
        this.list_permissions.push(
          Permissions.split(',')[i].replace('_', ' ').replace('"', '')
        );
      }
      if (
        this.list_permissions.find((e) => e == 'operation details') !=
          undefined &&
        this.list_permissions.find((e) => e == 'financial details') != undefined
      ) {
        this.show_taps = true;
      } else if (
        this.list_permissions.find((e) => e == 'operation details') != undefined
      ) {
        this.flagheadtap = 'Operation';
      } else if (
        this.list_permissions.find((e) => e == 'financial details') != undefined
      ) {
        this.flagheadtap = 'Finance';
      }
    }, 100);

    this.role = localStorage.getItem('role');
    this.http
      .get(`${environment.sourceURL}/SettingTargets/` + this.id)
      .subscribe((Response) => {
        this.pricing = JSON.parse(JSON.stringify(Response)).valueRate;

        // this.routeSummary = data.routeSummary;
        //this.processesSummaryList = data.processesSummaryList;
      });
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.getAllStationsDefault();
      this.getAllStationsVlaueDefault();
      this.getStationVlaueDefault();

      // this.inPInstance.setOption(this.inP,true);
      //this.oilPInstance.setOption(this.oilP,true);
      //this.s1PInstance.setOption(this.s1P,true);
      //this.s2PInstance.setOption(this.s2P,true);
      //this.s3PInstance.setOption(this.s3P,true);
      //this.s4PInstance.setOption(this.s4P,true);
      //this.s5PInstance.setOption(this.s5P,true);
      //this.s6PInstance.setOption(this.s6P,true);
    }, 10000);
    this.stationId = this._Activatedroute.paramMap.subscribe((params) => {
      // console.log(params);
      this.id = params.get('id');
    });
    // console.log(this.id);
    this.getAllStationsVlaueDefault();
    this.getAllStationsDefault();
    this.getAllDispensersDefault();
    this.getConsumptionDataDefault();
    this.getLastReadDefault();
    this.getCurrentRead();
    this.getMaxMinRead();
    this.getStationVlaueDefault();
    // this.currentTime();
    this.getAllStations();
    this.getAllStatus();
  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  get in() {
    return this.InForm.controls;
  }
  get oil() {
    return this.oilForm.controls;
  }
  get s1() {
    return this.s1Form.controls;
  }
  get s2() {
    return this.s2Form.controls;
  }
  get s3() {
    return this.s3Form.controls;
  }
  get s4() {
    return this.s4Form.controls;
  }
  get s5() {
    return this.s5Form.controls;
  }

  get outTT() {
    return this.OutFormT.controls;
  }
  get oilTT() {
    return this.oilFormT.controls;
  }
  get s1TT() {
    return this.s1FormT.controls;
  }
  get s2TT() {
    return this.s2FormT.controls;
  }
  get s3TT() {
    return this.s3FormT.controls;
  }
  get s4TT() {
    return this.s4FormT.controls;
  }
  get s5TT() {
    return this.s5FormT.controls;
  }
  meterValue: number[] = [10, 10, 10, 10, 10, 10, 10];
  maxMeterValue: number[] = [100, 100, 100, 100, 100, 100, 100];
  minMeterValue: number[] = [0, 0, 0, 0, 0, 0, 0];

  meterValueT: number[] = [10, 10, 10, 10, 10, 10, 10];
  maxMeterValueT: number[] = [100, 100, 100, 100, 100, 100, 100];
  minMeterValueT: number[] = [0, 0, 0, 0, 0, 0, 0];

  chartsIn() {
    this.inP = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      textStyle: {
        fontSize: '10',
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          min: this.in.min.value,
          max: this.in.max.value,
          detail: {
            formatter: '{value} Bar',
            fontSize: 12,
          },
          data: [
            {
              value: 30,
              name: 'SCORE',
            },
          ],
          title: {
            show: true,
          },
        },
      ],
    };
    this.outP = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          detail: {
            formatter: '{value} Bar',
            fontSize: 12,
          },
          data: [
            {
              value: 30,
              name: 'SCORE',
            },
          ],
          title: {
            show: false,
          },
        },
      ],
    };

    this.s6P = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          min: this.minIn,
          max: this.maxIn,
          detail: {
            formatter: '{value} Bar',
            fontSize: 12,
          },
          data: [
            {
              value: 30,
              name: 'SCORE',
            },
          ],
          title: {
            show: true,
          },
        },
      ],
    };
  }
  chartsOil() {
    this.oilP = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          min: this.oil.min.value,
          max: this.oil.max.value,
          detail: {
            formatter: '{value} Bar',
            fontSize: 11,
          },
          data: [
            {
              value: 30,
              name: 'SCORE',
            },
          ],
          title: {
            show: true,
          },
        },
      ],
    };
  }
  chartsS1() {
    this.s1P = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          min: this.s1.min.value,
          max: this.s1.max.value,
          detail: {
            formatter: '{value} Bar',
            fontSize: 12,
          },
          data: [
            {
              value: 30,
              name: 'SCORE',
            },
          ],
          title: {
            show: true,
          },
        },
      ],
    };
  }
  chartsS2() {
    this.s2P = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          min: this.s2.min.value,
          max: this.s2.max.value,
          detail: {
            formatter: '{value} Bar',
            fontSize: 12,
          },
          data: [
            {
              value: 30,
              name: 'SCORE',
            },
          ],
          title: {
            show: true,
          },
        },
      ],
    };
  }
  chartsS3() {
    this.s3P = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          min: this.s3.min.value,
          max: this.s3.max.value,
          detail: {
            formatter: '{value} Bar',
            fontSize: 12,
          },
          data: [
            {
              value: 30,
              name: 'SCORE',
            },
          ],
          title: {
            show: true,
          },
        },
      ],
    };
  }
  chartsS4() {
    this.s4P = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          min: this.s4.min.value,
          max: this.s4.max.value,
          detail: {
            formatter: '{value} Bar',
            fontSize: 12,
          },
          data: [
            {
              value: 30,
              name: 'SCORE',
            },
          ],
          title: {
            show: true,
          },
        },
      ],
    };
  }
  chartsS5() {
    this.s5P = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          min: this.s5.min.value,
          max: this.s5.max.value,
          detail: {
            formatter: '{value} Bar',
            fontSize: 12,
          },
          data: [
            {
              value: 30,
              name: 'SCORE',
            },
          ],
          title: {
            show: true,
          },
        },
      ],
    };
  }

  chartsOutT() {
    this.outT = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: this.outTT.min.value,
          max: this.outTT.max.value,
          itemStyle: {
            color: '#FFAB91',
          },
          progress: {
            show: true,
            width: 10,
          },
          //   axisLine: {
          //     lineStyle:
          // },
          pointer: {
            show: false,
          },
          axisTick: {
            distance: -25,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          splitLine: {
            distance: -35,
            length: 14,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          axisLabel: {
            distance: -27,
            color: '#999',
            fontSize: 12,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            height: 15,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 35,
            fontWeight: 'bolder',
            formatter: '{value} C°',
            color: 'auto',
          },
          data: [
            {
              value: 20,
            },
          ],
        },
      ],
    };
  }
  chartsOilT() {
    this.oilT = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: this.oilTT.min.value,
          max: this.oilTT.max.value,
          itemStyle: {
            color: '#FFAB91',
          },
          progress: {
            show: true,
            width: 10,
          },
          //   axisLine: {
          //     lineStyle:
          // },
          pointer: {
            show: false,
          },
          axisTick: {
            distance: -25,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          splitLine: {
            distance: -35,
            length: 14,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          axisLabel: {
            distance: -27,
            color: '#999',
            fontSize: 12,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            height: 15,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 35,
            fontWeight: 'bolder',
            formatter: '{value} C°',
            color: 'auto',
          },
          data: [
            {
              value: 20,
            },
          ],
        },
      ],
    };
  }
  chartsS1T() {
    this.s1T = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: this.s1TT.min.value,
          max: this.s1TT.max.value,
          itemStyle: {
            color: '#FFAB91',
          },
          progress: {
            show: true,
            width: 10,
          },
          //   axisLine: {
          //     lineStyle:
          // },
          pointer: {
            show: false,
          },
          axisTick: {
            distance: -25,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          splitLine: {
            distance: -35,
            length: 14,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          axisLabel: {
            distance: -27,
            color: '#999',
            fontSize: 12,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            height: 15,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 35,
            fontWeight: 'bolder',
            formatter: '{value} C°',
            color: 'auto',
          },
          data: [
            {
              value: 20,
            },
          ],
        },
      ],
    };
  }
  chartsS2T() {
    this.s2T = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: this.s2TT.min.value,
          max: this.s2TT.max.value,
          itemStyle: {
            color: '#FFAB91',
          },
          progress: {
            show: true,
            width: 10,
          },
          //   axisLine: {
          //     lineStyle:
          // },
          pointer: {
            show: false,
          },
          axisTick: {
            distance: -25,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          splitLine: {
            distance: -35,
            length: 14,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          axisLabel: {
            distance: -27,
            color: '#999',
            fontSize: 12,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            height: 15,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 35,
            fontWeight: 'bolder',
            formatter: '{value} C°',
            color: 'auto',
          },
          data: [
            {
              value: 20,
            },
          ],
        },
      ],
    };
  }
  chartsS3T() {
    this.s3T = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: this.s3TT.min.value,
          max: this.s3TT.max.value,
          itemStyle: {
            color: '#FFAB91',
          },
          progress: {
            show: true,
            width: 10,
          },
          //   axisLine: {
          //     lineStyle:
          // },
          pointer: {
            show: false,
          },
          axisTick: {
            distance: -25,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          splitLine: {
            distance: -35,
            length: 14,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          axisLabel: {
            distance: -27,
            color: '#999',
            fontSize: 12,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            height: 15,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 35,
            fontWeight: 'bolder',
            formatter: '{value} C°',
            color: 'auto',
          },
          data: [
            {
              value: 20,
            },
          ],
        },
      ],
    };
  }
  chartsS4T() {
    this.s4T = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: this.s4TT.min.value,
          max: this.s4TT.max.value,
          itemStyle: {
            color: '#FFAB91',
          },
          progress: {
            show: true,
            width: 10,
          },
          //   axisLine: {
          //     lineStyle:
          // },
          pointer: {
            show: false,
          },
          axisTick: {
            distance: -25,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          splitLine: {
            distance: -35,
            length: 14,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          axisLabel: {
            distance: -27,
            color: '#999',
            fontSize: 12,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            height: 15,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 35,
            fontWeight: 'bolder',
            formatter: '{value} C°',
            color: 'auto',
          },
          data: [
            {
              value: 20,
            },
          ],
        },
      ],
    };
  }
  chartsS5T() {
    this.s5T = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: this.s5TT.min.value,
          max: this.s5TT.max.value,
          itemStyle: {
            color: '#FFAB91',
          },
          progress: {
            show: true,
            width: 10,
          },
          //   axisLine: {
          //     lineStyle:
          // },
          pointer: {
            show: false,
          },
          axisTick: {
            distance: -25,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          splitLine: {
            distance: -35,
            length: 14,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          axisLabel: {
            distance: -27,
            color: '#999',
            fontSize: 12,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            height: 15,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 35,
            fontWeight: 'bolder',
            formatter: '{value} C°',
            color: 'auto',
          },
          data: [
            {
              value: 20,
            },
          ],
        },
      ],
    };
  }

  // currentTime() {
  //   var date = new Date(); /* creating object of Date class */
  //   var hour = date.getHours();
  //   var min = date.getMinutes();
  //   var sec = date.getSeconds();
  //   hour = this.updateTime(hour);
  //   min = this.updateTime(min);
  //   sec = this.updateTime(sec);
  //   document.getElementById("clock").innerText = hour + " : " + min + " : " + sec; /* adding time to the div */
  //     var t = setTimeout(() => {this.currentTime()} , 1000); /* setting timer */
  // }

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
  changeTab2(tab) {
    if (tab.index == 0) {
      this.pressureRender = true;
      this.tempRender = false;
      this.kpiRender = false;
    } else if (tab.index == 1) {
      this.pressureRender = false;
      this.tempRender = true;
      this.kpiRender = false;
    } else if (tab.index == 2) {
      this.pressureRender = false;
      this.tempRender = false;
      this.kpiRender = true;
    }
  }
  changeTab3(tab) {
    if (tab.index == 0) {
      this.compressorRender = true;
      this.dispRender = false;
    } else if (tab.index == 1) {
      this.compressorRender = false;
      this.dispRender = true;
    }
  }
  tempValues: number[] = [];
  getAllStatus() {}
  getCurrentRead() {
    this.stationService.thv(2, this.id).subscribe((res) => {
      //   axisLine: {
      //     lineStyle: {
      //         width: 15,
      //         color: [
      //             [0.3, '#67e0e3'],
      //             [0.7, '#dbeb34'],
      //             [1, '#ed0f07']
      //         ]
      //     }
      // },
      this.inP.series[0].max = JSON.parse(JSON.stringify(res)).max;
      this.maxMeterValue[0] = JSON.parse(JSON.stringify(res)).max;
      this.inP.series[0].min = JSON.parse(JSON.stringify(res)).min;
      this.minMeterValue[0] = JSON.parse(JSON.stringify(res)).min;

      this.inP.series[0].axisLine.lineStyle.color[0][0] =
        JSON.parse(JSON.stringify(res)).warningValue / 100;
      this.inP.series[0].axisLine.lineStyle.color[1][0] =
        JSON.parse(JSON.stringify(res)).thv / 100;
      this.inP.series[0].axisLine.lineStyle.color[2][0] =
        JSON.parse(JSON.stringify(res)).max / 100;
    });
    this.stationService.thv(3, this.id).subscribe((res) => {
      this.oilP.series[0].max = JSON.parse(JSON.stringify(res)).max;
      this.oilP.series[0].min = JSON.parse(JSON.stringify(res)).min;
      this.oilP.series[0].axisLine.lineStyle.color[0][0] =
        JSON.parse(JSON.stringify(res)).warningValue / 100;
      this.oilP.series[0].axisLine.lineStyle.color[1][0] =
        JSON.parse(JSON.stringify(res)).thv / 100;
      this.oilP.series[0].axisLine.lineStyle.color[2][0] =
        JSON.parse(JSON.stringify(res)).max / 100;
      this.maxMeterValue[1] = JSON.parse(JSON.stringify(res)).max;
      this.minMeterValue[1] = JSON.parse(JSON.stringify(res)).min;
    });
    this.stationService.thv(4, this.id).subscribe((res) => {
      this.s1P.series[0].max = JSON.parse(JSON.stringify(res)).max;
      this.s1P.series[0].min = JSON.parse(JSON.stringify(res)).min;
      this.s1P.series[0].axisLine.lineStyle.color[0][0] =
        JSON.parse(JSON.stringify(res)).warningValue / 100;
      this.s1P.series[0].axisLine.lineStyle.color[1][0] =
        JSON.parse(JSON.stringify(res)).thv / 100;
      this.s1P.series[0].axisLine.lineStyle.color[2][0] =
        JSON.parse(JSON.stringify(res)).max / 100;
      this.maxMeterValue[2] = JSON.parse(JSON.stringify(res)).max;
      this.minMeterValue[2] = JSON.parse(JSON.stringify(res)).min;
    });
    this.stationService.thv(5, this.id).subscribe((res) => {
      this.s2P.series[0].max = JSON.parse(JSON.stringify(res)).max;
      this.s2P.series[0].min = JSON.parse(JSON.stringify(res)).min;
      this.s2P.series[0].axisLine.lineStyle.color[0][0] =
        JSON.parse(JSON.stringify(res)).warningValue / 100;
      this.s2P.series[0].axisLine.lineStyle.color[1][0] =
        JSON.parse(JSON.stringify(res)).thv / 100;
      this.s2P.series[0].axisLine.lineStyle.color[2][0] =
        JSON.parse(JSON.stringify(res)).max / 100;
      this.maxMeterValue[3] = JSON.parse(JSON.stringify(res)).max;
      this.minMeterValue[3] = JSON.parse(JSON.stringify(res)).min;
    });
    this.stationService.thv(6, this.id).subscribe((res) => {
      this.s3P.series[0].max = JSON.parse(JSON.stringify(res)).max;
      this.s3P.series[0].min = JSON.parse(JSON.stringify(res)).min;
      this.s3P.series[0].axisLine.lineStyle.color[0][0] =
        JSON.parse(JSON.stringify(res)).warningValue / 100;
      this.s3P.series[0].axisLine.lineStyle.color[1][0] =
        JSON.parse(JSON.stringify(res)).thv / 100;
      this.s3P.series[0].axisLine.lineStyle.color[2][0] =
        JSON.parse(JSON.stringify(res)).max / 100;
      this.maxMeterValue[4] = JSON.parse(JSON.stringify(res)).max;
      this.minMeterValue[4] = JSON.parse(JSON.stringify(res)).min;
    });
    this.stationService.thv(7, this.id).subscribe((res) => {
      this.s4P.series[0].max = JSON.parse(JSON.stringify(res)).max;
      this.s4P.series[0].min = JSON.parse(JSON.stringify(res)).min;
      this.s4P.series[0].axisLine.lineStyle.color[0][0] =
        JSON.parse(JSON.stringify(res)).warningValue / 100;
      this.s4P.series[0].axisLine.lineStyle.color[1][0] =
        JSON.parse(JSON.stringify(res)).thv / 100;
      this.s4P.series[0].axisLine.lineStyle.color[2][0] =
        JSON.parse(JSON.stringify(res)).max / 100;
      this.maxMeterValue[5] = JSON.parse(JSON.stringify(res)).max;
      this.minMeterValue[5] = JSON.parse(JSON.stringify(res)).min;
    });
    this.stationService.thv(8, this.id).subscribe((res) => {
      this.s5P.series[0].max = JSON.parse(JSON.stringify(res)).max;
      this.s5P.series[0].min = JSON.parse(JSON.stringify(res)).min;
      this.s5P.series[0].axisLine.lineStyle.color[0][0] =
        JSON.parse(JSON.stringify(res)).warningValue / 100;
      this.s5P.series[0].axisLine.lineStyle.color[1][0] =
        JSON.parse(JSON.stringify(res)).thv / 100;
      this.s5P.series[0].axisLine.lineStyle.color[2][0] =
        JSON.parse(JSON.stringify(res)).max / 100;
      this.maxMeterValue[6] = JSON.parse(JSON.stringify(res)).max;
      this.minMeterValue[6] = JSON.parse(JSON.stringify(res)).min;
    });
    this.stationService.thv(9, this.id).subscribe((res) => {
      this.outT.series[0].max = JSON.parse(JSON.stringify(res)).max;
      this.outT.series[0].min = JSON.parse(JSON.stringify(res)).min;
      this.outT.series[0].axisLine.lineStyle.color[0][0] =
        JSON.parse(JSON.stringify(res)).warningValue / 100;
      this.outT.series[0].axisLine.lineStyle.color[1][0] =
        JSON.parse(JSON.stringify(res)).thv / 100;
      this.outT.series[0].axisLine.lineStyle.color[2][0] =
        JSON.parse(JSON.stringify(res)).max / 100;
      this.maxMeterValueT[0] = JSON.parse(JSON.stringify(res)).max;
      this.minMeterValueT[0] = JSON.parse(JSON.stringify(res)).min;
    });
    this.stationService.thv(10, this.id).subscribe((res) => {
      this.oilT.series[0].max = JSON.parse(JSON.stringify(res)).max;
      this.oilT.series[0].min = JSON.parse(JSON.stringify(res)).min;
      this.oilT.series[0].axisLine.lineStyle.color[0][0] =
        JSON.parse(JSON.stringify(res)).warningValue / 100;
      this.oilT.series[0].axisLine.lineStyle.color[1][0] =
        JSON.parse(JSON.stringify(res)).thv / 100;
      this.oilT.series[0].axisLine.lineStyle.color[2][0] =
        JSON.parse(JSON.stringify(res)).max / 100;
      this.maxMeterValueT[1] = JSON.parse(JSON.stringify(res)).max;
      this.minMeterValueT[1] = JSON.parse(JSON.stringify(res)).min;
    });
    this.stationService.thv(11, this.id).subscribe((res) => {
      this.s1T.series[0].max = JSON.parse(JSON.stringify(res)).max;
      this.s1T.series[0].min = JSON.parse(JSON.stringify(res)).min;
      this.s1T.series[0].axisLine.lineStyle.color[0][0] =
        JSON.parse(JSON.stringify(res)).warningValue / 100;
      this.s1T.series[0].axisLine.lineStyle.color[1][0] =
        JSON.parse(JSON.stringify(res)).thv / 100;
      this.s1T.series[0].axisLine.lineStyle.color[2][0] =
        JSON.parse(JSON.stringify(res)).max / 100;
      this.maxMeterValueT[2] = JSON.parse(JSON.stringify(res)).max;
      this.minMeterValueT[2] = JSON.parse(JSON.stringify(res)).min;
    });
    this.stationService.thv(12, this.id).subscribe((res) => {
      this.s2T.series[0].max = JSON.parse(JSON.stringify(res)).max;
      this.s2T.series[0].min = JSON.parse(JSON.stringify(res)).min;
      this.s2T.series[0].axisLine.lineStyle.color[0][0] =
        JSON.parse(JSON.stringify(res)).warningValue / 100;
      this.s2T.series[0].axisLine.lineStyle.color[1][0] =
        JSON.parse(JSON.stringify(res)).thv / 100;
      this.s2T.series[0].axisLine.lineStyle.color[2][0] =
        JSON.parse(JSON.stringify(res)).max / 100;
      this.maxMeterValueT[3] = JSON.parse(JSON.stringify(res)).max;
      this.minMeterValueT[3] = JSON.parse(JSON.stringify(res)).min;
    });
    this.stationService.thv(13, this.id).subscribe((res) => {
      this.s3T.series[0].max = JSON.parse(JSON.stringify(res)).max;
      this.s3T.series[0].min = JSON.parse(JSON.stringify(res)).min;
      this.s3T.series[0].axisLine.lineStyle.color[0][0] =
        JSON.parse(JSON.stringify(res)).warningValue / 100;
      this.s3T.series[0].axisLine.lineStyle.color[1][0] =
        JSON.parse(JSON.stringify(res)).thv / 100;
      this.s3T.series[0].axisLine.lineStyle.color[2][0] =
        JSON.parse(JSON.stringify(res)).max / 100;
      this.maxMeterValueT[4] = JSON.parse(JSON.stringify(res)).max;
      this.minMeterValueT[4] = JSON.parse(JSON.stringify(res)).min;
    });
    this.stationService.thv(14, this.id).subscribe((res) => {
      this.s4T.series[0].max = JSON.parse(JSON.stringify(res)).max;
      this.s4T.series[0].min = JSON.parse(JSON.stringify(res)).min;
      this.s4T.series[0].axisLine.lineStyle.color[0][0] =
        JSON.parse(JSON.stringify(res)).warningValue / 100;
      this.s4T.series[0].axisLine.lineStyle.color[1][0] =
        JSON.parse(JSON.stringify(res)).thv / 100;
      this.s4T.series[0].axisLine.lineStyle.color[2][0] =
        JSON.parse(JSON.stringify(res)).max / 100;
      this.maxMeterValueT[5] = JSON.parse(JSON.stringify(res)).max;
      this.minMeterValueT[5] = JSON.parse(JSON.stringify(res)).min;
    });
    this.stationService.thv(15, this.id).subscribe((res) => {
      this.s5T.series[0].max = JSON.parse(JSON.stringify(res)).max;
      this.s5T.series[0].min = JSON.parse(JSON.stringify(res)).min;
      this.s5T.series[0].axisLine.lineStyle.color[0][0] =
        JSON.parse(JSON.stringify(res)).warningValue / 100;
      this.s5T.series[0].axisLine.lineStyle.color[1][0] =
        JSON.parse(JSON.stringify(res)).thv / 100;
      this.s5T.series[0].axisLine.lineStyle.color[2][0] =
        JSON.parse(JSON.stringify(res)).max / 100;
      this.maxMeterValueT[6] = JSON.parse(JSON.stringify(res)).max;
      this.minMeterValueT[6] = JSON.parse(JSON.stringify(res)).min;
    });
    //this.inP.series[0].data[0].value = null;
    this.currentRead = null;
    this.stationService.getGetCurrentRead(this.id).subscribe((res) => {
      // // console.log("successfull get ffffff");

      this.currentRead = JSON.parse(JSON.stringify(res));

      this.inP.series[0].data[0].value = (
        this.currentRead.inlet_Pressure / 14.5038
      ).toFixed();
      this.meterValue[0] = parseInt(this.inP.series[0].data[0].value);
      //this.meters[0].meterValue =  this.inP.series[0].data[0].value;
      this.inP.series[0].data[0].name =
        this.currentRead.inlet_Pressure.toFixed() + ' ' + 'PSIG';
      this.pressureValues.push(this.inP.series[0].data[0].value);

      this.oilP.series[0].data[0].value = (
        this.currentRead.oil_Pressure / 14.5038
      ).toFixed();
      //this.meters[1].meterValue =  this.oilP.series[0].data[0].value;
      this.meterValue[1] = parseInt(this.oilP.series[0].data[0].value);
      this.oilP.series[0].data[0].name =
        this.currentRead.oil_Pressure.toFixed() + ' ' + 'PSIG';
      this.pressureValues.push(this.oilP.series[0].data[0].value);

      this.s1P.series[0].data[0].value = (
        this.currentRead.stage1_Pressure / 14.5038
      ).toFixed();
      //this.meters[2].meterValue =  this.s1P.series[0].data[0].value;
      this.meterValue[2] = parseInt(this.s1P.series[0].data[0].value);
      this.s1P.series[0].data[0].name =
        this.currentRead.stage1_Pressure.toFixed() + ' ' + 'PSIG';
      this.pressureValues.push(this.s1P.series[0].data[0].value);

      this.s2P.series[0].data[0].value = (
        this.currentRead.stage2_Pressure / 14.5038
      ).toFixed();
      //this.meters[3].meterValue =  this.s2P.series[0].data[0].value;
      this.meterValue[3] = parseInt(this.s2P.series[0].data[0].value);
      this.s2P.series[0].data[0].name =
        this.currentRead.stage2_Pressure.toFixed() + ' ' + 'PSIG';
      this.pressureValues.push(this.s2P.series[0].data[0].value);

      this.s3P.series[0].data[0].value = (
        this.currentRead.stage3_Pressure / 14.5038
      ).toFixed();
      //this.meters[4].meterValue =  this.s3P.series[0].data[0].value;
      this.meterValue[4] = parseInt(this.s3P.series[0].data[0].value);
      this.s3P.series[0].data[0].name =
        this.currentRead.stage3_Pressure.toFixed() + ' ' + 'PSIG';
      this.pressureValues.push(this.s3P.series[0].data[0].value);

      this.s4P.series[0].data[0].value = (
        this.currentRead.stage4_Pressure / 14.5038
      ).toFixed();
      //this.meters[5].meterValue =  this.s4P.series[0].data[0].value;
      this.meterValue[5] = parseInt(this.s4P.series[0].data[0].value);
      this.s4P.series[0].data[0].name =
        this.currentRead.stage4_Pressure.toFixed() + ' ' + 'PSIG';
      this.pressureValues.push(this.s4P.series[0].data[0].value);

      this.s5P.series[0].data[0].value = (
        this.currentRead.stage5_Pressure / 14.5038
      ).toFixed();
      //this.meters[6].meterValue =  this.s5P.series[0].data[0].value;
      this.meterValue[6] = parseInt(this.s5P.series[0].data[0].value);
      this.s5P.series[0].data[0].name =
        this.currentRead.stage5_Pressure.toFixed() + ' ' + 'PSIG';
      this.pressureValues.push(this.s5P.series[0].data[0].value);

      this.s6P.series[0].data[0].value = (
        this.currentRead.stage6_Pressure / 14.5038
      ).toFixed();
      this.s6P.series[0].data[0].name =
        this.currentRead.stage6_Pressure.toFixed() + ' ' + 'PSIG';
      this.pressureValues.push(this.s6P.series[0].data[0].value);

      this.minValue = Math.min(...this.pressureValues);
      this.maxValue = Math.max(...this.pressureValues);
      this.maxDisplayedValue = Math.max(...this.pressureValues);
      // console.log(this.pressureValues);
      // console.log(this.meters,this.meterValue);
      this.options = {
        floor: Math.min(...this.pressureValues),
        ceil: Math.max(...this.pressureValues),
        translate: (value: number, label: LabelType): string => {
          switch (label) {
            case LabelType.Low:
              return '<b>Min Pressure:</b> ' + value;
            case LabelType.High:
              return '<b>Max Pressure:</b> ' + value;
            default:
              return '' + value;
          }
        },
      };

      this.inT.series[0].data[0].value = (
        (this.currentRead.inlet_Temprature - 32) /
        1.8
      ).toFixed();
      this.inT.series[0].data[0].name =
        (this.currentRead.inlet_Temprature - 32) / 1.8;
      this.tempValues.push(this.inT.series[0].data[0].value);

      this.outT.series[0].data[0].value = (
        (this.currentRead.discharge_Temprature - 32) /
        1.8
      ).toFixed();
      this.outT.series[0].data[0].name =
        this.currentRead.discharge_Temprature.toFixed() + ' ' + 'F°';
      this.tempValues.push(this.outT.series[0].data[0].value);
      this.meterValueT[0] = parseInt(this.outT.series[0].data[0].value);

      this.oilT.series[0].data[0].value = (
        (this.currentRead.oil_Temprature - 32) /
        1.8
      ).toFixed();
      this.oilT.series[0].data[0].name =
        this.currentRead.oil_Temprature.toFixed() + ' ' + 'F°';
      this.meterValueT[1] = parseInt(this.oilT.series[0].data[0].value);
      this.tempValues.push(this.oilT.series[0].data[0].value);

      this.s1T.series[0].data[0].value = (
        (this.currentRead.stage1_Temprature - 32) /
        1.8
      ).toFixed();
      this.s1T.series[0].data[0].name =
        this.currentRead.stage1_Temprature.toFixed() + ' ' + 'F°';
      this.meterValueT[2] = parseInt(this.s1T.series[0].data[0].value);
      this.tempValues.push(this.s1T.series[0].data[0].value);

      this.s2T.series[0].data[0].value = (
        (this.currentRead.stage2_Temprature - 32) /
        1.8
      ).toFixed();
      this.s2T.series[0].data[0].name =
        this.currentRead.stage2_Temprature.toFixed() + ' ' + 'F°';
      this.meterValueT[3] = parseInt(this.s2T.series[0].data[0].value);
      this.tempValues.push(this.s2T.series[0].data[0].value);

      this.s3T.series[0].data[0].value = (
        (this.currentRead.stage3_Temprature - 32) /
        1.8
      ).toFixed();
      this.s3T.series[0].data[0].name =
        this.currentRead.stage3_Temprature.toFixed() + ' ' + 'F°';
      this.meterValueT[4] = parseInt(this.s3T.series[0].data[0].value);
      this.tempValues.push(this.s3T.series[0].data[0].value);

      this.s4T.series[0].data[0].value = (
        (this.currentRead.stage4_Temprature - 32) /
        1.8
      ).toFixed();
      this.s4T.series[0].data[0].name =
        this.currentRead.stage4_Temprature.toFixed() + ' ' + 'F°';
      this.meterValueT[5] = parseInt(this.s4T.series[0].data[0].value);
      this.tempValues.push(this.s4T.series[0].data[0].value);

      this.s5T.series[0].data[0].value = (
        (this.currentRead.stage5_Temprature - 32) /
        1.8
      ).toFixed();
      this.s5T.series[0].data[0].name =
        this.currentRead.stage5_Temprature.toFixed() + ' ' + 'F°';
      this.meterValueT[6] = parseInt(this.s5T.series[0].data[0].value);
      this.tempValues.push(this.s5T.series[0].data[0].value);

      this.s6T.series[0].data[0].value =
        this.currentRead.stage6_Temprature.toFixed();
      this.s6T.series[0].data[0].name =
        this.currentRead.stage6_Temprature.toFixed() + ' ' + 'F°';
      this.tempValues.push(this.s6T.series[0].data[0].value);
      this.minValue2 = Math.min(...this.tempValues);
      this.maxValue2 = Math.max(...this.tempValues);
      // console.log(this.tempValues);

      this.maxDisplayedValue2 = Math.max(...this.tempValues);
      this.options2 = {
        floor: Math.min(...this.tempValues),
        ceil: Math.max(...this.tempValues),
        translate: (value: number, label: LabelType): string => {
          switch (label) {
            case LabelType.Low:
              return '<b>Min Tempreture:</b> ' + value;
            case LabelType.High:
              return '<b>Max Tempreture:</b> ' + value;
            default:
              return '' + value;
          }
        },
      };
      this.pressureNames.forEach((ele, i) => {
        if (this.meterValue[i] >= 0 && this.meterValue[i] <= 49) {
          this.color = '#66ad42';
        } else if (this.meterValue[i] >= 50 && this.meterValue[i] <= 79) {
          this.color = '#cde03a';
        } else if (this.meterValue[i] > 80) {
          this.color = '#FF7F5C';
        }
        if (this.meterValue[i] == 3) {
          this.meterValue[i] = 5;
        }
        this.meters.push({
          name: ele,
          meterValue: this.meterValue[i],
          maxMeterValue: this.maxMeterValue[i],
          minMeterValue: this.minMeterValue[i],
          annotaions: [
            {
              content: `<div id="pointervalue" style="font-size:20px;width:60px;text-align:center">
                ${this.meterValue[i]}/${this.maxMeterValue[i]}</div>`,
              angle: 0,
              zIndex: '1',
              radius: '10%',
            },
            {
              content:
                '<div id="slider" style="height:70px;width:250px;"></div>',
              angle: 0,
              zIndex: '1',
              radius: '-100%',
            },
          ],
          ranges: [
            {
              start: this.minMeterValue[i],
              end: this.maxMeterValue[i],
              radius: '100%',
              startWidth: 15,
              endWidth: 15,
              color: '#E0E0E0',
              roundedCornerRadius: 5,
            },
          ],
          pointers: [
            {
              roundedCornerRadius: 5,
              value: this.meterValue[i],
              type: 'RangeBar',
              radius: '100%',
              color: this.color,
              border: {
                color: 'grey',
                width: 0,
              },
              animation: {
                enable: false,
              },
              pointerWidth: 15,
            },
          ],
        });
      });
      this.temperatureNames.forEach((ele, i) => {
        if (this.meterValueT[i] >= 0 && this.meterValueT[i] <= 29) {
          this.color = '#66ad42';
        } else if (this.meterValueT[i] >= 30 && this.meterValueT[i] <= 49) {
          this.color = '#cde03a';
        } else if (this.meterValueT[i] >= 50) {
          this.color = '#FF7F5C';
        }
        if (this.meterValueT[i] == 3) {
          this.meterValueT[i] = 5;
        }
        this.metersT.push({
          name: ele,
          meterValue: this.meterValueT[i],
          maxMeterValue: this.maxMeterValueT[i],
          minMeterValue: this.minMeterValueT[i],
          annotaions: [
            {
              content: `<div id="pointervalue" style="font-size:20px;width:60px;text-align:center">
                ${this.meterValueT[i]}/${this.maxMeterValueT[i]}</div>`,
              angle: 0,
              zIndex: '1',
              radius: '10%',
            },
            {
              content:
                '<div id="slider" style="height:70px;width:250px;"></div>',
              angle: 0,
              zIndex: '1',
              radius: '-100%',
            },
          ],
          ranges: [
            {
              start: this.minMeterValueT[i],
              end: this.maxMeterValueT[i],
              radius: '100%',
              startWidth: 15,
              endWidth: 15,
              color: '#E0E0E0',
              roundedCornerRadius: 5,
            },
          ],
          pointers: [
            {
              roundedCornerRadius: 5,
              value: this.meterValueT[i],
              type: 'RangeBar',
              radius: '100%',
              color: this.color,
              border: {
                color: 'grey',
                width: 0,
              },
              animation: {
                enable: false,
              },
              pointerWidth: 15,
            },
          ],
        });
      });
      // console.log(this.meters);
    });
  }
  getMaxMinRead() {
    this.stationService.getGetMaxMinRead(this.id).subscribe((res) => {
      this.maxMinRead = JSON.parse(JSON.stringify(res));
    });
    this.barChart.series[0].data = [];
    this.barChart.xaxis.categories = [];
    this.hourlyStateData = null;
    this.stationService.getGetAllStatus(this.id).subscribe((res) => {
      this.allStatus = JSON.parse(JSON.stringify(res)).compressors;
      this.allStatus.forEach((element) => {
        this.barChart.series[0].data.push(
          ((element.noState / element.totalStateHourly) * 100).toFixed()
        );
        this.barChart.xaxis.categories.push(element.name);
      });

      JSON.parse(JSON.stringify(res)).compressors2.forEach((element, i) => {
        this.hourlyStateChart.series.push({
          name: element.name,
          data: [],
        });
        element.status.forEach((ele, j) => {
          this.hourlyStateChart.series[i].data.push(
            ((ele.noState / ele.totalStateHourly) * 100).toFixed()
          );
        });
      });
      JSON.parse(JSON.stringify(res)).compressors2[0].status.forEach(
        (element) => {
          this.hourlyStateChart.xaxis.categories.push(
            new Date(element.timeStamp).getHours()
          );
        }
      );
      this.hourlyStateData = this.hourlyStateChart.series[0].data;
      // console.log(this.allStatus);
    });
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
    this.transChart.series = [];
    this.transChart.xaxis.categories = [];
    this.consuChart.series = [];
    this.consuChart.xaxis.categories = [];
    this.valueChart.series = [];
    this.valueChart.xaxis.categories = [];
    this.data = null;
    this.data2 = null;
    this.stationService.getGetAllDesipenser(this.id, 1).subscribe((res) => {
      // console.log({res});
      this.allDispensers = JSON.parse(JSON.stringify(res));
      this.inChart.series.push({
        name: this.allDispensers.stationValues[0].name,
        data: [],
      });
      this.outChart.series.push({
        name: this.allDispensers.stationValues[0].name,
        data: [],
      });
      this.oilChart.series.push({
        name: this.allDispensers.stationValues[0].name,
        data: [],
      });
      this.allDispensers.stationValues.forEach((element, i) => {
        this.inChart.series[0].data.push(element.transaction);
        this.outChart.series[0].data.push(element.consumption);

        this.oilChart.series[0].data.push(element.value.toFixed());
      });

      this.allDispensers.stationValues.forEach((elem) => {
        this.inChart.xaxis.categories.push(
          new Date(elem.timeStamp).setHours(
            new Date(elem.timeStamp).getHours() + 2
          )
        );
      });
      this.allDispensers.stationValues.forEach((elem) => {
        this.outChart.xaxis.categories.push(
          new Date(elem.timeStamp).setHours(
            new Date(elem.timeStamp).getHours() + 2
          )
        );
      });
      this.allDispensers.stationValues.forEach((elem) => {
        this.oilChart.xaxis.categories.push(
          new Date(elem.timeStamp).setHours(
            new Date(elem.timeStamp).getHours() + 2
          )
        );
      });
      this.allDispensers.vehicles.forEach((element, i) => {
        this.transChart.series.push({
          name: element.machineId + '-' + element.dispenser_No,
          data: [],
        });
        this.consuChart.series.push({
          name: element.machineId + '-' + element.dispenser_No,
          data: [],
        });
        this.valueChart.series.push({
          name: element.machineId + '-' + element.dispenser_No,
          data: [],
        });
        element.vechileflows.forEach((el, j) => {
          this.transChart.series[i].data.push(el.total_Vechiles);
        });

        element.consumptionRates.forEach((el, j) => {
          this.consuChart.series[i].data.push(
            el.total_Consumption_per_Transaction
          );
        });
        element.consumptionRates.forEach((el, j) => {
          this.valueChart.series[i].data.push(
            (el.total_Consumption_per_Transaction * this.pricing).toFixed()
          );
        });
      });
      this.allDispensers.vehicles[0].vechileflows.forEach((elem) => {
        this.transChart.xaxis.categories.push(
          new Date(elem.timeStamp).setHours(
            new Date(elem.timeStamp).getHours() + 2
          )
        );
      });
      this.allDispensers.vehicles[0].consumptionRates.forEach((elem) => {
        this.consuChart.xaxis.categories.push(
          new Date(elem.timeStamp).setHours(
            new Date(elem.timeStamp).getHours() + 2
          )
        );
      });
      this.allDispensers.vehicles[0].consumptionRates.forEach((elem) => {
        this.valueChart.xaxis.categories.push(
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

    this.transChart.series = [];
    this.transChart.xaxis.categories = [];
    this.consuChart.series = [];
    this.consuChart.xaxis.categories = [];
    this.valueChart.series = [];
    this.valueChart.xaxis.categories = [];

    this.data = null;
    this.data2 = null;
    this.stationService.getGetAllDesipenser(this.id, time).subscribe((res) => {
      this.allDispensers = JSON.parse(JSON.stringify(res));
      if (time == 1 || time == 2) {
        this.allDispensers = JSON.parse(JSON.stringify(res));
        this.inChart.series.push({
          name: this.allDispensers.stationValues[0].name,
          data: [],
        });
        this.outChart.series.push({
          name: this.allDispensers.stationValues[0].name,
          data: [],
        });
        this.oilChart.series.push({
          name: this.allDispensers.stationValues[0].name,
          data: [],
        });
        this.allDispensers.stationValues.forEach((element, i) => {
          this.inChart.series[0].data.push(element.transaction);
          this.outChart.series[0].data.push(element.consumption);

          this.oilChart.series[0].data.push(element.value.toFixed());
        });

        this.allDispensers.stationValues.forEach((elem) => {
          this.inChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.stationValues.forEach((elem) => {
          this.outChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.stationValues.forEach((elem) => {
          this.oilChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.vehicles.forEach((element, i) => {
          this.transChart.series.push({
            name: element.machineId + '-' + element.dispenser_No,
            data: [],
          });
          this.consuChart.series.push({
            name: element.machineId + '-' + element.dispenser_No,
            data: [],
          });
          this.valueChart.series.push({
            name: element.machineId + '-' + element.dispenser_No,
            data: [],
          });
          element.vechileflows.forEach((el, j) => {
            this.transChart.series[i].data.push(el.total_Vechiles);
          });

          element.consumptionRates.forEach((el, j) => {
            this.consuChart.series[i].data.push(
              el.total_Consumption_per_Transaction
            );
          });
          element.consumptionRates.forEach((el, j) => {
            this.valueChart.series[i].data.push(
              (el.total_Consumption_per_Transaction * this.pricing).toFixed()
            );
          });
        });
        this.allDispensers.vehicles[0].vechileflows.forEach((elem) => {
          this.transChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.vehicles[0].consumptionRates.forEach((elem) => {
          this.consuChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.vehicles[0].consumptionRates.forEach((elem) => {
          this.valueChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
      } else if (time == 3) {
        this.allDispensers = JSON.parse(JSON.stringify(res));
        this.inChart.series.push({
          name: this.allDispensers.stationValues[0].name,
          data: [],
        });
        this.outChart.series.push({
          name: this.allDispensers.stationValues[0].name,
          data: [],
        });
        this.oilChart.series.push({
          name: this.allDispensers.stationValues[0].name,
          data: [],
        });
        this.allDispensers.stationValues.forEach((element, i) => {
          this.inChart.series[0].data.push(element.transaction);
          this.outChart.series[0].data.push(element.consumption);

          this.oilChart.series[0].data.push(element.value.toFixed());
        });

        this.allDispensers.stationValues.forEach((elem) => {
          this.inChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.stationValues.forEach((elem) => {
          this.outChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.stationValues.forEach((elem) => {
          this.oilChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.vehicles.forEach((element, i) => {
          this.transChart.series.push({
            name: element.machineId + '-' + element.dispenser_No,
            data: [],
          });
          this.consuChart.series.push({
            name: element.machineId + '-' + element.dispenser_No,
            data: [],
          });
          this.valueChart.series.push({
            name: element.machineId + '-' + element.dispenser_No,
            data: [],
          });
          element.dailyVechileflows.forEach((el, j) => {
            this.transChart.series[i].data.push(el.total_Vechiles);
          });

          element.dailyConsumptionRates.forEach((el, j) => {
            this.consuChart.series[i].data.push(
              el.total_Consumption_per_Transaction
            );
          });
          element.dailyConsumptionRates.forEach((el, j) => {
            this.valueChart.series[i].data.push(
              (el.total_Consumption_per_Transaction * this.pricing).toFixed()
            );
          });
        });
        this.allDispensers.vehicles[0].dailyVechileflows.forEach((elem) => {
          this.transChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.vehicles[0].dailyConsumptionRates.forEach((elem) => {
          this.consuChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.vehicles[0].dailyConsumptionRates.forEach((elem) => {
          this.valueChart.xaxis.categories.push(
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
    this.transChart.series = [];
    this.transChart.xaxis.categories = [];
    this.consuChart.series = [];
    this.consuChart.xaxis.categories = [];
    this.valueChart.series = [];
    this.valueChart.xaxis.categories = [];
    this.data = null;
    this.data2 = null;
    this.stationService
      .getGetAllDesipenserDate(this.id, from, to)
      .subscribe((res) => {
        this.allDispensers = JSON.parse(JSON.stringify(res));

        this.allDispensers = JSON.parse(JSON.stringify(res));
        this.inChart.series.push({
          name: this.allDispensers.stationValues[0].name,
          data: [],
        });
        this.outChart.series.push({
          name: this.allDispensers.stationValues[0].name,
          data: [],
        });
        this.oilChart.series.push({
          name: this.allDispensers.stationValues[0].name,
          data: [],
        });
        this.allDispensers.stationValues.forEach((element, i) => {
          this.inChart.series[0].data.push(element.transaction);
          this.outChart.series[0].data.push(element.consumption);

          this.oilChart.series[0].data.push(element.value.toFixed());
        });

        this.allDispensers.stationValues.forEach((elem) => {
          this.inChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.stationValues.forEach((elem) => {
          this.outChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.stationValues.forEach((elem) => {
          this.oilChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.vehicles.forEach((element, i) => {
          this.transChart.series.push({
            name: element.machineId + '-' + element.dispenser_No,
            data: [],
          });
          this.consuChart.series.push({
            name: element.machineId + '-' + element.dispenser_No,
            data: [],
          });
          this.valueChart.series.push({
            name: element.machineId + '-' + element.dispenser_No,
            data: [],
          });
          element.dailyVechileflows.forEach((el, j) => {
            this.transChart.series[i].data.push(el.total_Vechiles);
          });

          element.dailyConsumptionRates.forEach((el, j) => {
            this.consuChart.series[i].data.push(
              el.total_Consumption_per_Transaction
            );
          });
          element.dailyConsumptionRates.forEach((el, j) => {
            this.valueChart.series[i].data.push(
              (el.total_Consumption_per_Transaction * this.pricing).toFixed()
            );
          });
        });
        this.allDispensers.vehicles[0].dailyVechileflows.forEach((elem) => {
          this.transChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.vehicles[0].dailyConsumptionRates.forEach((elem) => {
          this.consuChart.xaxis.categories.push(
            new Date(elem.timeStamp).setHours(
              new Date(elem.timeStamp).getHours() + 2
            )
          );
        });
        this.allDispensers.vehicles[0].dailyConsumptionRates.forEach((elem) => {
          this.valueChart.xaxis.categories.push(
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
        } else {
          this.consumptionData = JSON.parse(JSON.stringify(res));
          this.consumptionData.forEach((element, i) => {
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

        // console.log(this.consumptionData);
      });
  }
  redirect() {
    this.router.navigate(['../dashboard']);
  }
  redirect2() {
    this.router.navigate(['../alarm/' + this.id]);
  }
  redirect3() {
    this.router.navigate(['../settings']);
  }
  redirect4() {
    this.router.navigate(['../user-alert-settings']);
  }
  getTime(time) {
    return new Date(time).toLocaleString();
  }
  fromDate(ee) {
    this.From = new Date(ee.value).toISOString();
    // console.log(this.From);
  }
  toDate(ee) {
    this.To = new Date(ee.value).toISOString();

    this.getAllDispensersDate(
      this.From.substring(0, this.From.length - 1),
      this.To.substring(0, this.To.length - 1)
    );
    this.getAllStationsDate(
      this.From.substring(0, this.From.length - 1),
      this.To.substring(0, this.To.length - 1)
    );
    this.getAllStationsVlaueDate(
      this.From.substring(0, this.From.length - 1),
      this.To.substring(0, this.To.length - 1)
    );
    this.getConsumptionDataDate(
      this.From.substring(0, this.From.length - 1),
      this.To.substring(0, this.To.length - 1)
    );
    this.getStationVlaueDate(
      this.From.substring(0, this.From.length - 1),
      this.To.substring(0, this.To.length - 1)
    );
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
    this.getAllDispensersDate(
      this.shiftFrom.substring(0, this.shiftFrom.length - 1),
      this.shiftTo.substring(0, this.shiftTo.length - 1)
    );
    this.getAllStationsDate(
      this.shiftFrom.substring(0, this.shiftFrom.length - 1),
      this.shiftTo.substring(0, this.shiftTo.length - 1)
    );
    this.getAllStationsVlaueDate(
      this.shiftFrom.substring(0, this.shiftFrom.length - 1),
      this.shiftTo.substring(0, this.shiftTo.length - 1)
    );
    //this.getConsumptionDataDate(this.shiftFrom.substring(0,this.shiftFrom.length-1),this.shiftTo.substring(0,this.shiftTo.length-1));
    this.getStationVlaueDate(
      this.shiftFrom.substring(0, this.shiftFrom.length - 1),
      this.shiftTo.substring(0, this.shiftTo.length - 1)
    );

    // console.log(this.shiftTo);
  }
  getTimeDiff(time, time2) {
    if (new Date(time).getDate() == new Date(time2).getDate()) {
      return true;
    } else {
      return false;
    }
  }
  DateChange(time) {
    return new Date(time).toDateString();
  }

  minDisplayedValue = 0;
  maxDisplayedValue = 300;
  changed(e) {
    this.minDisplayedValue = e.value;
    this.maxDisplayedValue = e.highValue;
  }
  minDisplayedValue2 = 0;
  maxDisplayedValue2 = 300;
  changedT(e) {
    this.minDisplayedValue2 = e.value;
    this.maxDisplayedValue2 = e.highValue;
  }
  boxChange(e) {
    e.checked = !e.checked;
    // console.log(e);
  }
}
