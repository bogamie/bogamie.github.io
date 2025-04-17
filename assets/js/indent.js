document.addEventListener("DOMContentLoaded", function () {
  const headings = document.querySelectorAll(".markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6");
  const levels = { H1: 0, H2: 1, H3: 2, H4: 3, H5: 4, H6: 5 };

  headings.forEach((heading) => {
    const level = levels[heading.tagName];
    const wrapper = document.createElement("div");
    wrapper.className = `indent-${level}`;
    heading.parentNode.insertBefore(wrapper, heading);
    wrapper.appendChild(heading);

    let next = wrapper.nextSibling;
    while (next && !(next.tagName && next.tagName.match(/^H[1-6]$/))) {
      const toMove = next;
      next = next.nextSibling;
      wrapper.appendChild(toMove);
    }
  });
});
