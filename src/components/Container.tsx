interface ContainerProps {
  children: JSX.Element;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div
      style={{
        height: 450,
        width: 800,
        margin: 'auto',
        marginTop: '100px',
        border: '2px solid black',
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
};

export default Container;
