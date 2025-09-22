document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.getElementById('searchIcon');
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('searchInput');

    searchIcon.addEventListener('click', () => {
        // Se a barra de busca JÁ ESTÁ visível, realiza a busca.
        if (searchContainer.classList.contains('active') && searchInput.value.length > 0) {
            performSearch();
        } else {
            // Se não, apenas mostra a barra de busca.
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchInput.focus();
            }
        }
    });


    //-----------------------------------------------------------//
    //       LÓGICA DE BUSCA E ROLAGEM ("ENCONTRAR NA PÁGINA")   //
    //-----------------------------------------------------------//

    // Lê o evento de apertar "Enter" na barra de busca
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // Função que realiza a busca
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm === "") return; // Não faz nada se a busca estiver vazia

        // Seleciona todos os elementos onde queremos procurar texto
        const elementsToSearch = document.querySelectorAll('h2, h3, p, a, li');
        let matchFound = false;

        // Remove destaques de buscas anteriores
        document.querySelectorAll('.search-highlight').forEach(el => {
            el.classList.remove('search-highlight');
        });

        // Passa por cada elemento para encontrar uma correspondência
        for (const element of elementsToSearch) {
            const elementText = element.textContent.toLowerCase();

            if (elementText.includes(searchTerm)) {
                // Se encontrou, rola até o elemento
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Adiciona a classe de destaque
                element.classList.add('search-highlight');

                // Remove o destaque depois de 2 segundos
                setTimeout(() => {
                    element.classList.remove('search-highlight');
                }, 2000);

                matchFound = true;
                break; // Para a busca no primeiro resultado encontrado
            }
        }

        // Se o loop terminar e nada for encontrado
        if (!matchFound) {
            alert('Nenhum resultado encontrado para: "' + searchInput.value + '"');
        }
    }
}); 

// INICIALIZAÇÃO DO CARROSSEL SWIPER
const swiper = new Swiper('.swiper', {
    // Opções
    direction: 'horizontal', // Direção do slide
    loop: true,              // Deixa o carrossel infinito

    // Setas de navegação
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});

//----------------------------------------------//
//   LÓGICA DO CABEÇALHO QUE SOME AO ROLAR      //
//----------------------------------------------//

const header = document.querySelector('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // LÓGICA 1: Controla o fundo transparente vs. sólido
    if (currentScrollY > 10) { // Se o usuário rolou mais de 10px
        header.classList.add('header-scrolled');
    } else { // Se o usuário está no topo da página
        header.classList.remove('header-scrolled');
    }

    // LÓGICA 2: Controla o esconder/mostrar ao rolar para cima/baixo
    // (Apenas ativa se não estivermos no topo)
    if (currentScrollY > lastScrollY && currentScrollY > 10) {
        // Rolando para BAIXO
        header.classList.add('header-hidden');
    } else {
        // Rolando para CIMA
        header.classList.remove('header-hidden');
    }

    // Atualiza a última posição de rolagem
    lastScrollY = currentScrollY;
});
