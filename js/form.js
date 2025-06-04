
//class contato

class Contato {
    constructor(nome, email, telefone, tipoContato, mensagem) { 
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.tipoContato = tipoContato; 
        this.mensagem = mensagem;
    }
}

function mostrarErro (elementoErro, mensagem) {
    elementoErro.textContent = mensagem;
}

function limparErro (elementoErro) {
    elementoErro.textContent = "";
}

function validForm(form) {
    let isValid = true;
    event.preventDefault(); // Para evitar que o formulário seja enviado

    // Validação do campo Nome
    const nomeInput = document.getElementById("nomeid");
    const nomeError = document.getElementById("nomeError");
    // Aceitar apenas letras (maiúsculas e minúsculas), espaços e caracteres acentuados comuns
    const nomeRegex = /^[A-Za-z\u00C0-\u017F\s]+$/; 
    if (nomeInput.value.trim() === "") {
        nomeError.textContent = "Por favor, preencha o seu nome.";
        isValid = false;
    } else if (!nomeRegex.test(nomeInput.value)) {
        nomeError.textContent = "Por favor, insira um nome válido (somente letras).";
        isValid = false;
    } else {
        nomeError.textContent = "";
    }

    // Validação do campo Email
    const emailInput = document.getElementById("emailid");
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "") {
        emailError.textContent = "Por favor, preencha o seu e-mail.";
        isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = "Por favor, insira um e-mail válido.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    // Validação do campo Telefone
    const telInput = document.getElementById("telefoneid");
    const telError = document.getElementById("telefoneError");
    const telRegex = /^[0-9]{10,11}$/; 
    if (telInput.value.trim() === "") {
        telError.textContent = "Por favor, preencha o seu telefone.";
        isValid = false;
    } else if (!telRegex.test(telInput.value)) {
        telError.textContent = "Por favor, insira um número de telefone válido (somente números, 10 ou 11 dígitos).";
        isValid = false;
    } else {
        telError.textContent = "";
    }

    // Validação da seleção do campo Contato
    const contatoSelect = document.getElementById("contatoid");
    const contatoError = document.getElementById("contatoError");
    if (contatoSelect.value === "") { 
        contatoError.textContent = "Por favor, selecione uma opção de contato.";
        isValid = false;
    } else {
        contatoError.textContent = "";
    }

    if (isValid) {
        let data = new Contato(
            nomeInput.value,
            emailInput.value,
            telInput.value,
            contatoSelect.value
        );
        console.log(data); 
        Enviar(nomeInput.value); 
    }

    return false; 
}


function Enviar(nome) {

    alert(`Obrigado sr(a) ${nome} Os dados foram encaminhados com sucesso `);
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", validForm);
    }
});