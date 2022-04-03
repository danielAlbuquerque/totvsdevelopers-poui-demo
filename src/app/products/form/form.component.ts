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

  @ViewChild(PoDynamicFormComponent) dynamicForm: PoDynamicFormComponent;

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
      placeholder: 'Descricao do produto'
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
      return this.dynamicForm.form.invalid || true;
    return true;
  }

  constructor(
    private formBuilder: FormBuilder,
    private service: ProductService,
    private router: Router,
    private location: Location
  ) {
    // this.form = this.formBuilder.group({
    //   id: new FormControl(null, [Validators.required, Validators.maxLength(6)]),
    //   description: new FormControl(null, [Validators.required]),
    //   group: new FormControl(null),
    //   kind: new FormControl(null),
    //   um: new FormControl(null)
    // });
  }

  ngOnInit(): void {
   
  }

  onCancelClick(): void {
    this.location.back();
  }

  onSaveClick(): void {

  }

  onSaveAndNewClick(): void {

  }

}
