var models = require('../models/models.js');

exports.load = function(req, res, next, quizId){
	models.Quiz.findById(req.params.quizId).then(function(quiz){		
		if(quiz){
			req.quiz = quiz;
			next();
		}
		else{
			next(new Error('No existe quizId = ', quizId));
		}
	}
	).catch(function(error){next(error);});	
};

exports.index = function(req, res){
	var search = {};

	if(req.query.search){
		var search_txt = req.query.search;
		search_txt = search_txt.replace(/\s/g, "%");
		search_txt = '%' + search_txt + '%';		
		
		search = {where: ["pregunta like ?", search_txt]};
	}
	
	models.Quiz.findAll(search).then(function(quizes){			
		res.render('quizes/index.ejs', {quizes: quizes, errors:[]});
	}
	).catch(function(error){next(error);});		
};

//get /quiz/:quizId
exports.show = function(req, res){
	res.render('quizes/show', {quiz: req.quiz.dataValues, errors:[]});
};

//get /quiz/:quizId/answer
exports.answer = function(req, res){	
	var resultado = 'Incorrecto';

	if (req.query.respuesta.toLowerCase() === req.quiz.dataValues.respuesta.toLowerCase()){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz:req.quiz.dataValues, respuesta: resultado, errors:[]});
};

exports.edit = function(req, res){	
	res.render('quizes/edit', {quiz:req.quiz.dataValues, errors:[]});
};

exports.new = function(req, res){
	var quiz = models.Quiz.build(
		{pregunta:'pregunta', respuesta:'Respuesta'}
	);	
	res.render('quizes/new', {quiz:quiz.dataValues, errors:[]});
};

exports.create = function(req, res){	
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.validate().then(function(err){
		if(err){
			res.render('quizes/new', {quiz:quiz, errors:err.errors});
		}
		else{
			quiz.save({fields:['pregunta', 'respuesta']}).then(function(){
				res.redirect('/quizes');
			});		
		}
	});	
};

exports.update =  function(req, res){	
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	
	req.quiz.validate().then(function(err){
		if(err){
			res.render('quizes/edit', {quiz:req.quiz, errors:err.errors});
		}
		else{
			req.quiz.save({fields:['pregunta', 'respuesta']}).then(function(){
				res.redirect('/quizes');
			});		
		}
	});
};

exports.destroy = function(req, res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){
		next(error);
	});
};