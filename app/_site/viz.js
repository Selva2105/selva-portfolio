/* Abstract per-project illustrations (inline SVG, no assets). Reused from the original site. */
export const VIZ = {
  'hrms': `
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
    <rect width="400" height="300" fill="var(--bg-2)"/>
    <g opacity=".9">
      <rect x="32" y="34" width="120" height="9" rx="4.5" fill="var(--fg)" opacity=".82"/>
      <rect x="32" y="52" width="70" height="7" rx="3.5" fill="var(--fg-3)"/>
    </g>
    ${[0,1,2,3,4,5,6].map(i=>`<rect x="${32+i*36}" y="88" width="26" height="12" rx="3" fill="var(--fg-4)" opacity=".5"/>`).join('')}
    ${Array.from({length:21},(_,i)=>{
      const r=Math.floor(i/7),c=i%7;
      const sel=[11,14].includes(i), sw=[12,13].includes(i);
      const f=sel?'var(--ac)':sw?'var(--warn-fade)':'var(--t2)';
      const st=sel?'var(--ac)':sw?'var(--warn)':'var(--t4)';
      return `<rect x="${32+c*36}" y="${110+r*36}" width="28" height="28" rx="6" fill="${f}" stroke="${st}"/>`;
    }).join('')}
    <rect x="290" y="110" width="78" height="100" rx="10" fill="var(--bg-3)" stroke="var(--t4)"/>
    <text x="302" y="146" font-family="Inter,sans-serif" font-size="30" font-weight="600" fill="var(--warn)">4</text>
    <rect x="302" y="158" width="54" height="6" rx="3" fill="var(--fg-4)"/>
    <rect x="302" y="170" width="38" height="6" rx="3" fill="var(--fg-4)" opacity=".6"/>
    <rect x="32" y="236" width="336" height="34" rx="8" fill="var(--warn-bg)" stroke="var(--warn)" stroke-opacity=".55"/>
    <circle cx="52" cy="253" r="5" fill="var(--warn)"/>
    <rect x="66" y="248" width="180" height="6" rx="3" fill="var(--warn)" opacity=".75"/>
    <rect x="66" y="258" width="118" height="5" rx="2.5" fill="var(--warn)" opacity=".4"/>
  </svg>`,
  'mdm': `
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
    <rect width="400" height="300" fill="var(--bg-2)"/>
    ${['Android','Windows','Apple'].map((n,i)=>`
      <rect x="32" y="${34+i*30}" width="${i===0?300:i===1?272:316}" height="14" rx="7" fill="var(--t3)"/>
      <rect x="32" y="${34+i*30}" width="${i===0?282:i===1?240:305}" height="14" rx="7" fill="${i===2?'var(--ok)':'var(--ok)'}" opacity="${i===1?.55:.8}"/>
      <text x="342" y="${45+i*30}" font-family="JetBrains Mono,monospace" font-size="9" fill="var(--fg-2)">${[94,88,96][i]}%</text>
    `).join('')}
    <rect x="32" y="140" width="336" height="1" fill="var(--t4)"/>
    ${Array.from({length:5},(_,i)=>`
      <rect x="32" y="${158+i*24}" width="${[130,150,112,168,138][i]}" height="7" rx="3.5" fill="var(--fg-3)" opacity=".85"/>
      ${[0,1,2].map(j=>{
        const on=[[1,1,1],[1,0,0],[0,1,0],[1,1,1],[1,0,1]][i][j];
        return `<rect x="${268+j*32}" y="${153+i*24}" width="17" height="17" rx="4.5" fill="${on?'rgba(62,207,142,.14)':'transparent'}" stroke="${on?'var(--ok)':'var(--t4)'}"/>`;
      }).join('')}
    `).join('')}
    <rect x="32" y="282" width="336" height="1" fill="var(--t4)"/>
  </svg>`,
  'intranet': `
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
    <rect width="400" height="300" fill="var(--bg-2)"/>
    <rect x="32" y="30" width="96" height="9" rx="4.5" fill="var(--fg)" opacity=".82"/>
    <rect x="32" y="48" width="58" height="7" rx="3.5" fill="var(--fg-3)"/>
    <g>
      <circle cx="330" cy="52" r="24" fill="none" stroke="var(--t4)" stroke-width="5"/>
      <circle cx="330" cy="52" r="24" fill="none" stroke="var(--danger)" stroke-width="5" stroke-linecap="round"
              stroke-dasharray="150.8" stroke-dashoffset="122" transform="rotate(-90 330 52)"/>
      <text x="330" y="57" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="13" font-weight="500" fill="var(--danger)">8m</text>
    </g>
    ${[
      ['var(--danger)', 178, 0.14],
      ['var(--warn)',   150, 0.10],
      ['var(--warn)',   196, 0.10],
      ['var(--ok)',     132, 0.08],
      ['var(--ok)',     168, 0.08]
    ].map(([c,w,o],i)=>`
      <rect x="32" y="${88+i*38}" width="336" height="30" rx="7" fill="${c}" opacity="${o}"/>
      <rect x="32" y="${88+i*38}" width="3" height="30" rx="1.5" fill="${c}"/>
      <rect x="46" y="${98+i*38}" width="${w}" height="7" rx="3.5" fill="var(--fg-2)" opacity=".7"/>
      <rect x="${46+w+12}" y="${99+i*38}" width="26" height="6" rx="3" fill="var(--fg-4)"/>
      <rect x="316" y="${98+i*38}" width="38" height="8" rx="4" fill="${c}" opacity=".65"/>
    `).join('')}
  </svg>`,
  'smart-epp': `
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
    <rect width="400" height="300" fill="var(--bg-2)"/>
    <rect x="32" y="28" width="104" height="9" rx="4.5" fill="var(--fg)" opacity=".82"/>
    <rect x="32" y="46" width="62" height="7" rx="3.5" fill="var(--fg-3)"/>
    <g>
      <circle cx="332" cy="48" r="22" fill="none" stroke="var(--t4)" stroke-width="5"/>
      <circle cx="332" cy="48" r="22" fill="none" stroke="var(--ok)" stroke-width="5" stroke-linecap="round"
              stroke-dasharray="138.2" stroke-dashoffset="34" transform="rotate(-90 332 48)"/>
      <text x="332" y="53" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="12" font-weight="500" fill="var(--ok)">75%</text>
    </g>
    ${[0,1,2,3].map(g=>`
      <rect x="32" y="${84+g*52}" width="${[62,52,60,66][g]}" height="7" rx="3.5" fill="var(--ac)" opacity=".7"/>
      ${[0,1,2,3,4].map(i=>{
        const on = !(g===1 && i>2) && !(g===3 && i>1);
        const flag = (g===1 && i===0) || (g===2 && i===3);
        const c = flag ? 'var(--warn)' : on ? 'var(--ok)' : 'var(--fg-4)';
        return `<rect x="${32+i*68}" y="${98+g*52}" width="58" height="26" rx="6"
                  fill="${c}" opacity="${on?.13:.05}" stroke="${c}" stroke-opacity="${on?.5:.22}"/>
                <circle cx="${44+i*68}" cy="${111+g*52}" r="4" fill="${c}" opacity="${on?1:.35}"/>
                <rect x="${54+i*68}" y="${108+g*52}" width="${26+((i*7+g*5)%12)}" height="5" rx="2.5" fill="var(--fg-3)" opacity=".6"/>`;
      }).join('')}
    `).join('')}
  </svg>`,
  'expense-tracker': `
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
    <rect width="400" height="300" fill="var(--bg-2)"/>
    <rect x="32" y="32" width="110" height="9" rx="4.5" fill="var(--fg)" opacity=".82"/>
    <rect x="32" y="50" width="64" height="7" rx="3.5" fill="var(--fg-3)"/>
    ${Array.from({length:26},(_,i)=>{
      const h = Math.min(120, 6 + Math.pow(i,1.62)*.92);
      const fut = i>18;
      return `<rect x="${32+i*13}" y="${212-h}" width="9" height="${h}" rx="2" fill="${fut?'var(--t3)':'url(#g1)'}"/>`;
    }).join('')}
    <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--ac)"/><stop offset="1" stop-color="var(--ac)" stop-opacity=".22"/></linearGradient></defs>
    <rect x="32" y="212" width="336" height="1" fill="var(--t4)"/>
    ${[0,1,2].map(i=>`
      <rect x="${32+i*114}" y="238" width="98" height="40" rx="8" fill="var(--bg-3)" stroke="var(--t4)"/>
      <rect x="${44+i*114}" y="250" width="${[30,24,34][i]}" height="9" rx="4.5" fill="var(--fg)" opacity=".8"/>
      <rect x="${44+i*114}" y="264" width="${[52,44,58][i]}" height="6" rx="3" fill="var(--fg-4)"/>
    `).join('')}
  </svg>`
};
