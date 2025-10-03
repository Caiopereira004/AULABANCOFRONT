console.log("APP.js funcionando!")

const API = "http://localhost:3000/alunos"

async function carregarAlunos(){
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = `<tr><td colspan="9" >Carregando...</td></tr>`;

    try {
        const resposta = await fetch(API);
        const alunos = await resposta.json();
        console.log(alunos)

    setTimeout(() => {

        tbody.innerHTML = "";

        tbody.innerHTML = alunos.map(aluno => `
            <tr>
                <td>${aluno.id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.cpf}</td>
                <td>${aluno.cep}</td>
                <td>${aluno.uf}</td>
                <td>${aluno.rua}</td>
                <td>${aluno.numero}</td>
                <td>${aluno.complemento}</td>
            </tr>
        `).join("");

    }, 5000)

    }catch(error){
        console.error(error);
    }
    
}

    carregarAlunos();