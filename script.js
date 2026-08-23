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

const DAFTAR_MILKY = [
  { id: 'matcha', nama: 'Matcha', hgReg: 15000, hgLrg: 25000 },
  { id: 'taro', nama: 'Taro', hgReg: 15000, hgLrg: 25000 },
  { id: 'redvelvet', nama: 'Red Velvet', hgReg: 15000, hgLrg: 25000 },
  { id: 'choco', nama: 'Choco', hgReg: 15000, hgLrg: 25000 }
];

let selectedDate = new Date().getDate();
let selectedCabang = 'sulaiman_simpang5';

let settingSirupN = 18;
let settingSirupL = 28;
let settingKopiN = 18;
let settingKopiL = 28;

function switchTab(tabName) {
  const contents = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-btn');

  contents.forEach(c => c.classList.remove('active'));
  buttons.forEach(b => b.classList.remove('active'));

  const activeContent = document.getElementById(`tab-${tabName}`);
  if (activeContent) activeContent.classList.add('active');
  
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }
}

function renderSyrupCards() {
  const container = document.getElementById('syrupContainer');
  if (!container) return;

  container.innerHTML = '';
  
  // Render Sirup
  DAFTAR_SIRUP.forEach(s => {
    const cardHtml = `
      <div class="syrup-card-modern pop-anim" id="card_${s.id}">
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

  // Judul Varian Milky
  container.innerHTML += `<div class="section-title">🥛 VARIAN MILKY (NON-KOPI)</div>`;

  // Render Milky Cards
  DAFTAR_MILKY.forEach(m => {
    const cardHtml = `
      <div class="syrup-card-modern pop-anim milky-card" id="card_${m.id}">
        <div class="syrup-header">
          <span class="syrup-title-text">${m.nama.toUpperCase()}</span>
          <span class="badge-terpakai" id="terpakai_${m.id}">Terpakai: 0g</span>
        </div>

        <div class="gramasi-grid">
          <div class="input-group-custom">
            <label>Gramasi Dibawa (g)</label>
            <input type="number" id="awal_${m.id}" class="calc-trigger" placeholder="0" inputmode="numeric">
          </div>
          <div class="input-group-custom">
            <label>Gramasi Sisa (g)</label>
            <input type="number" id="sisa_${m.id}" class="calc-trigger" placeholder="0" inputmode="numeric">
          </div>
        </div>

        <div class="variant-group-box milky-bg">
          <div class="variant-section-title">Penjualan Cup</div>
          <div class="cup-inputs-grid">
            <input type="number" id="milkyReg_${m.id}" class="calc-trigger" placeholder="Normal (Cup)" inputmode="numeric">
            <input type="number" id="milkyLrg_${m.id}" class="calc-trigger" placeholder="Large (Cup)" inputmode="numeric">
          </div>
        </div>

        <div class="syrup-money-text" id="money_${m.id}">Total Nilai: Rp 0</div>

        <div class="status-indicator-box pas" id="statusBox_${m.id}">
          <div class="check-icon">✓</div>
          <span>Pas / Aman</span>
        </div>
      </div>
    `;
    container.innerHTML += cardHtml;
  });
}

function gantiKaryawanCabang(val) {
  selectedCabang = val;
  const displayCabang = document.getElementById('displayCabang');
  const displayKaryawan = document.getElementById('displayKaryawan');

  if (val === 'sulaiman_simpang5') {
    displayCabang.innerText = 'Cabang Simpang 5';
    displayKaryawan.innerText = 'Sulaiman';
  } else if (val === 'abdullah_pasar_timpah') {
    displayCabang.innerText = 'Pasar Timpah';
    displayKaryawan.innerText = 'Abdullah';
  }

  muatDataTanggal(selectedDate);
}

function simpanDataTanggal() {
  const storageKey = `audit_data_${selectedCabang}_${selectedDate}`;
  const dataForm = {
    cupDibawaReg: document.getElementById('cupDibawaReg')?.value || '',
    cupDibawaLrg: document.getElementById('cupDibawaLrg')?.value || '',
    sisaCupReg: document.getElementById('sisaCupReg')?.value || '',
    sisaCupLrg: document.getElementById('sisaCupLrg')?.value || '',
    inputUangTas: document.getElementById('inputUangTas')?.value || '',
    inputQRIS: document.getElementById('inputQRIS')?.value || '',
    inputPengeluaran: document.getElementById('inputPengeluaran')?.value || '',
    inputKasbon: document.getElementById('inputKasbon')?.value || '',
    kopiDibawa: document.getElementById('kopiDibawa')?.value || '',
    kopiSisa: document.getElementById('kopiSisa')?.value || '',
    sirup: {},
    milky: {}
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

  DAFTAR_MILKY.forEach(m => {
    dataForm.milky[m.id] = {
      awal: document.getElementById(`awal_${m.id}`)?.value || '',
      sisa: document.getElementById(`sisa_${m.id}`)?.value || '',
      mlReg: document.getElementById(`milkyReg_${m.id}`)?.value || '',
      mlLrg: document.getElementById(`milkyLrg_${m.id}`)?.value || ''
    };
  });

  localStorage.setItem(storageKey, JSON.stringify(dataForm));
  hitungSemuaAudit();
}

function muatDataTanggal(tgl) {
  selectedDate = tgl;
  const storageKey = `audit_data_${selectedCabang}_${selectedDate}`;
  const savedDataRaw = localStorage.getItem(storageKey);

  const fields = ['cupDibawaReg', 'cupDibawaLrg', 'sisaCupReg', 'sisaCupLrg', 'inputUangTas', 'inputQRIS', 'inputPengeluaran', 'inputKasbon', 'kopiDibawa', 'kopiSisa'];
  fields.forEach(f => { if(document.getElementById(f)) document.getElementById(f).value = ''; });

  DAFTAR_SIRUP.forEach(s => {
    if (document.getElementById(`awal_${s.id}`)) document.getElementById(`awal_${s.id}`).value = '';
    if (document.getElementById(`sisa_${s.id}`)) document.getElementById(`sisa_${s.id}`).value = '';
    if (document.getElementById(`kopiReg_${s.id}`)) document.getElementById(`kopiReg_${s.id}`).value = '';
    if (document.getElementById(`kopiLrg_${s.id}`)) document.getElementById(`kopiLrg_${s.id}`).value = '';
    if (document.getElementById(`crmReg_${s.id}`)) document.getElementById(`crmReg_${s.id}`).value = '';
    if (document.getElementById(`crmLrg_${s.id}`)) document.getElementById(`crmLrg_${s.id}`).value = '';
  });

  DAFTAR_MILKY.forEach(m => {
    if (document.getElementById(`awal_${m.id}`)) document.getElementById(`awal_${m.id}`).value = '';
    if (document.getElementById(`sisa_${m.id}`)) document.getElementById(`sisa_${m.id}`).value = '';
    if (document.getElementById(`milkyReg_${m.id}`)) document.getElementById(`milkyReg_${m.id}`).value = '';
    if (document.getElementById(`milkyLrg_${m.id}`)) document.getElementById(`milkyLrg_${m.id}`).value = '';
  });

  if (savedDataRaw) {
    const data = JSON.parse(savedDataRaw);
    fields.forEach(f => {
      if(document.getElementById(f)) document.getElementById(f).value = data[f] || '';
    });

    if (data.sirup) {
      DAFTAR_SIRUP.forEach(s => {
        if (data.sirup[s.id]) {
          if (document.getElementById(`awal_${s.id}`)) document.getElementById(`awal_${s.id}`).value = data.sirup[s.id].awal || '';
          if (document.getElementById(`sisa_${s.id}`)) document.getElementById(`sisa_${s.id}`).value = data.sirup[s.id].sisa || '';
          if (document.getElementById(`kopiReg_${s.id}`)) document.getElementById(`kopiReg_${s.id}`).value = data.sirup[s.id].kpReg || '';
          if (document.getElementById(`kopiLrg_${s.id}`)) document.getElementById(`kopiLrg_${s.id}`).value = data.sirup[s.id].kpLrg || '';
          if (document.getElementById(`crmReg_${s.id}`)) document.getElementById(`crmReg_${s.id}`).value = data.sirup[s.id].crReg || '';
          if (document.getElementById(`crmLrg_${s.id}`)) document.getElementById(`crmLrg_${s.id}`).value = data.sirup[s.id].crLrg || '';
        }
      });
    }

    if (data.milky) {
      DAFTAR_MILKY.forEach(m => {
        if (data.milky[m.id]) {
          if (document.getElementById(`awal_${m.id}`)) document.getElementById(`awal_${m.id}`).value = data.milky[m.id].awal || '';
          if (document.getElementById(`sisa_${m.id}`)) document.getElementById(`sisa_${m.id}`).value = data.milky[m.id].sisa || '';
          if (document.getElementById(`milkyReg_${m.id}`)) document.getElementById(`milkyReg_${m.id}`).value = data.milky[m.id].mlReg || '';
          if (document.getElementById(`milkyLrg_${m.id}`)) document.getElementById(`milkyLrg_${m.id}`).value = data.milky[m.id].mlLrg || '';
        }
      });
    }
  }

  hitungSemuaAudit();
}

function hitungSemuaAudit() {
  let totalOmzetSemua = 0;
  let totalCupRegSemua = 0;
  let totalCupLrgSemua = 0;

  muatSettingGramasi();

  // HITUNG SIRUP
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

    const limitResep = ((kpReg + crReg) * settingSirupN) + ((kpLrg + crLrg) * settingSirupL);
    const statusBox = document.getElementById(`statusBox_${s.id}`);

    if (statusBox) {
      if (terpakai <= limitResep) {
        statusBox.className = "status-indicator-box pas";
        statusBox.innerHTML = `<div class="check-icon">✓</div><span>Pas / Aman</span>`;
      } else {
        const minusG = terpakai - limitResep;
        if (minusG < 15) {
          statusBox.className = "status-indicator-box warning-yellow";
          statusBox.innerHTML = `<span>⚠️ Minus ${minusG}g</span>`;
        } else {
          const estCup = Math.round(minusG / settingSirupN);
          statusBox.className = "status-indicator-box danger-red";
          statusBox.innerHTML = `<span>⚠️ Minus ${minusG}g (± ${estCup} cup)</span>`;
        }
      }
    }
  });

  // HITUNG MILKY
  DAFTAR_MILKY.forEach(m => {
    const awal = parseFloat(document.getElementById(`awal_${m.id}`)?.value) || 0;
    const sisa = parseFloat(document.getElementById(`sisa_${m.id}`)?.value) || 0;
    const mlReg = parseFloat(document.getElementById(`milkyReg_${m.id}`)?.value) || 0;
    const mlLrg = parseFloat(document.getElementById(`milkyLrg_${m.id}`)?.value) || 0;

    totalCupRegSemua += mlReg;
    totalCupLrgSemua += mlLrg;

    const totalUangMilky = (mlReg * m.hgReg) + (mlLrg * m.hgLrg);
    totalOmzetSemua += totalUangMilky;

    const moneyEl = document.getElementById(`money_${m.id}`);
    if (moneyEl) moneyEl.innerText = `Total Nilai: Rp ${totalUangMilky.toLocaleString('id-ID')}`;

    const terpakai = (awal > sisa) ? (awal - sisa) : 0;
    const terpakaiEl = document.getElementById(`terpakai_${m.id}`);
    if (terpakaiEl) terpakaiEl.innerText = `Terpakai: ${terpakai}g`;

    const limitResep = (mlReg * settingSirupN) + (mlLrg * settingSirupL);
    const statusBox = document.getElementById(`statusBox_${m.id}`);

    if (statusBox) {
      if (terpakai <= limitResep) {
        statusBox.className = "status-indicator-box pas";
        statusBox.innerHTML = `<div class="check-icon">✓</div><span>Pas / Aman</span>`;
      } else {
        const minusG = terpakai - limitResep;
        if (minusG < 15) {
          statusBox.className = "status-indicator-box warning-yellow";
          statusBox.innerHTML = `<span>⚠️ Minus ${minusG}g</span>`;
        } else {
          const estCup = Math.round(minusG / settingSirupN);
          statusBox.className = "status-indicator-box danger-red";
          statusBox.innerHTML = `<span>⚠️ Minus ${minusG}g (± ${estCup} cup)</span>`;
        }
      }
    }
  });

  // DASHBOARD CUP
  const dashCup = document.getElementById('dashCupTerjual');
  if (dashCup) dashCup.innerText = `${totalCupRegSemua} Reg | ${totalCupLrgSemua} Lrg`;

  const totalCupKeseluruhan = totalCupRegSemua + totalCupLrgSemua;
  const dashCupEmoji = document.getElementById('dashCupEmoji');
  if (dashCupEmoji) {
    if (totalCupKeseluruhan > 50) dashCupEmoji.innerText = '🤩';
    else if (totalCupKeseluruhan > 40) dashCupEmoji.innerText = '😁';
    else if (totalCupKeseluruhan > 30) dashCupEmoji.innerText = '😊';
    else dashCupEmoji.innerText = '🥲';
  }

  // AUDIT KEUANGAN
  const cash = parseFloat(document.getElementById('inputUangTas')?.value) || 0;
  const qris = parseFloat(document.getElementById('inputQRIS')?.value) || 0;
  const pengeluaran = parseFloat(document.getElementById('inputPengeluaran')?.value) || 0;
  const kasbon = parseFloat(document.getElementById('inputKasbon')?.value) || 0;

  const totalUangAkhir = cash + qris + pengeluaran + kasbon;
  const dashTotalUang = document.getElementById('dashTotalUang');
  if (dashTotalUang) dashTotalUang.innerText = `Rp ${totalUangAkhir.toLocaleString('id-ID')}`;

  const selisih = totalUangAkhir - totalOmzetSemua;
  const dashUangStatus = document.getElementById('dashUangStatus');
  if (dashUangStatus) {
    if (selisih >= 0) {
      dashUangStatus.innerHTML = `<span class="status-badge-inline pas">✓ Pas</span>`;
    } else {
      const minusRibu = Math.abs(selisih) / 1000;
      dashUangStatus.innerHTML = `<span class="status-badge-inline minus">Minus ${minusRibu}k</span>`;
    }
  }

  const statusUangBox = document.getElementById('statusBoxUang');
  if (statusUangBox) {
    if (selisih === 0) {
      statusUangBox.className = "status-indicator-box pas";
      statusUangBox.innerHTML = `<div class="check-icon">✓</div><span>Pas / Aman</span>`;
    } else if (selisih < 0) {
      statusUangBox.className = "status-indicator-box danger-red";
      statusUangBox.innerHTML = `<span>⚠️ Minus Rp ${Math.abs(selisih).toLocaleString('id-ID')}</span>`;
    } else {
      statusUangBox.className = "status-indicator-box warning-yellow";
      statusUangBox.innerHTML = `<span>⚠️ Lebih Rp ${selisih.toLocaleString('id-ID')}</span>`;
    }
  }

  // AUDIT KOPI (Hanya menghitung cup berbasis sirup kopi, Milky tidak menghabiskan bubuk kopi)
  const kopiDibawa = parseFloat(document.getElementById('kopiDibawa')?.value) || 0;
  const kopiSisa = parseFloat(document.getElementById('kopiSisa')?.value) || 0;
  const kopiTerpakai = (kopiDibawa > kopiSisa) ? (kopiDibawa - kopiSisa) : 0;
  
  // Total Cup Kopi Khusus Sirup saja (tanpa Milky)
  let totalCupKopiOnlyReg = 0;
  let totalCupKopiOnlyLrg = 0;
  DAFTAR_SIRUP.forEach(s => {
    totalCupKopiOnlyReg += (parseFloat(document.getElementById(`kopiReg_${s.id}`)?.value) || 0) + (parseFloat(document.getElementById(`crmReg_${s.id}`)?.value) || 0);
    totalCupKopiOnlyLrg += (parseFloat(document.getElementById(`kopiLrg_${s.id}`)?.value) || 0) + (parseFloat(document.getElementById(`crmLrg_${s.id}`)?.value) || 0);
  });

  const targetKopiResep = (totalCupKopiOnlyReg * settingKopiN) + (totalCupKopiOnlyLrg * settingKopiL);

  const statusKopiBox = document.getElementById('statusBoxKopi');
  if (statusKopiBox) {
    if (kopiTerpakai <= targetKopiResep) {
      statusKopiBox.className = "status-indicator-box pas";
      statusKopiBox.innerHTML = `<div class="check-icon">✓</div><span>Pas / Aman</span>`;
    } else {
      const borosG = kopiTerpakai - targetKopiResep;
      if (borosG < 15) {
        statusKopiBox.className = "status-indicator-box warning-yellow";
        statusKopiBox.innerHTML = `<span>⚠️ Minus ${borosG}g</span>`;
      } else {
        const estCupBoros = Math.round(borosG / settingKopiN);
        statusKopiBox.className = "status-indicator-box danger-red";
        statusKopiBox.innerHTML = `<span>⚠️ Minus ${borosG}g (± ${estCupBoros} cup)</span>`;
      }
    }
  }
}

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
    const hari = namaHari[dateObj.getDay()];
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

function selectDate(element, tgl) {
  document.querySelectorAll('.date-pill').forEach(pill => pill.classList.remove('active'));
  element.classList.add('active');
  element.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  muatDataTanggal(tgl);
}

function simpanSettingGramasi() {
  settingSirupN = parseFloat(document.getElementById('settingSirupN')?.value) || 18;
  settingSirupL = parseFloat(document.getElementById('settingSirupL')?.value) || 28;
  settingKopiN = parseFloat(document.getElementById('settingKopiN')?.value) || 18;
  settingKopiL = parseFloat(document.getElementById('settingKopiL')?.value) || 28;

  localStorage.setItem('setting_sirup_n', settingSirupN);
  localStorage.setItem('setting_sirup_l', settingSirupL);
  localStorage.setItem('setting_kopi_n', settingKopiN);
  localStorage.setItem('setting_kopi_l', settingKopiL);

  hitungSemuaAudit();
}

function muatSettingGramasi() {
  const sN = localStorage.getItem('setting_sirup_n');
  const sL = localStorage.getItem('setting_sirup_l');
  const kN = localStorage.getItem('setting_kopi_n');
  const kL = localStorage.getItem('setting_kopi_l');

  if (sN) settingSirupN = parseFloat(sN);
  if (sL) settingSirupL = parseFloat(sL);
  if (kN) settingKopiN = parseFloat(kN);
  if (kL) settingKopiL = parseFloat(kL);

  if (document.getElementById('settingSirupN')) document.getElementById('settingSirupN').value = settingSirupN;
  if (document.getElementById('settingSirupL')) document.getElementById('settingSirupL').value = settingSirupL;
  if (document.getElementById('settingKopiN')) document.getElementById('settingKopiN').value = settingKopiN;
  if (document.getElementById('settingKopiL')) document.getElementById('settingKopiL').value = settingKopiL;
}

document.addEventListener('DOMContentLoaded', () => {
  renderSyrupCards();
  generateDateStrip();
  muatSettingGramasi();
  muatDataTanggal(selectedDate);

  const monthYearEl = document.getElementById('monthYearText');
  if (monthYearEl) {
    const opsiBulan = { month: 'long', year: 'numeric' };
    monthYearEl.innerText = new Date().toLocaleDateString('id-ID', opsiBulan);
  }

  const overlayAudit = document.getElementById('pageAuditOverlay');
  const overlaySetting = document.getElementById('pageSettingOverlay');

  document.getElementById('btnHitung')?.addEventListener('click', () => {
    overlayAudit.scrollTop = 0;
    overlayAudit.classList.add('open');
  });

    document.getElementById('btnTutup')?.addEventListener('click', () => {
    overlayAudit.classList.remove('open');
    setTimeout(() => { overlayAudit.scrollTop = 0; }, 550);
  });

  document.getElementById('btnSelesai')?.addEventListener('click', () => {
    simpanDataTanggal();
    overlayAudit.classList.remove('open');
    setTimeout(() => { overlayAudit.scrollTop = 0; }, 550);
  });

  document.getElementById('btnNavSetting')?.addEventListener('click', () => {
    muatSettingGramasi();
    overlaySetting.classList.add('open');
  });

  document.getElementById('btnTutupSetting')?.addEventListener('click', () => {
    overlaySetting.classList.remove('open');
  });

  document.getElementById('btnSimpanSetting')?.addEventListener('click', () => {
    simpanSettingGramasi();
    overlaySetting.classList.remove('open');
  });

  document.addEventListener('input', (e) => {
    if (e.target.classList.contains('calc-trigger')) {
      hitungSemuaAudit();
      simpanDataTanggal();
    }
  });
});
