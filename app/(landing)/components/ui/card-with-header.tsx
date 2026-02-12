type TCardWithHeaderProps = {
  title: string;
  children: React.ReactNode;
};

const CardWithHeader = ({ title, children }: TCardWithHeaderProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-4 py-3 md:px-5 md:py-4 border-b border-gray-200">
        <h2 className="font-bold text-base md:text-lg">{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default CardWithHeader;
