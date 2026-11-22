import { describe, expect, it } from 'vitest';
import { capitalizeWords, collapseSpaces } from './text';

describe('collapseSpaces', () => {
  it('removes spaces at the ends and repeated spaces inside', () => {
    expect(collapseSpaces('  221   Market  Street ')).toBe('221 Market Street');
  });
});

describe('capitalizeWords', () => {
  it('capitalizes every word', () => {
    expect(capitalizeWords('john   smith ')).toBe('John Smith');
  });

  it('capitalizes parts after apostrophes and hyphens', () => {
    expect(capitalizeWords("o'brien")).toBe("O'Brien");
    expect(capitalizeWords('anne-marie')).toBe('Anne-Marie');
  });

  it('works with accented letters', () => {
    expect(capitalizeWords('élodie')).toBe('Élodie');
  });

  it('keeps capital letters inside a word', () => {
    expect(capitalizeWords('mcDonald')).toBe('McDonald');
  });
});
