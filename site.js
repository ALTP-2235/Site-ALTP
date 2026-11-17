var b = document.getElementById('burger'), n = document.getElementById('nav');
b.addEventListener('click', function(){
  var o = n.classList.toggle('ouvert');
  b.setAttribute('aria-expanded', o ? 'true' : 'false');
});

(function(){
  var d=document.getElementById('diapo'); if(!d) return;
  var sl=d.querySelectorAll('.slide'), dots=d.querySelectorAll('.dot'), i=0, t=null;
  var calme=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function voir(n){
    sl[i].classList.remove('actif'); sl[i].setAttribute('aria-hidden','true'); sl[i].tabIndex=-1; dots[i].classList.remove('actif');
    i=(n+sl.length)%sl.length;
    sl[i].classList.add('actif'); sl[i].removeAttribute('aria-hidden'); sl[i].tabIndex=0; dots[i].classList.add('actif');
  }
  function lancer(){ if(calme) return; arreter(); t=setInterval(function(){voir(i+1)},5000); }
  function arreter(){ if(t){clearInterval(t);t=null;} }
  d.querySelector('.prec').addEventListener('click',function(){voir(i-1);lancer();});
  d.querySelector('.suiv').addEventListener('click',function(){voir(i+1);lancer();});
  dots.forEach(function(b,k){b.addEventListener('click',function(){voir(k);lancer();});});
  d.addEventListener('mouseenter',arreter); d.addEventListener('mouseleave',lancer);
  d.addEventListener('focusin',arreter); d.addEventListener('focusout',lancer);
  var x0=null;
  d.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;},{passive:true});
  d.addEventListener('touchend',function(e){ if(x0===null) return; var dx=e.changedTouches[0].clientX-x0; if(Math.abs(dx)>40){voir(dx<0?i+1:i-1);lancer();} x0=null; });
  lancer();
})();

(function(){
  var b=document.getElementById('btn-mail'), m=document.getElementById('mail-affiche');
  if(!b||!m) return;
  b.addEventListener('click',function(){
    var ouvert=m.hidden;
    m.hidden=!ouvert;
    b.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
  });
})();

(function(){
  document.querySelectorAll('.copier').forEach(function(b){
    b.addEventListener('click',function(){
      var t=b.getAttribute('data-copie'), fini=function(){ b.textContent='Copié ✓'; b.classList.add('ok'); setTimeout(function(){ b.textContent='Copier'; b.classList.remove('ok'); },2000); };
      var secours=function(){ var z=document.createElement('textarea'); z.value=t; z.setAttribute('readonly',''); z.style.position='fixed'; z.style.opacity='0'; document.body.appendChild(z); z.select(); try{ document.execCommand('copy'); fini(); }catch(e){} document.body.removeChild(z); };
      try{ if(navigator.clipboard&&window.isSecureContext){ navigator.clipboard.writeText(t).then(fini,secours); } else { secours(); } }catch(e){ secours(); }
    });
  });
})();
