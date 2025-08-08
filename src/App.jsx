// 1.0. App-wide Imports
// 1.1. React Hooks for State and Lifecycle Management
import { useState, useEffect } from 'react';

// 1.2. Icon Library from Lucide React
import {
  Menu, X, UploadCloud, Link, Trash2, Info, Repeat2, ChevronDown,
  ChevronUp, Search, Sun, Moon, Send, CheckCircle
} from 'lucide-react';

// 1.3. Import the new CSS file
import './App.css';

// ======================================================================
// 2.0. App-wide Constants and Data
// ======================================================================

// 2.1. Language Data
const languages = [
  { code: 'auto', name: 'Detect Language' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese (Simplified)' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ur', name: 'Urdu' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'te', name: 'Telugu' },
  { code: 'mr', name: 'Marathi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'or', name: 'Oriya' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'tr', name: 'Turkish' },
];

// ======================================================================
// 3.0. Reusable UI Components
// ======================================================================

// 3.1. MessageBox Component
const MessageBox = ({ message, onClose, type = 'info' }) => {
  let icon, title;
  
  if (type === 'success') {
    icon = <CheckCircle size={24} className="messagebox-icon success" />;
    title = "Success";
  } else if (type === 'error') {
    icon = <Info size={24} className="messagebox-icon error" />;
    title = "Error";
  } else {
    icon = <Info size={24} className="messagebox-icon info" />;
    title = "Attention";
  }

  return (
    <div className="messagebox-backdrop">
      <div className="messagebox-container">
        <div className="messagebox-header">
          {icon}
          <h3 className="messagebox-title">{title}</h3>
        </div>
        <p className="messagebox-message">{message}</p>
        <button
          onClick={onClose}
          className="messagebox-button"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// 3.2. LanguageSelector Component
const LanguageSelector = ({ selectedLang, onLangChange, label, showDetect = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedLanguageName = languages.find(lang => lang.code === selectedLang)?.name || 'Select a language';
  
  const filteredLanguages = languages.filter(lang => {
    if (showDetect && lang.code === 'auto') return true;
    if (!showDetect && lang.code === 'auto') return false;
    return lang.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="language-selector-wrapper">
      <label className="language-selector-label">
        {label}
      </label>
      <div
        className={`language-selector-display ${isExpanded ? 'language-selector-expanded' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{selectedLanguageName}</span>
        <button className="language-selector-toggle-btn" onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="language-selector-dropdown">
          <div className="language-selector-search-container">
            <Search size={18} className="language-selector-search-icon" />
            <input
              type="text"
              placeholder="Search language..."
              className="language-selector-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {filteredLanguages.map(lang => (
            <div
              key={lang.code}
              className="language-selector-option"
              onClick={() => {
                onLangChange({ target: { value: lang.code } });
                setIsExpanded(false);
                setSearchTerm('');
              }}
            >
              {lang.name}
            </div>
          ))}
          {filteredLanguages.length === 0 && (
            <div className="language-selector-no-results">No languages found.</div>
          )}
        </div>
      )}
    </div>
  );
};

// ======================================================================
// 4.0. Page Components
// ======================================================================

// 4.1. HomePage Component
const HomePage = () => {
  const [backendMessage, setBackendMessage] = useState('Connecting to backend...');
  const [transcription, setTranscription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');
  const [transcribeLang, setTranscribeLang] = useState('auto');
  const [message, setMessage] = useState('');

  const handleTranscribe = () => {
    if (!file && !link) {
      setMessage("Please upload a file or paste a link to transcribe.");
      return;
    }
    setIsLoading(true);
    
    setTimeout(() => {
      let simulatedTranscription;
      const langName = languages.find(l => l.code === transcribeLang).name;
      if (file) {
        simulatedTranscription = `Transcription from uploaded file: ${file.name} in ${langName}`;
      } else if (link) {
        simulatedTranscription = `Transcription from social media link: ${link} in ${langName}`;
      }
      setTranscription(simulatedTranscription);
      setIsLoading(false);
    }, 2000);
  };
  
  const handleClear = () => {
    setFile(null);
    setLink('');
    setTranscription('');
    setIsLoading(false);
  };
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setLink('');
    setTranscription('');
  };
  
  const handleLinkChange = (e) => {
    setLink(e.target.value);
    setFile(null);
    setTranscription('');
  };

  useEffect(() => {
    setTimeout(() => {
      setBackendMessage('Connected');
    }, 1000);
  }, []);

  const isClearable = file || link || transcription;
  const isInputReady = file || link;

  return (
    <div className="page-container">
      {message && <MessageBox message={message} onClose={() => setMessage('')} />}
      <div className="page-header">
        <h1 className="main-title">
          Transcriptor
        </h1>
        <p className="subtitle">
          The easiest way to convert your speech to text.
        </p>
      </div>

      <div className="card-container">
        <div className="status-bar">
          <p>Backend Status: {backendMessage}</p>
        </div>
        
        <div className="form-group">
          <LanguageSelector
            selectedLang={transcribeLang}
            onLangChange={(e) => setTranscribeLang(e.target.value)}
            label="Select Transcription Language:"
            showDetect={true}
          />
        </div>

        <div className="form-group-flex">
          <div className="file-upload-container">
            <label className="input-label">
              Upload an audio or video file:
            </label>
            <div className={`file-upload-box ${file ? 'file-upload-active' : ''}`}>
              <input
                type="file"
                onChange={handleFileChange}
                className="file-upload-input"
              />
              <span className="file-upload-text">
                <UploadCloud size={20} className="icon-mr" />
                {file ? file.name : "Choose File..."}
              </span>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">
              Paste a link from Instagram, X, or YouTube:
            </label>
            <input
              type="text"
              value={link}
              onChange={handleLinkChange}
              placeholder="e.g., https://www.youtube.com/watch?v=..."
              className="text-input"
            />
          </div>
        </div>

        <div className="action-buttons">
          <button
            onClick={handleTranscribe}
            disabled={isLoading || !isInputReady}
            className="transcribe-btn"
          >
            {isLoading ? 'Transcribing...' : 'Start Transcription'}
          </button>
          
          {isClearable && (
            <button
              onClick={handleClear}
              className="clear-btn"
            >
              <Trash2 size={20} />
              <span>Clear</span>
            </button>
          )}
        </div>

        <div className="result-section">
          <h2 className="result-title">Transcription Result</h2>
          <div className="result-box">
            {isLoading ? (
              <p className="result-placeholder animate-pulse">Waiting for transcription...</p>
            ) : transcription ? (
              <p className="result-text">{transcription}</p>
            ) : (
              <p className="result-placeholder italic">Upload a file or paste a link to begin.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 4.2. AboutPage Component
const AboutPage = () => {
  return (
    <div className="page-container">
      <div className="card-container text-center">
        <h1 className="section-title">About Transcriptor</h1>
        <p className="section-text">
          Welcome to Transcriptor, a powerful and intuitive tool designed to make your life easier by bridging the gap between spoken words and written text.
        </p>

        <h2 className="section-subtitle">Our Story</h2>
        <p className="section-text">
          The idea for Transcriptor was born out of a simple need: to quickly and efficiently convert audio and video content into a readable format.
        </p>

        <h2 className="section-subtitle">How It Works</h2>
        <p className="section-text">
          Transcriptor is built on a robust, full-stack architecture. The frontend, powered by **React.js**, provides a dynamic and responsive user experience, while the backend, built with **Node.js** and **Express**, handles the heavy lifting of processing your media.
        </p>
      </div>
    </div>
  );
};

// 4.3. ContactPage Component
const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const validateEmail = (email) => {
    return String(email).toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required.';
    if (!email) newErrors.email = 'Email is required.';
    else if (!validateEmail(email)) newErrors.email = 'Please enter a valid email address.';
    if (!message) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Form Submitted:', { name, email, message });
      setModalVisible(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
  };

  const SuccessModal = ({ onClose }) => (
    <div className="messagebox-backdrop">
      <div className="messagebox-container">
        <div className="contact-success-icon-container">
          <CheckCircle size={64} className="contact-success-icon" />
        </div>
        <h3 className="contact-success-title">Thank You!</h3>
        <p className="contact-success-message">Your message has been sent successfully.</p>
        <button
          onClick={onClose}
          className="contact-success-button"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      {modalVisible && <SuccessModal onClose={() => setModalVisible(false)} />}
      <div className="card-container">
        <h1 className="section-title text-center">Contact Us</h1>
        <p className="section-text text-center">
          Have questions or feedback? Fill out the form below and we'll get in touch!
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name" className="input-label font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`text-input ${errors.name ? 'input-error' : ''}`}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="input-label font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`text-input ${errors.email ? 'input-error' : ''}`}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="message" className="input-label font-semibold">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              className={`text-input resize-none ${errors.message ? 'input-error' : ''}`}
            ></textarea>
            {errors.message && <p className="error-message">{errors.message}</p>}
          </div>

          <div className="contact-buttons-container">
            <button
              type="button"
              onClick={handleReset}
              className="reset-btn"
            >
              <Trash2 size={20} />
              <span>Reset</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn"
            >
              {isSubmitting ? (
                <>
                  <svg className="loading-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 4.4. TranslatePage Component
const TranslatePage = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('es');
  const [message, setMessage] = useState('');

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(outputText);
    setOutputText(inputText);
  };
  
  const handleTranslate = () => {
    if (!inputText) {
      setMessage("Please enter text to translate.");
      return;
    }
    const sourceLangName = languages.find(l => l.code === sourceLang)?.name;
    const targetLangName = languages.find(l => l.code === targetLang)?.name;

    const simulatedTranslation = `(Simulated translation of "${inputText}" from ${sourceLangName} to ${targetLangName})`;
    setOutputText(simulatedTranslation);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="page-container">
      {message && <MessageBox message={message} onClose={() => setMessage('')} />}
      <div className="page-header">
        <h1 className="main-title">
          Translate
        </h1>
        <p className="subtitle">
          Break down language barriers with our powerful translation tool.
        </p>
      </div>
      <div className="card-container">
        <div className="translate-grid">
          <div className="translate-column">
            <LanguageSelector
              selectedLang={sourceLang}
              onLangChange={(e) => setSourceLang(e.target.value)}
              label="Source Language"
              showDetect={true}
            />
            <textarea
              className="text-area"
              placeholder="Enter text..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>
          </div>
          
          <div className="swap-button-container">
            <button
              onClick={handleSwapLanguages}
              className="swap-button"
            >
              <Repeat2 size={24} />
            </button>
          </div>
          
          <div className="translate-column">
            <LanguageSelector
              selectedLang={targetLang}
              onLangChange={(e) => setTargetLang(e.target.value)}
              label="Target Language"
            />
            <textarea
              readOnly
              className="text-area read-only"
              placeholder="Translation will appear here..."
              value={outputText}
            ></textarea>
          </div>
        </div>

        <div className="translate-buttons">
          <button
            onClick={handleClear}
            className="clear-btn"
          >
            <Trash2 size={20} />
            <span>Clear</span>
          </button>
          <button
            onClick={handleTranslate}
            disabled={!inputText}
            className="translate-btn"
          >
            Translate
          </button>
        </div>
      </div>
    </div>
  );
};

// ======================================================================
// 5.0. Main App Component
// ======================================================================

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'translate':
        return <TranslatePage />;
      default:
        return <HomePage />;
    }
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsNavOpen(false);
  };
  
      
  // Note: The dark/light mode toggle is a placeholder since the CSS has been
  // converted to a single light theme. You would need to re-implement
  // a theme switching logic with CSS variables or other methods.
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Add logic here to apply dark mode classes or variables
    document.body.classList.toggle('dark-mode', !isDarkMode);
    document.body.classList.toggle('light-mode', isDarkMode);
    // Save the theme preference in localStorage or cookies if needed
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    // Optionally, you can also update the icon state here
    // to reflect the current theme
    // For example, you can use a state variable to toggle the icon
    // and update it in the render method.  
    // setIsDarkMode(!isDarkMode);

  };

  return (
    <div className="app-container">
      
      {/* 5.7. Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <a
            href="#"
            onClick={() => handleNavClick('home')}
            className="navbar-brand"
          >
            Transcriptor
          </a>

          {/* 5.7.1. Desktop Navigation Links */}
          <div className="navbar-links-desktop">
            <button
              onClick={() => handleNavClick('home')}
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('translate')}
              className={`nav-link ${currentPage === 'translate' ? 'active' : ''}`}
            >
              Translate
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
            >
              Contact
            </button>
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>

          {/* 5.7.2. Mobile Menu Button */}
          <div className="navbar-mobile-toggle-container">
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="mobile-menu-btn"
            >
              {isNavOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* 5.7.3. Mobile Dropdown Menu */}
        <div className={`navbar-mobile-menu ${isNavOpen ? 'is-open' : ''}`}>
          <div className="navbar-mobile-links">
            <button
              onClick={() => handleNavClick('home')}
              className={`mobile-nav-link ${currentPage === 'home' ? 'active' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('translate')}
              className={`mobile-nav-link ${currentPage === 'translate' ? 'active' : ''}`}
            >
              Translate
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`mobile-nav-link ${currentPage === 'about' ? 'active' : ''}`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`mobile-nav-link ${currentPage === 'contact' ? 'active' : ''}`}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* 5.8. Main content area, conditionally rendered */}
      <main className="main-content">
        {renderPage()}
      </main>
      
      {/* 5.9. Footer */}
      <footer className="footer">
        <p className="footer-text">© 2024 Transcriptor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
