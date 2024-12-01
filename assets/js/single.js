document.addEventListener("DOMContentLoaded",function(){document.querySelector("nav.toc")&&new Gumshoe("nav.toc a",{navClass:"tocActive",contentClass:"tocActive",nested:!1,nestedClass:"tocActive",offset:20,reflow:!0,events:!0});let e=function(e){var t=e.target,n={behavior:"auto",block:"nearest",inline:"start"},a=document.querySelector("aside.page__sidebar.sticky");a&&"sticky"===window.getComputedStyle(a).position&&(t.parentElement.classList.contains("toc__menu")&&t==t.parentElement.firstElementChild?document.querySelector("nav.toc header").scrollIntoView(n):t.scrollIntoView(n))};document.querySelector("nav.toc").addEventListener("gumshoeActivate",e)});var codeBlocks=document.querySelectorAll("pre");codeBlocks.forEach(function(e){var t=document.createElement("button");t.className="copy",t.type="button",t.ariaLabel="Copy code to clipboard",t.innerHTML='<i class="fa-regular fa-clone"></i>',e.append(t),t.addEventListener("click",function(){var n=e.querySelector("code").innerText.trim();window.navigator.clipboard.writeText(n),t.innerHTML='<i class="fa-solid fa-check"></i>',t.classList.add("active"),setTimeout(function(){t.classList.remove("active"),setTimeout(function(){t.innerHTML='<i class="fa-regular fa-clone"></i>'},300)},4e3)})});

let lazyloadImages;

if ('IntersectionObserver' in window) {
  lazyloadImages = document.querySelectorAll('.lazy');
  const imageObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove('lazy');
          imageObserver.unobserve(image);
        }
      });
    },
    {
      root: document.querySelector('.container'),
      rootMargin: '0px 0px 500px 0px',
    }
  );

  lazyloadImages.forEach(function (image) {
    imageObserver.observe(image);
  });
}

function showImage(image) {
  const modal = document.getElementById("imageModal");
  const zoomedImage = document.getElementById("zoomedImage");
  zoomedImage.src = image.dataset.src;
  modal.style.display = "flex";
}

function hideImage() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
}