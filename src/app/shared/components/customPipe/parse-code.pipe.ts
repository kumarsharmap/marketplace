import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseCode'
})
export class ParseCodePipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    const data= value.replace(/\u21B5/g,'\n');
    return data;
  }

}
