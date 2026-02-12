async function callGeminiAPI(promptText) {
    log(`Iniciando Handshake com ${MODEL_NAME}...`, 'aviso');

    // ✅ CORREÇÃO: Usando MODEL_NAME e API_KEY corretamente na URL
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

    const data = {
        contents: [{
            parts: [{ text: promptText }]
        }]
    };

    log(`Enviando requisição...`);

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    log(`Status HTTP: ${response.status}`);

    const json = await response.json();

    if (!response.ok) {
        const errorMsg = json.error?.message || "Erro desconhecido";

        if(errorMsg.includes("429")) {
            log("⛔ COTA EXCEDIDA (429).", 'erro');
            alert("PAUSA: O Google pediu para esperar. Tente em 1 minuto.");
        } else {
            log(`❌ ERRO: ${errorMsg}`, 'erro');
        }
        throw new Error(errorMsg);
    }

    // SUCESSO
    if (json.candidates && json.candidates[0].content.parts[0].text) {
        const textoFinal = json.candidates[0].content.parts[0].text;
        log("✅ PACOTE RECEBIDO! SUCESSO TOTAL.", 'sucesso');
        return textoFinal;
    } else {
        throw new Error("Resposta vazia da API.");
    }
}
