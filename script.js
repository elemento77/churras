document.addEventListener('DOMContentLoaded', () => {
    // Estado da aplicação
    let totalAmount = 0;
    const donationInput = document.getElementById('donation-input');
    const donateBtn = document.getElementById('donate-btn');
    const totalDisplay = document.getElementById('total-amount');
    const donorsList = document.getElementById('donors-list');

    // Nomes temáticos para gerar aleatoriamente
    const fantasyTitles = [
        "Guerreiro", "Mago", "Ladino", "Clérigo", "Bárbaro", "Paladino", 
        "Druida", "Monge", "Feiticeiro", "Patrulheiro", "Bardo"
    ];
    
    const fantasySuffixes = [
        "da Picanha", "do Carvão Eterno", "da Farofa Mística", "do Espetinho", 
        "da Cerveja Gelada", "do Vinagrete", "das Brasas", "do Banquete",
        "da Costela", "do Pão de Alho", "da Linguiça Suprema"
    ];

    // Função para formatar moeda
    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // Função para gerar nome aleatório
    const generateRandomName = () => {
        const title = fantasyTitles[Math.floor(Math.random() * fantasyTitles.length)];
        const suffix = fantasySuffixes[Math.floor(Math.random() * fantasySuffixes.length)];
        return `${title} ${suffix}`;
    };

    // Função para adicionar doação
    const addDonation = () => {
        const value = parseFloat(donationInput.value);

        if (isNaN(value) || value <= 0) {
            alert('Por favor, insira um valor válido para oferecer aos deuses do churrasco!');
            return;
        }

        // Atualizar total
        totalAmount += value;
        
        // Animar o contador
        animateValue(totalDisplay, totalAmount - value, totalAmount, 1000);

        // Adicionar à lista
        const name = generateRandomName();
        const li = document.createElement('li');
        li.className = 'donor-item';
        li.innerHTML = `
            <span class="donor-name">${name}</span>
            <span class="donor-amount">+ R$ ${formatCurrency(value)}</span>
        `;
        
        // Inserir no topo da lista
        donorsList.insertBefore(li, donorsList.firstChild);

        // Limpar input
        donationInput.value = '';
        donationInput.focus();

        // Feedback visual/sonoro (opcional, aqui apenas visual no botão)
        donateBtn.style.transform = "scale(0.95)";
        setTimeout(() => donateBtn.style.transform = "", 100);
    };

    // Animação do contador numérico
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Easing function (easeOutQuad)
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            
            const currentVal = start + (end - start) * easeProgress;
            obj.innerHTML = formatCurrency(currentVal);
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = formatCurrency(end);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Event Listeners
    donateBtn.addEventListener('click', addDonation);

    donationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addDonation();
        }
    });
});
