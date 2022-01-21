import { Unsubscriber, writable, derived } from 'svelte/store';
import { ApplicationSettings } from '@nativescript/core';

export const usdToVnd = writable('23500');
const shippingCost = 5; // $/lb
export const lipstickWeight = 0.25; // lb
const perfumeCustom = 6; // $/item
const cosmeticsCustom = 2.5; // $/lb
const lipstickCustom = (priceWithTax: number) => {
  if (priceWithTax >= 30) return 1.5;
  return 0.5;
}; // $/item

const from = (array: any[]) => (index: number) => array[index];
const friendlyVnd = (value: number) => {
  const text = `${value}`;

  const tokens = [];
  let i;
  for (i = text.length - 3; i > 0; i -= 3) {
    tokens.unshift(text.substr(i, 3));
  }
  tokens.unshift(text.substring(0, i + 3));
  return `${tokens.join('.')} ₫`;
};

export const categories = ['perfume', 'cosmetics', 'lipsticks', 'others'];
export const categoryLabels = ['Nước hoa', 'Mỹ phẩm', 'Son', 'Khác'];
export const categoryIndex = writable(0);
export const category = derived(categoryIndex, from(categories));
export const categoryLabel = derived(categoryIndex, from(categoryLabels));

export const originalPrice = writable('100');
export const discount = writable('0');
export const price = derived([originalPrice, discount], ([originalPrice, discount]) => (Number(originalPrice) * (100 - Number(discount))) / 100);

export const taxes = [1, 1.05, 1.06, 1.075, 1.1];
export const taxLabels = ['0%', '5%', '6%', '7.5%', '10%'];
export const taxIndex = writable(2);
export const tax = derived(taxIndex, from(taxes));
export const taxLabel = derived(taxIndex, from(taxLabels));

const priceWithTax = derived([price, tax], ([price, tax]) => Number(price) * tax);

export const volumes = [30, 50, 75, 90, 100, 125, 150, 200, 500];
export const volumeLabels = ['30ml', '50ml', '75ml', '90ml', '100ml', '125ml', '150ml', '200ml', '500ml'];
export const volumeIndex = writable(4);
export const volume = derived(volumeIndex, from(volumes));
export const volumeLabel = derived(volumeIndex, from(volumeLabels));

export const sizes = [0.25, 0.5, 1, 1.5, 2];
export const sizeLabels = ['XS', 'S', 'M', 'L', 'XL'];
export const sizeIndex = writable(2);
export const size = derived(sizeIndex, from(sizes));
export const sizeLabel = derived(sizeIndex, from(sizeLabels));

export const weight = writable('16'); // oz

const shippingWeight = derived([category, volume, size, weight], ([category, volume, size, weight]) => {
  switch (category) {
    case 'perfume':
      return volume / 100; // 100 ml bottle is typically 1 lb
    case 'cosmetics':
      return size;
    case 'lipsticks':
      return lipstickWeight;
    default:
      return Number(weight) / 16; // weight in oz
  }
}); // lb
const shipping = derived(shippingWeight, (shippingWeight) => Math.ceil(shippingCost * shippingWeight));

const custom = derived([category, priceWithTax, shippingWeight], ([category, priceWithTax, shippingWeight]) => {
  switch (category) {
    case 'perfume':
      return perfumeCustom;
    case 'cosmetics':
      return cosmeticsCustom * shippingWeight;
    case 'lipsticks':
      return lipstickCustom(priceWithTax);
    default:
      return 0;
  }
});

export const finalUsd = derived([priceWithTax, shipping, custom], ([priceWithTax, shipping, custom]) => priceWithTax + shipping + custom);
export const finalVnd = derived([finalUsd, usdToVnd], ([finalUsd, usdToVnd]) => finalUsd * Number(usdToVnd));
export const profitVnd = derived(finalVnd, (finalVnd) => Math.min(Math.max(200_000, Math.ceil(finalVnd * 0.1)), 250_000));
export const finalWithProfitVnd = derived([finalVnd, profitVnd], ([finalVnd, profitVnd]) => Math.ceil((finalVnd + Number(profitVnd)) / 50_000) * 50_000);
export const final = derived(finalWithProfitVnd, friendlyVnd);

export const fullHistory = writable([], (set) => {
  if (ApplicationSettings.hasKey('fullHistory')) {
    const storedBlob = ApplicationSettings.getString('fullHistory');
    try {
      const result = JSON.parse(storedBlob);
      set(result);
    } catch (_) {}
  }
  const unsubscribe: Unsubscriber = fullHistory.subscribe((history) => {
    const blobToStore = JSON.stringify(history);
    ApplicationSettings.setString('fullHistory', blobToStore);
  });
  return () => unsubscribe();
});
