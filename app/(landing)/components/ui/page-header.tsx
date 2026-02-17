type TPageHeaderProps = {
  title: string;
  subtitle?: string;
};

const PageHeader = ({ title, subtitle }: TPageHeaderProps) => {
  return (
    <div className="text-center mb-8 md:mb-11">
      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
