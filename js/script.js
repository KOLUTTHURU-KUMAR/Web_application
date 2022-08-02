function ageInDays()
{
 var birthday=prompt('Can you please tell me your birth year.. ');
 var ageInDayss = (2022 - birthday) * 365;
 console.log(ageInDayss);
 var h1= document.createElement('h1');
 var textAnswer=document.createTextNode('You Have Enjoyed' + ' ' + ageInDayss + ' days in your life');
 h1.setAttribute('id','ageInDays');
 h1.appendChild(textAnswer);
 document.getElementById('flex-box-result').appendChild(h1);
}

function reset()
{
    document.getElementById('ageInDays').remove();
}

 function generatCat()
 {
    var image=document.createElement('img');
    var div=document.getElementById('flex-cat-gen');
    image.src="http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
 }

 //challenge :3 Rock ,paper,scissors

 function rpsGame(yourChoice)
 {
    console.log(yourChoice);
    var humanChoice , botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    console.log('comptuer choice :' , botChoice);

    results = decideWinner(humanChoice,botChoice);// [0,1] human lost | bot won
    console.log(results);

    message = finalMessage(results); // {'message : 'you won' , 'colour' : 'green'}
    console.log(message);
    rpsFrontEnd( yourChoice.id , botChoice , message );
 }

 function randToRpsInt()
 {
    return Math.floor(Math.random() * 3);    
 }

 /* 
 Math.random() gives random number between 0 and 1 like 0.14343,0.244545 etc
 Math.random()*3 gives number between 0 and 2 like 0.23143,1.423451 ,1.95674 1.02452 etc
 Math.floor(Math.random() * 3) gives the numbers 0,1,2 randomly
 */

 function numberToChoice(number)
 {
     return ['rock','paper','scissors'][number];
 }

  function decideWinner(yourChoice,computerChoice)
 {
    var rpsDatabase = {
        'rock' : { 'scissors' : 1 , 'rock' : 0.5 , 'paper' : 0 } ,
        'paper' : { 'scissors' : 0 , 'rock' : 1 , 'paper' : 0.5},
        'scissors' : { 'scissors' : 0.5 , 'rock' : 0 , 'paper' : 1}
    };
    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore,computerScore];
 }

 function finalMessage([yourScore,computerScore])
 {
     if(yourScore == 0)
     {
        return { 'message' : 'Computer Won *_* ' , 'color' : 'red'};
     }
     else if (yourScore == 0.5)
     {
        return { 'message' : '-It is a Draw' , 'color' : 'yellow'}
     }
     else
     {
        return { 'message' : "Woah! You Won " , 'color' : 'green'}
     }
 }

 function rpsFrontEnd(humanImageChoice , botImageChoice , finalmessage)
 {
    var imageDatabase = {
        'rock' : document.getElementById('rock').src,
        'paper' : document.getElementById('paper').src,
        'scissors' : document.getElementById('scissors').src
    }
    //let's remover all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow : 0px 10px 50px rgba(37, 50 , 233 ,1);'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalmessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalmessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow : 0px 10px 50px rgba(243, 38 , 24 ,1);'>"
 
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

 }

 //change the color of all buttons
 var all_buttons = document.getElementsByTagName('button');  //It find no.of buttons present in the web page
 
 var copyAllButtons = [];
 for(let i=0; i<all_buttons.length ; i++)
 {
   copyAllButtons.push(all_buttons[i].classList[1]);
 }
/*
classList[0]  represents the ( 'btn' class) 
classList[1] represnts inside the btn class like the ( 'btn-primary , btn-danger , btn-warning , btn-success  class)
*/

 function buttonColorChange(buttonThingy)
 {
   if(buttonThingy.value == 'red')
   {
      buttonsRed();
   }
   else if(buttonThingy.value == 'green')
   {
      buttonsGreen();
   }
   else if(buttonThingy.value == 'reset')
   {
      buttonsColorReset();
   }
   else if(buttonThingy.value == 'random')
   {
      randomColor();
   }
 }
function buttonsRed()
{
   for(let i=0; i<all_buttons.length ; i++) {
       all_buttons[i].classList.remove(all_buttons[i].classList[1]);
       all_buttons[i].classList.add('btn-danger');
   }
}

function buttonsGreen()
{
   for(let i=0; i<all_buttons.length ; i++) {
      all_buttons[i].classList.remove(all_buttons[i].classList[1]);
      all_buttons[i].classList.add('btn-success');
   }
}

function buttonsColorReset()
{
   for(let i=0; i<all_buttons.length ; i++) {
      all_buttons[i].classList.remove(all_buttons[i].classList[1]);
      all_buttons[i].classList.add(copyAllButtons[i]);
   }
}

function randomColor()
{
   console.log('test');
   let choice = [ 'btn-primary' ,'btn-danger' , 'btn-success' , 'btn-warning'];
   for(let i=0; i<all_buttons.length ; i++) {
      all_buttons[i].classList.remove(all_buttons[i].classList[1]);
   let randomNumber = Math.floor(Math.random()*4);
   all_buttons[i].classList.add(choice[randomNumber]);
   }
}


//Blackjack game

let blackjackGame = {
   'you': {'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
   'dealer': {'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
   'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
   'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J':10, 'Q':10, 'A': [1,11] },
   'wins': 0,
   'losses': 0,
   'draws': 0,
   'isStand': false,
   'turnsOver': false,
   };

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);
function blackjackHit()
{
   if(blackjackGame['isStand'] == false)
   {
     let card = randomCard();
     showCard(card,YOU);
     updateScore(card,YOU);
     console.log(YOU['score']);
     showScore(YOU);
   }
}
function randomCard()
{
   var randomIndex = Math.floor(Math.random()*13);
   return blackjackGame['cards'][randomIndex];
}

function showCard(card,activePlayer)
{  
   if(activePlayer['score'] <= 21)
   {
    let cardImage = document.createElement('img');
    cardImage.src = `images/${card}.png`;
    document.querySelector(activePlayer ['div']).appendChild(cardImage);
    hitSound.play();
   }
}

function blackjackDeal()
{
   if(blackjackGame['turnsOver'] == true)
      {
         blackjackGame['isStand'] = false;
         let yourImages = document.querySelector('#your-box').querySelectorAll('img');
         let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
         for(let i=0;i<yourImages.length;i++)
         {
            yourImages[i].remove();
         }
         for(let i=0;i<dealerImages.length;i++)
         {
            dealerImages[i].remove();
         }
         YOU['score']=0;
         DEALER['score']=0;
         document.querySelector('#your-blackjack-result').textContent = 0;
         document.querySelector('#your-blackjack-result').style.color = 'white'; // it makes the '0' color to white  before it was red

         document.querySelector('#dealer-blackjack-result').textContent = 0;
         document.querySelector('#dealer-blackjack-result').style.color = 'white'; // this also follow the above principal

         document.querySelector('#blackjack-result').textContent = "Let's play";
         document.querySelector('#blackjack-result').style.color = 'white';
         blackjackGame['turnsOver'] = true;
      } 
}

function updateScore(card,activePlayer)
{
   //If adding 11 keeps me below 21 ,add 11 .Otherwise add 1;
   if(card == 'A')
   {
      if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) 
      {
         activePlayer['score'] += blackjackGame['cardsMap'][card][1]; //blackjackGame['cardsMap'][card][1] gives value 11
      }
      else
      {
         activePlayer['score'] += blackjackGame['cardsMap'][card][0]; // blackjackGame['cardsMap'][card][1] gives value 1
      }
   }
   else
   {
    activePlayer['score']+=blackjackGame['cardsMap'][card];
   }
}

function showScore(activePlayer)
{
   if(activePlayer['score'] > 21)
   {
      document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
      document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
   }
   else
   {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
   }
}

//for bot(computer)

function sleep(ms)
{
   return new Promise(resolve => setTimeout(resolve, ms));
}
 async function dealerLogic()
{
   blackjackGame['isStand'] = true;

   while(DEALER['score'] < 16 && blackjackGame['isStand'] == true)
   {
      let card = randomCard();
      showCard(card,DEALER);
      updateScore(card,DEALER);
      showScore(DEALER); 
      await sleep(1000);
   }
      blackjackGame['turnsOver'] = true;
      let winner = computeWinner();
      showResult(winner);
}

//compute the winner and return who just win
//update the wins,draws, and losses
function computeWinner()
{
   let winner;
   if(YOU['score'] <= 21)
   {
      //condition : heigher score than dealer or when the  dealer burst but you're not
      if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
         blackjackGame['wins']++;
         winner = YOU;
      }
      else if(YOU['score'] < DEALER['score']) {
         blackjackGame['losses']++;
         winner = DEALER;
      }
      else if(YOU['score'] == DEALER['score']) {
         blackjackGame['draws']++;
         
      }
   }
   //condition : when user burst and dealer doesn't
   else if(YOU['score'] > 21 && DEALER['score'] <= 21)
   {
         blackjackGame['losses']++;
         winner = DEALER;
   }
   // when you and dealer burst
   else if(YOU['score'] > 21 && DEALER['score'] >21)
   {
      blackjackGame['draws']++;

   }
   return winner;
}

function showResult(winner)
{
  let message,messageColor;
  if(blackjackGame['turnsOver'] == true)
  {
      if(winner == YOU)
      {
         document.querySelector('#wins').textContent = blackjackGame['wins'];
         message = 'You Won!';
         messageColor = 'green';
         winSound.play();
      }
      else if(winner == DEALER)
      {
         document.querySelector('#losses').textContent = blackjackGame['losses'];
         message = 'You Lost!';
         messageColor = 'red';
         lossSound.play();
      }
      else
      {
         document.querySelector('#draws').textContent = blackjackGame['draws'];
         message = 'You drew!';
         messageColor = 'yellow';
      }
      document.querySelector('#blackjack-result').textContent = message;
      document.querySelector('#blackjack-result').style.color = messageColor;
   }
}