const ButtonIcon = ({ icon: Icon, size, ...rest }) => {
  return (
    <button {...rest}>
      <Icon size={size} />
    </button>
  );
};

export default ButtonIcon;
