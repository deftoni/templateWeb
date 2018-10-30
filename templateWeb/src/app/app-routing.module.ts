import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './components/articles/article-list/article-list.component';
import { HomeComponent } from './components/home/home.component';
import { ArticleCreateComponent } from './components/articles/article-create/article-create.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'articleList', component: ArticleListComponent},
  { path: 'articleCreate', component: ArticleCreateComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
