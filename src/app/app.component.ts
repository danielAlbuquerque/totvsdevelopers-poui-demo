import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Produtos', action: this.onClick.bind(this), icon: "po-icon-device-desktop" },
    { label: 'Grupos de Produtos', action: this.onClick.bind(this), icon: "po-icon-database" }
  ];

  private onClick() {
    alert('Clicked in menu item')
  }

}
