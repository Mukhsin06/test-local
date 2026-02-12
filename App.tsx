
import React, { useState, useCallback, useMemo } from 'react';
import { FLASHCARDS_DATA, TOPICS } from './constants';
import Card from './components/Card';
import { Topic } from './types';

type ViewState = 'topics' | 'grid' | 'detail';
type ActionType = 'add' | 'subtract' | null;

const App: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('topics');

  const [scores, setScores] = useState<number[]>([0, 0, 0]);
  const [activeAction, setActiveAction] = useState<ActionType>(null);
  const [answeredIds, setAnsweredIds] = useState<Set<number>>(new Set());

  const currentTopic = useMemo(() =>
    TOPICS.find(t => t.id === selectedTopicId) || TOPICS[0],
    [selectedTopicId]);

  const filteredCards = useMemo(() =>
    FLASHCARDS_DATA.filter(c => c.topicId === selectedTopicId),
    [selectedTopicId]);

  const handleSelectTopic = (id: number) => {
    setSelectedTopicId(id);
    setViewState('grid');
  };

  const handleSelectCard = (cardId: number) => {
    if (answeredIds.has(cardId)) return;
    const globalIndex = FLASHCARDS_DATA.findIndex(c => c.id === cardId);
    setCurrentIndex(globalIndex);
    setIsFlipped(false);
    setIsMaximized(false);
    setViewState('detail');
    setActiveAction(null);
  };

  const toggleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
    if (isFlipped) setActiveAction(null);
  }, [isFlipped]);

  const updateScore = (teamIndex: number) => {
    if (!activeAction) return;
    const newScores = [...scores];
    newScores[teamIndex] += activeAction === 'add' ? 1 : -1;
    setScores(newScores);

    const newAnswered = new Set(answeredIds);
    newAnswered.add(FLASHCARDS_DATA[currentIndex].id);
    setAnsweredIds(newAnswered);

    setActiveAction(null);
    setTimeout(() => {
      setIsMaximized(false);
      setViewState('topics');
    }, 800);
  };

  const currentCard = FLASHCARDS_DATA[currentIndex];
  const stats = {
    total: FLASHCARDS_DATA.length,
    answered: answeredIds.size,
    percent: (answeredIds.size / FLASHCARDS_DATA.length) * 100
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center p-4 md:p-10 overflow-x-hidden selection:bg-blue-500/40">

      {/* Team Scores Dashboard */}
      {(!isMaximized) && (
        <div className="w-full max-w-6xl z-20 grid grid-cols-3 gap-4 md:gap-10 mb-16 px-4">
          {scores.map((score, idx) => (
            <div key={idx} className="relative group">
              <div className={`absolute -inset-1 rounded-[3rem] bg-gradient-to-b opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-1000 ${idx === 0 ? 'from-orange-500 to-red-600' : idx === 1 ? 'from-purple-500 to-indigo-600' : 'from-cyan-400 to-blue-600'}`}></div>
              <div className="relative glass rounded-[3rem] p-6 md:p-10 border-white/5 flex flex-col items-center justify-center transition-all duration-700 group-hover:bg-white/[0.05] group-hover:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.6em] mb-4 opacity-40">JAMOA 0{idx + 1}</span>
                <span className={`text-5xl md:text-8xl font-black tabular-nums tracking-tighter ${score < 0 ? 'text-rose-500' : 'text-white'} drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}>
                  {score > 0 ? `+${score}` : score}
                </span>
                <div className={`mt-6 w-16 h-1.5 rounded-full ${idx === 0 ? 'bg-orange-500' : idx === 1 ? 'bg-purple-500' : 'bg-cyan-500'} opacity-10 group-hover:opacity-100 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)]`}></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewState === 'topics' ? (
        <main className="flex-1 w-full max-w-6xl z-10 flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 mt-4">
          <header className="mb-20 text-center">
            <div className="inline-block px-10 py-4 rounded-full glass border-white/10 mb-10 shadow-3xl">
              <span className="text-xs font-black text-cyan-400 uppercase tracking-[1em] animate-pulse">KOSMOS • ASTRONOMIYA</span>
            </div>
            <h1 className="logo-text text-8xl md:text-[12rem] leading-[0.85] select-none mb-8">
              SAVO<span className="logo-gradient">LAR</span>
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.8em] text-sm opacity-60">Olam sirlarini kashf eting</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full px-6 pb-20">
            {TOPICS.map(topic => (
              <button
                key={topic.id}
                onClick={() => handleSelectTopic(topic.id)}
                className="group relative overflow-hidden rounded-[4rem] p-12 glass border-white/5 hover:border-white/20 transition-all duration-700 text-left hover:-translate-y-6 hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.8)]"
              >
                <div className={`absolute top-0 left-0 w-3 h-full bg-gradient-to-b ${topic.gradient} opacity-20 group-hover:opacity-100 transition-all`}></div>
                <div className={`absolute -right-20 -top-20 w-60 h-60 bg-${topic.color}-500/5 blur-[80px] rounded-full group-hover:bg-${topic.color}-500/10 transition-all`}></div>

                <span className="text-[12px] font-black text-slate-500 uppercase tracking-[0.6em] block mb-5">VARIANT 0{topic.id}</span>
                <h3 className="text-4xl font-black text-white leading-[1.1] mb-12 group-hover:translate-x-4 transition-transform italic">{topic.title}</h3>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-2.5 h-10 rounded-full bg-white/5 group-hover:bg-${topic.color}-500/30 transition-all`} style={{ transitionDelay: `${i * 50}ms` }}></div>)}
                  </div>
                  <div className={`w-20 h-20 rounded-[2.5rem] bg-white/[0.03] flex items-center justify-center text-white/30 group-hover:bg-${topic.color}-500 group-hover:text-slate-900 transition-all shadow-2xl group-hover:rotate-12`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </main>
      ) : viewState === 'grid' ? (
        <main className="flex-1 w-full max-w-6xl z-10 flex flex-col items-center animate-in fade-in zoom-in duration-700">
          <header className="mb-20 flex flex-col items-center px-6 text-center">
            <button onClick={() => setViewState('topics')} className="group mb-12 px-12 py-5 rounded-full glass border-white/10 text-xs font-black text-slate-400 hover:text-white transition-all hover:px-16 hover:bg-white/[0.05] active:scale-95 shadow-2xl flex items-center gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-2 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              ASOSIY MENYU
            </button>
            <h2 className={`text-6xl md:text-[9rem] font-black italic tracking-tighter uppercase leading-none ${currentTopic.accent} drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}>
              {currentTopic.title}
            </h2>
          </header>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 md:gap-14 w-full max-w-6xl px-10 pb-32">
            {filteredCards.map((card, idx) => {
              const isUsed = answeredIds.has(card.id);
              return (
                <button
                  key={card.id}
                  onClick={() => handleSelectCard(card.id)}
                  disabled={isUsed}
                  className={`group relative aspect-[0.85/1] rounded-[4rem] flex flex-col items-center justify-center border transition-all duration-700 overflow-hidden
                      ${isUsed
                      ? 'bg-emerald-500/10 border-emerald-500/30 cursor-default shadow-[0_0_40px_rgba(16,185,129,0.1)] opacity-50'
                      : `glass border-white/5 hover:border-${currentTopic.color}-500/50 hover:scale-110 hover:-translate-y-6 hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.9)]`
                    }`}
                >
                  <div className={`absolute inset-0 transition-opacity duration-700 ${isUsed ? 'opacity-100 bg-gradient-to-t from-emerald-500/10 to-transparent' : 'opacity-0 group-hover:opacity-10 bg-gradient-to-t from-white/20 to-transparent'}`}></div>

                  {!isUsed && (
                    <div className={`absolute -inset-1 rounded-[4rem] bg-${currentTopic.color}-500/0 group-hover:bg-${currentTopic.color}-500/10 blur-3xl transition-all duration-700`}></div>
                  )}

                  <div className="relative z-10 flex flex-col items-center">
                    <span className={`text-8xl md:text-[10rem] font-black italic transition-all duration-700 tabular-nums ${isUsed ? 'text-emerald-500' : `text-white group-hover:${currentTopic.accent} group-hover:scale-110 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]`}`}>
                      {idx + 1}
                    </span>

                    {isUsed && (
                      <div className="absolute -bottom-10 animate-in zoom-in duration-700">
                        <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.6)]">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-slate-950"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 0 1 1.04-.208Z" clipRule="evenodd" /></svg>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </main>
      ) : (
        <main className="flex-1 w-full flex flex-col items-center z-10 animate-in fade-in duration-1000 max-w-7xl pb-40">
          <div className="w-full max-w-5xl mb-16 flex items-center justify-between px-10">
            <button
              onClick={() => setViewState('grid')}
              className="group flex items-center gap-5 text-slate-400 hover:text-white transition-all font-black text-xs uppercase tracking-[0.5em] bg-white/[0.03] px-10 py-6 rounded-[2.5rem] border border-white/5 shadow-2xl hover:bg-white/[0.06]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-2 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              SAVOLLAR
            </button>

            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className={`w-20 h-20 rounded-[2.5rem] glass border-white/10 flex items-center justify-center text-slate-400 hover:${currentTopic.accent} hover:border-${currentTopic.color}-500/50 transition-all hover:scale-115 shadow-3xl active:scale-95 group`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10 group-hover:rotate-45 transition-transform duration-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            </button>
          </div>

          <Card card={currentCard} topic={currentTopic} isFlipped={isFlipped} onFlip={toggleFlip} isMaximized={isMaximized} />

          {isMaximized && (
            <button
              onClick={() => setIsMaximized(false)}
              className="fixed top-12 right-12 z-[110] w-20 h-20 rounded-full glass border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 shadow-3xl backdrop-blur-3xl border-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}

          <div className={`w-full max-w-5xl mt-24 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${isFlipped && !isMaximized ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95 pointer-events-none'}`}>
            {!activeAction ? (
              <div className="grid grid-cols-2 gap-14 px-10">
                <button onClick={() => setActiveAction('subtract')} className="group relative overflow-hidden py-12 rounded-[4rem] bg-rose-500/5 border border-rose-500/20 text-rose-500 font-black hover:bg-rose-500/10 hover:border-rose-500 transition-all uppercase tracking-[0.6em] text-sm shadow-3xl">
                  XATO JAVOB <span className="ml-4 opacity-40 group-hover:translate-x-3 inline-block transition-transform duration-500">→</span>
                </button>
                <button onClick={() => setActiveAction('add')} className="group relative overflow-hidden py-12 rounded-[4rem] bg-emerald-500 border border-emerald-400 text-slate-900 font-black hover:bg-emerald-400 hover:scale-[1.05] transition-all uppercase tracking-[0.6em] text-sm shadow-[0_40px_100px_-20px_rgba(16,185,129,0.5)]">
                  TO'G'RI JAVOB <span className="ml-4 group-hover:translate-x-3 inline-block transition-transform duration-500">→</span>
                </button>
              </div>
            ) : (
              <div className="w-full glass rounded-[5rem] p-16 border-white/10 animate-in zoom-in duration-700 shadow-[0_80px_150px_-30px_rgba(0,0,0,0.9)] border-2">
                <div className="flex items-center justify-between mb-16">
                  <div className="flex flex-col">
                    <p className={`font-black text-[12px] uppercase tracking-[0.8em] mb-2 ${activeAction === 'add' ? 'text-emerald-400' : 'text-rose-400'}`}>JAMOA TANLANG</p>
                    <h4 className="text-2xl font-black text-white italic">Kimga ball beriladi?</h4>
                  </div>
                  <button onClick={() => setActiveAction(null)} className="text-[11px] font-black text-slate-600 hover:text-slate-200 transition-colors uppercase tracking-[0.4em] bg-white/5 px-8 py-3 rounded-full">BEKOR QILISH</button>
                </div>
                <div className="grid grid-cols-3 gap-10">
                  {scores.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => updateScore(idx)}
                      className={`group relative h-32 rounded-[3rem] flex flex-col items-center justify-center transition-all active:scale-90 shadow-2xl overflow-hidden hover:scale-105 hover:-translate-y-2
                          ${idx === 0 ? 'bg-orange-600 hover:bg-orange-500' : idx === 1 ? 'bg-purple-600 hover:bg-purple-500' : 'bg-blue-600 hover:bg-blue-500'}`}
                    >
                      <span className="text-[11px] font-black opacity-40 uppercase tracking-[0.4em] mb-2">JAMOA</span>
                      <span className="text-5xl font-black italic">0{idx + 1}</span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {viewState !== 'topics' && !isMaximized && (
        <footer className="fixed bottom-0 left-0 w-full pt-12 pb-14 px-8 md:px-20 z-40 bg-gradient-to-t from-[#010409] via-[#010409]/95 to-transparent">
          <div className="max-w-6xl mx-auto relative">
            <div className="flex justify-between items-end mb-8 px-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${currentTopic.color}-500 shadow-[0_0_15px_rgba(255,255,255,0.4)]`}></div>
                  <span className="text-[12px] font-black text-slate-500 uppercase tracking-[0.6em]">ASTRONOMIYA PROGRESS</span>
                </div>
                <span className="text-xl font-black text-white italic tracking-widest uppercase">MUVAFFAQIYAT</span>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <span className="text-[12px] font-black text-blue-500 uppercase tracking-[0.6em]">REYTINNG</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-blue-400 italic tabular-nums drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">{Math.round(stats.percent)}</span>
                  <span className="text-2xl font-black text-blue-600">%</span>
                </div>
              </div>
            </div>

            <div className="h-4 w-full bg-white/[0.03] rounded-full overflow-hidden p-[3px] backdrop-blur-xl border border-white/10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
              <div
                className={`h-full bg-gradient-to-r ${currentTopic.gradient} transition-all duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1) rounded-full shadow-[0_0_30px_rgba(255,255,255,0.15)] relative`}
                style={{ width: `${stats.percent}%` }}
              >
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
