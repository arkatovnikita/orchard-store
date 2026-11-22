import { describe, expect, it } from 'vitest';
import {
  deleteExpiryBackward,
  deleteExpiryForward,
  formatExpiry,
  insertExpiryDigit,
  parseExpiry,
  replaceExpiryText,
  serializeExpiry,
} from './expiry';

const empty = { month: '', year: '' };
const full = { month: '12', year: '28' };

describe('parseExpiry and serializeExpiry', () => {
  it('convert between the stored value and month and year', () => {
    expect(parseExpiry('12/28')).toEqual(full);
    expect(serializeExpiry(full)).toBe('12/28');
  });

  it('store an empty date as an empty string', () => {
    expect(parseExpiry('')).toEqual(empty);
    expect(serializeExpiry(empty)).toBe('');
  });
});

describe('formatExpiry', () => {
  it('shows the separator once the month is complete', () => {
    expect(formatExpiry({ month: '1', year: '' })).toBe('1');
    expect(formatExpiry({ month: '12', year: '' })).toBe('12 / ');
    expect(formatExpiry(full)).toBe('12 / 28');
  });
});

describe('insertExpiryDigit', () => {
  it('waits for a second digit after 0 or 1', () => {
    expect(insertExpiryDigit(empty, 0, '1')).toEqual({
      expiry: { month: '1', year: '' },
      caret: 1,
    });
  });

  it('adds a leading zero to months from 2 to 9', () => {
    expect(insertExpiryDigit(empty, 0, '4')).toEqual({
      expiry: { month: '04', year: '' },
      caret: 5,
    });
  });

  it('moves the caret to the year after the month is complete', () => {
    expect(insertExpiryDigit({ month: '1', year: '' }, 1, '2')).toEqual({
      expiry: { month: '12', year: '' },
      caret: 5,
    });
  });

  it('types the year after the separator', () => {
    expect(insertExpiryDigit({ month: '12', year: '' }, 5, '2')).toEqual({
      expiry: { month: '12', year: '2' },
      caret: 6,
    });
  });

  it('replaces a month digit without moving the year', () => {
    expect(insertExpiryDigit(full, 0, '0')).toEqual({
      expiry: { month: '02', year: '28' },
      caret: 1,
    });
  });

  it('ignores digits after a complete date', () => {
    expect(insertExpiryDigit(full, 7, '9')).toEqual({ expiry: full, caret: 7 });
  });
});

describe('deleteExpiryBackward', () => {
  it('deletes the last year digit', () => {
    expect(deleteExpiryBackward(full, 7)).toEqual({
      expiry: { month: '12', year: '2' },
      caret: 6,
    });
  });

  it('jumps over the separator to the month', () => {
    expect(deleteExpiryBackward({ month: '12', year: '' }, 5)).toEqual({
      expiry: { month: '1', year: '' },
      caret: 1,
    });
  });

  it('deletes a month digit without moving the year', () => {
    expect(deleteExpiryBackward(full, 2)).toEqual({
      expiry: { month: '1', year: '28' },
      caret: 1,
    });
  });
});

describe('deleteExpiryForward', () => {
  it('deletes the month digit after the caret', () => {
    expect(deleteExpiryForward(full, 0)).toEqual({
      expiry: { month: '2', year: '28' },
      caret: 0,
    });
  });

  it('jumps over the separator to the year', () => {
    expect(deleteExpiryForward(full, 2)).toEqual({
      expiry: { month: '12', year: '8' },
      caret: 2,
    });
  });
});

describe('replaceExpiryText', () => {
  it('splits a pasted date into month and year', () => {
    expect(replaceExpiryText('', 0, 0, '12/28')).toEqual({
      expiry: full,
      caret: 7,
    });
  });

  it('keeps only the first 4 digits', () => {
    expect(replaceExpiryText('', 0, 0, '12 / 2030').expiry).toEqual({
      month: '12',
      year: '20',
    });
  });
});
