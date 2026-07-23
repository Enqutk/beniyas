import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Search, ChevronRight, ShieldCheck } from 'lucide-react';

export const MessagesView: React.FC = () => {
  const { chatThreads, setSelectedChatThreadId, setActiveView, language } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [search, setSearch] = useState('');

  const filteredThreads = chatThreads.filter(ct => {
    if (filter === 'unread' && ct.unreadCount === 0) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        ct.sellerName.toLowerCase().includes(q) ||
        ct.listingTitle.toLowerCase().includes(q) ||
        ct.lastMessage.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="p-3 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <h2 className="text-base font-black text-gray-900 tracking-tight flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-brand" />
          Chat Inbox
        </h2>
        <span className="text-xs font-bold text-gray-400">
          {chatThreads.length} conversations
        </span>
      </div>

      {/* Filter Tabs & Search */}
      <div className="p-3 space-y-2 border-b border-gray-100 bg-gray-50/50">
        <div className="bg-gray-100 rounded-full py-1 px-3 flex items-center gap-2 border border-gray-200">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full bg-transparent text-xs text-gray-800 focus:outline-none"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-brand text-white shadow-2xs'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            All Messages
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              filter === 'unread'
                ? 'bg-brand text-white shadow-2xs'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            Unread
          </button>
        </div>
      </div>

      {/* Inbox List */}
      <div className="divide-y divide-gray-100">
        {filteredThreads.length > 0 ? (
          filteredThreads.map(ct => (
            <div
              key={ct.id}
              onClick={() => {
                setSelectedChatThreadId(ct.id);
                setActiveView('chat');
              }}
              className="p-3 hover:bg-gray-50 transition-colors flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative">
                  <img
                    src={ct.sellerAvatar}
                    alt=""
                    className="w-11 h-11 rounded-full object-cover border border-brand-muted"
                  />
                  <img
                    src={ct.listingImage}
                    alt=""
                    className="w-5 h-5 rounded-md object-cover absolute -bottom-1 -right-1 border border-white shadow-xs"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-gray-900 truncate flex items-center gap-1">
                      {ct.sellerName}
                      <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                    </h4>
                    <span className="text-[10px] text-gray-400 shrink-0">
                      {ct.lastMessageTime}
                    </span>
                  </div>

                  <p className="text-[11px] font-semibold text-brand truncate">
                    {ct.listingTitle}
                  </p>

                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {ct.lastMessage}
                  </p>
                </div>
              </div>

              {ct.unreadCount > 0 ? (
                <span className="w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {ct.unreadCount}
                </span>
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-16 text-gray-400 text-xs">
            No chat threads found.
          </div>
        )}
      </div>
    </div>
  );
};
