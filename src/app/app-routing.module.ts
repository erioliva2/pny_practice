import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { AuthGards } from './auth/auth.guards';
import { AuthComponent } from './auth/auth.component';
import { StocksComponent } from './modules/stocks/stocks/stocks.component';
import { WidgetResolverService } from './shared/widgets/widget-resolver.service';
import { BarsComponent } from './shared/widgets/bars/bars.component';

 
const routes: Routes = [
    { 
      path: 'auth', 
      component: AuthComponent 
    },
    {
      path: '', 
      component: DefaultComponent, 
      children: 
      [
        { 
          path: ':id', 
          component: BarsComponent, 
          canActivate: [AuthGards],
          resolve: [WidgetResolverService]
        },
      ],
    },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
