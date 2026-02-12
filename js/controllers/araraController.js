async function perguntarArara() {
    const btn = document.getElementById('btn');
    const respDiv = document.getElementById('resultado-container');
    const respTxt = document.getElementById('resposta-texto');

    btn.disabled = true;
    btn.classList.add('opacity-50', 'cursor-not-allowed');
    btn.innerText = "Conectando ao Satélite...";
    respDiv.classList.add('hidden');

    try {
        const promptText = "Responda muito curto (apenas o ano): Em que ano a Arara Azul de Spix foi extinta na natureza?";

        // Chama o serviço responsável pela comunicação com a API
        const textoFinal = await callGeminiAPI(promptText);

        respTxt.innerText = textoFinal;
        respDiv.classList.remove('hidden');

        btn.innerText = "Teste Realizado com Sucesso";
        btn.classList.remove('bg-blue-600', 'hover:bg-blue-500');
        btn.classList.add('bg-green-600', 'hover:bg-green-500');
        btn.disabled = false;
        btn.classList.remove('opacity-50', 'cursor-not-allowed');

    } catch (error) {
        console.error(error);
        log(`Falha: ${error.message}`, 'erro');
        btn.innerText = "Tentar Novamente";
        btn.disabled = false;
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}
