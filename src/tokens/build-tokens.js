/**
 * Token build script
 * Reads global.json, generates full palette (tints 50→950 via HSL),
 * semantic colors, hover/active/disabled states, then runs Style Dictionary.
 */
import StyleDictionary from 'style-dictionary';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Utility: hex ↔ HSL ---
function hexToHSL(hex) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

// --- Generate 9 tints from a base hex color ---
// Maps: 50(very light) → 950(very dark)
function generateTints(hex) {
  const { h, s } = hexToHSL(hex);
  const steps = {
    '50':  { s: Math.max(s - 30, 10), l: 97 },
    '100': { s: Math.max(s - 20, 15), l: 93 },
    '200': { s: Math.max(s - 10, 20), l: 85 },
    '300': { s: Math.max(s - 5, 25),  l: 74 },
    '400': { s: s,                     l: 62 },
    '500': { s: s,                     l: 50 },
    '600': { s: s,                     l: 41 },
    '700': { s: s,                     l: 33 },
    '800': { s: Math.min(s + 5, 100),  l: 24 },
    '900': { s: Math.min(s + 10, 100), l: 17 },
    '950': { s: Math.min(s + 15, 100), l: 10 },
  };
  const result = {};
  for (const [key, val] of Object.entries(steps)) {
    result[key] = { value: hslToHex(h, val.s, val.l), type: 'color' };
  }
  return result;
}

// --- Generate state colors (hover: -8% L, active: -15% L, disabled: opacity token ref) ---
function generateStates(hex) {
  const { h, s, l } = hexToHSL(hex);
  return {
    hover:  { value: hslToHex(h, s, Math.max(l - 8, 5)), type: 'color' },
    active: { value: hslToHex(h, s, Math.max(l - 15, 5)), type: 'color' },
  };
}

// --- Generate neutral grays ---
function generateNeutrals() {
  const steps = {
    '50':  '#fafafa',
    '100': '#f5f5f5',
    '200': '#e5e5e5',
    '300': '#d4d4d4',
    '400': '#a3a3a3',
    '500': '#737373',
    '600': '#525252',
    '700': '#404040',
    '800': '#262626',
    '900': '#171717',
    '950': '#0a0a0a',
  };
  const result = {};
  for (const [key, val] of Object.entries(steps)) {
    result[key] = { value: val, type: 'color' };
  }
  return result;
}

// --- Main ---
const global = JSON.parse(readFileSync(join(__dirname, 'global.json'), 'utf8'));
const primary = global.brand.primary.value;
const secondary = global.brand.secondary.value;
const accent = global.brand.accent.value;

// Build generated tokens
const generated = {
  color: {
    primary: {
      ...generateTints(primary),
      DEFAULT: { value: primary, type: 'color' },
      ...generateStates(primary),
    },
    secondary: {
      ...generateTints(secondary),
      DEFAULT: { value: secondary, type: 'color' },
      ...generateStates(secondary),
    },
    accent: {
      ...generateTints(accent),
      DEFAULT: { value: accent, type: 'color' },
      ...generateStates(accent),
    },
    neutral: generateNeutrals(),
    semantic: {
      success: {
        DEFAULT: { value: '#16a34a', type: 'color' },
        light:   { value: '#dcfce7', type: 'color' },
        dark:    { value: '#166534', type: 'color' },
      },
      warning: {
        DEFAULT: { value: '#ea580c', type: 'color' },
        light:   { value: '#fff7ed', type: 'color' },
        dark:    { value: '#9a3412', type: 'color' },
      },
      error: {
        DEFAULT: { value: '#dc2626', type: 'color' },
        light:   { value: '#fef2f2', type: 'color' },
        dark:    { value: '#991b1b', type: 'color' },
      },
      info: {
        DEFAULT: { value: '#2563eb', type: 'color' },
        light:   { value: '#eff6ff', type: 'color' },
        dark:    { value: '#1e40af', type: 'color' },
      },
    },
    surface: {
      primary:   { value: '#ffffff', type: 'color' },
      secondary: { value: '#fafafa', type: 'color' },
      tertiary:  { value: '#f5f5f5', type: 'color' },
      inverse:   { value: '#0a0a0a', type: 'color' },
    },
    text: {
      primary:   { value: '#0a0a0a', type: 'color' },
      secondary: { value: '#525252', type: 'color' },
      tertiary:  { value: '#a3a3a3', type: 'color' },
      disabled:  { value: '#d4d4d4', type: 'color' },
      inverse:   { value: '#fafafa', type: 'color' },
      link:      { value: primary, type: 'color' },
    },
    border: {
      primary:   { value: '#e5e5e5', type: 'color' },
      secondary: { value: '#d4d4d4', type: 'color' },
      focus:     { value: primary, type: 'color' },
    },
  },
};

// Write generated tokens to a file that Style Dictionary will consume
const outputDir = join(__dirname, 'generated');
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'colors.json'), JSON.stringify(generated, null, 2));
console.log('✓ Generated color palette → src/tokens/generated/colors.json');

// --- Run Style Dictionary ---
const sd = new StyleDictionary({
  source: [
    join(__dirname, 'global.json'),
    join(outputDir, 'colors.json'),
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: join(__dirname, 'dist/'),
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: join(__dirname, 'dist/'),
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
      ],
    },
    ts: {
      transformGroup: 'js',
      buildPath: join(__dirname, 'dist/'),
      files: [
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
console.log('✓ Style Dictionary build complete → src/tokens/dist/');
