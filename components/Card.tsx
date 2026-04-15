
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

  const padding = isMaximized ? 'p-8 md:p-16' : 'p-6 md:p-10';
  const questionSize = isMaximized ? 'text-3xl md:text-5xl lg:text-6xl' : 'text-xl md:text-3xl';
  const answerSize = isMaximized ? 'text-3xl md:text-5xl lg:text-6xl' : 'text-xl md:text-3xl';
  const badgeSize = isMaximized ? 'text-xs' : 'text-[10px]';

  const cardContent = (
    <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

      {/* Front (Question) */}
      <div className={`absolute inset-0 w-full h-full backface-hidden glass rounded-2xl md:rounded-3xl flex flex-col items-center justify-center text-center overflow-hidden ${padding}`}>
        <div className={`absolute -top-20 -left-20 w-56 h-56 bg-${topic.color}-500/10 blur-3xl rounded-full`}></div>

        <div className={`bg-${topic.color}-500/10 ${topic.accent} px-4 py-1.5 rounded-full font-bold uppercase tracking-[0.3em] mb-5 border border-${topic.color}-500/20 ${badgeSize}`}>
          {topic.title} <span className="mx-2 opacity-40">/</span> {card.id}
        </div>

        <h2 className={`font-extrabold text-white leading-tight tracking-tight ${questionSize}`}>
          {card.question}
        </h2>

        <div className="absolute bottom-5 flex flex-col items-center gap-1.5 opacity-60">
          <div className={`w-8 h-0.5 bg-gradient-to-r ${topic.gradient} rounded-full`}></div>
          <div className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.3em]">Javobni ochish</div>
        </div>
      </div>

      {/* Back (Answer) */}
      <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 glass rounded-2xl md:rounded-3xl flex flex-col items-center justify-center text-center overflow-hidden border border-emerald-500/30 ${padding}`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600"></div>

        <div className={`bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full font-bold uppercase tracking-[0.3em] mb-5 border border-emerald-500/20 ${badgeSize}`}>
          Javob
        </div>

        <p className={`font-extrabold text-white leading-snug ${answerSize}`}>
          {card.answer}
        </p>

        <div className="absolute bottom-5 flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1 h-1 rounded-full bg-emerald-500/50 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isMaximized) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]/95 backdrop-blur-2xl p-4 md:p-10 animate-in fade-in duration-300">
        <div className="w-full h-full max-w-6xl max-h-[80vh] perspective-2000 cursor-pointer" onClick={onFlip}>
          {cardContent}
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full aspect-[16/10] md:aspect-[16/8] perspective-2000 cursor-pointer active:scale-[0.99] transition-transform duration-200"
      onClick={onFlip}
    >
      {cardContent}
    </div>
  );
};

export default Card;
