import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoBreadcrumbItem, PoPageAction, PoTableColumn } from '@po-ui/ng-components';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public tableItems = [];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Produtos', link: '/products' }
    ]
  };

  public tableColumns: PoTableColumn[] = [
    { label: 'Código', property: 'id' },
    { label: 'Descrição', property: 'description' },
    { label: 'Grupo', property: 'group' },
  ]

  public readonly pageActions: PoPageAction[] = [
    { label: "Cadastrar novo produto", url: "/create", icon: "po-icon-plus-circle" }
  ]

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.productService.getData().subscribe({
      next: (response: any) => {
        this.tableItems = response.items;
      }
    })
  }

}
