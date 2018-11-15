var articlesWorker = require('../workers/articles.worker');

module.exports.create = function (req, res, next) {
    articlesWorker.create(req.body)
    .then(articleId => {
        res.status(201).json({
            message: 'Article created',
            articleId: articleId
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
    articlesWorker.getArticles()
    .then(articles => {
        res.status(201).json({
            message: 'articles fetched successfully',
            articles: articles
        })
    })
    .catch(err => {
        res.status(400).json({
            message: 'Bad request!',
            error: err
        })
    });
}

module.exports.getArticleById = function (req, res, next) {
    articlesWorker.getArticleById(req.params.id)
    .then(articleFetched => {
        console.log('article Fetched from controller: ',articleFetched )
        res.status(200).json({
            message: 'article Fetched successfully',
            article: articleFetched
        })
    })
    .catch(err => {
        res.status(400).json({
            message: 'bad request you mother ******',
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
    articlesWorker.updateArticle(req.params.id, req.body)
    .then((updatedArticleId) => {
        res.status(201).json({
            message: 'Article updated successfully',
            articleId: updatedArticleId
        });
    })
    .catch(err => {
        res.status(400).json({
            message: 'Article not updated!',
            error: err
        })
    });
}
