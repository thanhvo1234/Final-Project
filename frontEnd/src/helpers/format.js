
// eslint-disable-next-line no-unused-vars
import React from 'react';

export function formatCurrency(price) {
    // Định dạng giá tiền thành định dạng VNĐ
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(price);
}