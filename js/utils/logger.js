function log(msg, tipo='info') {
    const term = document.getElementById('terminal');
    let color = 'text-gray-300';
    if(tipo === 'erro') color = 'text-red-400 font-bold';
    if(tipo === 'sucesso') color = 'text-green-400 font-bold';
    if(tipo === 'aviso') color = 'text-yellow-400';

    const time = new Date().toLocaleTimeString().split(' ')[0];
    term.innerHTML += `<div class="${color} border-b border-gray-800 pb-1 mb-1">[${time}] ${msg}</div>`;
    term.scrollTop = term.scrollHeight;
}
