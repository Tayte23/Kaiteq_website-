const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-button');
menu?.addEventListener('click',()=>{const open=header.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.site-header nav a').forEach(link=>link.addEventListener('click',()=>{header.classList.remove('open');menu?.setAttribute('aria-expanded','false');}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  entry.target.classList.toggle('visible',entry.isIntersecting);
}),{threshold:.12,rootMargin:'-7% 0px -10%'});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
document.getElementById('year').textContent=new Date().getFullYear();

const typewriterItems=[...document.querySelectorAll('.hero-assurances span')];
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait=delay=>new Promise(resolve=>setTimeout(resolve,delay));
const typeAssurances=async()=>{
  if(reducedMotion){typewriterItems.forEach(item=>{item.querySelector('b').textContent=item.dataset.type;item.classList.add('typed');});return;}
  while(true){
    typewriterItems.forEach(item=>{item.querySelector('b').textContent='';item.classList.remove('typing','typed');});
    for(const item of typewriterItems){
      const output=item.querySelector('b');item.classList.add('typing');
      for(const character of item.dataset.type){output.textContent+=character;await wait(34);}
      item.classList.remove('typing');item.classList.add('typed');await wait(150);
    }
    await wait(520);
  }
};
window.setTimeout(typeAssurances,700);

const enquiryForm=document.getElementById('enquiry-form');
enquiryForm?.addEventListener('submit',event=>{
  event.preventDefault();
  const data=new FormData(enquiryForm);
  const subject=`KAI-TEQ enquiry — ${data.get('interest')}`;
  const body=`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nBusiness: ${data.get('business')||'Not provided'}\nInterest: ${data.get('interest')}\n\n${data.get('message')}`;
  window.location.href=`mailto:hello@kai-teq.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
