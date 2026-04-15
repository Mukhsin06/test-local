
import React, { useState, useCallback, useMemo } from 'react';
import { FLASHCARDS_DATA, TOPICS } from './constants';
import Card from './components/Card';

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
    }, 600);
  };

  const currentCard = FLASHCARDS_DATA[currentIndex];
  const topicTotal = filteredCards.length;
  const topicAnswered = filteredCards.filter(c => answeredIds.has(c.id)).length;
  const percent = topicTotal ? (topicAnswered / topicTotal) * 100 : 0;

  const teamColors = ['orange', 'purple', 'cyan'];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 sm:px-6 py-6 md:py-10 selection:bg-blue-500/40">

      {/* Team Scores */}
      {!isMaximized && (
        <div className="w-full max-w-5xl grid grid-cols-3 gap-3 sm:gap-5 mb-8">
          {scores.map((score, idx) => (
            <div key={idx} className="glass rounded-2xl p-4 sm:p-5 flex flex-col items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] mb-1.5">
                Jamoa {idx + 1}
              </span>
              <span className={`text-3xl sm:text-4xl font-black tabular-nums ${score < 0 ? 'text-rose-400' : 'text-white'}`}>
                {score > 0 ? `+${score}` : score}
              </span>
              <div className={`mt-2 w-8 h-1 rounded-full bg-${teamColors[idx]}-500`}></div>
            </div>
          ))}
        </div>
      )}

      {viewState === 'topics' ? (
        <main className="flex-1 w-full max-w-6xl flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <header className="mb-10 md:mb-14 text-center">
            <div className="inline-block px-5 py-1.5 rounded-full glass mb-5">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.4em]">Kosmos • Astronomiya</span>
            </div>
            <h1 className="logo-text text-5xl sm:text-6xl md:text-7xl leading-none select-none mb-3">
              SAVO<span className="logo-gradient">LAR</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium tracking-[0.2em] uppercase">Olam sirlarini kashf eting</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full pb-10">
            {TOPICS.map(topic => (
              <button
                key={topic.id}
                onClick={() => handleSelectTopic(topic.id)}
                className="group relative overflow-hidden rounded-2xl p-5 md:p-6 glass hover:border-white/20 transition-all duration-300 text-left hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${topic.gradient} opacity-60 group-hover:opacity-100 transition`}></div>
                <div className={`absolute -right-10 -top-10 w-40 h-40 bg-${topic.color}-500/10 blur-3xl rounded-full`}></div>

                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] block mb-3">
                  Variant {String(topic.id).padStart(2, '0')}
                </span>
                <h3 className="text-lg md:text-xl font-extrabold text-white leading-snug mb-6 relative">{topic.title}</h3>

                <div className="flex items-center justify-between relative">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className={`w-1.5 h-5 rounded-full bg-white/10 group-hover:bg-${topic.color}-500/70 transition-all`} style={{ transitionDelay: `${i * 40}ms` }}></div>
                    ))}
                  </div>
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-${topic.color}-500 group-hover:text-slate-900 transition-all`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </main>
      ) : viewState === 'grid' ? (
        <main className="flex-1 w-full max-w-5xl flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
          <header className="mb-8 md:mb-10 flex flex-col items-center text-center">
            <button
              onClick={() => setViewState('topics')}
              className="group mb-5 px-5 py-2 rounded-full glass text-[11px] font-bold text-slate-400 hover:text-white transition-all uppercase tracking-[0.25em] flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Asosiy menyu
            </button>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase ${currentTopic.accent}`}>
              {currentTopic.title}
            </h2>
            <p className="text-slate-500 text-xs mt-2 tracking-[0.3em] uppercase">
              {topicAnswered} / {topicTotal} javob berildi
            </p>
          </header>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4 w-full pb-28">
            {filteredCards.map((card, idx) => {
              const isUsed = answeredIds.has(card.id);
              return (
                <button
                  key={card.id}
                  onClick={() => handleSelectCard(card.id)}
                  disabled={isUsed}
                  className={`group relative aspect-square rounded-2xl flex items-center justify-center border transition-all duration-300 overflow-hidden
                      ${isUsed
                      ? 'bg-emerald-500/10 border-emerald-500/30 cursor-default opacity-60'
                      : `glass hover:border-${currentTopic.color}-500/50 hover:scale-105 hover:-translate-y-1 hover:shadow-xl`
                    }`}
                >
                  <span className={`text-4xl sm:text-5xl font-black tabular-nums ${isUsed ? 'text-emerald-400' : `text-white group-hover:${currentTopic.accent}`} transition-colors`}>
                    {idx + 1}
                  </span>
                  {isUsed && (
                    <div className="absolute bottom-2 right-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-slate-950">
                          <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 0 1 1.04-.208Z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </main>
      ) : (
        <main className="flex-1 w-full flex flex-col items-center max-w-5xl pb-28 animate-in fade-in duration-500">
          <div className="w-full mb-6 flex items-center justify-between">
            <button
              onClick={() => setViewState('grid')}
              className="group flex items-center gap-2 text-slate-400 hover:text-white transition font-bold text-[11px] uppercase tracking-[0.25em] glass px-5 py-2.5 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 group-hover:-translate-x-1 transition">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Savollar
            </button>

            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className={`w-11 h-11 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:border-${currentTopic.color}-500/50 transition hover:scale-105 active:scale-95`}
              aria-label="Kattalashtirish"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            </button>
          </div>

          <Card card={currentCard} topic={currentTopic} isFlipped={isFlipped} onFlip={toggleFlip} isMaximized={isMaximized} />

          {isMaximized && (
            <button
              onClick={() => setIsMaximized(false)}
              className="fixed top-6 right-6 z-[110] w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition hover:scale-105"
              aria-label="Yopish"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          <div className={`w-full mt-8 transition-all duration-500 ${isFlipped && !isMaximized ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}>
            {!activeAction ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button
                  onClick={() => setActiveAction('subtract')}
                  className="group py-4 sm:py-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold hover:bg-rose-500/20 hover:border-rose-500 transition uppercase tracking-[0.2em] text-xs sm:text-sm"
                >
                  Xato javob <span className="ml-2 opacity-60 group-hover:translate-x-1 inline-block transition">→</span>
                </button>
                <button
                  onClick={() => setActiveAction('add')}
                  className="group py-4 sm:py-5 rounded-2xl bg-emerald-500 text-slate-900 font-bold hover:bg-emerald-400 transition uppercase tracking-[0.2em] text-xs sm:text-sm shadow-lg shadow-emerald-500/30"
                >
                  To'g'ri javob <span className="ml-2 group-hover:translate-x-1 inline-block transition">→</span>
                </button>
              </div>
            ) : (
              <div className="glass rounded-2xl p-5 sm:p-6 animate-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className={`font-bold text-[10px] uppercase tracking-[0.3em] mb-1 ${activeAction === 'add' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      Jamoa tanlang
                    </p>
                    <h4 className="text-base font-bold text-white">Kimga ball beriladi?</h4>
                  </div>
                  <button
                    onClick={() => setActiveAction(null)}
                    className="text-[10px] font-bold text-slate-400 hover:text-white transition uppercase tracking-[0.2em] bg-white/5 px-3 py-1.5 rounded-full"
                  >
                    Bekor
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {scores.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => updateScore(idx)}
                      className={`group relative h-16 rounded-xl flex flex-col items-center justify-center transition active:scale-95 hover:scale-105 text-white
                        ${idx === 0 ? 'bg-orange-600 hover:bg-orange-500' : idx === 1 ? 'bg-purple-600 hover:bg-purple-500' : 'bg-blue-600 hover:bg-blue-500'}`}
                    >
                      <span className="text-[9px] font-bold opacity-70 uppercase tracking-[0.3em]">Jamoa</span>
                      <span className="text-2xl font-black">{idx + 1}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {viewState !== 'topics' && !isMaximized && (
        <footer className="fixed bottom-0 left-0 w-full pt-6 pb-4 px-4 sm:px-6 z-40 bg-gradient-to-t from-[#010409] via-[#010409]/90 to-transparent">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-${currentTopic.color}-500`}></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Progress</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-white tabular-nums">{Math.round(percent)}</span>
                <span className="text-sm font-bold text-slate-400">%</span>
              </div>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
              <div
                className={`h-full bg-gradient-to-r ${currentTopic.gradient} transition-all duration-1000 rounded-full`}
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
