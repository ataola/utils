'use strict';

function formatMoney(num) {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export { formatMoney }
