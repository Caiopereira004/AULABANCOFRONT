// let botao = document.getElementById("btnCadastrar");
// botao.addEventListener("click", async (e) => {
//     let resp = document.getElementById("r");
//     let nomeDigitado = document.gerElementById("nome").value;
//     resp.innerHTML = nomeDigitado;
// });

const API = "http://localhost:3000/alunos";

const frmCadastro = document.getElementById("frmCadastro");
const inputNome = document.getElementById("nome");
const inputCpf = document.getElementById("cpf");
const inputCep = document.getElementById("cep");
const inputUf = document.getElementById("uf");
const inputRua = document.getElementById("rua");
const inputNumero = document.getElementById("numero");
const inputComplemento = document.getElementById("complemento");

async function salvar(e){
    e.preventDefault();
    console.log("Clicou no botão");
    let nome = inputNome.value
    let cpf = inputCpf.value
    let cep = inputCep.value
    let uf = inputUf.value
    let rua = inputRua.value
    let numero = inputNumero.value
    let complemento = inputComplemento.value

    let novoAluno = {
        nome, cpf, cep, uf, rua, numero, complemento
    };
    console.log(novoAluno);
    try {
        const resposta = await fetch(API{
            method: "POST",
            body:novoAluno,
            headers:"Content-Type : application/json"
        });

        resposta.status === 201 ? window.location.href ="index.html" : console.log("Erro ao cadastrar aluno");
    } catch (error) {
        console.error(error);
    }
}

frmCadastro.addEventListener("submit", salvar);