import { Pipe, PipeTransform } from '@angular/core';
  
@Pipe({
    name: 'format'
})
export class FormatPipe implements PipeTransform {
  transform(value: string, args?: string): string {
      
    return "Welcome, "+value+"!";
  }
}