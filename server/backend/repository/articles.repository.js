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
            resolve(articleFetched);
        })
        .catch( err => {
            reject(err);
        })
    })
}

module.exports.getArticlesSelected = function(size, page) {
    return new Promise(function (resolve, reject) {
        const articleQuery = Article.find().skip(size * (page - 1 )).limit(size);
        
        articleQuery
        .then(articlesFetched => {
            resolve(articlesFetched);
        })
        .catch( err => {
            reject(err);
        })
    })
}

module.exports.countArticles = function () {
    return new Promise(function (resolve, reject) {
        Article.estimatedDocumentCount()
        .then(nbArticles => {
            resolve(nbArticles);
        })
        .catch( err => {
            reject(err);
        })
    });
};

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
        Article.findOneAndUpdate({_id: articleId }, articleUpdate)
        .then(oldArticle => {
            resolve(oldArticle);
        })
        .catch( err => {
            reject(err);
        })
    })
}