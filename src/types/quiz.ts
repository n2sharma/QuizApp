export type Option = {
  text: string;
};

export type Question = {
  text: string;
  options: Option[];
  correctAnswerIndex: number;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};
