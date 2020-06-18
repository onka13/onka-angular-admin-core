import { NgModule } from '@angular/core';
import { OnkaAdminComponent } from './onka-admin.component';
import { OnkaSharedModule } from './infra/shared/onka-shared.module';

@NgModule({
  declarations: [OnkaAdminComponent],
  imports: [OnkaSharedModule],
  exports: [OnkaAdminComponent, OnkaSharedModule],
})
export class OnkaAdminModule {}
