import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutes'
})
export class MinutesPipe implements PipeTransform {

/**
 * It takes a value in milliseconds and returns a string in the format of minutes:seconds
 * @param {any} value - the value that is passed in from the template
 * @returns The time in minutes and seconds.
 */
  transform(value: any,): any {
    let minutes = Math.floor(value / 60000);
    let seconds: any = ((value % 60000) / 1000).toFixed(0);
    let result = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    return result
  }

}
