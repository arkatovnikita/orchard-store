import { describe, expect, it } from 'vitest';
import { formatFullPhone, formatPhone, toPhoneDigits } from './phone';

describe('formatPhone', () => {
  it('formats a full number', () => {
    expect(formatPhone('4155550123')).toBe('(415) 555-0123');
  });

  it('formats a number that is still being typed', () => {
    expect(formatPhone('4')).toBe('(4');
    expect(formatPhone('415')).toBe('(415');
    expect(formatPhone('4155')).toBe('(415) 5');
    expect(formatPhone('4155550')).toBe('(415) 555-0');
  });

  it('returns an empty string for an empty value', () => {
    expect(formatPhone('')).toBe('');
  });
});

describe('toPhoneDigits', () => {
  it('keeps only digits', () => {
    expect(toPhoneDigits('(415) 555-0123')).toBe('4155550123');
  });

  it('drops the +1 country code from a pasted number', () => {
    expect(toPhoneDigits('+1 (415) 555-0123')).toBe('4155550123');
    expect(toPhoneDigits('1-415-555-0123')).toBe('4155550123');
  });

  it('cuts extra digits', () => {
    expect(toPhoneDigits('415555012345')).toBe('4155550123');
  });
});

describe('formatFullPhone', () => {
  it('adds the country code', () => {
    expect(formatFullPhone('4155550123')).toBe('+1 (415) 555-0123');
  });
});
