import Card from '../common/Card';
import ContactInfoItem from '../common/ContactInfoItem';

const ContactInfoCard = ({ items }) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-text mb-4">Contact Information</h2>
      <div className="space-y-3">
        {items.map(({ id, icon, label }) => (
          <ContactInfoItem key={id} icon={icon} label={label} />
        ))}
      </div>
    </Card>
  );
};

export default ContactInfoCard;

