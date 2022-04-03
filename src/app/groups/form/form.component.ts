import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoDynamicFormComponent, PoDynamicFormField, PoNotificationService } from '@po-ui/ng-components';
import { Location } from '@angular/common'
import { Observable } from 'rxjs';
import { GroupService } from '../group.service';

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
      placeholder: 'Descricao do grupo',
    },
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
    private service: GroupService,
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
        next: (product: any) => this.dynamicForm.value = product,
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
          this.notificationService.success('Grupo salvo com sucesso');
          this.router.navigate(["groups"]);
        },
        complete: () => this.isBusy = false
      });
    }
    
  onSaveAndNewClick(): void {
    this.isBusy = true;
    this.save(this.dynamicForm.form.value)
      .subscribe({
        next: () => {
          this.notificationService.success('Grupo salvo com sucesso');
          this.router.navigate(["groups", "create"]);
        },
        complete: () => this.isBusy = false
      });
  }

  private save(data: any): Observable<any> {
    if (this.editMode) 
      return this.service.update(data);
    return this.service.save(data);
  }

}
