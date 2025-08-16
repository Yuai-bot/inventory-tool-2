/*
 * script.js
 *
 * 貨品管理工具的主要腳本。
 * 此腳本在提交表格時自動生成一組 8 位長度的隨機英數代碼，
 * 並將貨品資訊加入到表格中展示。
 */

// 字母與數字集合，用於生成隨機貨品編號
const CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * 生成一組指定長度的隨機字串。
 * @param {number} length 要生成字串的長度。
 * @returns {string} 生成的隨機字串。
 */
function generateRandomCode(length) {
  let result = '';
  const setLength = CHAR_SET.length;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * setLength);
    result += CHAR_SET.charAt(randomIndex);
  }
  return result;
}

/**
 * 將表單中的值讀取出來，生成貨品編號，然後加入表格。
 * @param {Event} event 表單提交事件。
 */
function handleFormSubmit(event) {
  event.preventDefault();
  const nameInput = document.getElementById('product-name');
  const qtyInput = document.getElementById('product-qty');
  const priceInput = document.getElementById('product-price');

  const name = nameInput.value.trim();
  const qty = qtyInput.value.trim();
  const price = priceInput.value.trim();

  // 確認必填欄位（價格為可選）
  if (!name || qty === '') {
    alert('請填寫名稱和數量');
    return;
  }

  const code = generateRandomCode(8);

  // 建立新表格行
  const tbody = document.getElementById('inventory-body');
  const row = document.createElement('tr');

  // 貨品編號
  const codeCell = document.createElement('td');
  codeCell.textContent = code;
  row.appendChild(codeCell);

  // 名稱
  const nameCell = document.createElement('td');
  nameCell.textContent = name;
  row.appendChild(nameCell);

  // 數量
  const qtyCell = document.createElement('td');
  qtyCell.textContent = qty;
  row.appendChild(qtyCell);

  // 價格（保留兩位小數）
  const priceCell = document.createElement('td');
  let formattedPrice;
  if (price === '' || isNaN(price)) {
    // 如果未輸入價格，顯示破折號
    formattedPrice = '—';
  } else {
    formattedPrice = parseFloat(price).toFixed(2);
  }
  priceCell.textContent = formattedPrice;
  row.appendChild(priceCell);

  // 將行加入表格
  tbody.appendChild(row);

  // 清空表單
  nameInput.value = '';
  qtyInput.value = '';
  priceInput.value = '';
}

// 註冊事件監聽
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('product-form');
  form.addEventListener('submit', handleFormSubmit);
});