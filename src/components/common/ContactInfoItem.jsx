const ContactInfoItem = ({ icon: Icon, label }) => {
  return (
    <div className="flex items-center gap-3">
      {Icon && <Icon className="w-5 h-5 text-primary" />}
      <span className="text-text">{label}</span>
    </div>
  );
};

export default ContactInfoItem;

