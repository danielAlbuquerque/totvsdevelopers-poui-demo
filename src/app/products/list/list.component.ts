import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoBreadcrumbItem, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public tableItems = [];


  public readonly tableActions: Array<PoTableAction> = [
    {
      label: 'Detalhes',
      icon: 'po-icon-edit',
      action: (row: any) => this.router.navigate(["/products/", row.id, "edit"])
    },
    {
      separator: true,
      label: 'Excluir',
      icon: 'po-icon-delete',
      type: 'danger',
      action: () => {}
    }
  ];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Produtos', link: '/products' }
    ]
  };

  public tableColumns: PoTableColumn[] = [
    { label: 'Código', property: 'id' },
    { label: 'Descrição', property: 'description' },
    { label: 'Grupo', property: 'groupdescription' },
    { label: 'Unidade Medida', property: 'um' },
    { label: 'Tipo', property: 'kind' },
    { label: 'Local padrão', property: 'warehouse' },
  ]

  public readonly pageActions: PoPageAction[] = [
    { label: "Cadastrar novo produto", url: "/products/create", icon: "po-icon-plus-circle" }
  ]

  constructor(
    private productService: ProductService,
    private router: Router
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
