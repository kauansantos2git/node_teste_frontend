const lista = document.getElementById("lista-alunos");

async function listarAlunos() {
    try {
        const resposta = await fetch('http://localhost:3000/escola/listar-alunos');

        if (!resposta.ok) {
            throw new Error('Erro ao buscar alunos');
        }

        const alunos = await resposta.json();

        lista.innerHTML = '';

        if (alunos.length === 0) {
            lista.textContent = 'Nenhum aluno cadastrado.';
            return;
        }

        alunos.forEach(aluno => {
            const item = document.createElement('p');

            item.textContent = aluno.nome + ' - ' + aluno.email;

            lista.appendChild(item);
        });
    } catch (erro) {
        console.error(erro);
        lista.textContent = 'Não foi possível carregar os alunos.';
    }
}

listarAlunos();

const formulario = document.getElementById('form-aluno');

formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    try {
        const resposta = await fetch(
            'http://localhost:3000/escola/criar-aluno',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email
                })
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.erro || 'Erro ao inscrever aluno');
        }

        alert('Aluno inscrito com sucesso!');

        formulario.reset();

        // Atualiza a lista para mostrar o aluno recém-cadastrado
        listarAlunos();

    } catch (erro) {
        console.error(erro);
        alert('Não foi possível inscrever o aluno.');
    }
});