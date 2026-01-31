
import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Calendar, 
  Menu, 
  X, 
  Heart, 
  ChevronDown, 
  Instagram, 
  Facebook,
  MessageCircle,
  ArrowRight,
  Star,
  Music,
  Gem,
  Check,
  Trash2,
  ExternalLink,
  Copy
} from 'lucide-react';
import { View, Product, NailService, BookingState, Locale } from './types';
import { JEWELRY_PRODUCTS, NAIL_SERVICES } from './constants';
import { getStyleAdvice } from './services/geminiService';
import { UI_TRANSLATIONS } from './translations';

const FB_LINK = "https://www.facebook.com/jie.pan.5667";
const MS_LINK = "https://m.me/jie.pan.5667";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [lang, setLang] = useState<Locale>('fr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [booking, setBooking] = useState<Partial<BookingState>>({});
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const t = (key: string) => UI_TRANSLATIONS[key]?.[lang] || key;

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const calculateTotal = () => cart.reduce((sum, p) => sum + p.price, 0);

  const checkoutViaMessenger = async () => {
    if (cart.length === 0) return;
    
    const items = cart.map(p => `- ${p.name[lang]} ($${p.price})`).join('\n');
    const message = `Bonjour Panda J! J'aimerais commander:\n${items}\nTotal: $${calculateTotal()}\nMerci!`;
    
    try {
      await navigator.clipboard.writeText(message);
      triggerToast();
      
      setTimeout(() => {
        window.open(MS_LINK, '_blank');
        setCart([]); 
        setIsCartOpen(false); 
      }, 1000);
    } catch (err) {
      window.open(`${MS_LINK}?text=${encodeURIComponent(message)}`, '_blank');
      setCart([]);
      setIsCartOpen(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const serviceName = NAIL_SERVICES.find(s => s.id === booking.serviceId)?.name[lang] || "";
    const message = `Bonjour Panda J! Je souhaite réserver un rendez-vous:\nService: ${serviceName}\nDate: ${booking.date}\nHeure: ${booking.time}\nNom: ${booking.customerName}\nContact: ${booking.customerContact}`;
    
    try {
      await navigator.clipboard.writeText(message);
      triggerToast();
      setTimeout(() => {
        window.open(MS_LINK, '_blank');
        setCurrentView('home');
        setBooking({});
      }, 1000);
    } catch (err) {
      window.open(`${MS_LINK}?text=${encodeURIComponent(message)}`, '_blank');
      setCurrentView('home');
      setBooking({});
    }
  };

  const askAi = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    setAiResponse(null);
    const result = await getStyleAdvice(aiPrompt, JEWELRY_PRODUCTS, NAIL_SERVICES, lang);
    setAiResponse(result || null);
    setIsAiLoading(false);
  };

  const NavItem: React.FC<{ view: View; labelKey: string }> = ({ view, labelKey }) => (
    <button
      onClick={() => { setCurrentView(view); setIsMenuOpen(false); }}
      className={`px-4 py-2 text-sm font-bold tracking-wide rounded-full transition-all ${
        currentView === view ? 'bg-pink-100 text-pink-600' : 'text-gray-500 hover:text-pink-500 hover:bg-pink-50'
      }`}
    >
      {t(labelKey)}
    </button>
  );

  const LanguageSwitcher = () => {
    const languages: { code: Locale; label: string }[] = [
      { code: 'fr', label: 'FR - Français' },
      { code: 'en', label: 'EN - English' },
      { code: 'zh', label: 'ZH - 中文' }
    ];
    return (
      <div className="relative" ref={langDropdownRef}>
        <button
          onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
          className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full border border-pink-100 shadow-sm hover:bg-pink-100 transition-colors"
        >
          <span className="text-[10px] font-black text-pink-500 uppercase">{lang.toUpperCase()}</span>
          <ChevronDown size={14} className={`text-pink-300 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        {isLangDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-pink-50 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-[100]">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setIsLangDropdownOpen(false); }}
                className={`w-full flex items-center justify-between px-5 py-3 text-sm font-bold transition-colors ${
                  lang === l.code ? 'bg-pink-50 text-pink-600' : 'text-gray-500 hover:bg-pink-50/50'
                }`}
              >
                {l.label}
                {lang === l.code && <Check size={14} />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const CartModal = () => (
    <div className={`fixed inset-0 z-[100] flex justify-end transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
      <div className={`relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transition-transform duration-500 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 border-b border-pink-50 flex items-center justify-between">
          <h3 className="text-2xl font-logo text-gray-900">{t('cart.title')}</h3>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-pink-50 rounded-full transition-colors"><X size={24} /></button>
        </div>
        <div className="flex-grow overflow-y-auto p-8 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p className="font-bold">{t('cart.empty')}</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-pink-50/30 p-4 rounded-3xl animate-in slide-in-from-right-4">
                <img src={item.image} className="w-20 h-20 object-cover rounded-2xl" alt={item.name[lang]} />
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-800 text-sm">{item.name[lang]}</h4>
                  <p className="text-pink-500 font-black">$ {item.price}</p>
                </div>
                <button onClick={() => removeFromCart(idx)} className="text-gray-300 hover:text-red-400 transition-colors"><Trash2 size={18} /></button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-8 border-t border-pink-50 bg-pink-50/10 space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-gray-400 font-bold text-sm uppercase tracking-widest">{t('cart.total')}</span>
              <span className="text-3xl font-black text-gray-900">$ {calculateTotal()}</span>
            </div>
            <button 
              onClick={checkoutViaMessenger}
              className="w-full bg-gray-900 text-white py-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-4 hover:bg-pink-500 transition-all shadow-xl"
            >
              {t('cart.checkout')} <Copy size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
        <div className="bg-gray-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-700">
          <Check className="text-green-400" size={20} />
          <span className="font-bold text-sm">{t('toast.copied')}</span>
        </div>
      </div>

      <CartModal />
      
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-pink-50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-24">
            <div className="flex-shrink-0 flex flex-col cursor-pointer" onClick={() => setCurrentView('home')}>
              <h1 className="text-3xl md:text-4xl font-logo text-gray-800 leading-none">Panda J</h1>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-amber-500 uppercase">BEAUTÉ & BIJOUX</span>
            </div>
            <div className="hidden lg:flex bg-pink-50/30 p-1 rounded-full border border-pink-100/50 space-x-1">
              <NavItem view="shop" labelKey="nav.shop" />
              <NavItem view="services" labelKey="nav.services" />
              <NavItem view="ai-advisor" labelKey="nav.ai" />
              <NavItem view="about" labelKey="nav.about" />
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block"><LanguageSwitcher /></div>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:bg-pink-50 rounded-full transition-colors"
              >
                <ShoppingBag size={22} />
                {cart.length > 0 && <span className="absolute top-0 right-0 bg-pink-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cart.length}</span>}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full">{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-pink-100 flex flex-col py-6 px-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
             <div className="flex justify-center border-b border-pink-50 pb-4"><LanguageSwitcher /></div>
            <NavItem view="shop" labelKey="nav.shop" />
            <NavItem view="services" labelKey="nav.services" />
            <NavItem view="ai-advisor" labelKey="nav.ai" />
            <NavItem view="about" labelKey="nav.about" />
          </div>
        )}
      </nav>

      <button 
        onClick={() => window.open(MS_LINK, '_blank')}
        className="fixed bottom-6 left-6 z-50 bg-[#0084FF] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
      >
        <MessageCircle size={24} />
      </button>

      <main className="flex-grow">
        {currentView === 'home' && (
          <div className="space-y-20 pb-20">
            <section className="relative px-4 pt-8 md:pt-12">
              <div className="max-w-7xl mx-auto rounded-[3.5rem] overflow-hidden relative h-[80vh] flex items-center bg-pink-watercolor shadow-soft-pink">
                <div className="relative z-10 px-8 md:px-20 space-y-8 max-w-3xl animate-in fade-in slide-in-from-left duration-700">
                  <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-5 py-2 rounded-full text-pink-600 text-[10px] md:text-xs font-bold tracking-widest uppercase border border-white/50"><Sparkles size={16} className="text-amber-400" /> {t('hero.tag')}</div>
                  <h2 className="text-5xl md:text-8xl font-logo text-gray-900 leading-[0.9]">{t('hero.title1')}<br/><span className="text-pink-500">{t('hero.title2')}</span></h2>
                  <p className="text-gray-600 text-lg md:text-2xl font-medium max-w-xl">{t('hero.subtitle')}</p>
                  <div className="flex flex-col sm:flex-row gap-5 pt-4">
                    <button onClick={() => setCurrentView('shop')} className="bg-gray-900 text-white px-10 py-5 rounded-full font-bold hover:bg-pink-600 shadow-xl transition-all flex items-center justify-center gap-3 group">{t('btn.shop')} <Gem size={20} /></button>
                    <button onClick={() => setCurrentView('services')} className="bg-white text-pink-600 border-2 border-pink-100 px-10 py-5 rounded-full font-bold hover:bg-pink-50 transition-all flex items-center justify-center gap-2">{t('btn.services')} <Calendar size={20} /></button>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16 relative"><h3 className="text-4xl font-black text-gray-900 mb-2">{t('section.popular')}</h3><div className="w-24 h-1 bg-amber-400 mx-auto rounded-full"></div></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {JEWELRY_PRODUCTS.map(product => (
                  <div key={product.id} className="group">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] bg-pink-50 group-hover:shadow-soft-pink transition-all duration-700">
                      <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={product.name[lang]} />
                      <button onClick={() => addToCart(product)} className="absolute bottom-6 right-6 bg-white text-pink-500 p-4 rounded-2xl shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all"><ShoppingBag size={24} /></button>
                    </div>
                    <div className="mt-6 text-center"><h4 className="font-bold text-gray-800 text-lg">{product.name[lang]}</h4><p className="text-pink-500 font-black text-xl">${product.price}</p></div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {currentView === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in duration-500">
            <h2 className="text-5xl font-logo text-gray-900 text-center mb-16">{t('nav.shop')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {JEWELRY_PRODUCTS.map(product => (
                <div key={product.id} className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-soft-pink transition-all border border-pink-50 group">
                  <div className="overflow-hidden aspect-square">
                    <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={product.name[lang]} />
                  </div>
                  <div className="p-10 text-center">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{product.name[lang]}</h4>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed h-12 overflow-hidden">{product.description[lang]}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-pink-50">
                      <span className="text-2xl font-black text-pink-500">${product.price}</span>
                      <button onClick={() => addToCart(product)} className="bg-gray-900 text-white p-4 rounded-2xl hover:bg-pink-500 transition-all"><ShoppingBag size={20} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'services' && (
          <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in duration-500">
            <h2 className="text-5xl font-logo text-gray-900 text-center mb-20">{t('nav.services')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {NAIL_SERVICES.map(service => (
                <div key={service.id} className="group relative rounded-[3.5rem] bg-white shadow-2xl overflow-hidden aspect-[4/5.5]">
                  <img src={service.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={service.name[lang]} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                    <span className="bg-amber-400 text-[10px] px-4 py-1.5 rounded-full font-black uppercase mb-4 inline-block">{service.duration[lang]}</span>
                    <h4 className="text-4xl font-logo mb-3">{service.name[lang]}</h4>
                    <p className="text-sm text-pink-100 mb-8 opacity-0 group-hover:opacity-100 transition-all">{service.description[lang]}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold text-amber-300">${service.price}+</span>
                      <button onClick={() => { setBooking({ serviceId: service.id }); setCurrentView('booking'); }} className="bg-white text-pink-600 px-8 py-3 rounded-2xl font-black shadow-lg">{t('btn.services')}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'booking' && (
          <div className="max-w-2xl mx-auto px-4 py-16 animate-in zoom-in-95 duration-500">
            <div className="bg-white rounded-[4rem] shadow-2xl p-10 md:p-16 border border-pink-50">
              <h2 className="text-4xl font-logo text-gray-900 mb-12">{t('booking.title')}</h2>
              <form onSubmit={handleBookingSubmit} className="space-y-8">
                <input type="text" placeholder={t('booking.name')} required className="w-full px-8 py-5 rounded-3xl bg-pink-50/50 outline-none font-bold focus:ring-2 focus:ring-pink-200 transition-all" onChange={(e) => setBooking({...booking, customerName: e.target.value})} />
                <input type="text" placeholder={t('booking.contact')} required className="w-full px-8 py-5 rounded-3xl bg-pink-50/50 outline-none font-bold focus:ring-2 focus:ring-pink-200 transition-all" onChange={(e) => setBooking({...booking, customerContact: e.target.value})} />
                <div className="grid grid-cols-2 gap-6">
                  <input type="date" required className="px-6 py-5 rounded-3xl bg-pink-50/50 outline-none font-bold focus:ring-2 focus:ring-pink-200 transition-all" onChange={(e) => setBooking({...booking, date: e.target.value})} />
                  <input type="time" required className="px-6 py-5 rounded-3xl bg-pink-50/50 outline-none font-bold focus:ring-2 focus:ring-pink-200 transition-all" onChange={(e) => setBooking({...booking, time: e.target.value})} />
                </div>
                <button type="submit" className="w-full bg-pink-500 text-white py-6 rounded-[2.5rem] font-black text-xl shadow-xl flex items-center justify-center gap-3 hover:bg-pink-600 transition-all">{t('booking.submit')} <ExternalLink size={20} /></button>
              </form>
            </div>
          </div>
        )}

        {currentView === 'ai-advisor' && (
          <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in duration-500">
            <div className="text-center mb-16 space-y-6"><h2 className="text-5xl font-logo text-gray-900">{t('ai.title')}</h2><p className="text-gray-400 font-medium">{t('ai.desc')}</p></div>
            <div className="bg-white rounded-[4rem] shadow-2xl p-10 md:p-16 border border-pink-50">
              <textarea 
                value={aiPrompt} 
                onChange={(e) => setAiPrompt(e.target.value)} 
                placeholder={t('ai.placeholder')} 
                className="w-full p-10 rounded-[3rem] bg-pink-50/30 border-2 border-pink-100 outline-none text-xl min-h-[220px] font-medium focus:bg-white transition-all" 
              />
              <button 
                onClick={askAi} 
                disabled={isAiLoading || !aiPrompt.trim()} 
                className="w-full mt-10 bg-gray-900 text-white py-6 rounded-[2.5rem] font-black text-xl shadow-2xl disabled:opacity-50 hover:bg-pink-500 transition-all"
              >
                {isAiLoading ? 'AI Consultant...' : t('ai.btn')}
              </button>
              {aiResponse && (
                <div className="mt-16 bg-pink-50/50 p-12 rounded-[3.5rem] border-2 border-pink-100 italic text-lg leading-relaxed text-gray-700 whitespace-pre-wrap font-medium animate-in slide-in-from-bottom-4 duration-500 prose max-w-none">
                  {aiResponse}
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === 'about' && (
          <div className="max-w-7xl mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row gap-12 md:gap-20 items-center animate-in fade-in duration-500">
            <div className="w-full md:w-1/2 relative">
              <div className="rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white aspect-square">
                <img src="https://images.unsplash.com/photo-1590673801239-13587b4333ce?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="About" />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-10">
               <h2 className="text-6xl font-logo text-gray-900">{t('about.title')}</h2>
               <div className="text-gray-500 text-xl font-medium leading-relaxed space-y-6">
                 <p>{lang === 'zh' ? '自 2021 年起，Panda J 致力于为您带来极致的美丽体验。' : lang === 'fr' ? 'Depuis 2021, Panda J s\'engage à vous offrir l\'expérience beauté ultime.' : 'Since 2021, Panda J has been committed to bringing you the ultimate beauty experience.'}</p>
                 <p className="text-lg opacity-80 italic">{lang === 'zh' ? '我们相信，每一件饰品和每一款美甲都是自我表达的艺术。' : lang === 'fr' ? 'Nous croyons que chaque bijou et chaque manucure est une forme d\'art.' : 'We believe that every piece of jewelry and every manicure is a form of art.'}</p>
               </div>
               <div className="flex gap-6">
                 <a href={FB_LINK} target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] text-white p-5 rounded-3xl shadow-lg hover:scale-110 transition-transform"><Facebook size={28} /></a>
                 <a href={MS_LINK} target="_blank" rel="noopener noreferrer" className="bg-[#0084FF] text-white p-5 rounded-3xl shadow-lg hover:scale-110 transition-transform"><MessageCircle size={28} /></a>
               </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-pink-50 py-24 mt-20 text-center">
        <h1 className="text-3xl font-logo text-gray-800 leading-none">Panda J</h1>
        <p className="text-gray-400 mt-4 px-4">{t('footer.desc')}</p>
        <div className="mt-12 text-[9px] font-black text-gray-300 uppercase tracking-widest">© 2024 PANDA J - BEAUTÉ & BIJOUX. ALL LANGUAGES CONNECTED.</div>
      </footer>
    </div>
  );
};

export default App;
