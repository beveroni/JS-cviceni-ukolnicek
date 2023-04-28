// Prohledněte si data, která vrací API pro úkoly.
// V hlavním souboru index.js vytvořte komponentu Task, která bude představovat jeden úkol. Komponenta bude jako svoje props očekávat objekt s jedním úkolem.

const Task = (props) => {
  const { name, due, done } = props;
  let sign = '';
  if (done) {
    sign = '✓';
  }
  return `<div class="task">
  <div class="task__body">
    <div class="task__name">${name} </div>
    <div class="task__due">${due} </div>
  </div>
  <div class="task__done">${sign}</div>
  </div>`;
};

// Vytvořte funkci renderTasks, která obdrží seznam úkolů a zobrazí je na stránce pomocí komponenty Task.
// Stáhněte si z API seznam úkolů a pomocí renderTasks je zobrazte na stránce.

const renderTasks = (items) => {
  const tasksToDo = document.querySelector('.todo__tasks');
  tasksToDo.innerHTML = items.map((item) => Task(item)).join('');
};

fetch('https://apps.kodim.cz/daweb/trening-api/apis/tasks-api/tasks')
  .then((odpoved) => odpoved.json())
  .then(renderTasks);

// Seznamte se s tím, jak API filtruje úkoly podle toho, zda jsou splněné či nikoliv.
// Zařiďte, že při zaškrtnutí přepínače Pouze nesplněné se zobrazí pouze nesplněné úkoly. Bude potřeba ve správnou chvíli znovu zavolat funkci fetch a poté renderTasks s novými daty.
// Pokud uživatel odškrtne přepínač, měly by se zobrazit opět všechny úkoly.

const toDoFilter = document.querySelector('.todo__filter');
toDoFilter.addEventListener('click', (e) => {
  if (e.target.checked) {
    fetch(
      'https://apps.kodim.cz/daweb/trening-api/apis/tasks-api/tasks/?done=false',
    )
      .then((odpoved) => odpoved.json())
      .then(renderTasks);
  } else {
    fetch('https://apps.kodim.cz/daweb/trening-api/apis/tasks-api/tasks/')
      .then((odpoved) => odpoved.json())
      .then(renderTasks);
  }
});
