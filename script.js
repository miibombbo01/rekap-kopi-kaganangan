// MASTER SETTING TOLERANSI (Dapat diubah via menu Setting oleh Istri Bos)
const SETTING_TOLERANSI = {
  caramel: { reg: 18, lrg: 28 }, // Gramasi maksimal audit
  hargaMenu: { reg: 15000, lrg: 25000 }
};

document.getElementById('btnHitung').addEventListener('click', function() {
  
  // 1. AUDIT BOARD CUP
  const sisaReg = parseInt(document.getElementById('sisaCupReg').value) || 0;
  const sisaLrg = parseInt(document.getElementById('sisaCupLrg').value) || 0;
  
  // Ambil total cup dari inputan sales
  let totalTerjualReg = 0;
  let totalTerjualLrg = 0;
  
  document.querySelectorAll('.input-sales-reg').forEach(el => {
    totalTerjualReg += parseInt(el.value) || 0;
  });
  document.querySelectorAll('.input-sales-lrg').forEach(el => {
    totalTerjualLrg += parseInt(el.value) || 0;
  });

  document.getElementById('txtCupTerjual').innerText = `${totalTerjualReg} Reg | ${totalTerjualLrg} Lrg`;

  const cupHilangReg = 50 - sisaReg - totalTerjualReg;
  const cupHilangLrg = 25 - sisaLrg - totalTerjualLrg;

  const statusCup = document.getElementById('statusCup');
  const badgeCup = document.getElementById('badgeCup');

  if (cupHilangReg === 0 && cupHilangLrg === 0) {
    statusCup.innerText = "Status: 🟢 PAS";
    statusCup.style.color = "#166534";
    badgeCup.innerText = "OK";
    badgeCup.className = "badge";
  } else {
    statusCup.innerText = `⚠️ Tak Catat: ${cupHilangReg} Reg, ${cupHilangLrg} Lrg`;
    statusCup.style.color = "#991B1B";
    badgeCup.innerText = "MINUS";
    badgeCup.className = "badge minus";
  }

  // 2. AUDIT SIRUP CARAMEL (CONTOH)
  const awal = parseFloat(document.getElementById('awalCaramel').value) || 0;
  const sisa = parseFloat(document.getElementById('sisaCaramel').value) || 0;
  const regTerjual = parseFloat(document.querySelector('.input-sales-reg[data-flavor="caramel"]').value) || 0;
  const lrgTerjual = parseFloat(document.querySelector('.input-sales-lrg[data-flavor="caramel"]').value) || 0;

  const terpakaiRiil = awal - sisa;
  const maxToleransi = (regTerjual * SETTING_TOLERANSI.caramel.reg) + (lrgTerjual * SETTING_TOLERANSI.caramel.lrg);

  const resCaramel = document.getElementById('resCaramel');
  const badgeCaramel = document.getElementById('badgeCaramel');

  if (terpakaiRiil <= maxToleransi) {
    resCaramel.innerText = `Pemakaian: ${terpakaiRiil}g | Max Tol: ${maxToleransi}g (🟢 PAS)`;
    badgeCaramel.innerText = "Aman";
    badgeCaramel.className = "syrup-badge";
  } else {
    const selisih = terpakaiRiil - maxToleransi;
    resCaramel.innerText = `Pemakaian: ${terpakaiRiil}g | Max Tol: ${maxToleransi}g (🔴 MINUS ${selisih}g)`;
    badgeCaramel.innerText = "MINUS";
    badgeCaramel.className = "syrup-badge minus";
  }

  // 3. AUDIT BOARD UANG
  const kembalian = parseFloat(document.getElementById('inputKembalian').value) || 0;
  const qris = parseFloat(document.getElementById('inputQRIS').value) || 0;
  const pengeluaran = parseFloat(document.getElementById('inputPengeluaran').value) || 0;
  const uangTas = parseFloat(document.getElementById('inputUangTas').value) || 0;

  const totalOmzet = (totalTerjualReg * SETTING_TOLERANSI.hargaMenu.reg) + (totalTerjualLrg * SETTING_TOLERANSI.hargaMenu.lrg);
  const targetUangTas = totalOmzet + kembalian - qris - pengeluaran;
  const selisihUang = uangTas - targetUangTas;

  const statusUang = document.getElementById('statusUang');
  const badgeUang = document.getElementById('badgeUang');

  if (selisihUang === 0) {
    statusUang.innerText = "Status: 🟢 PAS";
    statusUang.style.color = "#166534";
    badgeUang.innerText = "OK";
    badgeUang.className = "badge";
  } else if (selisihUang < 0) {
    statusUang.innerText = `🔴 SELISIH: Rp ${Math.abs(selisihUang).toLocaleString()}`;
    statusUang.style.color = "#991B1B";
    badgeUang.innerText = "MINUS";
    badgeUang.className = "badge minus";
  } else {
    statusUang.innerText = `🔵 LEBIH: Rp ${selisihUang.toLocaleString()}`;
    statusUang.style.color = "#0369A1";
    badgeUang.innerText = "LEBIH";
    badgeUang.className = "badge";
  }
});

