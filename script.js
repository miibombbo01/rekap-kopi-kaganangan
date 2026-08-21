// LIST VARIAN RASA SIRUP
const DAFTAR_SIRUP = [
  { id: 'aren', nama: 'Sirup Aren', hgKopiReg: 15000, hgKopiLrg: 25000, hgCrmReg: 15000, hgCrmLrg: 25000 },
  { id: 'pandan', nama: 'Sirup Pandan', hgKopiReg: 15000, hgKopiLrg: 25000, hgCrmReg: 15000, hgCrmLrg: 25000 },
  { id: 'vanilla', nama: 'Sirup Vanilla', hgKopiReg: 15000, hgKopiLrg: 25000, hgCrmReg: 15000, hgCrmLrg: 25000 },
  { id: 'caramel', nama: 'Sirup Caramel', hgKopiReg: 15000, hgKopiLrg: 25000, hgCrmReg: 15000, hgCrmLrg: 25000 },
  { id: 'hazelnut', nama: 'Sirup Hazelnut', hgKopiReg: 15000, hgKopiLrg: 25000, hgCrmReg: 15000, hgCrmLrg: 25000 },
  { id: 'banana', nama: 'Sirup Banana', hgKopiReg: 15000, hgKopiLrg: 25000, hgCrmReg: 15000, hgCrmLrg: 25000 },
  { id: 'cheesecake', nama: 'Sirup Cheesecake', hgKopiReg: 18000, hgKopiLrg: 28000, hgCrmReg: 18000, hgCrmLrg: 28000 },
  { id: 'butterscotch', nama: 'Sirup Butterscotch', hgKopiReg: 18000, hgKopiLrg: 28000, hgCrmReg: 18000, hgCrmLrg: 28000 }
];

// Mengambil tanggal hari ini secara otomatis
let selectedDate = new Date().getDate(); 

// RENDER KARTU SIRUP BERDASARKAN DESAIN MODERN SOFT BLUE
function renderSyrupCards() {
  const container = document.getElementById('syrupContainer');
  if (!container) return;

  container.innerHTML = '';
  DAFTAR_SIRUP.forEach(s => {
    const cardHtml = `
      <div class="syrup-card-modern" id="card_${s.id}">
        <div class="syrup-header">
          <span class="syrup-title-text">${s.nama.toUpperCase()}</span>
          <span class="badge-terpakai" id="terpakai_${s.id}">Terpakai: 0g</span>
        </div>

        <div class="gramasi-grid">
          <div class="input-group-custom">
            <label>Gramasi Dibawa (g)</label>
            <input type="number" id="awal_${s.id}" class="calc-trigger" placeholder="0" inputmode="numeric">
          </div>
          <div class="input-group-custom">
            <label>Gramasi Sisa (g)</label>
            <input type="number" id="sisa_${s.id}" class="calc-trigger" placeholder="0" inputmode="numeric">
          </div>
        </div>

        <div class="variant-group-box">
          <div class="variant-section-title">Varian Kopi</div>
          <div class="cup-inputs-grid">
            <input type="number" id="kopiReg_${s.id}" class="calc-trigger" placeholder="Normal (Cup)" inputmode="numeric">
            <input type="number" id="kopiLrg_${s.id}" class="calc-trigger" placeholder="Large (Cup)" inputmode="numeric">
          </div>

          <div class="variant-section-title">Varian Creamy</div>
          <div class="cup-inputs-grid">
            <input type="number" id="crmReg_${s.id}" class="calc-trigger" placeholder="Normal (Cup)" inputmode="numeric">
            <input type="number" id="crmLrg_${s.id}" class="calc-trigger" placeholder="Large (Cup)" inputmode="numeric">
          </div>
        </div>

        <div class="syrup-money-text" id="money_${s.id}">Total Nilai: Rp 0</div>

        <div class="status-indicator-box pas" id="statusBox_${s.id}">
          <div class="check-icon">✓</div>
          <span>Pas / Aman</span>
        </div>
      </div>
    `;
    container.innerHTML += cardHtml;
  });
}

// SIMPAN DATA KE LOCALSTORAGE BERDASARKAN TANGGAL
function simpanDataTanggal() {
  const dataForm = {
    sisaCupReg: document.getElementById('sisaCupReg')?.value || '',
    sisaCupLrg: document.getElementById('sisaCupLrg')?.value || '',
    inputUangTas: document.getElementById('inputUangTas')?.value || '',
    inputQRIS: document.getElementById('inputQRIS')?.value || '',
    inputPengeluaran: document.getElementById('inputPengeluaran')?.value || '',
    sirup: {}
  };

  DAFTAR_SIRUP.forEach(s => {
    dataForm.sirup[s.id] = {
      awal: document.getElementById(`awal_${s.id}`)?.value || '',
      sisa: document.getElementById(`sisa_${s.id}`)?.value || '',
      kpReg: document.getElementById(`kopiReg_${s.id}`)?.value || '',
      kpLrg: document.getElementById(`kopiLrg_${s.id}`)?.value || '',
      crReg: document.getElementById(`crmReg_${s.id}`)?.value || '',
      crLrg: document.getElementById(`crmLrg_${s.id}`)?.value || ''
    };
  });

  localStorage.setItem(`audit_data_${selectedDate}`, JSON.stringify(dataForm));
  hitungSemuaAudit();
}

// MUAT DATA LOCALSTORAGE TANGGAL TERPILIH
function muatDataTanggal(tgl) {
  selectedDate = tgl;
  const savedDataRaw = localStorage.getItem(`audit_data_${selectedDate}`);

  document.getElementById('sisaCupReg').value = '';
  document.getElementById('sisaCupLrg').value = '';
  document.getElementById('inputUangTas').value = '';
  document.getElementById('inputQRIS').value = '';
  document.getElementById('inputPengeluaran').value = '';

  DAFTAR_SIRUP.forEach(s => {
    document.getElementById(`awal_${s.id}`).value = '';
    document.getElementById(`sisa_${s.id}`).value = '';
    document.getElementById(`kopiReg_${s.id}`).value = '';
    document.getElementById(`kopiLrg_${s.id}`).value = '';
    document.getElementById(`crmReg_${s.id}`).value = '';
    document.getElementById(`crmLrg_${s.id}`).value = '';
  });

  if (savedDataRaw) {
    const data = JSON.parse(savedDataRaw);
    
    document.getElementById('sisaCupReg').value = data.sisaCupReg || '';
    document.getElementById('sisaCupLrg').value = data.sisaCupLrg || '';
    document.getElementById('inputUangTas').value = data.inputUangTas || '';
    document.getElementById('inputQRIS').value = data.inputQRIS || '';
    document.getElementById('inputPengeluaran').value = data.inputPengeluaran || '';

    if (data.sirup) {
      DAFTAR_SIRUP.forEach(s => {
        if (data.sirup[s.id]) {
          document.getElementById(`awal_${s.id}`).value = data.sirup[s.id].awal || '';
          document.getElementById(`sisa_${s.id}`).value = data.sirup[s.id].sisa || '';
          document.getElementById(`kopiReg_${s.id}`).value = data.sirup[s.id].kpReg || '';
          document.getElementById(`kopiLrg_${s.id}`).value = data.sirup[s.id].kpLrg || '';
          document.getElementById(`crmReg_${s.id}`).value = data.sirup[s.id].crReg || '';
          document.getElementById(`crmLrg_${s.id}`).value = data.sirup[s.id].crLrg || '';
        }
      });
    }
  }

  hitungSemuaAudit();
}

// KHUSUS PERHITUNGAN AUDIT & INDIKATOR STATUS
function hitungSemuaAudit() {
  let totalOmzetSemua = 0;
  let totalCupRegSemua = 0;
  let totalCupLrgSemua = 0;

  DAFTAR_SIRUP.forEach(s => {
    const awal = parseFloat(document.getElementById(`awal_${s.id}`)?.value) || 0;
    const sisa = parseFloat(document.getElementById(`sisa_${s.id}`)?.value) || 0;
    const kpReg = parseFloat(document.getElementById(`kopiReg_${s.id}`)?.value) || 0;
    const kpLrg = parseFloat(document.getElementById(`kopiLrg_${s.id}`)?.value) || 0;
    const crReg = parseFloat(document.getElementById(`crmReg_${s.id}`)?.value) || 0;
    const crLrg = parseFloat(document.getElementById(`crmLrg_${s.id}`)?.value) || 0;

    totalCupRegSemua += (kpReg + crReg);
    totalCupLrgSemua += (kpLrg + crLrg);

    const uangKopi = (kpReg * s.hgKopiReg) + (kpLrg * s.hgKopiLrg);
    const uangCreamy = (crReg * s.hgCrmReg) + (crLrg * s.hgCrmLrg);
    const totalUangSirup = uangKopi + uangCreamy;
    totalOmzetSemua += totalUangSirup;

    const moneyEl = document.getElementById(`money_${s.id}`);
    if (moneyEl) moneyEl.innerText = `Total Nilai: Rp ${totalUangSirup.toLocaleString('id-ID')}`;

    const terpakai = (awal > sisa) ? (awal - sisa) : 0;
    const terpakaiEl = document.getElementById(`terpakai_${s.id}`);
    if (terpakaiEl) terpakaiEl.innerText = `Terpakai: ${terpakai}g`;

    const limitResep = ((kpReg + crReg) * 18) + ((kpLrg + crLrg) * 28);
    const statusBox = document.getElementById(`statusBox_${s.id}`);

    if (statusBox) {
      if (terpakai <= limitResep) {
        statusBox.className = "status-indicator-box pas";
        statusBox.innerHTML = `
          <div class="check-icon">✓</div>
          <span>Pas / Aman</span>
        `;
      } else {
        const minusG = terpakai - limitResep;
        const estCup = Math.round(minusG / 20);
        const teksCup = estCup > 0 ? `(± ${estCup} cup)` : '';

        statusBox.className = "status-indicator-box minus";
        statusBox.innerHTML = `
          <span>⚠️ Minus ${minusG}g ${teksCup}</span>
        `;
      }
    }
  });

  const dashCup = document.getElementById('dashCupTerjual');
  if (dashCup) dashCup.innerText = `${totalCupRegSemua} Reg | ${totalCupLrgSemua} Lrg`;
  
  const uangTas = parseFloat(document.getElementById('inputUangTas')?.value) || 0;
  const dashUang = document.getElementById('dashUangTas');
  if (dashUang) dashUang.innerText = `Rp ${uangTas.toLocaleString('id-ID')}`;
}

// GENERATE PILL TANGGAL 1 - 31 DENGAN HARI YANG SESUAI KALENDER
function generateDateStrip() {
  const container = document.getElementById('dateStripContainer');
  if (!container) return;

  const namaHari = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  const totalDays = new Date(year, month + 1, 0).getDate();

  let html = '';

  for (let i = 1; i <= totalDays; i++) {
    const dateObj = new Date(year, month, i);
    const dayIndex = dateObj.getDay(); 
    const hari = namaHari[dayIndex];
    const isActive = (i === selectedDate) ? 'active' : '';

    html += `
      <div class="date-pill ${isActive}" data-date="${i}" onclick="selectDate(this, ${i})">
        <span>${i}</span>
        <small>${hari}</small>
      </div>
    `;
  }

  container.innerHTML = html;

  setTimeout(() => {
    const activePill = container.querySelector('.date-pill.active');
    if (activePill) {
      activePill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, 300);
}

// PILIH TANGGAL
function selectDate(element, tgl) {
  document.querySelectorAll('.date-pill').forEach(pill => pill.classList.remove('active'));
  element.classList.add('active');
  element.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  muatDataTanggal(tgl);
}

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
  renderSyrupCards();
  generateDateStrip();
  muatDataTanggal(selectedDate);

  const monthYearEl = document.getElementById('monthYearText');
  if (monthYearEl) {
    const opsiBulan = { month: 'long', year: 'numeric' };
    monthYearEl.innerText = new Date().toLocaleDateString('id-ID', opsiBulan);
  }

  const btnHitung = document.getElementById('btnHitung');
  const overlay = document.getElementById('pageAuditOverlay');
  const btnTutup = document.getElementById('btnTutup');
  const btnSelesai = document.getElementById('btnSelesai');

  if (btnHitung && overlay) {
    btnHitung.addEventListener('click', () => {
      overlay.scrollTop = 0;
      overlay.classList.add('open');
    });
  }

  if (btnTutup && overlay) {
    btnTutup.addEventListener('click', () => {
      overlay.classList.remove('open');
    });
  }

  if (btnSelesai && overlay) {
    btnSelesai.addEventListener('click', () => {
      simpanDataTanggal();
      overlay.classList.remove('open');
    });
  }

  document.addEventListener('input', (e) => {
    if (e.target.classList.contains('calc-trigger') || e.target.id === 'inputUangTas') {
      hitungSemuaAudit();
      simpanDataTanggal();
    }
  });
});
