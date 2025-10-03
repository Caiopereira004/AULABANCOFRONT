function log(etapa) {
    return console.log(etapa + new Date().toLocaleTimeString());
}

function requisicaoSimulada(nome, tempoMs = 1500, deveFalhar = false) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(deveFalhar){
                reject(new Error(`Requisição ${nome} falhou!`))    
            }else{
                resolve(`Requisição ${nome} concluída em ${tempoMs}ms`);
            }
        },tempoMs)
    })
}

function exemploThenCatch(){
    log("1. Início (sem await)")

    requisicaoSimulada("Buscar Usuário", 2000)
        .then((resultado)=>{ log(`3. Then ${resultado}`)})
        .catch((erro)=>{ 
            console.log("Erro capturado com .catch" + erro.message)})

            log.apply("2. Continuou o fluxo sem esperar a promise")
}

function exemploTryCatch(){
    try{
    const resultado = requisicaoSimulada("Buscar Usuário", 2000);
    log("2. Resultado obtido com await" + resultado)
    } catch(erro){
        console.log(erro.message)
    }
    log("3. Só roda depois do Await")
};

exemploTryCatch()