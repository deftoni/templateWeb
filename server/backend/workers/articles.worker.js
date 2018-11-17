const Article = require('../models/article');

var articleRepo = require('../repository/articles.repository');

module.exports.create = function (req) {
    return new Promise(function (resolve, reject) {
        if (req.files == null) {

            const cleanArticle = new Article({
                title: req.body.title,
                content: req.body.content,
                // img_irl: '/templateWeb/server/ressources/article/img/defaultImg.png'
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
            .then(result => {
                console.log('Image : ' + uniqueImgName + ' ajouté');
            })
            .catch(err => {
                reject('ton image ne passe pas' + err);
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
        articleRepo.deleteArticle(articleId)
            .then(() => {
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
            .then((articleUpdated) => {
                resolve(articleUpdated._id);
            })
            .catch(function (err) {
                reject(err);
            });
    })
}

