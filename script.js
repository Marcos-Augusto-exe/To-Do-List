// Variáveis Globais 

let inputTarefa = document.getElementById("inputTarefa");
let btnAddTarefa = document.getElementById("btnAddTarefa");
let listaTarefas = document.getElementById("listaTarefas");
let btnExcluirTudo = document.getElementById("btnExtTarefa");


// Botão para adicionar tarefas a lista pós o click
btnAddTarefa.addEventListener('click', (e) => {
    let tarefa = {
        nome: inputTarefa.value,
        //Executando a função gerar Id
        id: gerarId(),
    }

// Funções a serem executadas pós o click
    addTarefa(tarefa);
    salvarLista();

});


// Adicionar tarefas a lista pós pressionar 0 enter
inputTarefa.addEventListener("keypress", (e) => {
    if(e.keyCode  == 13 ){
        let tarefa = {
        nome: inputTarefa.value,
        //Executando a função gerar Id
        id: gerarId(),  
    }

// Funções a serem executadas pós pressionar o enter    
    addTarefa(tarefa);
    salvarLista();
}
});


//Botão para excluir todas as tarefas da lista
btnExcluirTudo.addEventListener('click', (e) => {
    if (localStorage.lista.length > 0){
        let confirmar = window.confirm('Excluir todas as tarefas?');
    if (confirmar){
        listaTarefas.innerHTML = ""
    }
    }else{alert("Sem tarefas!")}
    

// Fonção a ser executada pós o click    
    salvarLista();
})


// Função para gerar um némero para o Id
function gerarId() {
    return Math.floor(Math.random() * 3000);
}

// Função para adicionar tarefas na lista
function addTarefa(tarefa) {
    if (tarefa.nome > '0') {
        let li = criarTagLi(tarefa);
        listaTarefas.appendChild(li);
        inputTarefa.value = "";
    }
    else {
        alert("Campo vazio!")

    }
}

// Criando a tag li 
function criarTagLi(tarefa) {
    //Criando a tag li e adicionando Id geredo
    let li = document.createElement('li');
    li.id = tarefa.id;


    //Criando a tag span e adicionando o valor do input dentro
    let span = document.createElement('span')
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    //Criando a tag div
    let div = document.createElement('div');

    //Criando o botão de excluir tarefa individual 
    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnacaoEx');
    btnExcluir.innerHTML = 'x';
    //Adicionado o atributo de click e executando a função excluir pós o click
    btnExcluir.setAttribute('onclick', 'excluir(' + tarefa.id + ')');

    // Colocando o botão dentro da div
    div.appendChild(btnExcluir);
    // colocando tags criadas dentro da tag li e retornando tag li para ser usada na função addTarefa
    li.appendChild(span);
    li.appendChild(div);
    return li
}

// Função excluir tarefa individual
function excluir(idTarefa) {
    let confirmar = window.confirm('Excluir tarefa?');
    if (confirmar) {
        let li = document.getElementById('' + idTarefa + '')
        if (li) {
            listaTarefas.removeChild(li);
        }
        // função a ser executada pós o click
        salvarLista();
        
    }
}
// Função para salvar as tarefas no LocalStorage 
function salvarLista(){ 
    localStorage.setItem('lista', listaTarefas.innerHTML); 
    //Trazendo tarefas salvas para meu HTML, para manter sempre atualizadas
    listaTarefas.innerHTML = localStorage.getItem('lista');

    if (localStorage.lista.length > 0) {
        document.getElementById("tarefas").innerHTML = "Tarefas";
    }else{document.getElementById("tarefas").innerHTML = "";}
};
// Manter tarefas salvas e atualizadas pós recarregar a página
addEventListener('DOMContentLoaded', (e) => {
    listaTarefas.innerHTML = localStorage.getItem('lista');
    salvarLista();
});

