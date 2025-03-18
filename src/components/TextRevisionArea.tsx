
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle, RefreshCw, AlertTriangle, XCircle, Lightbulb } from 'lucide-react';
import { generateId } from '@/lib/utils';
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type TextFeedbackItem = {
  id: string;
  type: 'error' | 'warning' | 'success' | 'suggestion';
  message: string;
  correction?: string;
  explanation?: string;
};

interface TextRevisionAreaProps {
  instructions?: string;
  exerciseContext?: string;
  placeholder?: string;
  minHeight?: string;
}

const formSchema = z.object({
  userText: z.string().min(1, "Please enter some text to analyze")
});

const TextRevisionArea: React.FC<TextRevisionAreaProps> = ({ 
  instructions, 
  exerciseContext, 
  placeholder = "Write your answer here...", 
  minHeight = "150px" 
}) => {
  const [feedback, setFeedback] = useState<TextFeedbackItem[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [correctedText, setCorrectedText] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userText: ""
    }
  });

  const checkWriting = async (data: z.infer<typeof formSchema>) => {
    if (!data.userText.trim()) return;
    
    setIsChecking(true);
    setFeedback([]);
    setCorrectedText(null);
    
    // Simulate AI checking with a delay
    // In a real application, this would call an AI service
    setTimeout(() => {
      const simulatedFeedback = generateSimulatedFeedback(data.userText, exerciseContext);
      setFeedback(simulatedFeedback);
      
      // Generate corrected text for serious errors
      if (simulatedFeedback.some(f => f.type === 'error' && f.correction)) {
        let textToCorrect = data.userText;
        simulatedFeedback.forEach(f => {
          if (f.type === 'error' && f.correction) {
            // This is a very simplistic replacement - a real implementation would be more sophisticated
            const errorText = f.message.includes('"') ? 
              f.message.split('"')[1] : 
              f.message.split('should be')[0].trim();
              
            if (textToCorrect.includes(errorText)) {
              textToCorrect = textToCorrect.replace(errorText, f.correction);
            }
          }
        });
        setCorrectedText(textToCorrect);
      }
      
      setIsChecking(false);
    }, 1500);
  };

  const generateSimulatedFeedback = (text: string, context?: string): TextFeedbackItem[] => {
    const feedbackItems: TextFeedbackItem[] = [];
    const lowerText = text.toLowerCase();
    
    // Common grammar and spelling errors (American English)
    if (lowerText.includes('i am go')) {
      feedbackItems.push({
        id: generateId(),
        type: 'error',
        message: '"I am go" is incorrect verb form.',
        correction: 'I am going',
        explanation: 'After "am" (present continuous), use the -ing form of the verb.'
      });
    }
    
    if (/\bi\b/.test(lowerText)) {
      feedbackItems.push({
        id: generateId(),
        type: 'error',
        message: 'Pronoun "i" should be capitalized.',
        correction: 'I',
        explanation: 'In English, the first-person singular pronoun "I" is always capitalized.'
      });
    }
    
    if (lowerText.includes('alot')) {
      feedbackItems.push({
        id: generateId(),
        type: 'error',
        message: '"alot" is a common misspelling.',
        correction: 'a lot',
        explanation: '"A lot" is always written as two separate words in standard American English.'
      });
    }
    
    if (lowerText.includes('their going') || lowerText.includes('there going')) {
      feedbackItems.push({
        id: generateId(),
        type: 'error',
        message: 'Incorrect use of "their/there" with "going".',
        correction: "they're going",
        explanation: 'Use "they\'re" (contraction of "they are") before a verb ending in -ing.'
      });
    }

    if (lowerText.includes('doesnt') || lowerText.includes('dont')) {
      feedbackItems.push({
        id: generateId(),
        type: 'error',
        message: 'Missing apostrophe in contraction.',
        correction: lowerText.includes('doesnt') ? "doesn't" : "don't",
        explanation: 'Contractions in American English require an apostrophe to replace omitted letters.'
      });
    }
    
    // Context-specific checks
    if (context === 'verbs' && lowerText.includes('yesterday') && 
        !/(went|saw|did|was|were|had|bought|sold|told|said|made|took)/i.test(text)) {
      feedbackItems.push({
        id: generateId(),
        type: 'warning',
        message: 'When using "yesterday," you should use past tense verbs.',
        explanation: 'Time expressions like "yesterday" require past tense (e.g., "went" not "go").'
      });
    }
    
    if (context === 'phrasal-verbs' && 
        !/(look up|give in|take off|put on|turn down|figure out|come across|get along|run into|break down)/i.test(text)) {
      feedbackItems.push({
        id: generateId(),
        type: 'warning',
        message: 'Try to include phrasal verbs in your answer.',
        explanation: 'Phrasal verbs consist of a verb and a particle (e.g., "look up," "turn down").'
      });
    }
    
    if (context === 'business-writing' && 
        !/(dear|sincerely|regards|thank you|appreciate|opportunity|consideration)/i.test(text) && 
        text.length > 30) {
      feedbackItems.push({
        id: generateId(),
        type: 'warning',
        message: 'Your business writing could use more formal language and structure.',
        explanation: 'Business correspondence typically includes formal greetings, closings, and professional language.'
      });
    }
    
    // Style and clarity feedback
    if (text.split('.').some(sentence => sentence.trim().length > 50)) {
      feedbackItems.push({
        id: generateId(),
        type: 'suggestion',
        message: 'Consider breaking long sentences into shorter ones for clarity.',
        explanation: 'Shorter sentences are typically easier to read and understand.'
      });
    }
    
    if (text.length > 20 && !/,|;|:/.test(text)) {
      feedbackItems.push({
        id: generateId(),
        type: 'suggestion',
        message: 'Consider using more punctuation to structure your writing.',
        explanation: 'Commas, semicolons, and colons help organize thoughts and improve readability.'
      });
    }
    
    // Success feedback
    if (feedbackItems.filter(f => f.type === 'error').length === 0 && text.length > 30) {
      feedbackItems.push({
        id: generateId(),
        type: 'success',
        message: 'Good job! Your writing is grammatically sound.',
        explanation: 'You\'ve avoided common grammatical errors.'
      });
    }
    
    if (text.split(/[.!?]/).length > 3 && text.length > 50) {
      feedbackItems.push({
        id: generateId(),
        type: 'success',
        message: 'Nice work using multiple sentences to develop your ideas.',
        explanation: 'Using complete sentences shows a good command of writing structure.'
      });
    }
    
    // Ensure we return at least one feedback item
    if (feedbackItems.length === 0) {
      feedbackItems.push({
        id: generateId(),
        type: 'suggestion',
        message: 'Try expanding your answer with more details or examples.',
        explanation: 'Detailed writing demonstrates better language mastery and understanding.'
      });
    }
    
    return feedbackItems;
  };

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'suggestion':
        return <Lightbulb className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const applyCorrection = () => {
    if (correctedText) {
      form.setValue("userText", correctedText);
      setCorrectedText(null);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      {instructions && (
        <div className="text-sm text-muted-foreground">
          {instructions}
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(checkWriting)} className="space-y-4">
          <FormField
            control={form.control}
            name="userText"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder={placeholder}
                    className={`min-h-[${minHeight}]`}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {form.watch("userText").length} characters
            </p>
            
            <Button 
              type="submit"
              disabled={isChecking || !form.watch("userText").trim()}
            >
              {isChecking ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Check writing
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
      
      {feedback.length > 0 && (
        <div className="rounded-lg border p-4 bg-muted/30 animate-fade-in">
          <h3 className="font-medium mb-3">Feedback</h3>
          
          <div className="space-y-3">
            {feedback.map((item) => (
              <div 
                key={item.id} 
                className={`p-3 rounded-lg border-l-4 ${
                  item.type === 'error' ? 'border-l-red-500 bg-red-50' : 
                  item.type === 'warning' ? 'border-l-amber-500 bg-amber-50' : 
                  item.type === 'success' ? 'border-l-green-500 bg-green-50' : 
                  'border-l-blue-500 bg-blue-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="pt-0.5 flex-shrink-0">
                    {getFeedbackIcon(item.type)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {item.message}
                    </p>
                    {item.correction && (
                      <p className="text-sm mt-1 text-muted-foreground">
                        Suggested correction: <span className="font-medium">{item.correction}</span>
                      </p>
                    )}
                    {item.explanation && (
                      <p className="text-sm mt-1 text-muted-foreground italic">
                        {item.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {correctedText && (
            <div className="mt-4 p-3 rounded-lg border border-green-200 bg-green-50">
              <p className="text-sm font-medium text-green-800 mb-2">
                Suggested corrected text:
              </p>
              <p className="text-sm text-green-900">
                {correctedText}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={applyCorrection}
                className="mt-2"
              >
                Apply corrections
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TextRevisionArea;
