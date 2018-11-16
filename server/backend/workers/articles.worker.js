const Article = require('../models/article');

var articleRepo = require('../repository/articles.repository');

module.exports.create = function (articleBody, articleImg) {
    return new Promise(function (resolve, reject) {
        console.log(articleImg.name);
        articleImg.mv('../../ressources/article/img/' + articleImg.name)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            reject('ton image ne passe pas' +err);
        })
        
        const cleanArticle = new Article({
            title: articleBody.title,
            content: articleBody.content,
            img_irl: 'irl/irl/irl/'
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

module.exports.getArticles = function (query) {
    return new Promise(function (resolve, reject) {
        
        const pageSize = +query.pagesize;
        const currentPage = +query.page;
        let fetchedArticles;

        if (pageSize && currentPage) {
            
            articleRepo.getArticlesSelected(pageSize, currentPage)
            .then( articles => {
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
            .then( articles => {
                resolve(articles);
            })
            .catch(function (err) {
                reject(err);
            });
        }
    })
}

module.exports.getArticleById =  function (articleId) {
    return new Promise(function (resolve, reject){
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
        .catch(function (err){
            reject(err);
        })
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

