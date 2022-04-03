import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoDynamicFormComponent, PoDynamicFormField } from '@po-ui/ng-components';
import { ProductService } from '../product.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @ViewChild(PoDynamicFormComponent, { static: true }) dynamicForm: PoDynamicFormComponent;

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
      searchService: "/api/v1/kind-products",
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
      searchService: "/api/v1/unity-measure",
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
      searchService: "/api/v1/products-groups",
      fieldLabel: 'description',
      fieldValue: 'id',
      placeholder: '- selecione -',
      columns: [
        { property: 'id', label: 'Grupo' },
        { property: 'description', label: 'Descrição' }
      ],
    }
  ]
  
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
    private formBuilder: FormBuilder,
    private service: ProductService,
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.location.back();
  }

  onSaveClick(): void {
    console.log(this.dynamicForm.form.value);
    this.service.save(this.dynamicForm.form.value)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: error => {
          console.log(error);
        }
      })
  }

  onSaveAndNewClick(): void {

  }

}
