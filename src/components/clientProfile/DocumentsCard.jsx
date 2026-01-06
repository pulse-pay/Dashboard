import Card from '../common/Card';

const DocumentsCard = ({ documents = [] }) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-text mb-4">Documents</h2>
      {documents.length === 0 ? (
        <p className="text-text-secondary">No documents available.</p>
      ) : (
        <div className="space-y-2">
          {documents.map(({ id, name, date }) => (
            <div key={id} className="p-3 border border-border rounded-lg hover:bg-background transition-colors">
              <p className="text-sm font-medium text-text">{name}</p>
              {date && <p className="text-xs text-text-secondary mt-1">{date}</p>}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default DocumentsCard;

