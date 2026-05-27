import { Code, Calculator, Image, FileText, Palette, Link as LinkIcon, Terminal, Database } from 'lucide-react';

export const toolCategories = [
  { id: 'all', name: 'All Tools', icon: Code },
  { id: 'code', name: 'Code Tools', icon: Terminal },
  { id: 'math', name: 'Math & Calculators', icon: Calculator },
  { id: 'image', name: 'Image Tools', icon: Image },
  { id: 'text', name: 'Text Tools', icon: FileText },
  { id: 'color', name: 'Color Tools', icon: Palette },
  { id: 'network', name: 'Network Tools', icon: LinkIcon },
  { id: 'data', name: 'Data Tools', icon: Database },
];

export const tools = [
  // Code Tools
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate JSON data with syntax highlighting',
    category: 'code',
    icon: Terminal,
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings instantly',
    category: 'code',
    icon: Code,
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs for web development',
    category: 'code',
    icon: LinkIcon,
  },
  // Math Tools
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, increases, and decreases',
    category: 'math',
    icon: Calculator,
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between different units of measurement',
    category: 'math',
    icon: Calculator,
  },
  // Image Tools
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress images without losing quality',
    category: 'image',
    icon: Image,
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize images to custom dimensions',
    category: 'image',
    icon: Image,
  },
  // Text Tools
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, and paragraphs in text',
    category: 'text',
    icon: FileText,
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between uppercase, lowercase, and more',
    category: 'text',
    icon: FileText,
  },
  // Color Tools
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Pick colors and get HEX, RGB, and HSL values',
    category: 'color',
    icon: Palette,
  },
  {
    id: 'color-palette-generator',
    name: 'Color Palette Generator',
    description: 'Generate beautiful color palettes for your designs',
    category: 'color',
    icon: Palette,
  },
  // Network Tools
  {
    id: 'ip-lookup',
    name: 'IP Lookup',
    description: 'Find information about IP addresses',
    category: 'network',
    icon: LinkIcon,
  },
  // Data Tools
  {
    id: 'csv-to-json',
    name: 'CSV to JSON Converter',
    description: 'Convert CSV data to JSON format',
    category: 'data',
    icon: Database,
  },
];
