export class Config {
  private articleUrl = 'http://localhost:3000/api/articles/';
  private userUrl =    'http://localhost:3000/api/user/';

  public getArticleUrl() {
    return this.articleUrl;
  }

  public getUserUrl() {
    return this.userUrl;
  }
}
