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

const footerLinkMap={
  Terms:'terms.html',
  'Privacy Policy':'privacy-policy.html'
};
document.querySelectorAll('.footer a').forEach((link)=>{
  const target=footerLinkMap[link.textContent.trim()];
  if(target) link.setAttribute('href',target);
});

wireLink('.hero-actions .btn-primary',platformUrl);
wireLink('#access .btn-gold',platformUrl);
wireLink('#yield .product-cta-v83',platformProductsUrl);

const newsButton=document.querySelector('.hero-actions .btn-ghost');
if(newsButton){
  newsButton.textContent='News & Update';
}

const style=document.createElement('style');
style.textContent=`
  .hero h1 span.gold{font-size:.7em!important;line-height:.92!important;letter-spacing:.01em!important;}
  .section-title h2 .gold,.section-title h2 .blue{font-size:.7em!important;line-height:.95!important;display:inline-block!important;}
`;
document.head.appendChild(style);

const board=document.querySelector('.winboard');
if(board){
  const planSteps=[100,200,500,1000,5000];
  const names=['Dragon_King_88','Golden_Whale','K-Capital_M','Ruby_Quant_7','BlueVault_AI','Neon_Baccarat','CNYT_Rider','Alpha_Wheel','FutureAce_10','VIP_Crown_X'];
  const now=Date.now();
  const stored=JSON.parse(localStorage.getItem('longriseLiveProfitDemo')||'null');
  const state=stored&&Array.isArray(stored.players)?stored:{
    createdAt:now,
    lastWalletAt:now,
    walletBase:1245852,
    walletRate:10+Math.floor(Math.random()*11),
    lastPurchaseAt:now,
    nextPurchaseDelay:60000+Math.floor(Math.random()*60000),
    players:names.map((name,index)=>({name,amount:[54200,42150,38900,34800,31500,27900,24300,21100,18400,15100][index]+(index%5)*50}))
  };
  let offset=0;
  const save=()=>localStorage.setItem('longriseLiveProfitDemo',JSON.stringify(state));
  const formatMoney=(value)=>'$'+Math.round(value).toLocaleString('en-US')+'.'+String(Math.floor(value*100)%100).padStart(2,'0');
  const walletCount=()=>{
    const elapsedHours=(Date.now()-state.createdAt)/3600000;
    return state.walletBase+Math.floor(elapsedHours*state.walletRate);
  };
  const addPurchase=()=>{
    const target=state.players[Math.floor(Math.random()*state.players.length)];
    target.amount+=planSteps[Math.floor(Math.random()*planSteps.length)];
    state.players.sort((a,b)=>b.amount-a.amount);
    state.lastPurchaseAt=Date.now();
    state.nextPurchaseDelay=60000+Math.floor(Math.random()*60000);
    save();
  };
  const maybePurchase=()=>{
    if(Date.now()-state.lastPurchaseAt>=state.nextPurchaseDelay){
      addPurchase();
    }
  };
  const visibleRows=()=>{
    const rows=[];
    for(let i=0;i<3;i++) rows.push((offset+i)%state.players.length);
    return rows;
  };
  const render=()=>{
    maybePurchase();
    const rows=visibleRows().map((playerIndex)=>{
      const player=state.players[playerIndex];
      return `<div class="row"><span class="rank">${String(playerIndex+1).padStart(2,'0')}</span><div><span class="game">${player.name}</span><span class="sub">Live Profits</span></div><span class="gain">${formatMoney(player.amount)}</span></div>`;
    }).join('');
    board.innerHTML=`<div class="board-head"><b>Live Profits</b><span class="live">● LIVE</span></div>${rows}<div style="margin-top:16px;color:#fbbf24;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.18em">${walletCount().toLocaleString('en-US')} Wallets · Profit Hub</div>`;
    offset=(offset+1)%state.players.length;
  };
  render();
  setInterval(render,3500);
  setInterval(()=>{save();render();},30000);
}
