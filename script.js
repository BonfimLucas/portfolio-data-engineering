AOS.init();

const menu=document.getElementById('menu'),nav=document.getElementById('nav');

menu.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

document.getElementById('year').textContent=new Date().getFullYear();



function initScrollTyping() {
    // Verifica se as bibliotecas foram carregadas
    if (!window.gsap || !window.ScrollTrigger || !window.SplitType) {
        console.error("GSAP, ScrollTrigger ou SplitType não encontrados.");
        return;
    }

    // Registra o plugin
    gsap.registerPlugin(ScrollTrigger);

    // Seleciona os elementos que terão efeito de digitação
    const elements = document.querySelectorAll("[data-typewriter]");

    elements.forEach((element) => {

        // Guarda o texto original para acessibilidade
        const originalText = element.textContent.trim();
        element.setAttribute("aria-label", originalText);

        // Divide o texto em caracteres
        const split = new SplitType(element, {
            types: "chars",
            tagName: "span"
        });

        // Mantém os caracteres individuais acessíveis visualmente
        split.chars.forEach((char) => {
            char.setAttribute("aria-hidden", "true");
        });

        // Estado inicial
        gsap.set(split.chars, {
            opacity: 0.12,
            y: 8
        });

        // Anima conforme o scroll
        gsap.to(split.chars, {
            opacity: 1,
            y: 0,
            stagger: 0.025,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                end: "bottom 45%",
                scrub: 1
            }
        });
    });

    // Atualiza os cálculos de posição
    ScrollTrigger.refresh();
}

// Inicializa quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    initScrollTyping();
});
