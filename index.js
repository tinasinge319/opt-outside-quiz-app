//question database
const STORE= [
    {
      question: 'What is the most visited U.S. National Park?',
      answers: [
        'Great Smoky Mountains National Park, TN',
        'Zion National Park, UT',
        'Yellowstone National Park, WA',
        'Rocky Mountain National Park, CO',
        'Glacier National Park, MT'
      ],
      correctAnswer:
      'Great Smoky Mountains National Park, TN'
    },
    {
      question: 'What is the tallest mountain summit in the U.S.?',
      answers: [
        'Mount Whitney, CA',
        'Denali, AK',
        'Mount Rainer, WA',
        'Mount Evans, CO',
        'Mauna Loa, HI'
      ],
      correctAnswer:
      'Denali, AK'
    },
    {
      question: 'How long is the Pacific Crest Trail?',
      answers: [
        '3,150 miles',
        '2,727 miles',
        '3,250 miles',
        '2,650 miles',
        '2,434 miles'
      ],
      correctAnswer:
      '2,650 miles'
    },
    {
      question: 'Where does the Appalachian Trail start and end?',
      answers: [
        'Hot Springs, NC and Damascus, VA',
        'Waynesboro, VA and Monson, ME',
        'Duncannon, PA and Hanover, NH',
        'Harpers Ferry, WV and Lincoln, NH',
        'Springer Mountain, GA and Katahdin, ME'
      ],
      correctAnswer:
      'Springer Mountain, GA and Katahdin, ME'
    },
    {
      question: 'How many high peaks are in the Adirondack Mountains?',
      answers: [
        '52',
        '27',
        '46',
        '48',
        '34'
      ],
      correctAnswer:
      '46'
    }
  ];
  
  //variables to track question number and score
  let score = 0;
  let questionNumber = 0;
  
  //function to generate each question
  function generateQuestion() {
    if (questionNumber < STORE.length) {
      return createHtml(questionNumber);
    } else {
      $('.questionBox').hide();
      finalScore();
      $('.questionNumber').text(5);
    }
  }
  
  //increments the score by one and updates its value text on the quiz
  function updateScore() {
    score++
    $('.score').text(score);
  }
  
  //increments the question number by one and updates its value text on the quiz
  function updateQuestionNumber() {
    questionNumber++;
    $(".questionNumber").text(questionNumber + 1);
  }
  
  //resets the text values of the question number and score and updates their value
  //text on the quiz
  function resetStats() {
    score = 0;
    questionNumber = 0;
    $('.scoreBox').text(0);
    $('.questionNumber').text(0);
  }
  
  //starts the quiz
  function startQuiz() {
    $('.altBox').hide();
    $('.startQuiz').on('click', '.startButton', function(event) {
      $('.startQuiz').hide();
      $('.questionNumber').text(1);
      $('.questionBox').show();
      $('.questionBox').prepend(generateQuestion());
    });
  }
  
  //submits the selected answer and compares it to the correct answer
  //runs the function associated with the selected answer
  function submitAnswer() {
    $('.mainBox').on('submit', function(event) {
      event.preventDefault();
      $('.altBox').hide();
      $('.resultBox').show();
      let selected = $('input:checked');
      let answer = selected.val();
      let correct = STORE[questionNumber].correctAnswer;
      if (answer === correct) {
        correctAnswer();
      } else {
        wrongAnswer();
      }
    });
  }
  
  //creates html for question form
  function createHtml(questionIndex) {
    let createForm = $(`<form>
      <fieldset>
        <legend class="questionText">${STORE[questionIndex].question}</legend>
      </fieldset>
      </form>`)
  
      let fieldSelector = $(createForm).find('fieldset');
  
      STORE[questionIndex].answers.forEach(function(answerValue, answerIndex) {
        $(`<label class="rateMe" for="${answerIndex}">
            <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
            <span>${answerValue}</span>
          </label>
          `).appendTo(fieldSelector);
      });
      $(`<button type="submit" class="submitButton button">Submit</button>`).appendTo(fieldSelector);
      return createForm;
  }
  
  //feedback if correct answer is selected which increases the score by one
  function correctAnswer() {
    $('.resultBox').html(
      `<h3>That answer is correct!</h3>
        <p class="rateMe">You know your stuff! Please continue.</p>
        <button type="button" class="nextButton button">Next</button>`
    );
    updateScore();
  }
  
  //feedback if wrong answer is selected
  function wrongAnswer() {
    $('.resultBox').html(
      `<h3>Oops! That's the wrong answer.</h3>
        <p class="rateMe">The correct answer is:</p>
        <p class="rateMe">${STORE[questionNumber].correctAnswer}</p>
        <button type="button" class="nextButton button">Next</button>`
    );
  }
  
  //generates next question
  function nextQuestion() {
    $('.mainBox').on('click', '.nextButton', function(event) {
      $('.altBox').hide();
      $('.questionBox').show();
      updateQuestionNumber();
      $('.questionBox form').replaceWith(generateQuestion());
    });
  }
  
  //determines final score at the end of the quiz
  function finalScore() {
    $('.scoreBox').show();
    $('.rateMe').hide();
    const awesome = [
      'Awesome job!',
    ];
    const good = [
      'So close!',
    ];
    const bad = [
      'Better luck next time!'
    ];
  
    if (score >= 5 && score >= 4) {
      array = awesome;
    } else if (score <= 4 && score >= 3) {
      array = good;
    } else {
      array = bad;
    }
    return $('.scoreBox').html(
      `<h2>${array[0]}</h2>
      <br>
      <h4>You scored:</h4>
      <h4> ${score} / 5</h4>
      <button type="submit" class="restartButton button">Start again</button>`
    );
  }
  
  //directs user back to beginning of quiz
  function restartQuiz() {
    $('.mainBox').on('click', '.restartButton', function(event) {
      event.preventDefault();
      resetStats();
      $('.altBox').hide();
      $('.startQuiz').show();
    });
  }
  
  //runs all the functions
  function beginQuiz() {
    startQuiz();
    generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
  }
  
  $(beginQuiz);
  