var articlesWorker = require('../workers/articles.worker');

module.exports.create = function (req, res, next) {
    articlesWorker.create(req)
    .then(article => {
        res.status(201).json({
            message: 'Article created successfully',
            articleId: article._id,
            articleImgPath: article.img_irl
        })
    })
    .catch(err => {
        res.status(400).json({
            message: 'Article not created!',
            error: err
        })
    });
}

module.exports.getArticles = function (req, res, next) {
    articlesWorker.getArticles(req.query)
    .then((articles) => {
        res.status(201).json({
            message: 'Articles fetched successfully',
            articles: articles[0],
            maxArticles: articles[1]
        })
    })
    .catch(err => {
        res.status(400).json({
            message: 'Articles not fetched!',
            error: err
        })
    });
}

module.exports.getArticleById = function (req, res, next) {
    articlesWorker.getArticleById(req.params.id)
    .then(article => {
        res.status(200).json({
            message: 'Article fetched successfully',
            article: article
        })
    })
    .catch(err => {
        res.status(400).json({
            message: 'Article not fetched!',
            error: err  
        })
    })
}

module.exports.deleteArticle = function (req, res, next) {
    articlesWorker.deleteArticle(req.params.id)
    .then(() => {
        res.status(200).json({
            message: 'Article deleted successfully'
          });
    })
    .catch(err => {
        res.status(400).json({
            message: 'Article not deleted!',
            error: err
        })
    });
}

module.exports.updateArticle = function (req, res, next) {
    articlesWorker.updateArticle(req.params.id, req)
    .then((cleanOldArticle) => {
        res.status(201).json({
            message: 'Article updated successfully',
            cleanOldArticle: cleanOldArticle
        });
    })
    .catch(err => {
        res.status(400).json({
            message: 'Article not updated!',
            error: err
        })
    });
}
