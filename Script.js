const url = "http://159.65.228.63/Cadastro_de_Tarefas";

async function save() {

    const prioridade = document.getElementById("priority")?.value.trim();
    const descricao = document.getElementById("descricao")?.value.trim();
    const local = document.getElementById("local")?.value.trim();
    const recursos = document.getElementById("recursos")?.value.trim();
    const dataLimite = document.getElementById("dataLimite")?.value.trim();
    const matricula = document.getElementById("matricula")?.value.trim();


    if (!prioridade || !descricao || !local || !dataLimite || !matricula) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    const recursosNecessarios = recursos
        ? recursos.split(",").map(r => r.trim())
        : [];

    const tarefa = {
        prioridade,
        descricao,
        local,
        recursosNecessarios,
        dataLimite,
        matricula
    };

    try {
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tarefa)
        });

        alert("Tarefa salva com sucesso!");

        ["priority", "descricao", "local", "recursos", "dataLimite", "matricula"]
            .forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = "";
            });

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
                <td>${Array.isArray(tarefa.recursosNecessarios) ? tarefa.recursosNecessarios.join(", ") : ""}</td>
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
