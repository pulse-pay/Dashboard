import { useState } from 'react';
import Button from '../common/Button';
import ActivityItem from './ActivityItem';

const QuickActionsSidebar = ({ 
  quickActions = [], 
  recentActivities = [],
  onActionClick 
}) => {
  const [note, setNote] = useState('');

  const handleSaveNote = () => {
    console.log('Note saved:', note);
    setNote('');
  };

  return (
    <aside className="w-80 bg-white border-l border-border p-6 overflow-y-auto">
      <h2 className="text-lg font-semibold text-text mb-4">Quick Actions</h2>
      
      {quickActions.length > 0 && (
        <div className="space-y-3 mb-6">
          {quickActions.map(({ id, label, variant }) => (
            <Button
              key={id}
              variant={variant}
              onClick={() => onActionClick?.(id, label)}
              className="w-full text-left justify-start"
            >
              {label}
            </Button>
          ))}
        </div>
      )}

      {recentActivities.length > 0 && (
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-text mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivities.map(({ id, title, time }) => (
              <ActivityItem key={id} title={title} time={time} />
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-border pt-6 mt-6">
        <h3 className="text-sm font-semibold text-text mb-3">Notes</h3>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-32 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-text"
          placeholder="Add a note about this client..."
        />
        <Button
          variant="secondary"
          onClick={handleSaveNote}
          className="mt-2 w-full text-sm"
        >
          Save Note
        </Button>
      </div>
    </aside>
  );
};

export default QuickActionsSidebar;

