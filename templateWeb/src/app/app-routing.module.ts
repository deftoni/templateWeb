import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { HomeComponent } from './home/home.component';
import { ArticleCreateComponent } from './articles/article-create/article-create.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent},
  { path: 'articleList', component: ArticleListComponent },
  {path: 'articleCreate', component: ArticleCreateComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
