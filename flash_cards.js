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
      // sounds go in dir ROOT/{{key}}/
      var indexStr = index+1+'';
      // zero pad indexStr for single digits
      indexStr = indexStr.length > 1 ? indexStr : '0'+indexStr;

      var audioPath = key+'/'+indexStr+'.mp3';
      that.questions.push(new cldn.Question(i, audioPath));
    });
  });

  // current index
  this.currentIndex = 0;

  // init next btn
  $('#next-btn').click(this.nextQuestion);
}

cldn.FlashCards.prototype = {

  nextQuestion: function() {
    var question = this.questions[this.currentIndex];

    $('#main').empty();
    var el = $(this.template).appendTo('#main');
    $(el).find('#question').text(question.text);
    $(el).find('#audio source').attr('src', question.audioPath);

    this.currentIndex++;
  }

};

cldn.Question = function(text, audioPath) {
  this.text = text;
  this.audioPath = audioPath;
};

var app = new cldn.FlashCards();

});
