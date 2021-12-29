export class Meter {

      name='';
      meterValue:number=0;
      maxMeterValue=0;
      minMeterValue=0;

      annotaions =  [{
          content: `<div id="pointervalue" style="font-size:20px;width:60px;text-align:center">
          ${this.meterValue}/${this.maxMeterValue}</div>`,
          angle: 0,
          zIndex: '1',
          radius: '10%'
        },
        {
            content: '<div id="slider" style="height:70px;width:250px;"></div>',
            angle: 0,
            zIndex: '1',
            radius: '-100%'
        }
      ];
      ranges = [
        {
            start: this.minMeterValue, end: this.maxMeterValue,
            radius: '100%',
            startWidth: 15, endWidth: 15,
            color: '#E0E0E0',
            roundedCornerRadius: 5
        },
      ];
      pointers=[{
        roundedCornerRadius: 5,
        value: this.meterValue,
        type: 'RangeBar',
        radius: '100%',
        color: '#FF7F5C',
        border: {
            color: 'grey',
            width: 0
        },
        animation: {
            enable: false
        },
        pointerWidth: 15
    }]



}
