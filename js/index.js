//Open Blocks 
const headersToggle = document.querySelectorAll(
    '.contactInfo h1, .assignment h1, .portfolio h1, .schedule h1, .introduction h1'
);

headersToggle.forEach(header => {
    header.addEventListener('click', () => {
        header.classList.toggle('active');

        const content = header.nextElementSibling;
        if(content) {
            content.classList.toggle('active');
        }
    });
});
