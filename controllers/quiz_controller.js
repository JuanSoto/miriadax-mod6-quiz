var models = require('../models/models.js');

exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes});
	});	
};

//get /quiz/:quizId
exports.show = function(req, res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){		
		res.render('quizes/show', {quiz: quiz.dataValues});
	});	
};

//get /quiz/:quizId/answer
exports.answer = function(req, res){	
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		if (req.query.respuesta.toLowerCase() === quiz.dataValues.respuesta.toLowerCase()){
			res.render('quizes/answer', {quiz:quiz.dataValues, respuesta: 'Correcto'});
		}
		else{
			res.render('quizes/answer', {quiz:quiz.dataValues, respuesta: 'Incorrecto'});
		}
	});	
};