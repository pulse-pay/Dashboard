const ActivityItem = ({ title, time }) => {
  return (
    <div className="text-sm">
      <p className="text-text font-medium">{title}</p>
      <p className="text-text-secondary text-xs">{time}</p>
    </div>
  );
};

export default ActivityItem;

