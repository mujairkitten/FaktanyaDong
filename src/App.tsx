import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  Newspaper, 
  Wallet, 
  Moon, 
  Sun, 
  Monitor, 
  Languages, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  Loader2,
  X,
  Star,
  ShieldCheck,
  Zap,
  BookOpen,
  ChevronRight,
  ExternalLink,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { 
  ThemeMode, 
  Language, 
  ViewType, 
  ScanResult, 
  TRANSLATIONS 
} from './types';
import { analyzeContent } from './services/aiService';
import { EDUCATION_CONTENT } from './constants';

// Utility for cleaner class names
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [lang, setLang] = useState<Language>('id');
  const [view, setView] = useState<ViewType>('scam');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);

  // Inputs
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input1Touched, setInput1Touched] = useState(false);
  const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,12})(\/.*)?$/i;
  const isUrlInvalid = view === 'scam' && input1.length > 0 && !URL_REGEX.test(input1);

  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [scoreExplainOpen, setScoreExplainOpen] = useState(false);

  // Custom scrollbar states for Dock
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [hasScrollbar, setHasScrollbar] = useState(false);

  const updateScrollPercent = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollRange = el.scrollWidth - el.clientWidth;
      if (scrollRange > 0) {
        setHasScrollbar(true);
        const percent = (el.scrollLeft / scrollRange) * 100;
        setScrollPercent(percent);
      } else {
        setHasScrollbar(false);
      }
    }
  };

  useEffect(() => {
    // Wait a brief tick to let elements render and calculate scrollWidth
    const timer = setTimeout(updateScrollPercent, 100);
    
    window.addEventListener('resize', updateScrollPercent);
    
    const el = scrollContainerRef.current;
    if (!el) return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScrollPercent);
    };
    
    const observer = new ResizeObserver(() => {
      updateScrollPercent();
    });
    observer.observe(el);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScrollPercent);
      observer.disconnect();
    };
  }, []);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'amoled');
    root.classList.add(theme);
    if (theme === 'amoled') {
      root.classList.add('dark');
    }
    
    if (theme === 'amoled') {
      root.style.backgroundColor = '#000000';
      root.style.backgroundImage = 'none';
      root.style.backgroundAttachment = 'scroll';
      document.body.style.backgroundColor = '#000000';
    } else if (theme === 'dark') {
      root.style.backgroundColor = '#020617';
      root.style.backgroundImage = 'linear-gradient(135deg, #0f172a 0%, #020617 100%)';
      root.style.backgroundAttachment = 'fixed';
      document.body.style.backgroundColor = '#020617';
    } else {
      root.style.backgroundColor = '#f8fafc';
      root.style.backgroundImage = 'none';
      root.style.backgroundAttachment = 'scroll';
      document.body.style.backgroundColor = '#f8fafc';
    }
  }, [theme]);

  const handleCheck = async () => {
    if (!input1) return;
    setLoading(true);
    setLoadingStep(0);
    setResult(null);
    setThemeMenuOpen(false);

    // Simulate step progression
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < t.loadingStages.length - 1) return prev + 1;
        return prev;
      });
    }, 1500);

    try {
      const res = await analyzeContent(view, input1, input2, lang);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  const reset = () => {
    setInput1('');
    setInput2('');
    setInput1Touched(false);
    setResult(null);
    setThemeMenuOpen(false);
    setSelectedArticleId(null);
  };

  const getThemeIcon = () => {
    if (theme === 'light') return <Sun className="w-5 h-5" />;
    if (theme === 'dark') return <Moon className="w-5 h-5" />;
    return <Monitor className="w-5 h-5" />;
  };

  return (
    <div className={cn(
      "min-h-screen w-full flex flex-col items-center p-4 pt-10 pb-40 selection:bg-blue-500/30 transition-all duration-700",
      theme === 'light' 
        ? "bg-[#f8fafc] text-neutral-900" 
        : theme === 'dark' 
          ? "bg-gradient-to-br from-[#0f172a] via-[#050a1a] to-[#020617] bg-fixed text-white" 
          : "bg-black text-white"
    )}>
      
      {/* Main Window */}
      <motion.div
        key="window"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "w-full max-w-2xl mac-shadow rounded-3xl overflow-hidden backdrop-blur-3xl border transition-all duration-500",
          theme === 'light' 
            ? "bg-white/70 border-white/50" 
            : theme === 'dark' 
              ? "bg-mac-bg-dark/60 border-white/10" 
              : "bg-black/60 border-white/5"
        )}
      >
        {/* Mac Header */}
        <div className="px-6 py-4 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-display font-black tracking-[-0.05em] opacity-80">{t.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-wider">Powered by Google AI</span>
          </div>
        </div>


        {/* Window Content */}
        <div className="p-6 sm:p-10 min-h-[380px]">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col items-center justify-center h-full py-10 space-y-8"
                >
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShieldAlert className="w-10 h-10 text-blue-500 animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-display font-black tracking-tight animate-pulse">
                      {t.loadingStages[loadingStep]}
                    </h3>
                    
                    <div className="flex gap-2 justify-center">
                      {[0, 1, 2, 3].map((i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "w-2 h-2 rounded-full transition-all duration-500",
                            i <= loadingStep ? "bg-blue-500 scale-125" : "bg-slate-300 dark:bg-white/10"
                          )} 
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                    <div className="p-3 glass rounded-xl border border-white/10 flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Zap className={cn("w-4 h-4 text-blue-500", loadingStep >= 1 && "animate-bounce")} />
                      </div>
                      <span className="text-[8px] font-display font-black uppercase tracking-tighter opacity-40">Scanning</span>
                    </div>
                    <div className="p-3 glass rounded-xl border border-white/10 flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Star className={cn("w-4 h-4 text-yellow-500", loadingStep >= 2 && "animate-spin")} />
                      </div>
                      <span className="text-[8px] font-display font-black uppercase tracking-tighter opacity-40">Verifying</span>
                    </div>
                  </div>
                </motion.div>
              ) : view === 'education' ? (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter">
                      {t.educationTitle}
                    </h2>
                    <p className="text-slate-500 text-sm font-medium">
                      {t.educationDesc}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    {[0, 1].map((colIdx) => (
                      <div key={colIdx} className="flex-1 flex flex-col gap-4 w-full">
                        {EDUCATION_CONTENT[lang]
                          .filter((_, idx) => idx % 2 === colIdx)
                          .map((article) => {
                            const isSelected = selectedArticleId === article.id;
                            const IconLabel = article.icon === 'ShieldCheck' ? ShieldCheck : 
                                            article.icon === 'ShieldAlert' ? ShieldAlert :
                                            article.icon === 'Newspaper' ? Newspaper : Wallet;
                            
                            return (
                              <div 
                                key={article.id}
                                className={cn(
                                  "glass rounded-2xl border transition-all duration-300 overflow-hidden",
                                  theme === 'light' ? "border-slate-200" : "border-white/10",
                                  isSelected ? "ring-2 ring-blue-500" : "hover:border-blue-500/50"
                                )}
                              >
                                <button 
                                  onClick={() => setSelectedArticleId(isSelected ? null : article.id)}
                                  className="w-full p-5 flex items-center justify-between group"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-600/10 text-blue-600 rounded-xl">
                                      <IconLabel className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                      <span className="block text-[10px] font-display font-black uppercase tracking-widest opacity-40 mb-1">{article.category}</span>
                                      <h3 className="font-display font-black tracking-tight">{article.title}</h3>
                                    </div>
                                  </div>
                                  <ChevronRight className={cn(
                                    "w-5 h-5 transition-transform duration-300 opacity-30",
                                    isSelected ? "rotate-90 opacity-100" : "group-hover:translate-x-1"
                                  )} />
                                </button>
      
                                <AnimatePresence>
                                  {isSelected && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                    >
                                      <div className="px-5 pb-5 border-t border-black/5 dark:border-white/5 pt-4">
                                        <ul className="space-y-3">
                                          {article.content.map((item, i) => (
                                            <li key={i} className="flex gap-3 text-sm font-medium leading-relaxed opacity-80">
                                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                                              {item}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : view === 'about' ? (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2 text-center">
                    <div className="mx-auto w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg mb-4">
                      <ShieldAlert className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-5xl font-display font-black tracking-[-0.1em]">
                      FaktanyaDong
                    </h2>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-[0.2em] opacity-60">
                      {t.subtitle}
                    </p>
                  </div>

                  <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
                    <p className="text-sm font-medium leading-relaxed opacity-80">
                      {lang === 'id' ? 
                        'FaktanyaDong adalah platform berbasis AI yang didedikasikan untuk membantu masyarakat mengidentifikasi upaya penipuan (scam), berita bohong (hoax), dan pinjaman online ilegal secara cepat dan akurat.' : 
                        'FaktanyaDong is an AI-powered platform dedicated to helping people identify scams, hoaxes, and illegal online loans quickly and accurately.'
                      }
                    </p>
                    <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                      <p className="text-xs font-bold text-blue-600">
                        {lang === 'id' ? 
                          '🚀 Dibuat dengan kecerdasan buatan (Google Gemini) oleh Mujairkitten untuk masa depan digital yang lebih aman.' : 
                          '🚀 Built with artificial intelligence (Google Gemini) by Mujairkitten for a safer digital future.'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a 
                      href="https://saweria.co/mujairkitten" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group p-5 glass rounded-2xl border border-pink-500/20 hover:border-pink-500/50 transition-all flex items-center gap-4 bg-pink-500/5"
                    >
                      <div className="p-3 bg-pink-500 rounded-xl text-white">
                        <Heart className="w-5 h-5 fill-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-display font-black text-sm tracking-tight">{lang === 'id' ? 'Dukung Kami' : 'Support Us'}</h4>
                        <p className="text-[10px] font-bold opacity-60 flex items-center gap-1">
                          Saweria.co <ExternalLink className="w-2.5 h-2.5" />
                        </p>
                      </div>
                    </a>

                    <div className="p-5 glass rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-4">
                      <div className="p-3 bg-slate-200 dark:bg-white/10 rounded-xl">
                        <Info className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-display font-black text-sm tracking-tight">Version 26.05.11 BETA</h4>
                        <p className="text-[10px] font-bold opacity-60">Beta Release</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={reset}
                    className="w-full py-4 glass rounded-xl font-black text-xs tracking-[0.2em] uppercase hover:bg-neutral-500/10 transition-colors shadow-sm"
                  >
                    {t.back}
                  </button>
                </motion.div>
              ) : !result ? (
                <motion.div
                  key={view}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                    <div className="space-y-1">
                      <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter">
                        {view === 'scam' ? t.scamTitle : view === 'hoax' ? t.hoaxTitle : t.pinjolTitle}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-slate-500 text-xs sm:text-sm font-medium">
                          {view === 'scam' ? t.scamDesc : view === 'hoax' ? t.hoaxDesc : t.pinjolDesc}
                        </p>
                        {view === 'pinjol' && (
                          <span className="px-2 py-0.5 bg-green-500/10 text-green-600 rounded text-[9px] font-display font-black border border-green-500/20 flex items-center gap-1 uppercase tracking-tight">
                            <ShieldCheck className="w-3 h-3" />
                            {t.ojkData}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-display font-black tracking-widest uppercase self-start sm:self-center transition-colors duration-500",
                      theme === 'light' 
                        ? "bg-red-100 text-red-700" 
                        : "bg-red-950/50 text-red-400 border border-red-500/20"
                    )}>
                      {t.liveMonitoring}
                    </span>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-50 px-1">
                        {view === 'scam' ? t.urlLabel : view === 'hoax' ? t.newsLabel : t.appNameLabel}
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          value={input1}
                          onBlur={() => setInput1Touched(true)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !loading && input1 && !isUrlInvalid) {
                              handleCheck();
                            }
                          }}
                          onChange={(e) => {
                            setInput1(e.target.value);
                            if (!input1Touched) setInput1Touched(true);
                          }}
                          placeholder={view === 'scam' ? t.scamPlaceholder : view === 'hoax' ? t.hoaxPlaceholder : t.pinjolPlaceholder}
                          className={cn(
                            "w-full px-5 py-4 pr-12 rounded-xl border border-slate-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium",
                            theme === 'light' ? "bg-slate-50 text-slate-900" : "bg-mac-bg-dark/50 text-white",
                            input1Touched && (!input1 || isUrlInvalid) && "border-red-500 focus:ring-red-500"
                          )}
                        />
                        {input1 && (
                          <button 
                            onClick={() => setInput1('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors opacity-40 hover:opacity-100"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      {input1Touched && !input1 && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-[10px] font-bold px-1 mt-1"
                        >
                          {t.errorEmpty}
                        </motion.p>
                      )}
                      {input1Touched && input1 && isUrlInvalid && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-[10px] font-bold px-1 mt-1"
                        >
                          {t.errorInvalidUrl}
                        </motion.p>
                      )}
                    </div>

                    {view === 'scam' && (
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-50 px-1">{t.claimedLabel}</label>
                      <div className="relative group">
                        <input
                          type="text"
                          value={input2}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !loading && input1 && !isUrlInvalid) {
                              handleCheck();
                            }
                          }}
                          onChange={(e) => setInput2(e.target.value)}
                          placeholder={t.claimedEntity}
                          className={cn(
                            "w-full px-5 py-4 pr-12 rounded-xl border border-slate-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium",
                            theme === 'light' ? "bg-slate-50 text-slate-900" : "bg-mac-bg-dark/50 text-white"
                          )}
                        />
                        {input2 && (
                          <button 
                            onClick={() => setInput2('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors opacity-40 hover:opacity-100"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      </div>
                    )}

                    <button
                      disabled={loading || !input1 || isUrlInvalid}
                      onClick={handleCheck}
                      className={cn(
                        "w-full py-4.5 rounded-xl font-display font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 group transition-all shadow-lg shadow-blue-500/20",
                        (loading || !input1 || isUrlInvalid) ? "opacity-70 cursor-not-allowed bg-slate-400" : "bg-blue-600 hover:bg-blue-500 active:scale-95 text-white"
                      )}
                    >
                      {loading ? (
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center gap-3">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>{t.loadingStages[loadingStep]}</span>
                          </div>
                          <div className="w-48 h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
                            <motion.div 
                              className="h-full bg-white"
                              initial={{ width: "0%" }}
                              animate={{ width: `${((loadingStep + 1) / t.loadingStages.length) * 100}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          {lang === 'id' ? 'ANALISIS SEKARANG' : 'ANALYZE NOW'}
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4">
                    <h3 className="text-[10px] font-display font-black uppercase tracking-[0.2em] opacity-50">{t.resultTitle}</h3>
                    <button 
                      onClick={reset}
                      className="p-1.5 rounded-lg hover:bg-neutral-500/20 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className={cn(
                      "p-6 rounded-2xl flex flex-col items-center justify-center gap-2 border border-dashed",
                      result.isSafe 
                        ? "bg-green-500/5 text-green-700 border-green-200 dark:border-green-500/20" 
                        : "bg-red-50 text-red-800 border-red-200 dark:bg-red-500/5 dark:text-red-400 dark:border-red-500/20"
                    )}>
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-md",
                        result.isSafe ? "bg-green-600 text-white" : "bg-red-600 text-white"
                      )}>
                        {result.isSafe ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                      </div>
                      <div className="text-center">
                        <div className="font-display font-black text-sm sm:text-lg tracking-tighter mb-0.5 sm:mb-1 uppercase">
                          {result.isSafe ? (lang === 'id' ? 'SANGAT AMAN' : 'VERY SAFE') : (lang === 'id' ? 'BERBAHAYA' : 'DANGEROUS')}
                        </div>
                        <p className="text-[10px] font-display font-black uppercase tracking-widest opacity-60">
                          {lang === 'id' ? 'Tingkat Keamanan' : 'Safety Status'}
                        </p>
                      </div>
                    </div>

                    <div className={cn(
                      "p-6 rounded-2xl glass flex flex-col items-center justify-center gap-1 border border-slate-200 dark:border-white/10",
                      theme === 'light' ? "bg-white" : "bg-mac-bg-dark/50"
                    )}>
                      <div className="relative w-12 h-12">
                         <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            className="text-slate-200 dark:text-white/5"
                            strokeWidth="10"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                          <motion.circle
                            className="text-blue-600"
                            strokeWidth="10"
                            strokeDasharray={251.2}
                            initial={{ strokeDashoffset: 251.2 }}
                            animate={{ strokeDashoffset: 251.2 - (251.2 * result.trustScore) / 100 }}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[10px] sm:text-base font-display font-black tracking-tighter">{result.trustScore}%</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-0.5 justify-center mb-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={cn(
                                "w-2.5 h-2.5", 
                                star <= Math.round(result.trustScore / 20) ? "fill-yellow-400 text-yellow-400" : "text-slate-300 dark:text-white/10"
                              )} 
                            />
                          ))}
                        </div>
                        <p className="text-[10px] font-display font-black uppercase tracking-widest opacity-60">
                          {lang === 'id' ? 'Kepercayaan AI' : 'AI Trust Score'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Penjelasan Interaktif Persen & Bintang untuk Orang Awam */}
                  <div className="glass rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden transition-all duration-300 shadow-sm">
                    <button 
                      onClick={() => setScoreExplainOpen(!scoreExplainOpen)}
                      className="w-full px-4 py-3.5 flex items-center justify-between text-left transition-colors hover:bg-neutral-500/5"
                      id="btn-explain-score"
                    >
                      <div className="flex items-center gap-2">
                        <Info className="w-4.5 h-4.5 text-blue-500" />
                        <span className="text-xs font-display font-black tracking-tight text-neutral-800 dark:text-slate-200">
                          {lang === 'id' ? 'Bagaimana AI menghitung persen & bintang di atas?' : 'How does the AI calculate these percentages & stars?'}
                        </span>
                      </div>
                      <span className="text-[10px] text-blue-500 dark:text-blue-400 font-bold hover:underline shrink-0">
                        {scoreExplainOpen ? (lang === 'id' ? 'Sembunyikan' : 'Hide') : (lang === 'id' ? 'Pelajari di Sini ℹ️' : 'Learn Here ℹ️')}
                      </span>
                    </button>
                    
                    <AnimatePresence>
                      {scoreExplainOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-black/5 dark:border-white/5 bg-slate-500/5 p-4 text-xs space-y-3.5 leading-relaxed text-slate-700 dark:text-slate-300"
                        >
                          <div>
                            <p className="font-bold mb-1.5 opacity-90">
                              {lang === 'id' 
                                ? '🔍 Cara AI Memeriksa Konten Anda:' 
                                : '🔍 How the AI Inspects Your Content:'}
                            </p>
                            <p className="mb-2">
                              {lang === 'id'
                                ? 'Kecerdasan buatan kami tidak asal menebak. Saat Anda menekan tombol periksa, AI akan langsung menjelajahi Google untuk melihat apakah konten tersebut pernah dilaporkan oleh media resmi, Kominfo, OJK, atau basis data penipuan.'
                                : 'Our AI doesn\'t guess. When you press check, it instantly searches Google to find if the content matches reports by official media, authority blacklists, or fraud registries.'}
                            </p>
                          </div>

                          <div className="border-t border-black/5 dark:border-white/5 pt-3.5">
                            <p className="font-bold mb-1.5 opacity-90">
                              {lang === 'id' ? '📈 Arti Skor Persen (%):' : '📈 What the Percentages Mean:'}
                            </p>
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <span className="text-base leading-none">🟢</span>
                                <div>
                                  <strong>80% - 100%</strong>: {lang === 'id' ? 'Sangat Aman & Terpercaya. Konten terdaftar resmi di lembaga pemerintah (seperti OJK/Kominfo) atau dipublikasikan oleh media luar negeri/lokal yang kredibel.' : 'Highly Safe & Trustworthy. Officially registered with regulatory bodies or published by highly credible news networks.'}
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-base leading-none">🟡</span>
                                <div>
                                  <strong>50% - 79%</strong>: {lang === 'id' ? 'Perlu Waspada/Mencurigakan. Belum dapat dipastikan aman sepenuhnya karena tidak ada catatan resmi, atau ada sedikit unsur mencurigakan secara bahasa.' : 'Suspicious / Lack of Official Info. Not fully proven safe due to absence of official records, or displays mild anomalies.'}
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-base leading-none">🔴</span>
                                <div>
                                  <strong>0% - 49%</strong>: {lang === 'id' ? 'Sangat Berbahaya! Terdeteksi kuat sebagai sindikat penipuan online (phishing), berita palsu (hoax), atau layanan pinjaman online ilegal yang merugikan.' : 'Highly Dangerous! Strongly identified as phishing fraud, fabrication (fake news hoax), or an unregistered predatory lender.'}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-black/5 dark:border-white/5 pt-3.5">
                            <p className="font-bold mb-1 opacity-90">
                              {lang === 'id' ? '⭐️ Arti Jumlah Bintang:' : '⭐️ What the Stars Mean:'}
                            </p>
                            <p>
                              {lang === 'id'
                                ? 'Bintang dihitung otomatis dari pembagian skor persen ke dalam skala 5 tingkat (persen dibagi 20). Semakin banyak bintang kuning berkilau, semakin tebal jaminan keamanannya!'
                                : 'Stars are automatically mapped on a 5-level scale directly from the percentage (percentage divided by 20). More yellow stars imply thicker levels of verification!'}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-display font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                        <Info className="w-3 h-3" />
                        {t.explanationLabel}
                      </h4>
                      <p className="text-sm leading-relaxed font-medium opacity-90 italic p-4 glass rounded-xl border border-slate-200 dark:bg-white/5 dark:border-white/10">
                        {result.explanation}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-display font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                        <Zap className="w-3 h-3" />
                        {t.factorsLabel}
                      </h4>
                      <ul className="space-y-1.5">
                        {result.factors?.map((factor, i) => (
                          <li key={i} className="text-xs font-bold flex items-center gap-2 p-3 glass rounded-lg border border-blue-500/10 dark:bg-blue-500/5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={cn(
                    "p-5 rounded-xl border flex items-center gap-4",
                    theme === 'light' ? "bg-blue-50/50 border-blue-200" : "bg-blue-500/5 border-white/5"
                  )}>
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0">
                      <Info className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-display font-black uppercase tracking-widest opacity-50 mb-0.5 text-blue-600">{t.adviceLabel}</span>
                      <p className="text-sm font-medium leading-relaxed">{result.recommendation}</p>
                    </div>
                  </div>

                  <button
                    onClick={reset}
                    className="w-full py-4 glass rounded-xl font-black text-xs tracking-[0.2em] uppercase hover:bg-neutral-500/10 transition-colors shadow-sm"
                  >
                    {t.back}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        <div className={cn(
          "px-8 py-4 border-t text-[10px] text-center uppercase tracking-[0.2em] font-display font-black transition-colors duration-500",
          theme === 'light' ? "border-black/5 text-slate-500" : "border-white/5 text-slate-400"
        )}>
          {t.disclaimer}
        </div>
      </motion.div>

      {/* macOS Dock */}
      <div className="fixed bottom-6 left-0 right-0 z-[100] flex flex-col items-center px-4 pointer-events-none">
        
        <AnimatePresence>
          {themeMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="mb-4 pointer-events-auto"
            >
              <div className={cn(
                "p-1.5 rounded-2xl flex flex-col min-w-[160px] shadow-2xl mac-shadow border backdrop-blur-3xl transition-all duration-300",
                theme === 'light' 
                  ? "bg-white/95 border-black/10 text-slate-800"
                  : theme === 'dark'
                    ? "bg-slate-900/95 border-white/10 text-white"
                    : "bg-black/95 border-white/10 text-white"
              )}>
                {(['light', 'dark', 'amoled'] as ThemeMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => { setTheme(m); setThemeMenuOpen(false); }}
                    className={cn(
                      "px-4 py-2.5 text-xs sm:text-sm font-black rounded-xl text-left transition-all flex items-center gap-3 active:scale-95",
                      theme === m 
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                        : theme === 'light'
                          ? "text-slate-700 hover:bg-slate-100 hover:text-blue-600" 
                          : "text-slate-300 hover:bg-white/5 hover:text-blue-400"
                    )}
                  >
                    <div className="flex items-center justify-center w-5 shrink-0">
                      {m === 'light' ? <Sun className={cn("w-4 h-4 transition-colors", theme === m ? "text-white" : "text-orange-500")} /> : 
                       m === 'dark' ? <Moon className={cn("w-4 h-4 transition-colors", theme === m ? "text-white" : "text-slate-400")} /> : 
                       <Zap className={cn("w-4 h-4 transition-colors", theme === m ? "text-white" : "text-yellow-405")} />}
                    </div>
                    <span>{m === 'light' ? t.lightMode : m === 'dark' ? t.darkMode : t.amoledMode}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={cn(
          "rounded-[2.5rem] shadow-2xl mac-shadow border backdrop-blur-3xl overflow-hidden pointer-events-auto max-w-full flex flex-col transition-all duration-300",
          theme === 'light' 
            ? "border-black/10 bg-white/85 text-neutral-800" 
            : theme === 'dark' 
              ? "border-white/10 bg-slate-950/70 text-white" 
              : "border-white/10 bg-black/85 text-white"
        )}>
          <div 
            ref={scrollContainerRef}
            onScroll={updateScrollPercent}
            className={cn(
              "flex items-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-4.5 overflow-x-auto no-scrollbar scroll-smooth w-full transition-all duration-300",
              hasScrollbar ? "pt-3 pb-1 sm:pt-4 sm:pb-1.5" : "pt-3.5 pb-3.5 sm:pt-4.5 sm:pb-4.5"
            )}
          >
            <DockItem 
              active={view === 'scam'} 
              onClick={() => { setView('scam'); reset(); }}
              icon={<ShieldAlert className="w-7 h-7" />}
              label={t.scamTitle}
            />
            <DockItem 
              active={view === 'hoax'} 
              onClick={() => { setView('hoax'); reset(); }}
              icon={<Newspaper className="w-7 h-7" />}
              label={t.hoaxTitle}
            />
            <DockItem 
              active={view === 'pinjol'} 
              onClick={() => { setView('pinjol'); reset(); }}
              icon={<Wallet className="w-7 h-7" />}
              label={t.pinjolTitle}
            />
            <DockItem 
              active={view === 'education'} 
              onClick={() => { setView('education'); reset(); }}
              icon={<BookOpen className="w-7 h-7" />}
              label={t.educationTitle}
            />

            {/* Separator */}
            <div className={cn(
              "w-px h-10 mx-1 shrink-0 transition-all duration-500",
              theme === 'light' ? "bg-black/10" : "bg-white/10"
            )} />

            {/* Settings Group */}
            <DockItem 
              active={false} 
              onClick={() => setLang(prev => prev === 'id' ? 'en' : 'id')}
              icon={<Languages className="w-6 h-6" />}
              label={t.language}
            />
            
            <DockItem 
              active={themeMenuOpen} 
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              icon={getThemeIcon()}
              label={t.theme}
            />
            
            <DockItem 
              active={view === 'about'} 
              onClick={() => { setView('about'); reset(); }}
              icon={<Info className="w-6 h-6" />}
              label={t.aboutTitle}
            />
          </div>

          {/* Custom Glowing macOS-Style Permanent Scrollbar */}
          {hasScrollbar && (
            <div className="flex justify-center items-center w-full pb-3 pt-1 px-4">
              <div 
                className={cn(
                  "h-1.5 w-36 rounded-full relative overflow-hidden transition-all duration-300 border",
                  theme === 'light' 
                    ? "bg-slate-200 border-black/5" 
                    : theme === 'dark'
                      ? "bg-slate-900 border-white/5"
                      : "bg-zinc-900 border-white/5"
                )}
              >
                <div 
                  style={{ 
                    left: `${(scrollPercent / 100) * 65}%`, // 100 - thumb width (35) = 65% sliding range
                    width: '35%'
                  }}
                  className={cn(
                    "h-full rounded-full absolute top-0 transition-all duration-75",
                    theme === 'light' 
                      ? "bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]" 
                      : theme === 'dark'
                        ? "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.7)]"
                        : "bg-blue-400 shadow-[0_0_14px_rgba(96,165,250,0.9)]"
                  )}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DockItem({ active, onClick, icon, label }: { 
  active: boolean, 
  onClick: () => void, 
  icon: React.ReactNode,
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center gap-1.5 pt-2 pb-3.5 px-3 sm:px-4 rounded-2xl transition-all duration-300 group hover:-translate-y-1 active:scale-95 min-w-[70px] sm:min-w-[80px] shrink-0",
        active 
          ? "text-blue-600 dark:text-blue-400 font-extrabold filter drop-shadow-[0_2px_8px_rgba(59,130,246,0.3)]" 
          : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 opacity-80 hover:opacity-100"
      )}
    >
      <div className="transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      
      <span className="text-[7.5px] sm:text-[9.5px] font-display font-black uppercase tracking-widest leading-tight text-center max-w-none whitespace-normal px-0.5">
        {label}
      </span>
      
      {active && (
        <motion.div 
          layoutId="active-dot"
          className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.95)] dark:shadow-[0_0_12px_rgba(96,165,250,1)]"
        />
      )}
    </button>
  );
}
