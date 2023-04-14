/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function checkAnswer(event){
  const choice= event.currentTarget;
  const current_question_div  = choice.parentNode.querySelectorAll('div');
  const image= choice.querySelector('.checkbox');
  image.src='checked.png' ;

  choice.classList.remove('unchecked');
  choice.classList.remove('notSelected');
  choice.classList.add('checked');

  const risposta_selezionata = choice.dataset.choiceId;
  for (let target of current_question_div)
  {
      if(target.dataset.choiceId!=risposta_selezionata)
      {
          target.classList.remove('checked');
          target.classList.add('unchecked');
          const image= target.querySelector('.checkbox');
          image.src='unchecked.png';
          delete checked[choice.dataset.questionId];
      }
      target.classList.add('notSelected');
  }
      
  checked[choice.dataset.questionId]=choice.dataset.choiceId;

  if(checked["one"]!== undefined && checked["two"]!== undefined && checked["three"]!== undefined)
          stampaRisultato();
}

function Personalita(){
  let answer1= checked["one"];
  let answer2=checked["two"];
  let answer3=checked["three"];

  if(answer1===answer2 || answer1===answer3 )
      return answer1;
  else if(answer2===answer1 || answer2===answer3)
      return answer2;
  else if(answer3===answer1 || answer3===answer2)
      return answer3;
  else 
      return answer1;
}

function stampaRisultato(){
  const personality= Personalita();
  const resultContainer = document.querySelector('#result');

  const p = document.createElement('p');
  const h1= document.createElement('h1');
  const button = document.createElement('button');

  p.textContent=RESULTS_MAP[personality].contents;
  h1.textContent = RESULTS_MAP[personality].title;
  button.textContent= "Ricomincia il quiz";

  resultContainer.appendChild(h1);
  resultContainer.appendChild(p);
  resultContainer.appendChild(button);

  button.addEventListener('click',reset);
  resultContainer.classList.remove('hidden');

const choices= document.querySelectorAll('.choice-grid div');
for (const choice of choices)
{
  choice.removeEventListener('click', checkAnswer);
}
 window.scrollTo(0, document.body.scrollHeight);
}

function reset(event){

  const choices = document.querySelectorAll('.choice-grid div');
  for (const choice of choices)
  {
       choice.addEventListener('click', checkAnswer);
       const resultContainer = document.querySelector('#result');
       resultContainer.innerHTML='';
       resultContainer.classList.add('hidden');

       const images = document.querySelectorAll('.checkbox');
       for(const image of images)
          image.src="unchecked.png";

      delete checked[choice.dataset.questionId];

      choice.classList.remove('checked','unchecked');
  }

  window.scrollTo(0,0);
}

const checked={};
const choices = document.querySelectorAll('.choice-grid div');
for (const choice of choices)
{
  choice.classList.add('notSelected');
  choice.addEventListener('click', checkAnswer);
}

