//dom
const cepField = document.getElementById('cep');
const adressField = document.getElementById('endereco');
const bairroField = document.getElementById('bairro');
const cityField = document.getElementById('cidade');
const stateField = document.getElementById('estado');
const teste = document.getElementById('teste');

//functions
async function searchAdress(cep) { //Criando uma função assíncrona
    errorMessage('');
    try {
        const queryCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`); //Criando uma const que vai aguardar a resposta o fetch e guardar o seu valor, que são dados
        const queryConverted = await queryCep.json(); //Const aguardando os dados da queryCep, após isso converte os dados para json

        if (queryConverted.erro) {
            throw Error('Cep inexistente.'); //'throw' = lançar, caso a tenha algum problema na busca 'lance' o error('...')
        } else {
            adressField.value = queryConverted.logradouro //Valores contidos na API
            bairroField.value = queryConverted.bairro //Valores contidos na API
            cityField.value = queryConverted.localidade //Valores contidos na API
            stateField.value = queryConverted.uf //Valores contidos na API

            console.log(queryConverted); //Console consultando todos as response's/dados da API
        }

        return queryConverted;
    } catch (erro) { //
        errorMessage('<span>Cep não encontrado, verifique e tente novamente.</span>')
        resetFields();
        console.log(erro);
    }
}

function errorMessage(message) {
    const setError = document.getElementById('msgError');
    setError.classList.add('spanAlert');
    setError.innerHTML = message;
}

function resetFields() {
    adressField.value = ''
    bairroField.value = ''
    cityField.value = ''
    stateField.value = ''
}

//events
cepField.addEventListener('focusout', () => {
    const cepValue = cepField.value;
    searchAdress(cepValue);
})