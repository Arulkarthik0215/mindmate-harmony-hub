
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, ClipboardList, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/ui/PageTransition';
import AppLayout from '@/components/Layout/AppLayout';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// Define assessment types and question sets
type Assessment = 'phq9' | 'gad7';
type Question = {
  id: number;
  text: string;
};

// PHQ-9 Depression Assessment Questions
const PHQ9_QUESTIONS: Question[] = [
  { id: 1, text: "Little interest or pleasure in doing things" },
  { id: 2, text: "Feeling down, depressed, or hopeless" },
  { id: 3, text: "Trouble falling or staying asleep, or sleeping too much" },
  { id: 4, text: "Feeling tired or having little energy" },
  { id: 5, text: "Poor appetite or overeating" },
  { id: 6, text: "Feeling bad about yourself - or that you are a failure or have let yourself or your family down" },
  { id: 7, text: "Trouble concentrating on things, such as reading the newspaper or watching television" },
  { id: 8, text: "Moving or speaking so slowly that other people could have noticed, or the opposite - being so fidgety or restless that you have been moving around a lot more than usual" },
  { id: 9, text: "Thoughts that you would be better off dead, or of hurting yourself in some way" }
];

// GAD-7 Anxiety Assessment Questions
const GAD7_QUESTIONS: Question[] = [
  { id: 1, text: "Feeling nervous, anxious, or on edge" },
  { id: 2, text: "Not being able to stop or control worrying" },
  { id: 3, text: "Worrying too much about different things" },
  { id: 4, text: "Trouble relaxing" },
  { id: 5, text: "Being so restless that it's hard to sit still" },
  { id: 6, text: "Becoming easily annoyed or irritable" },
  { id: 7, text: "Feeling afraid as if something awful might happen" }
];

// Interpretation ranges
const PHQ9_INTERPRETATION = [
  { range: [0, 4], severity: "No depression", color: "bg-green-100 dark:bg-green-900/30", description: "Your symptoms suggest minimal or no signs of depression." },
  { range: [5, 9], severity: "Mild depression", color: "bg-blue-100 dark:bg-blue-900/30", description: "Your symptoms suggest mild depression. Consider monitoring your mood and practicing self-care." },
  { range: [10, 14], severity: "Moderate depression", color: "bg-yellow-100 dark:bg-yellow-900/30", description: "Your symptoms suggest moderate depression. Consider talking to a mental health professional." },
  { range: [15, 19], severity: "Moderately severe depression", color: "bg-orange-100 dark:bg-orange-900/30", description: "Your symptoms suggest moderately severe depression. It's recommended that you consult with a mental health professional." },
  { range: [20, 27], severity: "Severe depression", color: "bg-red-100 dark:bg-red-900/30", description: "Your symptoms suggest severe depression. It's strongly recommended that you consult with a mental health professional as soon as possible." }
];

const GAD7_INTERPRETATION = [
  { range: [0, 4], severity: "Minimal anxiety", color: "bg-green-100 dark:bg-green-900/30", description: "Your symptoms suggest minimal or no signs of anxiety." },
  { range: [5, 9], severity: "Mild anxiety", color: "bg-blue-100 dark:bg-blue-900/30", description: "Your symptoms suggest mild anxiety. Consider monitoring your symptoms and practicing relaxation techniques." },
  { range: [10, 14], severity: "Moderate anxiety", color: "bg-yellow-100 dark:bg-yellow-900/30", description: "Your symptoms suggest moderate anxiety. Consider consulting with a mental health professional." },
  { range: [15, 21], severity: "Severe anxiety", color: "bg-red-100 dark:bg-red-900/30", description: "Your symptoms suggest severe anxiety. It's strongly recommended that you consult with a mental health professional as soon as possible." }
];

const MoodJournal = () => {
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);
  const { toast } = useToast();

  const handleAssessmentSelect = (assessment: Assessment) => {
    setActiveAssessment(assessment);
    setAnswers({});
    setScore(null);
    setCompleted(false);
  };

  const handleAnswerSelect = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateScore = () => {
    const questions = activeAssessment === 'phq9' ? PHQ9_QUESTIONS : GAD7_QUESTIONS;
    
    // Check if all questions are answered
    if (Object.keys(answers).length !== questions.length) {
      toast({
        title: "Incomplete Assessment",
        description: "Please answer all questions to get your score.",
        variant: "destructive"
      });
      return;
    }
    
    // Calculate total score
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    setScore(totalScore);
    setCompleted(true);
    
    toast({
      title: "Assessment Completed",
      description: `Your ${activeAssessment === 'phq9' ? 'PHQ-9' : 'GAD-7'} score is ${totalScore}.`,
    });
  };

  const getInterpretation = () => {
    if (score === null) return null;
    
    const interpretationScale = activeAssessment === 'phq9' ? PHQ9_INTERPRETATION : GAD7_INTERPRETATION;
    return interpretationScale.find(item => score >= item.range[0] && score <= item.range[1]);
  };

  const renderQuestions = () => {
    const questions = activeAssessment === 'phq9' ? PHQ9_QUESTIONS : GAD7_QUESTIONS;
    
    return (
      <div className="space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 mt-0.5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                Over the last 2 weeks, how often have you been bothered by any of the following problems?
              </p>
              <div className="flex justify-between mt-3 px-8 md:px-16 text-xs">
                <span>Not at all</span>
                <span>Several days</span>
                <span>More than half the days</span>
                <span>Nearly every day</span>
              </div>
            </div>
          </div>
        </div>

        {questions.map(question => (
          <div key={question.id} className="border rounded-lg p-4 bg-card">
            <p className="mb-3 font-medium">{question.text}</p>
            <div className="flex justify-between gap-2">
              {[0, 1, 2, 3].map(value => (
                <div key={value} className="flex flex-col items-center flex-1">
                  <button
                    onClick={() => handleAnswerSelect(question.id, value)}
                    className={`w-full p-2 rounded-md border transition-colors ${
                      answers[question.id] === value 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-background hover:bg-muted'
                    }`}
                  >
                    {value}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <Button 
          className="w-full mt-6" 
          onClick={calculateScore}
        >
          Calculate Score
        </Button>
      </div>
    );
  };

  const renderResults = () => {
    const interpretation = getInterpretation();
    if (!interpretation) return null;
    
    const scoringGuide = activeAssessment === 'phq9' 
      ? (
        <div className="mt-6 text-sm">
          <p className="font-semibold mb-2">PHQ-9 Scoring Guide:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>0-4: No depression</li>
            <li>5-9: Mild depression</li>
            <li>10-14: Moderate depression</li>
            <li>15-19: Moderately severe depression</li>
            <li>20-27: Severe depression</li>
          </ul>
        </div>
      ) 
      : (
        <div className="mt-6 text-sm">
          <p className="font-semibold mb-2">GAD-7 Scoring Guide:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>0-4: Minimal anxiety</li>
            <li>5-9: Mild anxiety</li>
            <li>10-14: Moderate anxiety</li>
            <li>15-21: Severe anxiety</li>
          </ul>
        </div>
      );

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className={`p-6 rounded-lg ${interpretation.color}`}>
          <h3 className="text-xl font-semibold mb-2">Your Score: {score}</h3>
          <p className="font-medium">{interpretation.severity}</p>
          <p className="mt-2 text-sm">{interpretation.description}</p>
          
          <div className="mt-4 text-sm text-muted-foreground">
            {activeAssessment === 'phq9' ? (
              <p>
                This questionnaire is a screening tool for depression. It is not a diagnostic tool, but it can help you understand your symptoms.
              </p>
            ) : (
              <p>
                This questionnaire is a screening tool for anxiety. It is not a diagnostic tool, but it can help you understand your symptoms.
              </p>
            )}
          </div>
        </div>

        <Alert>
          <AlertTitle>Important Note</AlertTitle>
          <AlertDescription>
            These assessments are for screening purposes only and do not replace professional diagnosis. 
            If you're experiencing distress, please consult with a healthcare provider.
          </AlertDescription>
        </Alert>

        {scoringGuide}

        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={() => {
              setAnswers({});
              setScore(null);
              setCompleted(false);
            }}
          >
            Retake Assessment
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setActiveAssessment(null)}
          >
            Back to Menu
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <AppLayout>
      <PageTransition>
        <div className="container max-w-4xl mx-auto px-4 py-8">
          {activeAssessment === null ? (
            <div className="space-y-8">
              <div>
                <Link to="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold tracking-tight mb-2">MindCheck</h1>
                <p className="text-muted-foreground">
                  Track your mental health using standardized assessments
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="border rounded-lg p-6 hover:border-primary cursor-pointer transition-colors"
                  onClick={() => handleAssessmentSelect('phq9')}
                >
                  <div className="flex items-center mb-4">
                    <ClipboardList className="h-8 w-8 text-primary mr-3" />
                    <h2 className="text-xl font-semibold">PHQ-9</h2>
                  </div>
                  <p className="text-muted-foreground">
                    Depression assessment questionnaire to help identify symptoms of depression.
                  </p>
                  <Button className="mt-4 w-full">Start PHQ-9 Assessment</Button>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="border rounded-lg p-6 hover:border-primary cursor-pointer transition-colors"
                  onClick={() => handleAssessmentSelect('gad7')}
                >
                  <div className="flex items-center mb-4">
                    <ClipboardList className="h-8 w-8 text-primary mr-3" />
                    <h2 className="text-xl font-semibold">GAD-7</h2>
                  </div>
                  <p className="text-muted-foreground">
                    Anxiety assessment questionnaire to help identify symptoms of anxiety.
                  </p>
                  <Button className="mt-4 w-full">Start GAD-7 Assessment</Button>
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <button 
                  onClick={() => setActiveAssessment(null)}
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to Assessments
                </button>
                <h1 className="text-2xl font-bold tracking-tight">
                  {activeAssessment === 'phq9' ? 'PHQ-9 Depression Assessment' : 'GAD-7 Anxiety Assessment'}
                </h1>
              </div>
              
              {!completed ? renderQuestions() : renderResults()}
            </div>
          )}
        </div>
      </PageTransition>
    </AppLayout>
  );
};

export default MoodJournal;
