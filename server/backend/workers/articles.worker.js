const Article = require('../models/article');
const fs = require('fs');

var articleRepo = require('../repository/articles.repository');

module.exports.create = function (req) {
    return new Promise(function (resolve, reject) {
        if (req.files == null) {

            const cleanArticle = new Article({
                title: req.body.title,
                content: req.body.content,
                img_irl: 'http://localhost:3000/images/articleImages/'+'defaultImg.png'
            });
            
            articleRepo.addArticle(cleanArticle)
                .then(articleCreated => {
                    resolve(articleCreated);
                })
                .catch(function (err) {
                    reject(err);
                });
        }
        else {
            var dateNow = Date.now();
            var uniqueImgName = '_' + Math.random().toString(36).substr(2, 9) + dateNow + req.files.myFile.name;
            uniqueImgName = uniqueImgName.split(" ").join("-");
            
            req.files.myFile.mv('../../templateWeb/server/backend/public/images/articleImages/' + uniqueImgName)
            .then(() => {
                console.log('Image: ' + uniqueImgName + ' upload');
            })
            .catch(err => {
                reject('Image upload failed! ' + err);
            })
            const cleanArticle = new Article({
                title: req.body.title,
                content: req.body.content,
                img_irl: 'http://localhost:3000/images/articleImages/' + uniqueImgName
            });

            articleRepo.addArticle(cleanArticle)
            .then(articleCreated => {
                resolve(articleCreated);
            })
            .catch(function (err) {
                reject(err);
            });
        }
    })
}

module.exports.getArticles = function (query) {
    return new Promise(function (resolve, reject) {

        const pageSize = +query.pagesize;
        const currentPage = +query.page;
        let fetchedArticles;

        if (pageSize && currentPage) {

            articleRepo.getArticlesSelected(pageSize, currentPage)
                .then(articles => {
                    fetchedArticles = articles;
                    return articleRepo.countArticles()
                })
                .then(total => {
                    resolve([fetchedArticles, total]);
                })
                .catch(function (err) {
                    reject(err);
                });
        } else {
            articleRepo.getArticles()
                .then(articles => {
                    resolve(articles);
                })
                .catch(function (err) {
                    reject(err);
                });
        }
    })
}

module.exports.getArticleById = function (articleId) {
    return new Promise(function (resolve, reject) {
        articleRepo.getArticleById(articleId)
            .then(articleFetched => {
                const cleanArticle = {
                    id: articleFetched._id,
                    title: articleFetched.title,
                    content: articleFetched.content,
                    img_irl: articleFetched.img_irl
                }
                resolve(cleanArticle);
            })
            .catch(function (err) {
                reject(err);
            })
    })
}

module.exports.deleteArticle = function (articleId) {
    return new Promise(function (resolve, reject) {
        // if article exist
        articleRepo.getArticleById(articleId)
            .then(article => {
                // on regarde si l'article a une image
                if ( article.img_irl != 'http://localhost:3000/images/articleImages/'+'defaultImg.png') {
                    // on recupere le chemin de l'image sur le server
                    imageName = article.img_irl.split('http://localhost:3000/images/articleImages/')
                    const path = '../../templateWeb/server/backend/public/images/articleImages/' + imageName[1];
                    // on delete l'image
                    fs.unlink(path, err => {
                        if (err) {
                            reject ('Image not deleted ' +err);
                        }
                        console.log('Image: ' + imageName[1] + ' deleted');
                    })
                } else {
                    console.log('no image to delete');
                }
                articleRepo.deleteArticle(articleId)
                .then(() => {
                    resolve();
                })
                .catch(function (err) {
                    reject(err);
                });
            })
            .catch(function (err) {
                reject('Article does not exist '+err);
            });
    })
}

module.exports.updateArticle = function (articleId, articleUpdate) {
    return new Promise(function (resolve, reject) {
        // if article exist
        articleRepo.updateArticle(articleId, articleUpdate)
            .then((articleUpdated) => {
                resolve(articleUpdated._id);
            })
            .catch(function (err) {
                reject(err);
            });
    })
}

