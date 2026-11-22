export type CardBrand = 'visa' | 'mastercard';

export const CARD_NUMBER_LENGTH = 16;

export const CARD_BRAND_NAMES: Record<CardBrand, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
};

const MASTERCARD_PREFIX =
  /^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/;

export const getCardBrand = (digits: string): CardBrand | null => {
  if (/^4/.test(digits)) {
    return 'visa';
  }

  if (MASTERCARD_PREFIX.test(digits)) {
    return 'mastercard';
  }

  return null;
};

export const formatCardNumber = (digits: string) =>
  digits.replace(/(\d{4})(?=\d)/g, '$1 ');

export const passesLuhnCheck = (digits: string) => {
  const sum = digits
    .split('')
    .reverse()
    .reduce((total, char, index) => {
      let digit = Number(char);

      if (index % 2 === 1) {
        digit *= 2;

        if (digit > 9) {
          digit -= 9;
        }
      }

      return total + digit;
    }, 0);

  return sum % 10 === 0;
};
