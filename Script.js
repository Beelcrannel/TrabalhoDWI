const url = "http://159.65.228.63/Cadastro_de_Tarefas";

async function save() {

    const prioridade = document.getElementById("priority").value;
    const descricao = document.getElementById("descricao").value;
    const local = document.getElementById("local").value;
    const recursos = document.getElementById("recursos").value;
    const dataLimite = document.getElementById("dataLimite").value;
    const matricula = document.getElementById("matricula").value;

    const tarefa = {
        prioridade,
        descricao,
        local,
        recursosNecessarios: recursos,
        dataLimite,
        matricula
    };

    try {
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tarefa)
        });

        alert("Tarefa salva!");

        if (document.getElementById("priority")) document.getElementById("priority").value = "";
        if (document.getElementById("descricao")) document.getElementById("descricao").value = "";
        if (document.getElementById("local")) document.getElementById("local").value = "";
        if (document.getElementById("recursos")) document.getElementById("recursos").value = "";
        if (document.getElementById("dataLimite")) document.getElementById("dataLimite").value = "";
        if (document.getElementById("matricula")) document.getElementById("matricula").value = "";

    } catch (erro) {
        console.error("Erro ao salvar:", erro);
        alert("Erro ao salvar tarefa.");
    }
}

async function carregarTarefas() {
    const tabela = document.getElementById("tabela");
    const corpo = document.getElementById("corpo-tabela");
    const mensagem = document.getElementById("mensagem");

    if (!tabela || !corpo || !mensagem) return;

    try {
        const resposta = await fetch(url);
        const tarefas = await resposta.json();

        if (!tarefas || tarefas.length === 0) {
            tabela.style.display = "none";
            mensagem.textContent = "Nenhuma tarefa cadastrada";
            return;
        }

        tabela.style.display = "table";
        mensagem.textContent = "";

        tarefas.forEach((tarefa, index) => {
            const linha = document.createElement("tr");

            if (tarefa.prioridade === "Urgente") {
                linha.style.color = "red";
            }

            linha.innerHTML = `
                <td>${index + 1}</td>
                <td>${tarefa.prioridade || ""}</td>
                <td>${tarefa.descricao || ""}</td>
                <td>${tarefa.local || ""}</td>
                <td>${tarefa.recursosNecessarios || ""}</td>
                <td>${tarefa.dataLimite || ""}</td>
                <td>${tarefa.matricula || ""}</td>
            `;

            corpo.appendChild(linha);
        });

    } catch (erro) {
        console.error("Erro ao carregar tarefas:", erro);
        mensagem.textContent = "Erro ao carregar as tarefas.";
    }
}

document.addEventListener("DOMContentLoaded", carregarTarefas);
