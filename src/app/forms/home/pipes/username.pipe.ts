import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'usernamePipe',
})
export class UsernamePipe implements PipeTransform {
    transform(value: string, args?: string): string {
        return 'Welcome, ' + value + '!';
    }
}
