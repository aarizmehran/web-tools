import { 
  Code, Palette, FileJson, Lock, QrCode, Image as ImageIcon, Monitor, Search, 
  FileText, Terminal, Database, Globe, Clock, Calculator, Type,
  Hash, Link, Eye, Shield, Wifi, BarChart, Layers, Settings,
  Cpu, HardDrive, GitBranch, Mail, Phone, MapPin, Calendar,
  List, CheckSquare, Tag, Folder, File, Download, Upload,
  Copy, Clipboard, Scissors, Crop, RotateCw, ZoomIn, ZoomOut,
  Minimize2, Maximize2, Move, PenTool, Eraser, PaintBucket,
  Droplet, Sun, Moon, Star, Heart, Zap, Flame, Snowflake,
  Cloud, CloudRain, Wind, Thermometer, Activity, TrendingUp,
  PieChart, BarChart2, LineChart, Grid, Menu, X, Plus, Minus,
  Percent, Divide, Music, Radio, Tv, Mic, Volume2,
  Video, CreditCard, DollarSign, Wallet, Banknote,
  Key, Fingerprint, Scan, Barcode, Share2, Send, MessageSquare,
  MessageCircle, ChevronRight, ArrowRight, Play, Pause, StopCircle,
  Edit, Save, Trash2, Archive, Package, Box, Navigation, Compass,
  Flag, Trophy, Medal, Ticket, Receipt, Coins, Gem, Crown,
  Rss, Reply, MoreHorizontal, Ellipsis, Equal, Power, User,
  Users, Target, Bell, Camera, Circle, LayoutTemplate,
  MousePointer, Lightbulb, Book, Copyright, FlipHorizontal, BookOpen, Square
} from 'lucide-react';

export const toolCategories = [
  { id: 'all', name: 'All Tools', icon: Grid },
  { id: 'code', name: 'Code Tools', icon: Code },
  { id: 'text', name: 'Text & String', icon: Type },
  { id: 'data', name: 'Data Format', icon: FileJson },
  { id: 'image', name: 'Image Tools', icon: ImageIcon },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'network', name: 'Network', icon: Globe },
  { id: 'color', name: 'Color Tools', icon: Palette },
  { id: 'math', name: 'Math & Calc', icon: Calculator },
  { id: 'dev', name: 'Dev Tools', icon: Terminal },
  { id: 'media', name: 'Media', icon: Music },
  { id: 'productivity', name: 'Productivity', icon: Clock },
  { id: 'web', name: 'Web Tools', icon: Monitor },
  { id: 'api', name: 'API Tools', icon: Wifi },
  { id: 'converters', name: 'Converters', icon: RotateCw },
  { id: 'generators', name: 'Generators', icon: Zap },
  { id: 'validators', name: 'Validators', icon: CheckSquare },
  { id: 'analytics', name: 'Analytics', icon: BarChart },
  { id: 'utilities', name: 'Utilities', icon: Settings },
];

export const tools = [
  { id: 'html-editor', name: 'HTML Editor + Live Preview', description: 'Write HTML with real-time preview', category: 'code', icon: Code },
  { id: 'css-beautifier', name: 'CSS Beautifier & Minifier', description: 'Format or minify CSS code', category: 'code', icon: Palette },
  { id: 'js-beautifier', name: 'JavaScript Beautifier & Minifier', description: 'Format or minify JavaScript', category: 'code', icon: FileJson },
  { id: 'json-formatter', name: 'JSON Formatter & Validator', description: 'Validate and format JSON', category: 'data', icon: FileJson },
  { id: 'xml-formatter', name: 'XML Formatter & Validator', description: 'Format and validate XML', category: 'data', icon: FileText },
  { id: 'sql-formatter', name: 'SQL Formatter', description: 'Beautify SQL queries', category: 'code', icon: Database },
  { id: 'markdown-preview', name: 'Markdown Previewer', description: 'Live markdown rendering', category: 'text', icon: FileText },
  { id: 'regex-tester', name: 'Regex Tester', description: 'Test regular expressions', category: 'dev', icon: Search },
  { id: 'base64-encode-decode', name: 'Base64 Encode/Decode', description: 'Encode or decode Base64', category: 'converters', icon: RotateCw },
  { id: 'url-encoder', name: 'URL Encoder/Decoder', description: 'Encode or decode URLs', category: 'converters', icon: Link },
  { id: 'color-picker', name: 'Color Picker', description: 'Pick and convert colors', category: 'color', icon: Droplet },
  { id: 'gradient-generator', name: 'Gradient Generator', description: 'Create CSS gradients', category: 'color', icon: Palette },
  { id: 'password-generator', name: 'Password Generator', description: 'Generate secure passwords', category: 'security', icon: Lock },
  { id: 'qr-code-generator', name: 'QR Code Generator', description: 'Generate QR codes', category: 'generators', icon: QrCode },
  { id: 'image-to-base64', name: 'Image to Base64', description: 'Convert images to Base64', category: 'image', icon: ImageIcon },
  { id: 'responsive-preview', name: 'Responsive Screen Preview', description: 'Preview different screens', category: 'web', icon: Monitor },
  { id: 'meta-tag-generator', name: 'SEO Meta Tag Generator', description: 'Generate meta tags', category: 'web', icon: Search },
  { id: 'local-storage-tester', name: 'Local Storage Tester', description: 'Manage localStorage', category: 'dev', icon: Database },
  { id: 'http-status-checker', name: 'HTTP Status Code Checker', description: 'Check HTTP status codes', category: 'network', icon: Activity },
  { id: 'api-tester', name: 'API Tester', description: 'Test REST APIs', category: 'api', icon: Wifi },
];

export function searchTools(query) {
  const lowercaseQuery = query.toLowerCase();
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.category.toLowerCase().includes(lowercaseQuery)
  );
}

export function getToolsByCategory(categoryId) {
  if (categoryId === 'all') return tools;
  return tools.filter(tool => tool.category === categoryId);
}

export function getToolById(id) {
  return tools.find(tool => tool.id === id);
}
