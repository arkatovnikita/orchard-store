import { describe, expect, it } from 'vitest';
import { getCaretAfterDigits, getDigits, isSeparator } from './caret';

describe('getDigits', () => {
  it('keeps only digits', () => {
    expect(getDigits('(415) 555-0123')).toBe('4155550123');
  });
});

describe('isSeparator', () => {
  it('treats any non-digit as a separator', () => {
    expect(isSeparator(' ')).toBe(true);
    expect(isSeparator('-')).toBe(true);
    expect(isSeparator('4')).toBe(false);
  });

  it('returns false outside the text', () => {
    expect(isSeparator(undefined)).toBe(false);
  });
});

describe('getCaretAfterDigits', () => {
  it('finds the position after the given number of digits', () => {
    expect(getCaretAfterDigits('(415) 555-0123', 3)).toBe(4);
    expect(getCaretAfterDigits('4242 4242', 4)).toBe(4);
  });

  it('can move the caret past the separators that follow', () => {
    expect(getCaretAfterDigits('(415) 555-0123', 3, true)).toBe(6);
    expect(getCaretAfterDigits('4242 4242', 4, true)).toBe(5);
  });

  it('stays at the start for zero digits and at the end for too many', () => {
    expect(getCaretAfterDigits('4242 4242', 0)).toBe(0);
    expect(getCaretAfterDigits('4242', 10)).toBe(4);
  });
});
