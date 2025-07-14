import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { MachineCreateComponent } from "./pages/machine-create/machine-create.component";
import { MachineDetailsComponent } from "./pages/machine-details/machine-details.component";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    SidebarComponent,
    RouterModule,
    MatSidenavModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'desafioFrontend';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'dashboard',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/dashboard.svg')
    );
     iconRegistry.addSvgIcon(
      'create',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/create.svg')
    );
     iconRegistry.addSvgIcon(
      'details',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/details.svg')
    );
     iconRegistry.addSvgIcon(
      'search',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/search.svg')
    );
     iconRegistry.addSvgIcon(
      'info',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/info.svg')
    );
    iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/edit.svg')
    );
    iconRegistry.addSvgIcon(
      'trash',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/trash.svg')
    );

  }
}
