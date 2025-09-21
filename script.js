document.addEventListener('DOMContentLoaded', () => {

    const searchIcon = document.getElementById('searchIcon');
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('searchInput');

    //clique no ícone de pesquisa
    searchIcon.addEventListener('click', () => {
        //Adiciona ou remove a classe 'active' do container
        searchContainer.classList.toggle('active');

        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    });

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
// LÓGICA DO CABEÇALHO QUE SOME AO ROLAR      //
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