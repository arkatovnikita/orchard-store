import { describe, expect, it } from 'vitest';
import { getEmailSuggestion } from './emailSuggestion';

describe('getEmailSuggestion', () => {
  it('suggests a popular domain for a typo', () => {
    expect(getEmailSuggestion('emma@gmial.com')).toBe('emma@gmail.com');
    expect(getEmailSuggestion('emma@yaho.com')).toBe('emma@yahoo.com');
    expect(getEmailSuggestion('emma@outlok.com')).toBe('emma@outlook.com');
  });

  it('keeps the name and ignores the case of the domain', () => {
    expect(getEmailSuggestion('Emma.Carter@GMIAL.COM')).toBe(
      'Emma.Carter@gmail.com',
    );
  });

  it('does not suggest anything for a correct domain', () => {
    expect(getEmailSuggestion('emma@gmail.com')).toBeNull();
  });

  it('does not change other known domains', () => {
    expect(getEmailSuggestion('emma@me.com')).toBeNull();
    expect(getEmailSuggestion('emma@proton.me')).toBeNull();
  });

  it('does not suggest anything for a domain that is too different', () => {
    expect(getEmailSuggestion('emma@company.org')).toBeNull();
  });

  it('waits until the email has a name and a domain', () => {
    expect(getEmailSuggestion('emma')).toBeNull();
    expect(getEmailSuggestion('emma@')).toBeNull();
    expect(getEmailSuggestion('@gmial.com')).toBeNull();
  });
});
