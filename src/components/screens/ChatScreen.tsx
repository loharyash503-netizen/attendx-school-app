import React, { useState, useRef, useEffect } from 'react';
import { initialChatMessages } from '../../data/mockData';
import { ChatMessage } from '../../types';
import { Paperclip, Smile, Send, CheckCheck, User } from 'lucide-react';

export const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'parent',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulate Vidhya Mam response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "Thank you for reaching out Mr. Verma! Ajay's morning attendance was recorded. He was attentive throughout the science session.",
        "Yes, I have noted that. I will inform the other subject teachers as well.",
        "Please feel free to check the homework tab for the latest diagrams due on 6 April.",
        "Glad to assist! Attendance alerts will notify you instantly if there's any update.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const teacherMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'teacher',
        text: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true,
      };
      setMessages((prev) => [...prev, teacherMsg]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] w-full max-w-md mx-auto relative px-4">
      {/* Date Pill matching Screen 18 */}
      <div className="flex justify-center my-3">
        <span className="text-[11px] font-bold text-[#FF3644] bg-[#FFE8EA] px-4 py-1 rounded-full shadow-xs">
          Today
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-24 pr-1">
        {messages.map((msg) => {
          const isParent = msg.sender === 'parent';

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${isParent ? 'justify-end' : 'justify-start'}`}
            >
              {!isParent && (
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                  alt="Vidhya Mam"
                  className="w-7 h-7 rounded-full object-cover shadow-xs border border-white mb-1"
                />
              )}

              <div
                className={`max-w-[78%] p-3.5 rounded-3xl shadow-sm text-xs font-medium leading-relaxed relative ${
                  isParent
                    ? 'bg-[#FFDDE0] text-slate-800 rounded-br-xs border border-red-200'
                    : 'bg-white text-slate-800 rounded-bl-xs border border-slate-100 shadow-neu-sm'
                }`}
              >
                <p>{msg.text}</p>
                <div
                  className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${
                    isParent ? 'text-red-700' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isParent && <CheckCheck className="w-3 h-3 text-[#FF3644]" />}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic pl-9">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-red-400 animate-bounce delay-100" />
            <span className="w-2 h-2 rounded-full bg-red-400 animate-bounce delay-200" />
            <span className="ml-1 text-[11px]">Vidhya Mam is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating Input Dock matching Screen 18 */}
      <div className="fixed bottom-4 left-0 right-0 max-w-md mx-auto px-4 z-40">
        <form
          onSubmit={handleSendMessage}
          className="bg-white rounded-full p-1.5 shadow-neu border border-white flex items-center gap-2"
        >
          <button
            type="button"
            onClick={() => alert('Attachment picker: Select photo or medical excuse note')}
            className="w-9 h-9 rounded-full bg-slate-50 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 text-xs font-medium text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none px-1"
          />

          <button
            type="button"
            onClick={() => setInputText((prev) => prev + ' 👍')}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <Smile className="w-5 h-5 text-amber-500" />
          </button>

          <button
            type="submit"
            className="w-10 h-10 rounded-full bg-[#FF3644] text-white flex items-center justify-center shadow-neu-red active:scale-95 transition-transform"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
