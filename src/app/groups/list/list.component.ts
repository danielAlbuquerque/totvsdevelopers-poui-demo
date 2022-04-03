import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoTableAction, PoBreadcrumb, PoTableColumn, PoPageAction, PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { forkJoin } from 'rxjs';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public isBusy: boolean = false;
  public tableItems = [];

  public readonly tableActions: Array<PoTableAction> = [
    {
      label: 'Editar',
      icon: 'po-icon-edit',
      action: (row: any) => this.router.navigate(["/groups/", row.id, "edit"])
    }
  ];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Grupos de produtos', link: '/groups' }
    ]
  };

  public tableColumns: PoTableColumn[] = [
    { label: 'Código', property: 'id' },
    { label: 'Descrição', property: 'description' },
  ]

  public pageActions: PoPageAction[] = [
    { label: "Cadastrar novo grupo", url: "/groups/create", icon: "po-icon-plus-circle" },
    { label: "Excluir selecionados", action: this.onDeleteSelected.bind(this), icon: "po-icon-delete", disabled: !this.hasSelectedItems, type: 'danger' },
  ]

  get hasSelectedItems(): boolean {
    return this.tableItems.filter( (item: any) => item.$selected).length > 0;
  }

  constructor(
    private service: GroupService,
    private router: Router,
    private poDialog: PoDialogService,
    private notification: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.isBusy = true;
    this.pageActions[1].disabled = true;
    this.service.getData().subscribe({
      next: (response: any) => {
        this.tableItems = response.items;
      },complete: () => this.isBusy = false
    })
  }

  private onDeleteSelected() {
    this.poDialog.confirm({
      title: "Excluir produtos",
      message: "Confirma a exclusão dos grupos selecionados?",
      confirm: async () => {
        this.isBusy = true;
        const selectedRows = this.tableItems.filter( (item: any) => item.$selected);
        const observers = [];
        for (const row of selectedRows) {
          observers.push(this.service.delete(row["id"]));
        }

        forkJoin(observers).subscribe({
          next: () => {
            this.notification.success('Excluído com sucesso');
            this.init();
          },
          complete: () => this.isBusy = false
        })
      }
    });
  }

  public refreshDeleteButton() {
    const selectedRows = this.tableItems.filter( (item: any) => item.$selected);
    this.pageActions[1].disabled = selectedRows.length === 0;
  }

}

