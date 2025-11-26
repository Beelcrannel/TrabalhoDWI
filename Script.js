const baseUrl = 'http://159.65.228.63/';
const form = document.getElementById('form-atividade');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const dados= {
        nome:document.getElementById('nome').value,
        prioridade: document.getElementById('prioridade').value,
        descricao:document.getElementById('descricao').value,
        local:document.getElementById('local').value,
        recursosNecessarios:document.getElementById('recursosNecessarios').value,
        dataLimite:document.getElementById('dataLimite').value,
        matricula: Number(document.getElementById('matricula').value)
    };
});

try{
    const response = await fetch(baseUrl + 'atividade', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)})
    };