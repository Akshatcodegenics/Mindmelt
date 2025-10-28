import React, { useState } from 'react';
import Button from '../../../components/ui/Button.jsx';
import Input from '../../../components/ui/Input.jsx';
import Icon from '../../../components/AppIcon.jsx';

const ConversationHistory = ({ conversations, onSelectConversation, currentConversationId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredConversations = conversations?.filter(conv =>
    conv?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    conv?.lastMessage?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const formatDate = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return messageDate?.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (diffInHours < 168) { // 7 days
      return messageDate?.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return messageDate?.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  return (
    <div className="bg-card border border-border rounded-organic-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-foreground">Conversation History</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconSize={16}
        >
          {isExpanded ? 'Hide' : 'Show'}
        </Button>
      </div>
      {isExpanded && (
        <>
          <div className="mb-3">
            <Input
              type="search"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="text-sm"
            />
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {filteredConversations?.length > 0 ? (
              filteredConversations?.map((conversation) => (
                <div
                  key={conversation?.id}
                  className={`p-3 rounded-organic-md cursor-pointer transition-colors ${
                    currentConversationId === conversation?.id
                      ? 'bg-primary/10 border border-primary/20' :'bg-muted hover:bg-muted/80'
                  }`}
                  onClick={() => onSelectConversation(conversation?.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {conversation?.title}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {conversation?.lastMessage}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                      {formatDate(conversation?.timestamp)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <Icon name="Search" size={24} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No conversations found</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ConversationHistory;