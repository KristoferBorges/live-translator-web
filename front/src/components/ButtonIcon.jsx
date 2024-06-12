const ButtonIcon = ({ icon: Icon, ...rest }) => {
  return (
    <button {...rest}>
      <Icon size={24} />
    </button>
  );
};

export default ButtonIcon;
