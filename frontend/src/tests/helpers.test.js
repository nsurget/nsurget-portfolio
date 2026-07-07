import { describe, it, expect } from 'vitest';
import { generateSlug, truncateText, formatYearDisplay } from '../utils/helpers.js';

describe('Helper Utility Functions', () => {
  describe('generateSlug', () => {
    it('should convert mixed-case strings to lowercase with dashes', () => {
      expect(generateSlug('Vue JS Framework')).toBe('vue-js-framework');
    });

    it('should strip special characters and handle spaces', () => {
      expect(generateSlug('React & Next.js!')).toBe('react-nextjs');
    });

    it('should return empty string for empty inputs', () => {
      expect(generateSlug('')).toBe('');
      expect(generateSlug(null)).toBe('');
    });
  });

  describe('truncateText', () => {
    it('should truncate text longer than the limit', () => {
      const text = 'This is a very long text representing a portfolio description';
      expect(truncateText(text, 10)).toBe('This is a...');
    });

    it('should not truncate text shorter than the limit', () => {
      const text = 'Short text';
      expect(truncateText(text, 50)).toBe('Short text');
    });
  });

  describe('formatYearDisplay', () => {
    it('should prepend "Année " for single 4-digit years', () => {
      expect(formatYearDisplay('2024')).toBe('Année 2024');
    });

    it('should return range years unchanged', () => {
      expect(formatYearDisplay('2022 - 2023')).toBe('2022 - 2023');
    });
  });
});
