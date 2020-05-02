//IMPORTS  ANGULAR
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
//IMPORTS COMPONENTS
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CarsComponent } from './pages/products/cars/cars.component';
import { CategoriesComponent } from './pages/products/categories/categories.component';
import { SearchComponent } from './pages/search/search.component';
import { PaisesComponent } from './pages/paises/paises.component';


const routes: Routes = [
    { path: 'home', component: HomeComponent, data:{title: 'Home',icon: 'fa-home'} },
    { path: 'about', component: AboutComponent, data:{title: 'Home',icon: 'fa-face'} },
    { 
        path: 'products', component: ProductsComponent ,
        children:[
            { path: 'cars', component: CarsComponent },
            { path: 'categories/:category', component: CategoriesComponent },
            { path: '',redirectTo:'cateogries/Cars',pathMatch:'full'},
            { path:'**',redirectTo:'categories/Cars',pathMatch:'full'}
        ]
    },
    //{ path: 'product/:code/:category', component: ProductComponent },
    { path: 'product/:code/:category/:origen', component: ProductComponent },
    { path: 'search/:criterio', component: SearchComponent },
    { path: 'paises', component: PaisesComponent,data:{title: 'Paises',icon: 'fa-flag'} },
    { path: '', redirectTo:'/home',pathMatch:'full'},
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
