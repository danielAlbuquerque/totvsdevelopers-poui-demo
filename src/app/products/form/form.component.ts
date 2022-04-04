import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoDynamicFormComponent, PoDynamicFormField, PoNotificationService } from '@po-ui/ng-components';
import { ProductService } from '../product.service';
import { Location } from '@angular/common'
import { Observable } from 'rxjs';
import { KindProductService } from 'src/app/shared/services/kind-product.service';
import { UnityMeasureService } from 'src/app/shared/services/unity-measure.service';
import { ProductGroupService } from 'src/app/shared/services/product-group.service';
import { WarehouseService } from 'src/app/shared/services/warehouse.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @ViewChild(PoDynamicFormComponent, { static: true }) dynamicForm: PoDynamicFormComponent;

  public isBusy: boolean = false;
  public editMode: boolean = false;

  public readonly formFields: PoDynamicFormField[] = [
    {
      property: 'id',
      required: true,
      label: 'Codigo',
      gridColumns: 2,
      placeholder: 'Codigo'
    },
    {
      label: 'Descricao',
      property: 'description',
      required: true,
      gridColumns: 6,
      placeholder: 'Descricao do produto',
    },
    {
      label: 'Tipo',
      property: 'kind',
      required: true,
      searchService: this.kindProductService,
      gridColumns: 3,
      fieldLabel: 'description',
      fieldValue: 'id',
      placeholder: '- selecione -',
      columns: [
        { property: 'id', label: 'Código' },
        { property: 'description', label: 'Tipo' }
      ],
    },
    {
      label: 'Unidade de medida',
      property: 'um',
      required: true,
      gridColumns: 2,
      searchService: this.unityMeasureService,
      fieldLabel: 'description',
      fieldValue: 'id',
      placeholder: '- selecione -',
      columns: [
        { property: 'id', label: 'Código' },
        { property: 'description', label: 'Unidade de medidade' }
      ],
    },
    {
      label: 'Grupo',
      property: 'group',
      optional: true,
      gridColumns: 3,
      searchService: this.productGroupService,
      fieldLabel: 'description',
      fieldValue: 'id',
      placeholder: '- selecione -',
      columns: [
        { property: 'id', label: 'Grupo' },
        { property: 'description', label: 'Descrição' }
      ],
    },
    {
      label: 'Local padrão',
      property: 'warehouse',
      required: true,
      gridColumns: 3,
      searchService: this.wareHouseService,
      fieldLabel: 'description',
      fieldValue: 'id',
      placeholder: '- selecione -',
      columns: [
        { property: 'id', label: 'Código' },
        { property: 'description', label: 'Descrição' }
      ],
    }
  ];
  
  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Produtos', link: '/' },
      { label: 'Cadastro de produto' },
    ]
  };

  get isFormInvalid(): boolean {
    if (this.dynamicForm)
      return this.dynamicForm.form.invalid as boolean;
    return true;
  }

  constructor(
    private notificationService: PoNotificationService,
    private kindProductService: KindProductService,
    private unityMeasureService: UnityMeasureService,
    private productGroupService: ProductGroupService,
    private wareHouseService: WarehouseService,
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.editMode = true;
      this.isBusy = true;
      this.service.findById(id).subscribe({
        next: (product) => this.dynamicForm.value = product,
        complete: () => this.isBusy = false
      })
    }
  }

  onCancelClick(): void {
    this.location.back();
  }

  onSaveClick(): void {
    this.isBusy = true;
    this.save(this.dynamicForm.form.value)
      .subscribe({
        next: () => {
          this.notificationService.success('Produto salvo com sucesso');
          this.router.navigate(["products"]);
        },
        error: () => this.isBusy = false,
        complete: () => this.isBusy = false
      });
    }
    
  onSaveAndNewClick(): void {
    this.isBusy = true;
    this.save(this.dynamicForm.form.value)
      .subscribe({
        next: () => {
          this.notificationService.success('Produto salvo com sucesso');
          this.router.navigate(["products", "create"]);
        },
        error: () => this.isBusy = false,
        complete: () => this.isBusy = false
      });
  }

  private save(data: any): Observable<any> {
    if (this.editMode) 
      return this.service.update(data);
    return this.service.save(data);
  }

}
