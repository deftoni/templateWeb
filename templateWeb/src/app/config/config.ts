export class Config {
  private articleUrl = 'http://localhost:3000/api/articles/';

  public getArticleUrl() {
    return this.articleUrl;
  }
}
