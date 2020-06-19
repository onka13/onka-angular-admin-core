import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PortalModule } from '@angular/cdk/portal';
import { MaterialModule } from '../material/material.module';
import { OnkaFilterDirective } from '../../components/onka-filter.directive';
import { allFields } from '../../components/onka-fields.component';
import { allInputs } from '../../components/onka-inputs.component';
import { OnkaListComponent } from '../../components/list/onka-list.component';
import { OnkaUpsertComponent } from '../../components/upsert/onka-upsert.component';
import { OnkaDetailComponent } from '../../components/detail/onka-detail.component';
import { OnkaSearchLeftComponent } from '../../components/content/onka-search-left.component';
import { OnkaSearchRightComponent } from '../../components/content/onka-search-right.component';
import { OnkaActionsLeftComponent } from '../../components/content/onka-actions-left.component';
import { OnkaActionsRightComponent } from '../../components/content/onka-actions-right.component';
import { OnkaTranslatePipe } from '../../business/pipes/onka-translate.pipe';
import { OnkaMenuComponent } from '../../components/onka-menu.component';
import { OnkaTabGroupComponent } from '../../components/content/onka-tab-group.component';
import { OnkaTabComponent } from '../../components/content/onka-tab.component';
import { OnkaLoadingComponent } from '../../components/content/onka-loading.component';
import { OnkaDialogComponent } from '../../components/onka-dialog.component';
import { OnkaMasterComponent } from '../../components/master/onka-master.component';
import { OnkaDrawerTopComponent } from '../../components/content/onka-drawer-top.component';
import { OnkaDrawerFooterComponent } from '../../components/content/onka-drawer-footer.component';
import { OnkaLoginComponent } from '../../components/login/onka-login.component';

/**
 * module list
 */
const sharedModules: any[] = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  FlexLayoutModule,
  MaterialModule,
  RouterModule,
  PortalModule,
];

/**
 * Component list
 */
var sharedComponents: any[] = [
  OnkaFilterDirective,
  OnkaListComponent,
  OnkaUpsertComponent,
  OnkaDetailComponent,
  OnkaSearchLeftComponent,
  OnkaSearchRightComponent,
  OnkaActionsLeftComponent,
  OnkaActionsRightComponent,
  OnkaTranslatePipe,
  OnkaDialogComponent,
  OnkaMenuComponent,
  OnkaTabGroupComponent,
  OnkaTabComponent,
  OnkaLoadingComponent,
  OnkaMasterComponent,
  OnkaDrawerTopComponent,
  OnkaDrawerFooterComponent,
  OnkaLoginComponent,
  allInputs.OnkaCheckboxComponent,
  allInputs.OnkaDateComponent,
  allInputs.OnkaFilterComponent,
  allInputs.OnkaInputComponent,
  allInputs.OnkaNumberComponent,
  allInputs.OnkaSelectComponent,
  allInputs.OnkaSlideToggleComponent,
  allInputs.OnkaTextareaComponent,
  allFields.OnkaDetailFieldComponent,
  allFields.OnkaGridFieldComponent,
  //...[Object.values(allInputs)],
  //...[Object.values(allFields)],
];

/**
 * Onka shared module
 */
@NgModule({
  imports: sharedModules,
  declarations: sharedComponents,
  exports: [...sharedComponents, ...sharedModules],
})
export class OnkaSharedModule {}
