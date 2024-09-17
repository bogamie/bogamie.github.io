function updateIndicator(){let e=document.querySelector(".nav-indicator"),t=document.querySelectorAll(".nav-item"),a=window.location.pathname,o=null;t.forEach(e=>{a===new URL(e.href).pathname?(e.classList.add("masthead-tocActive"),o=e):e.classList.remove("masthead-tocActive")}),o&&setTimeout(()=>{e.style.width=`${o.offsetWidth}px`,e.style.left=`${o.offsetLeft}px`},100)}window.addEventListener("load",updateIndicator),window.addEventListener("resize",updateIndicator);
const header=document.querySelector(".masthead"),toc=document.querySelector(".toc"),navWrapper=document.querySelector(".nav-wrapper.wrap"),sidebar=document.querySelector(".page__sidebar");let lastScrollTop=0;function handleScroll(){let e=window.scrollY;e>60?(e>lastScrollTop?(header&&header.classList.add("stickyHead"),navWrapper&&navWrapper.classList.add("stickyHead"),sidebar&&sidebar.classList.add("stickyHead")):(header&&header.classList.remove("stickyHead"),navWrapper&&navWrapper.classList.remove("stickyHead"),sidebar&&sidebar.classList.remove("stickyHead")),lastScrollTop=e):(header&&header.classList.remove("stickyHead"),navWrapper&&navWrapper.classList.remove("stickyHead"),sidebar&&sidebar.classList.remove("stickyHead")),toc&&toc.classList.toggle("tocToc",e>60)}window.addEventListener("scroll",handleScroll);
let scrollTimeout;

window.addEventListener('scroll', () => {
    document.documentElement.classList.add('scroll-active');

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove('scroll-active');
    }, 1000);
});