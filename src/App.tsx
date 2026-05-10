import React, { useState, useEffect } from 'react';
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
  const [result, setResult] = useState<ScanResult | null>(null);

  // Inputs
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'amoled');
    
    if (theme === 'amoled') {
      root.style.backgroundColor = '#000000';
    } else if (theme === 'dark') {
      root.style.backgroundColor = '#0f172a'; // slate-900
    } else {
      root.style.backgroundColor = '#f8fafc'; // slate-50
    }
  }, [theme]);

  const handleCheck = async () => {
    if (!input1) return;
    setLoading(true);
    setResult(null);
    setThemeMenuOpen(false);
    try {
      const res = await analyzeContent(view, input1, input2, lang);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setInput1('');
    setInput2('');
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
      "min-h-screen w-full flex flex-col items-center p-4 pt-10 pb-40 selection:bg-blue-500/30 transition-colors duration-500",
      theme === 'light' ? "text-neutral-900" : "text-white"
    )}>
      
      {/* Main Window */}
      <motion.div
        key="window"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "w-full max-w-2xl mac-shadow rounded-3xl overflow-hidden glass border transition-all duration-300",
          theme === 'light' ? "bg-white/90 border-slate-200" : theme === 'dark' ? "bg-slate-800/90 border-white/10" : "bg-black/80 border-white/5"
        )}
      >
        {/* Mac Header */}
        <div className="px-6 py-4 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-black tracking-[0.2em] opacity-80 uppercase">{t.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-wider">Powered by Google AI</span>
          </div>
        </div>


        {/* Window Content */}
        <div className="p-6 sm:p-10 min-h-[380px]">
            <AnimatePresence mode="wait">
              {view === 'education' ? (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tighter">
                      {t.educationTitle}
                    </h2>
                    <p className="text-slate-500 text-sm font-medium">
                      {t.educationDesc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {EDUCATION_CONTENT[lang].map((article) => {
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
                                <span className="block text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{article.category}</span>
                                <h3 className="font-black tracking-tight">{article.title}</h3>
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
                    <h2 className="text-3xl font-black tracking-tighter">
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
                      href="https://saweria.co" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group p-5 glass rounded-2xl border border-pink-500/20 hover:border-pink-500/50 transition-all flex items-center gap-4 bg-pink-500/5"
                    >
                      <div className="p-3 bg-pink-500 rounded-xl text-white">
                        <Heart className="w-5 h-5 fill-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-black text-sm tracking-tight">{lang === 'id' ? 'Dukung Kami' : 'Support Us'}</h4>
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
                        <h4 className="font-black text-sm tracking-tight">Version 1.2.0</h4>
                        <p className="text-[10px] font-bold opacity-60">Stable Release</p>
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
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                    <div className="space-y-1">
                      <h2 className="text-2xl sm:text-3xl font-black tracking-tighter">
                        {view === 'scam' ? t.scamTitle : view === 'hoax' ? t.hoaxTitle : t.pinjolTitle}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-slate-500 text-xs sm:text-sm font-medium">
                          {view === 'scam' ? t.scamDesc : view === 'hoax' ? t.hoaxDesc : t.pinjolDesc}
                        </p>
                        {view === 'pinjol' && (
                          <span className="px-2 py-0.5 bg-green-500/10 text-green-600 rounded text-[9px] font-black border border-green-500/20 flex items-center gap-1 uppercase tracking-tight">
                            <ShieldCheck className="w-3 h-3" />
                            OJK Data 2024
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-[9px] sm:text-[10px] font-black tracking-widest uppercase self-start sm:self-center">Live Monitoring</span>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-50 px-1">{view === 'scam' ? 'URL Link' : view === 'hoax' ? 'News Link' : 'App Name'}</label>
                      <input
                        type="text"
                        value={input1}
                        onChange={(e) => setInput1(e.target.value)}
                        placeholder={view === 'scam' ? t.scamPlaceholder : view === 'hoax' ? t.hoaxPlaceholder : t.pinjolPlaceholder}
                        className={cn(
                          "w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium",
                          theme === 'light' ? "bg-slate-50 text-slate-900" : "bg-slate-900/50 text-white"
                        )}
                      />
                    </div>

                    {view === 'scam' && (
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-50 px-1">Mengaku Sebagai</label>
                        <input
                          type="text"
                          value={input2}
                          onChange={(e) => setInput2(e.target.value)}
                          placeholder={t.claimedEntity}
                          className={cn(
                            "w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium",
                            theme === 'light' ? "bg-slate-50 text-slate-900" : "bg-slate-900/50 text-white"
                          )}
                        />
                      </div>
                    )}

                    <button
                      disabled={loading || !input1}
                      onClick={handleCheck}
                      className={cn(
                        "w-full py-4.5 rounded-xl font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 group transition-all shadow-lg shadow-blue-500/20",
                        loading ? "opacity-70 cursor-not-allowed bg-slate-400" : "bg-blue-600 hover:bg-blue-500 active:scale-95 text-white"
                      )}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {t.checking}
                        </>
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
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">{t.resultTitle}</h3>
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
                        <div className="font-black text-sm sm:text-lg tracking-tighter mb-0.5 sm:mb-1 uppercase">
                          {result.isSafe ? (lang === 'id' ? 'AMAN' : 'SAFE') : (lang === 'id' ? 'BAHAYA' : 'DANGER')}
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Status</p>
                      </div>
                    </div>

                    <div className={cn(
                      "p-6 rounded-2xl glass flex flex-col items-center justify-center gap-1 border border-slate-200 dark:border-white/10",
                      theme === 'light' ? "bg-white" : "bg-slate-900/50"
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
                          <span className="text-[10px] sm:text-base font-black tracking-tighter">{result.trustScore}%</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-0.5 justify-center mb-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={cn(
                                "w-2 h-2", 
                                star <= Math.round(result.trustScore / 20) ? "fill-yellow-400 text-yellow-400" : "text-slate-300 dark:text-white/10"
                              )} 
                            />
                          ))}
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Rating</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                        <Info className="w-3 h-3" />
                        {lang === 'id' ? 'PENJELASAN' : 'EXPLANATION'}
                      </h4>
                      <p className="text-sm leading-relaxed font-medium opacity-90 italic p-4 glass rounded-xl border border-slate-200 dark:bg-white/5 dark:border-white/10">
                        {result.explanation}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                        <Zap className="w-3 h-3" />
                        {lang === 'id' ? 'FAKTOR PENILAIAN' : 'RATING FACTORS'}
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
                      <span className="block text-[10px] font-black uppercase tracking-widest opacity-50 mb-0.5 text-blue-600">{lang === 'id' ? 'Saran Keamanan' : 'Security Advice'}</span>
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
          
        <div className="px-8 py-3 border-t border-black/5 dark:border-white/5 text-[8px] opacity-30 text-center uppercase tracking-[0.3em] font-black">
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
              <div className="glass p-1.5 rounded-2xl flex flex-col min-w-[150px] bg-white/20 shadow-2xl mac-shadow border border-white/20">
                {(['light', 'dark', 'amoled'] as ThemeMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => { setTheme(m); setThemeMenuOpen(false); }}
                    className={cn(
                      "px-4 py-2.5 text-sm font-bold rounded-xl text-left transition-colors flex items-center gap-3",
                      theme === m ? "bg-blue-600 text-white" : "hover:bg-neutral-500/20"
                    )}
                  >
                    <div className="flex items-center justify-center w-5">
                      {m === 'light' ? <Sun className="w-4 h-4 text-orange-400" /> : 
                       m === 'dark' ? <Moon className="w-4 h-4 text-slate-400" /> : 
                       <Zap className="w-4 h-4 text-yellow-400" />}
                    </div>
                    {m === 'light' ? t.lightMode : m === 'dark' ? t.darkMode : t.amoledMode}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="glass p-2 sm:p-2.5 rounded-[2.5rem] flex items-center gap-1 sm:gap-2 shadow-2xl mac-shadow border border-white/20 bg-white/10 backdrop-blur-2xl overflow-x-auto no-scrollbar scroll-smooth pointer-events-auto max-w-full">
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
          <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-1 shrink-0" />

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
        "relative flex flex-col items-center gap-1.5 p-2 px-3 sm:px-4 rounded-2xl transition-all duration-300 group hover:-translate-y-1 active:scale-95 min-w-[70px] sm:min-w-[80px] shrink-0",
        active ? "dock-item-active text-blue-500" : "opacity-60 hover:opacity-100"
      )}
    >
      <div className="transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      
      <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-widest leading-none text-center max-w-[60px] truncate">
        {label}
      </span>
      
      {active && (
        <motion.div 
          layoutId="active-dot"
          className="absolute -bottom-1 w-1 h-1 rounded-full bg-blue-500"
        />
      )}
    </button>
  );
}
