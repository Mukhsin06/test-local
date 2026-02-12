
import React from 'react';
import { FlashCard, Topic } from '../types';

interface CardProps {
  card: FlashCard;
  topic: Topic;
  isFlipped: boolean;
  onFlip: () => void;
  isMaximized?: boolean;
}

const Card: React.FC<CardProps> = ({ card, topic, isFlipped, onFlip, isMaximized = false }) => {
  
  const cardContent = (
    <div className={`relative w-full h-full transition-transform duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
      
      {/* Front side (Question) */}
      <div className={`absolute inset-0 w-full h-full backface-hidden glass rounded-[3rem] md:rounded-[4rem] flex flex-col items-center justify-center text-center shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10 group-hover:border-${topic.color}-500/30 transition-all duration-500 ${isMaximized ? 'p-12 md:p-32' : 'p-10 md:p-16'}`}>
        {/* Glow effect */}
        <div className={`absolute -top-32 -left-32 w-64 h-64 bg-${topic.color}-500/10 blur-[100px] rounded-full`}></div>
        
        <div className={`bg-${topic.color}-500/10 ${topic.accent} px-8 py-3 rounded-full font-black uppercase tracking-[0.5em] mb-12 border border-${topic.color}-500/10 backdrop-blur-3xl shadow-xl ${isMaximized ? 'text-xs md:text-sm' : 'text-[9px]'}`}>
          {topic.title} <span className="mx-3 opacity-20">/</span> {card.id}
        </div>
        
        <h2 className={`font-black text-white leading-[1.05] tracking-tight px-6 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-bottom-4 duration-700 ${isMaximized ? 'text-4xl md:text-7xl lg:text-8xl' : 'text-3xl md:text-5xl'}`}>
          {card.question}
        </h2>
        
        <div className="absolute bottom-12 flex flex-col items-center gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
           <div className={`w-12 h-1 bg-gradient-to-r ${topic.gradient} rounded-full`}></div>
           <div className="text-slate-500 font-black text-[9px] uppercase tracking-[0.4em]">JAVOBNI OCHISH</div>
        </div>
      </div>

      {/* Back side (Answer) */}
      <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 glass rounded-[3rem] md:rounded-[4rem] flex flex-col items-center justify-center text-center shadow-[0_40px_120px_rgba(16,185,129,0.1)] bg-[#01040a] border border-emerald-500/20 overflow-hidden ${isMaximized ? 'p-12 md:p-32' : 'p-10 md:p-16'}`}>
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 opacity-60"></div>
        
        <div className="bg-emerald-500/5 text-emerald-400 px-8 py-3 rounded-full font-black uppercase tracking-[0.5em] mb-12 border border-emerald-500/10 backdrop-blur-2xl">
          JAVOB
        </div>
        
        <p className={`font-black text-white leading-tight px-6 drop-shadow-[0_0_50px_rgba(16,185,129,0.3)] ${isMaximized ? 'text-4xl md:text-7xl lg:text-8xl' : 'text-3xl md:text-5xl'}`}>
          {card.answer}
        </p>
        
        <div className="absolute bottom-10 flex gap-2">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500/30 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isMaximized) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]/95 backdrop-blur-3xl p-6 md:p-20 animate-in fade-in duration-500">
        <div className="w-full h-full max-w-7xl max-h-[85vh] perspective-2000 cursor-pointer group" onClick={onFlip}>
          {cardContent}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl aspect-[1.8/1] md:aspect-[2.2/1] perspective-2000 group cursor-pointer active:scale-[0.98] transition-transform duration-300" onClick={onFlip}>
      {cardContent}
    </div>
  );
};

export default Card;
