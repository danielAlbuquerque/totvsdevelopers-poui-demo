import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { PoPageDynamicSearchModule, PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { PoBreadcrumbModule, PoDynamicModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';


@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PoPageDynamicSearchModule,
    PoPageDynamicTableModule,
    PoPageModule,
    PoTableModule,
    PoBreadcrumbModule,
    PoDynamicModule
  ]
})
export class ProductsModule { }
