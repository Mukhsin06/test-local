
export interface FlashCard {
  id: number;
  question: string;
  answer: string;
  topicId: number;
}

export interface Topic {
  id: number;
  title: string;
  color: string;
  gradient: string;
  accent: string;
}
