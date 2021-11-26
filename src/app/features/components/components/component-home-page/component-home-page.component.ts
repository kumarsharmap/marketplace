import { Component, OnInit } from '@angular/core';
import { ComponentServiceService } from 'src/app/component-service.service';


@Component({
  selector: 'app-component-home-page',
  templateUrl: './component-home-page.component.html',
  styleUrls: ['./component-home-page.component.css']
})
export class ComponentHomePageComponent implements OnInit {
  public artifact = "Component"
  constructor(public componentServiceService: ComponentServiceService) { }
  ngOnInit(): void {
  }

}
