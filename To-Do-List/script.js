const inputBox = document.getElementById('input-box');
const listCon = document.querySelector('.list-container');
const addBtn = document.getElementById('btn');

addBtn.addEventListener('click', () => {
    if(inputBox.value === ''){
        alert('you must write something!');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listCon.appendChild(li);
        
        // X icon
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
})

listCon.addEventListener('click', function(e) {
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle('checked');
        saveData();
    } 
    else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
        saveData();
    }
}, false); 

function saveData() {
    localStorage.setItem('data', listCon.innerHTML);
}

function showList() {
    listCon.innerHTML = localStorage.getItem('data');
}

showList();