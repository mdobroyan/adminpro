import { NgModule } from "@angular/core";
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({

    imports:[RouterModule,CommonModule],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        NopagefoundComponent,
            BreadcrumbsComponent
    ],
    exports:[HeaderComponent,
        NopagefoundComponent,
            SidebarComponent,
        BreadcrumbsComponent
    ]

})


export class SharedModule {}
