const Article = require('../models/article');

module.exports.addArticle = function (article) {
    return new Promise(function (resolve, reject) {
        article.save()
        .then(createdArticle => {
            resolve(createdArticle);
        })
        .catch( err => {
            reject(err);
        })
    });
};

module.exports.getArticles = function () {
    return new Promise(function (resolve, reject) {
        Article.find()
        .then(articles => {
            resolve(articles);
        })
        .catch( err => {
            reject(err);
        })
    });
};

module.exports.getArticleById = function(articleId) {
    return new Promise(function (resolve, reject) {
        Article.findById(articleId)
        .then(articleFetched => {
            resolve(articleFetched)
        })
        .catch( err => {
            reject(err);
        })
    })
}

module.exports.deleteArticle = function (articleId) {
    return new Promise(function (resolve, reject) {
        Article.deleteOne({ _id: articleId })
        .then(() => {
            resolve();
        })
        .catch( err => {
            reject(err);
        })
    });
};

module.exports.updateArticle = function (articleId, articleUpdate){
    return new Promise(function (resolve, reject) {
        Article.findByIdAndUpdate({ _id: articleId }, articleUpdate)
        .then(articleUpdated => {
            resolve(articleUpdated);
        })
        .catch( err => {
            reject(err);
        })
    })
}