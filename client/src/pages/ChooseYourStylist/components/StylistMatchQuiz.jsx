import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const questions = [
  {
    id: 1,
    question: 'What service are you looking for?',
    options: ['Hair Color', 'Hair Cut', 'Bridal Styling', 'Extensions', 'Treatments']
  },
  {
    id: 2,
    question: 'What\'s your preferred style?',
    options: ['Modern & Trendy', 'Classic & Elegant', 'Bold & Creative', 'Natural & Simple']
  },
  {
    id: 3,
    question: 'How much experience do you prefer?',
    options: ['5+ years', '10+ years', '15+ years', 'Any']
  }
];

export default function StylistMatchQuiz({ onClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert('Quiz complete! Based on your answers, we recommend Isabella Martinez.');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-charcoal/80 backdrop-blur-sm">
      <div className="glass-panel max-w-2xl w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" size={24} className="text-accent" />
            <h2 className="font-headline text-2xl text-foreground">
              Stylist Match Quiz
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-accent/10 transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex gap-2 mb-4">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  index <= currentQuestion ? 'bg-accent' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <h3 className="text-xl text-foreground mb-6">
          {questions[currentQuestion].question}
        </h3>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full p-4 glass-card text-left hover:border-accent border-2 border-transparent transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
