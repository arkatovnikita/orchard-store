import { describe, expect, it } from 'vitest';
import { formatCardNumber, getCardBrand, passesLuhnCheck } from './card';

describe('getCardBrand', () => {
  it('detects Visa by the first digit', () => {
    expect(getCardBrand('4')).toBe('visa');
    expect(getCardBrand('4242424242424242')).toBe('visa');
  });

  it('detects Mastercard in the 51–55 range', () => {
    expect(getCardBrand('51')).toBe('mastercard');
    expect(getCardBrand('5555555555554444')).toBe('mastercard');
  });

  it('detects Mastercard in the 2221–2720 range', () => {
    expect(getCardBrand('2221')).toBe('mastercard');
    expect(getCardBrand('2500')).toBe('mastercard');
    expect(getCardBrand('2720')).toBe('mastercard');
  });

  it('does not detect numbers just outside the Mastercard ranges', () => {
    expect(getCardBrand('2220')).toBeNull();
    expect(getCardBrand('2721')).toBeNull();
    expect(getCardBrand('56')).toBeNull();
  });

  it('does not detect other networks', () => {
    expect(getCardBrand('6011111111111117')).toBeNull();
    expect(getCardBrand('378282246310005')).toBeNull();
  });
});

describe('formatCardNumber', () => {
  it('splits the number into groups of 4 digits', () => {
    expect(formatCardNumber('4242424242424242')).toBe('4242 4242 4242 4242');
  });

  it('formats a number that is still being typed', () => {
    expect(formatCardNumber('42424')).toBe('4242 4');
  });

  it('does not add a space after the last group', () => {
    expect(formatCardNumber('4242')).toBe('4242');
  });
});

describe('passesLuhnCheck', () => {
  it('accepts numbers with a correct check digit', () => {
    expect(passesLuhnCheck('4242424242424242')).toBe(true);
    expect(passesLuhnCheck('79927398713')).toBe(true);
  });

  it('rejects numbers where one digit is wrong', () => {
    expect(passesLuhnCheck('4242424242424241')).toBe(false);
    expect(passesLuhnCheck('79927398710')).toBe(false);
  });
});
