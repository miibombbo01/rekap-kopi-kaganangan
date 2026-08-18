// LIST 8 VARIAN RASA SIRUP
const DAFTAR_SIRUP = [
  { id: 'aren', nama: '🍯 Sirup Aren', hgKopiReg: 15000, hgKopiLrg: 25000, hgCrmReg: 15000, hgCrmLrg: 25000 },
  { id: 'pandan', nama: '🍃 Sirup Pandan', hgKopiReg: 15000, hgKopiLrg: 25000, hgCrmReg: 15000, hgCrmLrg: 25000 },
  { id: 'vanilla', nama: '🍦 Sirup Vanilla', hgKopiReg: 15000, hgKopiLrg: 25000, hgCrmReg: 15000, hgCrmLrg: 25000 },
  { id: 'caramel', nama: '🍮 Sirup Caramel', hgKopiReg: 15000, hgKopiLrg: 25000, hgCrmReg: 15000, hgCrmLrg: 25000 },
  { id: 'hazelnut', nama: '🌰 Sirup Hazelnut', hgKopiReg: 15000, hgKopiLrg: 25000, hgCrmReg: 15000, hgCrmLrg: 25000 },
  { id: 'banana', nama: '🍌 Sirup Banana', hgKopiReg: 15000, hgKopiLrg: 25000, hgCrmReg: 15000, hgCrmLrg: 25000 },
  { id: 'cheesecake', nama: '🍰 Sirup Cheesecake', hgKopiReg: 18000, hgKopiLrg: 28000, hgCrmReg: 18000, hgCrmLrg: 28000 },
  { id: 'butterscotch', nama: '🧈 Sirup Butterscotch', hgKopiReg: 18000, hgKopiLrg: 28000, hgCrmReg: 18000, hgCrmLrg: 28000 }
];

// GENERATE CARD SIRUP OTOMATIS
const container = document.getElementById('syrupContainer');
DAFTAR_SIRUP.forEach(s => {
  const cardHtml = `
    <div class="syrup-card" id="card_${s.id}">
      <div class="syrup-title">
        <span>${s.nama}</span>
        <span class="badge" id="badge_${s.id}">Aman</span>
      </div>
      <div class="syrup-inputs-grid">
        <div><label>Gramasi Awal (g):</label><input type="number" id="awal_${s.id}" value="500"></div>
        <div><label>Gramasi Sisa (g):</label><input type="number" id="sisa_${s.id}" class="calc-trigger" placeholder="0"></div>
        <div><label>Kopi Reg (Cup):</label><input type="number" id="kopiReg_${s.id}" class="calc-trigger" placeholder="0"></div>
        <div><label>Kopi Lrg (Cup):</label><input type="number" id="kopiLrg_${s.id}" class="calc-trigger" placeholder="0"></div>
        <div><label>Creamy Reg (Cup):</label><input type="number" id="crmReg_${s.id}" class="calc-trigger" placeholder="0"></div>
        <div><label>Creamy Lrg (Cup):</label><input type="number" id="crmLrg_${s.id}" class="calc-trigger" placeholder="0"></div>
      </div>
      <div class="syrup-total-money" id="money_${s.id}">Total Uang: Rp 0</div>
      <div class="syrup-result-box" id="res_${s.id}">Selisih Gramasi: Pas (0g)</div>
    </div>
  `;
  container.innerHTML += cardHtml;
});

// ANIMASI BUNCY & TRANSISI BUKA HALAMAN OVERLAY
const btnHitung = document.getElementById('btnHitung');
const overlay = document.getElementById('pageAuditOverlay');
const btnTutup = document.getElementById('btnTutup');
const btnSelesai = document.getElementById('btnSelesai');

btnHitung.addEventListener('click', () => {
  overlay.scrollTop = 0; // Reset posisi scroll layar ke atas
  overlay.classList.add('open');
});

btnTutup.addEventListener('click', () => {
  overlay.classList.remove('open');
});

btnSelesai.addEventListener('click', () => {
  hitungSemuaAudit();
  overlay.classList.remove('open');
});

// LOGIKA PEMROSESAN AUDIT
document.addEventListener('input', (e) => {
  if (e.target.classList.contains('calc-trigger')) {
    hitungSemuaAudit();
  }
});

function hitungSemuaAudit() {
  let totalOmzetSemua = 0;
  let totalCupRegSemua = 0;
  let totalCupLrgSemua = 0;

  DAFTAR_SIRUP.forEach(s => {
    const awal = parseFloat(document.getElementById(`awal_${s.id}`).value) || 0;
    const sisa = parseFloat(document.getElementById(`sisa_${s.id}`).value) || 0;
    const kpReg = parseFloat(document.getElementById(`kopiReg_${s.id}`).value) || 0;
    const kpLrg = parseFloat(document.getElementById(`kopiLrg_${s.id}`).value) || 0;
    const crReg = parseFloat(document.getElementById(`crmReg_${s.id}`).value) || 0;
    const crLrg = parseFloat(document.getElementById(`crmLrg_${s.id}`).value) || 0;

    // Hitung Cup & Uang Per Sirup
    totalCupRegSemua += (kpReg + crReg);
    totalCupLrgSemua += (kpLrg + crLrg);

    const uangKopi = (kpReg * s.hgKopiReg) + (kpLrg * s.hgKopiLrg);
    const uangCreamy = (crReg * s.hgCrmReg) + (crLrg * s.hgCrmLrg);
    const totalUangSirup = uangKopi + uangCreamy;
    totalOmzetSemua += totalUangSirup;

    document.getElementById(`money_${s.id}`).innerText = `Total Uang: Rp ${totalUangSirup.toLocaleString()}`;

    // Hitung Selisih Gramasi
    const terpakai = awal - sisa;
    const maxToleransi = ((kpReg + crReg) * 18) + ((kpLrg + crLrg) * 28); // Standard Max Gram Audit
    const resBox = document.getElementById(`res_${s.id}`);
    const badge = document.getElementById(`badge_${s.id}`);

    if (terpakai <= maxToleransi) {
      resBox.innerText = `Terpakai: ${terpakai}g | Limit: ${maxToleransi}g (🟢 Pas/Aman)`;
      resBox.style.color = "#166534";
      badge.innerText = "Aman";
      badge.className = "badge";
    } else {
      const minus = terpakai - maxToleransi;
      resBox.innerText = `Terpakai: ${terpakai}g | Limit: ${maxToleransi}g (🔴 Minus ${minus}g)`;
      resBox.style.color = "#991B1B";
      badge.innerText = "MINUS";
      badge.className = "badge minus";
    }
  });

  // UPDATE BOARD DASHBOARD DEPAN
  document.getElementById('dashCupTerjual').innerText = `${totalCupRegSemua} Reg | ${totalCupLrgSemua} Lrg`;
  
  const uangTas = parseFloat(document.getElementById('inputUangTas').value) || 0;
  document.getElementById('dashUangTas').innerText = `Rp ${uangTas.toLocaleString()}`;
  }
    
