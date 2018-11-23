export class Config {
  private articleUrl = 'http://localhost:3000/api/articles/';
  private userUrl =    'http://localhost:3000/api/user/';
  private defaultArticleImgUrl = 'http://localhost:3000/images/articleImages/defaultImg.png';

  public getArticleUrl() {
    return this.articleUrl;
  }

  public getUserUrl() {
    return this.userUrl;
  }

  public getDefaultArticleImgUrl() {
    return this.defaultArticleImgUrl;
  }
}
