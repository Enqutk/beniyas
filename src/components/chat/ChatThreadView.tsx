import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Send,
  Phone,
  ShieldAlert,
  Image as ImageIcon,
  CheckCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const QUICK_CHIPS = [
  'Is this still available?',
  'What is your last price for cash?',
  'Can we meet in Bole Atlas today?',
  'Does it come with original box?'
];

export const ChatThreadView: React.FC = () => {
  const {
    selectedChatThreadId,
    chatThreads,
    sendMessage,
    setActiveView,
    openPDP,
    openContactModal,
    language
  } = useApp();

  const [input, setInput] = useState('');

  const thread = chatThreads.find(ct => ct.id === selectedChatThreadId) || chatThreads[0];

  if (!thread) return null;

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    sendMessage(thread.id, text);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col max-w-md mx-auto animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="p-3 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-10 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('none')}
            className="p-1 rounded-full text-gray-600 hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <img
            src={thread.sellerAvatar}
            alt=""
            className="w-9 h-9 rounded-full object-cover border border-pink-100"
          />

          <div>
            <h3 className="font-bold text-xs text-gray-900 leading-tight">
              {thread.sellerName}
            </h3>
            <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Online • Verified
            </span>
          </div>
        </div>

        <button
          onClick={() =>
            openContactModal(thread.sellerName, thread.sellerPhone, thread.sellerAvatar)
          }
          className="p-2 rounded-full bg-pink-50 text-[#FF3F6C] font-bold text-xs flex items-center gap-1 hover:bg-pink-100 border border-pink-200"
        >
          <Phone className="w-3.5 h-3.5" />
          Call
        </button>
      </div>

      {/* Sticky Listing Snippet Card */}
      <div
        onClick={() => openPDP(thread.listingId)}
        className="bg-white p-2.5 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <img
            src={thread.listingImage}
            alt=""
            className="w-10 h-10 rounded-md object-cover border border-gray-200"
          />
          <div>
            <h4 className="text-xs font-bold text-gray-800 line-clamp-1">
              {thread.listingTitle}
            </h4>
            <span className="text-xs font-black text-[#FF3F6C]">
              {thread.listingPrice.toLocaleString()} ETB
            </span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Safety Note */}
        <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            Safety Notice: Do NOT send advance payments via mobile money or bank transfer. Meet in public before paying.
          </span>
        </div>

        {thread.messages.map(msg => {
          const isUser = msg.senderId === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                  isUser
                    ? 'bg-[#FF3F6C] text-white rounded-tr-xs'
                    : 'bg-white text-gray-900 border border-gray-200 rounded-tl-xs'
                }`}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-1 text-[9px] text-gray-400 mt-1 px-1">
                <span>{msg.timestamp}</span>
                {isUser && <CheckCheck className="w-3 h-3 text-pink-500" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Prompts Chips */}
      <div className="bg-white border-t border-gray-100 p-2 overflow-x-auto scrollbar-none flex gap-1.5 shrink-0">
        {QUICK_CHIPS.map((chip, i) => (
          <button
            key={i}
            onClick={() => handleSend(chip)}
            className="shrink-0 bg-gray-100 hover:bg-pink-50 text-gray-700 hover:text-[#FF3F6C] text-[11px] font-semibold px-2.5 py-1 rounded-full border border-gray-200 transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Composer */}
      <div className="p-2.5 bg-white border-t border-gray-200 flex items-center gap-2 sticky bottom-0">
        <button
          onClick={() => alert('Photo upload simulated')}
          className="p-2 rounded-full text-gray-400 hover:bg-gray-100"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend(input);
          }}
          placeholder="Type your message..."
          className="flex-1 bg-gray-100 rounded-full py-2 px-3 text-xs text-gray-900 focus:outline-none border border-transparent focus:border-pink-300"
        />

        <button
          onClick={() => handleSend(input)}
          disabled={!input.trim()}
          className="p-2.5 rounded-full bg-[#FF3F6C] text-white disabled:opacity-50 active:scale-95 transition-transform"
        >
          <Send className="w-4 h-4 fill-current" />
        </button>
      </div>
    </div>
  );
};
