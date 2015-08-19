var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var authorController = require('../controllers/author_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors:[] });
});

//check if param quizId is comming.. in this case we search on DB first, and pass the result on req
router.param('quizId', quizController.load);

router.get('/quizes/new', quizController.new);
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.get('/author', authorController.me);

router.post('/quizes/create/', quizController.create);

router.put('/quizes/:quizId(\\d+)', quizController.update);

module.exports = router;
