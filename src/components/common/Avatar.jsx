const Avatar = ({ name, avatar, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg',
  };

  const getInitials = () => {
    if (avatar && avatar.length <= 2) {
      return avatar.toUpperCase();
    }
    if (name) {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return '?';
  };

  return (
    <div
      className={`${sizeClasses[size]} bg-primary rounded-full flex items-center justify-center text-white font-semibold ${className}`}
    >
      {getInitials()}
    </div>
  );
};

export default Avatar;

