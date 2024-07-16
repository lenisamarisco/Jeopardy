$(document).ready(function() {
  $('#start-btn').click(function() {
      $(this).hide();
      $('#spinner').removeClass('hidden');
      fetchQuestions();
});

function fetchQuestions() {
      axios.get('https://rithm-jeopardy.herokuapp.com/api/categories?count=100')
          .then(response => {
              if (response.data && response.data.length) {  
                let questions = response.data;
                const categoryArray = []
              for(let i = 0; i< questions.length; i++) {
                  let randomNumber = Math.floor(Math.random()* questions.length)
                  let category = questions[randomNumber]
                  questions.splice(randomNumber, 1)
                  // console.log(category)
                
              if (category.clues_count >=5 ) {
                    categoryArray.push(category)
              }
              if (categoryArray.length==6) {
                    break
                }
              }
              displayQuestions(categoryArray);
               
              } else {
                  alert('Failed to fetch questions.');
              }
              $('#spinner').addClass('hidden');
          })
          .catch(error => {
              console.error('Error fetching data:', error);
              alert('Error in fetching data:' + error);
              $('#spinner').addClass('hidden');
          });
}

async function displayQuestions(questions) {
      $('#jeopardy-board').removeClass('hidden');
      let $table = $('#game-table');
      $table.empty(); // Clear the game table

      // Create and append categories row
      let $categoryRow = $('<tr>').attr('id', 'category-row');
      let categories = questions
      categories.forEach(category => {
          let $categoryCell = $('<td>').addClass('category').text(category.title);
          $categoryRow.append($categoryCell);
});
      $table.append($categoryRow);
      let cluesArray = categories.map((category)=>{
        return axios.get(`https://rithm-jeopardy.herokuapp.com/api/category?id=${category.id}`)
          .then(response => {
            if(response.data){
              // console.log(response.data)
              return response.data.clues
      }
    })
})
      console.log(cluesArray)
      const resolvedClues = await Promise.all(cluesArray)
      console.log(resolvedClues)
      for (let i = 0; i<=4;i++) {
        let $questionRow = $('<tr>');
        for (let j = 0; j<=5; j++){
          let clue = resolvedClues[j][i]
          let $questionCell = $('<td>').addClass('question').text(clue.question);
          $questionCell.click(function() {
            checkAnswer($questionCell, clue.answer);
});
    $questionRow.append($questionCell)  
    }
      $table.append($questionRow);
      }
      
      // Add Restart button
      let $restartBtn = $('<button>').attr('id', 'restart-btn').text('Restart Game');
      $restartBtn.click(function() {
          location.reload();
});
      $('#jeopardy-board').append($restartBtn);
  }

function checkAnswer($element, answer) {
    $element.addClass('correct-answer').text(answer)
  }
});
