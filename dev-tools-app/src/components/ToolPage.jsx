import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { tools } from '../tools/toolList';
import { useNotification } from '../context/NotificationContext';
import { Copy, Download, Upload, RefreshCw, Check, X, Monitor } from 'lucide-react';

// Tool implementations
const toolImplementations = {
  'html-editor': HtmlEditorTool,
  'css-beautifier': CssBeautifierTool,
  'js-beautifier': JsBeautifierTool,
  'json-formatter': JsonFormatterTool,
  'base64-encode-decode': Base64Tool,
  'url-encoder': UrlEncoderTool,
  'color-picker': ColorPickerTool,
  'gradient-generator': GradientGeneratorTool,
  'regex-tester': RegexTesterTool,
  'password-generator': PasswordGeneratorTool,
  'qr-code-generator': QrCodeGeneratorTool,
  'image-to-base64': ImageToBase64Tool,
  'responsive-preview': ResponsivePreviewTool,
  'meta-tag-generator': MetaTagGeneratorTool,
  'local-storage-tester': LocalStorageTesterTool,
  'markdown-preview': MarkdownPreviewTool,
  'http-status-checker': HttpStatusCheckerTool,
  'api-tester': ApiTesterTool,
};

export default function ToolPage() {
  const { toolId } = useParams();
  const tool = tools.find(t => t.id === toolId);
  const { addNotification } = useNotification();

  if (!tool) {
    return (
      <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Tool Not Found</h2>
        <p style={{ color: 'var(--text-secondary)' }}>The tool you're looking for doesn't exist.</p>
      </div>
    );
  }

  const ToolComponent = toolImplementations[toolId] || DefaultTool;

  return (
    <div>
      <div className="glass-card" style={{ padding: '24px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: 'var(--primary-gradient)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <tool.icon size={32} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700' }}>{tool.name}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>{tool.description}</p>
          </div>
        </div>
      </div>

      <ToolComponent addNotification={addNotification} />
    </div>
  );
}

function DefaultTool({ addNotification }) {
  return (
    <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
      <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Coming Soon</h3>
      <p style={{ color: 'var(--text-secondary)' }}>This tool is under development. Check back later!</p>
    </div>
  );
}

// HTML Editor + Live Preview
function HtmlEditorTool({ addNotification }) {
  const [html, setHtml] = useState('<h1>Hello World</h1>\n<p>Start editing...</p>');
  const [preview, setPreview] = useState(html);

  useEffect(() => {
    const timer = setTimeout(() => setPreview(html), 300);
    return () => clearTimeout(timer);
  }, [html]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>HTML Code</label>
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          className="input-glass code-editor"
          style={{ minHeight: '400px', fontFamily: 'monospace' }}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Live Preview</label>
        <div
          className="glass-card"
          style={{ minHeight: '400px', padding: '16px', background: 'white' }}
          dangerouslySetInnerHTML={{ __html: preview }}
        />
      </div>
    </div>
  );
}

// CSS Beautifier & Minifier
function CssBeautifierTool({ addNotification }) {
  const [css, setCss] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('beautify');

  const processCss = () => {
    try {
      if (mode === 'beautify') {
        // Simple beautification
        let beautified = css.replace(/{/g, ' {\n  ').replace(/}/g, '\n}\n').replace(/;/g, ';\n  ');
        beautified = beautified.replace(/\n\s*\n/g, '\n');
        setOutput(beautified);
      } else {
        // Minify
        const minified = css.replace(/\s+/g, ' ').replace(/\s*{\s*/g, '{').replace(/\s*}\s*/g, '}').replace(/\s*:\s*/g, ':').replace(/\s*;\s*/g, ';').trim();
        setOutput(minified);
      }
      addNotification('CSS processed successfully!', 'success');
    } catch (error) {
      addNotification('Error processing CSS', 'error');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <button onClick={() => setMode('beautify')} className={`btn-secondary ${mode === 'beautify' ? 'active' : ''}`}>Beautify</button>
        <button onClick={() => setMode('minify')} className={`btn-secondary ${mode === 'minify' ? 'active' : ''}`}>Minify</button>
        <button onClick={processCss} className="btn-primary">Process CSS</button>
      </div>
      <textarea
        value={css}
        onChange={(e) => setCss(e.target.value)}
        placeholder="Paste your CSS here..."
        className="input-glass code-editor"
        style={{ minHeight: '200px', fontFamily: 'monospace' }}
      />
      {output && (
        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Output</label>
          <textarea
            value={output}
            readOnly
            className="input-glass code-editor"
            style={{ minHeight: '200px', fontFamily: 'monospace' }}
          />
        </div>
      )}
    </div>
  );
}

// JavaScript Beautifier & Minifier
function JsBeautifierTool({ addNotification }) {
  const [js, setJs] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('beautify');

  const processJs = () => {
    try {
      if (mode === 'beautify') {
        // Simple beautification (basic indentation)
        let beautified = js.replace(/{/g, '{\n  ').replace(/}/g, '\n}\n').replace(/;/g, ';\n  ');
        beautified = beautified.replace(/\n\s*\n/g, '\n');
        setOutput(beautified);
      } else {
        // Minify
        const minified = js.replace(/\s+/g, ' ').replace(/\s*{\s*/g, '{').replace(/\s*}\s*/g, '}').replace(/\s*;\s*/g, ';').trim();
        setOutput(minified);
      }
      addNotification('JavaScript processed successfully!', 'success');
    } catch (error) {
      addNotification('Error processing JavaScript', 'error');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <button onClick={() => setMode('beautify')} className={`btn-secondary ${mode === 'beautify' ? 'active' : ''}`}>Beautify</button>
        <button onClick={() => setMode('minify')} className={`btn-secondary ${mode === 'minify' ? 'active' : ''}`}>Minify</button>
        <button onClick={processJs} className="btn-primary">Process JS</button>
      </div>
      <textarea
        value={js}
        onChange={(e) => setJs(e.target.value)}
        placeholder="Paste your JavaScript here..."
        className="input-glass code-editor"
        style={{ minHeight: '200px', fontFamily: 'monospace' }}
      />
      {output && (
        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Output</label>
          <textarea
            value={output}
            readOnly
            className="input-glass code-editor"
            style={{ minHeight: '200px', fontFamily: 'monospace' }}
          />
        </div>
      )}
    </div>
  );
}

// JSON Formatter & Validator
function JsonFormatterTool({ addNotification }) {
  const [json, setJson] = useState('');
  const [output, setOutput] = useState('');
  const [isValid, setIsValid] = useState(null);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(json);
      setOutput(JSON.stringify(parsed, null, 2));
      setIsValid(true);
      addNotification('JSON is valid!', 'success');
    } catch (error) {
      setIsValid(false);
      setOutput(error.message);
      addNotification('Invalid JSON', 'error');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(json);
      setOutput(JSON.stringify(parsed));
      setIsValid(true);
      addNotification('JSON minified!', 'success');
    } catch (error) {
      setIsValid(false);
      setOutput(error.message);
      addNotification('Invalid JSON', 'error');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <button onClick={formatJson} className="btn-primary">Format</button>
        <button onClick={minifyJson} className="btn-secondary">Minify</button>
        {isValid !== null && (
          <span style={{ 
            padding: '8px 16px', 
            borderRadius: '8px',
            background: isValid ? 'rgba(74, 222, 128, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {isValid ? <Check size={18} /> : <X size={18} />}
            {isValid ? 'Valid JSON' : 'Invalid JSON'}
          </span>
        )}
      </div>
      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
        placeholder='{"key": "value"}'
        className="input-glass code-editor"
        style={{ minHeight: '300px', fontFamily: 'monospace' }}
      />
      {output && (
        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Output</label>
          <textarea
            value={output}
            readOnly
            className="input-glass code-editor"
            style={{ minHeight: '300px', fontFamily: 'monospace' }}
          />
        </div>
      )}
    </div>
  );
}

// Base64 Encode/Decode
function Base64Tool({ addNotification }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
        addNotification('Encoded successfully!', 'success');
      } else {
        setOutput(atob(input));
        addNotification('Decoded successfully!', 'success');
      }
    } catch (error) {
      addNotification('Error processing Base64', 'error');
      setOutput('Error: Invalid input');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <button onClick={() => setMode('encode')} className={`btn-secondary ${mode === 'encode' ? 'active' : ''}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`btn-secondary ${mode === 'decode' ? 'active' : ''}`}>Decode</button>
        <button onClick={process} className="btn-primary">Process</button>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to process..."
        className="input-glass"
        style={{ minHeight: '150px' }}
      />
      {output && (
        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Output</label>
          <textarea
            value={output}
            readOnly
            className="input-glass"
            style={{ minHeight: '150px' }}
          />
        </div>
      )}
    </div>
  );
}

// URL Encoder/Decoder
function UrlEncoderTool({ addNotification }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
        addNotification('URL encoded!', 'success');
      } else {
        setOutput(decodeURIComponent(input));
        addNotification('URL decoded!', 'success');
      }
    } catch (error) {
      addNotification('Error processing URL', 'error');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <button onClick={() => setMode('encode')} className={`btn-secondary ${mode === 'encode' ? 'active' : ''}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`btn-secondary ${mode === 'decode' ? 'active' : ''}`}>Decode</button>
        <button onClick={process} className="btn-primary">Process</button>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter URL to process..."
        className="input-glass"
        style={{ minHeight: '150px' }}
      />
      {output && (
        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Output</label>
          <textarea
            value={output}
            readOnly
            className="input-glass"
            style={{ minHeight: '150px' }}
          />
        </div>
      )}
    </div>
  );
}

// Color Picker
function ColorPickerTool({ addNotification }) {
  const [color, setColor] = useState('#667eea');
  const [rgb, setRgb] = useState('rgb(102, 126, 234)');
  const [hsl, setHsl] = useState('hsl(228, 67%, 66%)');

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : '';
  };

  useEffect(() => {
    setRgb(hexToRgb(color));
  }, [color]);

  const copyColor = (value) => {
    navigator.clipboard.writeText(value);
    addNotification(`Copied ${value}`, 'success');
  };

  return (
    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '300px' }}>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ width: '100%', height: '200px', border: 'none', cursor: 'pointer' }}
        />
      </div>
      <div style={{ flex: 1, minWidth: '300px' }}>
        <div className="glass-card" style={{ padding: '20px', marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>HEX</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="input-glass"
              style={{ flex: 1 }}
            />
            <button onClick={() => copyColor(color)} className="btn-secondary"><Copy size={18} /></button>
          </div>
        </div>
        <div className="glass-card" style={{ padding: '20px', marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>RGB</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="text"
              value={rgb}
              readOnly
              className="input-glass"
              style={{ flex: 1 }}
            />
            <button onClick={() => copyColor(rgb)} className="btn-secondary"><Copy size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Gradient Generator
function GradientGeneratorTool({ addNotification }) {
  const [color1, setColor1] = useState('#667eea');
  const [color2, setColor2] = useState('#764ba2');
  const [direction, setDirection] = useState('to right');
  const [css, setCss] = useState('');

  useEffect(() => {
    setCss(`background: linear-gradient(${direction}, ${color1}, ${color2});`);
  }, [color1, color2, direction]);

  const copyCss = () => {
    navigator.clipboard.writeText(css);
    addNotification('CSS copied!', 'success');
  };

  return (
    <div>
      <div
        style={{
          height: '300px',
          borderRadius: '16px',
          marginBottom: '24px',
          background: `linear-gradient(${direction}, ${color1}, ${color2})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span style={{ color: 'white', fontSize: '24px', fontWeight: '700', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          Preview
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Color 1</label>
          <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} style={{ width: '100%', height: '50px' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Color 2</label>
          <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} style={{ width: '100%', height: '50px' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Direction</label>
          <select value={direction} onChange={(e) => setDirection(e.target.value)} className="input-glass">
            <option value="to right">Left to Right</option>
            <option value="to left">Right to Left</option>
            <option value="to bottom">Top to Bottom</option>
            <option value="to top">Bottom to Top</option>
            <option value="45deg">Diagonal 45°</option>
            <option value="135deg">Diagonal 135°</option>
          </select>
        </div>
      </div>
      <div className="glass-card" style={{ padding: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>CSS Code</label>
        <div style={{ display: 'flex', gap: '12px' }}>
          <code className="input-glass" style={{ flex: 1, fontFamily: 'monospace' }}>{css}</code>
          <button onClick={copyCss} className="btn-primary"><Copy size={18} /></button>
        </div>
      </div>
    </div>
  );
}

// Regex Tester
function RegexTesterTool({ addNotification }) {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const found = [...testString.matchAll(regex)];
      setMatches(found.map(m => ({ match: m[0], index: m.index, groups: m.slice(1) })));
      setError(null);
      addNotification(`Found ${found.length} matches!`, 'success');
    } catch (err) {
      setError(err.message);
      setMatches([]);
      addNotification('Invalid regex pattern', 'error');
    }
  };

  return (
    <div>
      <div className="glass-card" style={{ padding: '20px', marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Regex Pattern</label>
        <div style={{ display: 'flex', gap: '12px' }}>
          <span style={{ fontSize: '20px', padding: '12px 8px', background: 'var(--glass-bg)', borderRadius: '8px 0 0 8px' }}>/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern..."
            className="input-glass"
            style={{ flex: 1 }}
          />
          <span style={{ fontSize: '20px', padding: '12px 8px', background: 'var(--glass-bg)' }}>/</span>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="flags"
            className="input-glass"
            style={{ width: '80px' }}
          />
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Test String</label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Enter text to test..."
          className="input-glass"
          style={{ minHeight: '150px' }}
        />
      </div>
      <button onClick={testRegex} className="btn-primary" style={{ marginBottom: '20px' }}>Test Regex</button>
      {error && (
        <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '8px', marginBottom: '20px' }}>
          Error: {error}
        </div>
      )}
      {matches.length > 0 && (
        <div>
          <h4 style={{ marginBottom: '12px', fontWeight: '600' }}>Matches ({matches.length})</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {matches.map((m, i) => (
              <div key={i} className="glass-card" style={{ padding: '12px' }}>
                <strong>"{m.match}"</strong> at index {m.index}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Password Generator
function PasswordGeneratorTool({ addNotification }) {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    let chars = '';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (chars === '') {
      addNotification('Select at least one option', 'warning');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    addNotification('Password generated!', 'success');
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    addNotification('Password copied!', 'success');
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            type="text"
            value={password}
            readOnly
            className="input-glass"
            style={{ flex: 1, fontFamily: 'monospace', fontSize: '18px' }}
          />
          <button onClick={copyPassword} className="btn-secondary"><Copy size={18} /></button>
          <button onClick={generatePassword} className="btn-primary"><RefreshCw size={18} /></button>
        </div>
      </div>
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Length: {length}</label>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />
            Uppercase (A-Z)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} />
            Lowercase (a-z)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
            Numbers (0-9)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
            Symbols (!@#$...)
          </label>
        </div>
        <button onClick={generatePassword} className="btn-primary" style={{ width: '100%', marginTop: '20px' }}>Generate Password</button>
      </div>
    </div>
  );
}

// QR Code Generator
function QrCodeGeneratorTool({ addNotification }) {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const generateQR = async () => {
    if (!text) {
      addNotification('Please enter text to generate QR code', 'warning');
      return;
    }
    try {
      const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setQrCodeUrl(url);
      addNotification('QR code generated!', 'success');
    } catch (error) {
      addNotification('Error generating QR code', 'error');
    }
  };

  const downloadQR = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = 'qrcode.png';
      link.click();
      addNotification('QR code downloaded!', 'success');
    }
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Content</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text, URL, or any content..."
          className="input-glass"
          style={{ minHeight: '100px' }}
        />
      </div>
      <button onClick={generateQR} className="btn-primary" style={{ marginBottom: '24px' }}>Generate QR Code</button>
      {qrCodeUrl && (
        <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
          <img src={qrCodeUrl} alt="QR Code" style={{ maxWidth: '100%', borderRadius: '8px' }} />
          <button onClick={downloadQR} className="btn-primary" style={{ marginTop: '16px' }}>
            <Download size={18} style={{ marginRight: '8px' }} /> Download
          </button>
        </div>
      )}
    </div>
  );
}

// Image to Base64
function ImageToBase64Tool({ addNotification }) {
  const [base64, setBase64] = useState('');
  const [preview, setPreview] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBase64(event.target.result);
        setPreview(event.target.result);
        addNotification('Image converted!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const copyBase64 = () => {
    navigator.clipboard.writeText(base64);
    addNotification('Base64 copied!', 'success');
  };

  return (
    <div>
      <div className="glass-card" style={{ padding: '40px', textAlign: 'center', marginBottom: '20px' }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <label htmlFor="image-upload" className="btn-primary" style={{ cursor: 'pointer' }}>
          <Upload size={18} style={{ marginRight: '8px' }} /> Select Image
        </label>
        <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>or drag and drop an image here</p>
      </div>
      {preview && (
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '12px', fontWeight: '600' }}>Preview</h4>
          <img src={preview} alt="Preview" style={{ maxWidth: '300px', borderRadius: '8px' }} />
        </div>
      )}
      {base64 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h4 style={{ fontWeight: '600' }}>Base64 Output</h4>
            <button onClick={copyBase64} className="btn-secondary"><Copy size={18} /></button>
          </div>
          <textarea
            value={base64}
            readOnly
            className="input-glass"
            style={{ minHeight: '200px', fontFamily: 'monospace', fontSize: '12px' }}
          />
        </div>
      )}
    </div>
  );
}

// Responsive Screen Preview
function ResponsivePreviewTool({ addNotification }) {
  const [url, setUrl] = useState('');
  const [device, setDevice] = useState('desktop');

  const devices = {
    desktop: { width: '100%', label: 'Desktop', icon: Monitor },
    tablet: { width: '768px', label: 'Tablet', icon: Monitor },
    mobile: { width: '375px', label: 'Mobile', icon: Monitor },
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="input-glass"
          style={{ flex: 1 }}
        />
        <select value={device} onChange={(e) => setDevice(e.target.value)} className="input-glass">
          <option value="desktop">Desktop</option>
          <option value="tablet">Tablet</option>
          <option value="mobile">Mobile</option>
        </select>
      </div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {Object.entries(devices).map(([key, dev]) => (
          <button
            key={key}
            onClick={() => setDevice(key)}
            className={`btn-secondary ${device === key ? 'active' : ''}`}
          >
            <dev.icon size={18} style={{ marginRight: '8px' }} />
            {dev.label}
          </button>
        ))}
      </div>
      <div className="glass-card" style={{ padding: '20px', overflow: 'auto' }}>
        <div style={{ 
          width: devices[device].width, 
          height: '600px', 
          margin: '0 auto',
          border: '2px solid var(--glass-border)',
          borderRadius: '8px',
          background: 'white'
        }}>
          {url ? (
            <iframe src={url} style={{ width: '100%', height: '100%', border: 'none' }} title="Preview" />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>
              Enter a URL to preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// SEO Meta Tag Generator
function MetaTagGeneratorTool({ addNotification }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [output, setOutput] = useState('');

  const generateMetaTags = () => {
    const tags = [
      title && `<title>${title}</title>`,
      description && `<meta name="description" content="${description}">`,
      keywords && `<meta name="keywords" content="${keywords}">`,
      author && `<meta name="author" content="${author}">`,
      `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
      `<meta charset="UTF-8">`,
    ].filter(Boolean).join('\n');
    
    setOutput(tags);
    addNotification('Meta tags generated!', 'success');
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    addNotification('Copied to clipboard!', 'success');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <div className="glass-card" style={{ padding: '24px' }}>
        <h4 style={{ marginBottom: '16px', fontWeight: '600' }}>Page Information</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input-glass" placeholder="Page Title" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input-glass" placeholder="Page description..." style={{ minHeight: '80px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Keywords</label>
            <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} className="input-glass" placeholder="keyword1, keyword2, ..." />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Author</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="input-glass" placeholder="Author name" />
          </div>
        </div>
        <button onClick={generateMetaTags} className="btn-primary" style={{ marginTop: '20px', width: '100%' }}>Generate Meta Tags</button>
      </div>
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontWeight: '600' }}>Generated Code</h4>
          {output && <button onClick={copyOutput} className="btn-secondary"><Copy size={18} /></button>}
        </div>
        {output ? (
          <pre className="input-glass" style={{ padding: '16px', fontFamily: 'monospace', fontSize: '13px', whiteSpace: 'pre-wrap' }}>{output}</pre>
        ) : (
          <p style={{ color: 'var(--text-secondary)' }}>Fill in the form to generate meta tags</p>
        )}
      </div>
    </div>
  );
}

// Local Storage Tester
function LocalStorageTesterTool({ addNotification }) {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);

  const loadItems = () => {
    const stored = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      stored.push({ key: k, value: localStorage.getItem(k) });
    }
    setItems(stored);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const saveItem = () => {
    if (!key) {
      addNotification('Please enter a key', 'warning');
      return;
    }
    localStorage.setItem(key, value);
    addNotification('Item saved!', 'success');
    loadItems();
  };

  const deleteItem = (k) => {
    localStorage.removeItem(k);
    addNotification('Item deleted!', 'success');
    loadItems();
  };

  const clearAll = () => {
    localStorage.clear();
    addNotification('All items cleared!', 'success');
    loadItems();
  };

  return (
    <div>
      <div className="glass-card" style={{ padding: '24px', marginBottom: '20px' }}>
        <h4 style={{ marginBottom: '16px', fontWeight: '600' }}>Add/Update Item</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px' }}>
          <input type="text" value={key} onChange={(e) => setKey(e.target.value)} className="input-glass" placeholder="Key" />
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="input-glass" placeholder="Value" />
          <button onClick={saveItem} className="btn-primary">Save</button>
        </div>
      </div>
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontWeight: '600' }}>Stored Items ({items.length})</h4>
          {items.length > 0 && (
            <button onClick={clearAll} className="btn-secondary" style={{ color: 'var(--error-color)' }}>Clear All</button>
          )}
        </div>
        {items.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No items in localStorage</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {items.map(item => (
              <div key={item.key} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', background: 'var(--glass-bg)', borderRadius: '8px' }}>
                <code style={{ flex: 1, fontWeight: '600' }}>{item.key}</code>
                <code style={{ flex: 2, color: 'var(--text-secondary)' }}>{item.value}</code>
                <button onClick={() => deleteItem(item.key)} className="btn-secondary" style={{ padding: '8px' }}><X size={16} /></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Markdown Previewer
function MarkdownPreviewTool({ addNotification }) {
  const [markdown, setMarkdown] = useState('# Hello World\n\nStart writing **markdown** here...');
  const [preview, setPreview] = useState('');

  const parseMarkdown = (text) => {
    // Simple markdown parser
    return text
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/`(.*?)`/gim, '<code>$1</code>')
      .replace(/\n/gim, '<br>');
  };

  useEffect(() => {
    setPreview(parseMarkdown(markdown));
  }, [markdown]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Markdown</label>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="input-glass"
          style={{ minHeight: '500px', fontFamily: 'monospace' }}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Preview</label>
        <div className="glass-card" style={{ minHeight: '500px', padding: '20px', background: 'var(--bg-card)' }} dangerouslySetInnerHTML={{ __html: preview }} />
      </div>
    </div>
  );
}

// HTTP Status Code Checker
function HttpStatusCheckerTool({ addNotification }) {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    if (!url) {
      addNotification('Please enter a URL', 'warning');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
      setStatus({ code: response.status, ok: response.ok });
      addNotification('Status checked!', 'success');
    } catch (error) {
      setStatus({ code: 'Error', message: error.message });
      addNotification('Failed to check status', 'error');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="input-glass"
          style={{ flex: 1 }}
        />
        <button onClick={checkStatus} className="btn-primary" disabled={loading}>
          {loading ? 'Checking...' : 'Check Status'}
        </button>
      </div>
      {status && (
        <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', fontWeight: '700', color: status.code === 200 ? 'var(--success-color)' : 'var(--warning-color)' }}>
            {status.code}
          </div>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            {status.code === 200 ? 'OK' : status.message || 'Unknown'}
          </p>
        </div>
      )}
    </div>
  );
}

// API Tester
function ApiTesterTool({ addNotification }) {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState('{}');
  const [body, setBody] = useState('{}');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    if (!url) {
      addNotification('Please enter a URL', 'warning');
      return;
    }
    setLoading(true);
    try {
      const options = {
        method,
        headers: JSON.parse(headers),
      };
      if (method !== 'GET' && body) {
        options.body = body;
      }
      const res = await fetch(url, options);
      const data = await res.json();
      setResponse({ status: res.status, data });
      addNotification('Request sent!', 'success');
    } catch (error) {
      setResponse({ error: error.message });
      addNotification('Request failed', 'error');
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="input-glass" style={{ width: '120px' }}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
          <option>PATCH</option>
        </select>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          className="input-glass"
          style={{ flex: 1 }}
        />
        <button onClick={sendRequest} className="btn-primary" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Headers (JSON)</label>
          <textarea value={headers} onChange={(e) => setHeaders(e.target.value)} className="input-glass code-editor" style={{ minHeight: '150px' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Body (JSON)</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} className="input-glass code-editor" style={{ minHeight: '150px' }} disabled={method === 'GET'} />
        </div>
      </div>
      {response && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <h4 style={{ marginBottom: '16px', fontWeight: '600' }}>Response</h4>
          {response.error ? (
            <div style={{ color: 'var(--error-color)' }}>{response.error}</div>
          ) : (
            <pre className="input-glass" style={{ padding: '16px', fontFamily: 'monospace', fontSize: '13px', overflow: 'auto' }}>
              Status: {response.status}\n\n{JSON.stringify(response.data, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
