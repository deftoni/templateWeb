const Article = require('../models/article');

var articleRepo = require('../repository/articles.repository');

module.exports.create = function (article) {
    return new Promise(function (resolve, reject) {
        const cleanArticle = new Article({
            title: article.title,
            content: article.content,
            img_irl: article.img_irl
        });
        articleRepo.addArticle(cleanArticle)
        .then( articleCreated => {
            resolve(articleCreated._id);
        })
        .catch(function (err) {
            reject(err);
         });
    })
}

module.exports.getArticles = function () {
    return new Promise(function (resolve, reject) {
        
        articleRepo.getArticles()
        .then( articles => {
            resolve(articles);
        })
        .catch(function (err) {
            reject(err);
         });
    })
}

module.exports.deleteArticle = function (articleId) {
    return new Promise(function (resolve, reject) {
        // if article exist
        articleRepo.deleteArticle(articleId)
        .then( () => {
            resolve();
        })
        .catch(function (err) {
            reject(err);
         });
    })
}
module.exports.updateArticle = function (articleId, articleUpdate) {
    return new Promise(function (resolve, reject) {
        // if article exist
        articleRepo.updateArticle(articleId, articleUpdate)
        .then( (articleUpdated) => {
            resolve(articleUpdated._id);
        })
        .catch(function (err) {
            reject(err);
         });
    })
}

