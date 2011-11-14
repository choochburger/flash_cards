$(function() {

var cldn = cldn || {}; cldn.FlashCards = cldn.FlashCards || {};

cldn.FlashCards = function() {
  _.bindAll(this);

  this.template = $('#card-template').html();

  var categories = {
    'consonants': ["ก", "ข", "ฃ", "ค", "ฅ", "ฆ", "ง", "จ", "ฉ", "ช", "ซ", "ฌ", "ญ", "ฎ", "ฏ", "ฐ", "ฑ", "ฒ", "ณ", "ด", "ต", "ถ", "ท", "ธ", "น", "บ", "ป", "ผ", "ฝ", "พ", "ฟ", "ภ", "ม", "ย", "ร", "ล", "ว", "ศ", "ษ", "ส", "ห", "ฬ", "อ", "ฮ"],

    'vowels': ["◌ะ", "◌า", "◌ิ", "◌ี", "◌ึ", "◌ื", "◌ุ", "◌ู", "เ◌ะ", "เ◌", "แ◌ะ", "แ◌", "โ◌ะ", "โ◌", "เ◌าะ", "◌อ", "เ◌อะ", "เ◌อ", "เ◌ียะ", "เ◌ีย", "เ◌ือะ", "เ◌ือ", "◌ัวะ", "◌ัว", "◌ำ", "ไ◌", "ใ◌", "เ◌า", "ฤ", "ฤๅ", "ฦ", "ฦๅ" ]
  };


  // convert entries into objects
  this.questions = [];

  var that = this;
  _.each(categories, function(c, key) {
    _.each(c, function(i, index) {
      var question = {};
      var indexStr = index+1+'';
      // zero pad indexStr for single digits
      indexStr = indexStr.length > 1 ? indexStr : '0'+indexStr;

      // sounds go in dir ROOT/{{key}}/
      var audioPath = key+'/'+indexStr+'.mp3';
      that.questions.push(new cldn.Question(i, audioPath));
    });
  });

  // current index
  this.currentIndex = -1;

  $('#next-btn').click(this.nextQuestion);
  $('#got-it-btn').click(this.gotIt);
  $('#randomize-btn').click(this.randomizeQuestions);

  this.nextQuestion();
}

cldn.FlashCards.prototype = {

  nextQuestion: function() {
    this.currentIndex+1 >= this.questions.length ? this.currentIndex = 0 : this.currentIndex++;

    var question = this.questions[this.currentIndex];

    $('#main').empty();
    var $el = $(this.template).appendTo('#main');
    $el.find('#question').text(question.text);
    $el.find('#audio source').attr('src', question.audioPath);
    $el.find('#number').text(this.questions.length+' remaining');
  },

  gotIt: function() {
    // remove question
    this.questions = this.questions.slice(0, this.currentIndex).concat(this.questions.slice(this.currentIndex+1));

    if (this.questions.length == 0) {
      $('#main').empty();
      $('#buttons').empty();
      $('<h1>Nice job!<h1>').appendTo('#main');
    } else {
      this.currentIndex--;
      this.nextQuestion();
    }
  },

  randomizeQuestions: function() {
    this.questions = _.shuffle(this.questions);
    this.currentIndex = -1;
    this.nextQuestion();
  }

};

cldn.Question = function(text, audioPath) {
  this.text = text;
  this.audioPath = audioPath;
};

var app = new cldn.FlashCards();

});
