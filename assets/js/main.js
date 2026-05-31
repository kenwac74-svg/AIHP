const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')})},{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

const platformUrl='https://kenwac74-svg.github.io/AIPK/';
const platformProductsUrl='https://kenwac74-svg.github.io/AIPK/#packages';

const wireLink=(selector,url)=>{
  document.querySelectorAll(selector).forEach((el)=>{
    el.setAttribute('href',url);
    el.addEventListener('click',(event)=>{
      event.preventDefault();
      window.location.href=url;
    });
  });
};

wireLink('.hero-actions .btn-primary',platformUrl);
wireLink('#access .btn-gold',platformUrl);
wireLink('#yield .product-cta-v83',platformProductsUrl);
