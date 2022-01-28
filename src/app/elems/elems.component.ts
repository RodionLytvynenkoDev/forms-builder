import { Component, Input } from '@angular/core';

@Component({
  selector: 'elems',
  templateUrl: './elems.component.html',
  styleUrls: ['./elems.component.css']
})
export class ElemsComponent {
  @Input() elem: any
  
}
