import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { TopBarComponent } from './top-bar/top-bar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    HeaderComponent,
    TopBarComponent
  ],
  exports: [
    HeaderComponent,
    TopBarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule {}
