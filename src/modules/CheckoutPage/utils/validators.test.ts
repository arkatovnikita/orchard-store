import { describe, expect, it } from 'vitest';
import {
  required,
  validateAddress,
  validateCardNumber,
  validateCity,
  validateCvc,
  validateEmail,
  validateExpiry,
  validateName,
  validatePhone,
  validateZip,
} from './validators';

describe('required', () => {
  const validateState = required('Select your state');

  it('accepts any value', () => {
    expect(validateState('CA')).toBe('');
  });

  it('rejects an empty value', () => {
    expect(validateState('')).toBe('Select your state');
    expect(validateState('   ')).toBe('Select your state');
  });
});

describe('validateName', () => {
  const validateFirstName = validateName('Enter your first name');

  it('accepts names with apostrophes, hyphens and accents', () => {
    expect(validateFirstName('Emma')).toBe('');
    expect(validateFirstName("O'Brien")).toBe('');
    expect(validateFirstName('Anne-Marie')).toBe('');
    expect(validateFirstName('José')).toBe('');
  });

  it('shows its own message for an empty field', () => {
    expect(validateFirstName('  ')).toBe('Enter your first name');
  });

  it('rejects digits and symbols', () => {
    expect(validateFirstName('Emma2')).toBe('Use letters only');
    expect(validateFirstName('Emma!')).toBe('Use letters only');
  });
});

describe('validateEmail', () => {
  it('accepts a valid email, ignoring spaces around it', () => {
    expect(validateEmail('emma@gmail.com')).toBe('');
    expect(validateEmail('  emma@gmail.com ')).toBe('');
  });

  it('rejects an email without a domain zone or with spaces', () => {
    const message = 'Enter a valid email, like name@example.com';

    expect(validateEmail('emma@gmail')).toBe(message);
    expect(validateEmail('emma gmail.com')).toBe(message);
  });

  it('asks for an email when the field is empty', () => {
    expect(validateEmail('')).toBe('Enter your email');
  });
});

describe('validatePhone', () => {
  it('accepts a 10-digit US number', () => {
    expect(validatePhone('4155550123')).toBe('');
  });

  it('asks for all 10 digits', () => {
    expect(validatePhone('415555')).toBe('Enter a 10-digit phone number');
  });

  it('rejects area and exchange codes that start with 0 or 1', () => {
    const message = 'Enter a valid US phone number';

    expect(validatePhone('1155550123')).toBe(message);
    expect(validatePhone('4151550123')).toBe(message);
  });

  it('asks for a number when the field is empty', () => {
    expect(validatePhone('')).toBe('Enter your phone number');
  });
});

describe('validateAddress', () => {
  it('accepts a house number with a street name', () => {
    expect(validateAddress('221 Market Street')).toBe('');
  });

  it('rejects an address without a number or without a street', () => {
    const message = 'Enter a full street address, like 221 Market Street';

    expect(validateAddress('Market Street')).toBe(message);
    expect(validateAddress('221')).toBe(message);
  });
});

describe('validateCity', () => {
  it('accepts city names with spaces, dots, apostrophes and hyphens', () => {
    expect(validateCity('San Francisco')).toBe('');
    expect(validateCity('St. Louis')).toBe('');
    expect(validateCity("Coeur d'Alene")).toBe('');
    expect(validateCity('Winston-Salem')).toBe('');
  });

  it('rejects digits', () => {
    expect(validateCity('City 17')).toBe('Use letters only');
  });
});

describe('validateZip', () => {
  it('accepts exactly 5 digits', () => {
    expect(validateZip('94105')).toBe('');
  });

  it('rejects other lengths', () => {
    expect(validateZip('9410')).toBe('Enter a 5-digit ZIP code');
    expect(validateZip('941050')).toBe('Enter a 5-digit ZIP code');
  });

  it('asks for a ZIP code when the field is empty', () => {
    expect(validateZip('')).toBe('Enter your ZIP code');
  });
});

describe('validateCardNumber', () => {
  it('accepts Visa and Mastercard test cards', () => {
    expect(validateCardNumber('4242424242424242')).toBe('');
    expect(validateCardNumber('5555555555554444')).toBe('');
    expect(validateCardNumber('2223003122003222')).toBe('');
  });

  it('rejects a number with a typo', () => {
    expect(validateCardNumber('4242424242424241')).toBe(
      'Card number is not valid',
    );
  });

  it('rejects an incomplete number', () => {
    expect(validateCardNumber('42424242')).toBe('Card number is not valid');
  });

  it('rejects valid cards of other networks', () => {
    expect(validateCardNumber('6011111111111117')).toBe(
      'Only Visa and Mastercard are accepted',
    );
  });

  it('asks for a number when the field is empty', () => {
    expect(validateCardNumber('')).toBe('Enter your card number');
  });
});

describe('validateExpiry', () => {
  const now = new Date(2026, 10, 22);

  it('accepts the current month and later dates', () => {
    expect(validateExpiry('11/26', now)).toBe('');
    expect(validateExpiry('01/30', now)).toBe('');
  });

  it('rejects a card that has expired', () => {
    expect(validateExpiry('10/26', now)).toBe('This card has expired');
  });

  it('rejects a month that does not exist', () => {
    expect(validateExpiry('13/27', now)).toBe('Enter a valid month');
    expect(validateExpiry('00/27', now)).toBe('Enter a valid month');
  });

  it('asks for the full date', () => {
    expect(validateExpiry('1/', now)).toBe('Enter the full date, like 08 / 29');
    expect(validateExpiry('12/2', now)).toBe(
      'Enter the full date, like 08 / 29',
    );
  });

  it('asks for a date when the field is empty', () => {
    expect(validateExpiry('', now)).toBe('Enter the expiry date');
  });
});

describe('validateCvc', () => {
  it('accepts 3 digits', () => {
    expect(validateCvc('123')).toBe('');
  });

  it('rejects other lengths', () => {
    expect(validateCvc('12')).toBe('Enter the 3-digit CVC');
  });

  it('asks for a CVC when the field is empty', () => {
    expect(validateCvc('')).toBe('Enter the CVC');
  });
});
