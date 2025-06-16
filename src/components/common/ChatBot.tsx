import React, { useState } from 'react';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { theme } from '../../styles/theme';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis votre assistant IA NEO. Comment puis-je vous aider aujourd\'hui ?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const simulateTyping = (text: string) => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.id === 'typing') {
          const updatedText = text.slice(0, index + 1);
          const updated = [...prev.slice(0, -1), { ...last, text: updatedText }];
          return updated;
        }
        return [...prev, { id: 'typing', text: text.charAt(0), sender: 'ai', timestamp: new Date() }];
      });
      index++;
      if (index >= text.length) {
        clearInterval(typingInterval);
        setMessages(prev => prev.filter(m => m.id !== 'typing').concat({
          id: Date.now().toString(),
          text,
          sender: 'ai',
          timestamp: new Date(),
        }));
        setIsTyping(false);
      }
    }, 40);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    const lower = inputMessage.toLowerCase();
    const isIdentityQuestion = ['qui es-tu', 'qui es tu', 'c\'est quoi neo', 'c\'est quoi néo'].some(q => lower.includes(q));

    if (isIdentityQuestion) {
      simulateTyping("Je suis l’assistant intelligent de la plateforme NEO, conçue pour la supervision d’installations solaires et hybrides. Je suis là pour vous aider à tout moment !");
      return;
    }

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            { role: 'system', content: "Tu es l'assistant intelligent de la plateforme NEO, spécialisée dans la supervision d’installations solaires et hybrides. Tes réponses doivent être claires, pédagogiques et adaptées aux clients professionnels ou particuliers." },
            ...messages.map(m => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text,
            })),
            { role: 'user', content: inputMessage },
          ],
        }),
      });

      const data = await response.json();
      const aiText = data.choices?.[0]?.message?.content || "Désolé, je n'ai pas compris. Pouvez-vous reformuler ?";

      simulateTyping(aiText);
    } catch (error) {
      simulateTyping("Erreur lors de la communication avec l’assistant. Veuillez réessayer plus tard.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Bubble */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg hover:shadow-xl z-40 ${isOpen ? 'hidden' : ''}`}
        style={{ backgroundColor: theme.colors.primary }}
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[28rem] bg-white rounded-lg shadow-2xl border flex flex-col z-50">
          {/* Header */}
          <div className="px-4 py-3 rounded-t-lg flex items-center justify-between" style={{ backgroundColor: theme.colors.primary }}>
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-white" />
              <span className="text-white font-semibold">Assistant NEO</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start space-x-2 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: msg.sender === 'ai' ? theme.colors.primary : theme.colors.gray[300] }}>
                  {msg.sender === 'ai' ? <Bot className="h-3 w-3 text-white" /> : <User className="h-3 w-3 text-white" />}
                </div>
                <div className={`max-w-xs px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                  msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.colors.primary }}>
                  <Bot className="h-3 w-3 text-white" />
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm font-mono animate-pulse">...</div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Posez votre question..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
