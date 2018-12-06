import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './components/articles/article-list/article-list.component';
import { HomeComponent } from './components/blog/home/home.component';
import { ArticleCreateComponent } from './components/articles/article-create/article-create.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuard } from './services/auth/auth.guard';
import { ArticleDetailsComponent } from './components/articles/article-details/article-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'articleList', component: ArticleListComponent },
  { path: 'articleCreate', component: ArticleCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'article-details/:articleId', component: ArticleDetailsComponent, data: {state: 'article-details'} }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {scrollPositionRestoration: 'disabled'} ) ], // , anchorScrolling: 'enabled'
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
