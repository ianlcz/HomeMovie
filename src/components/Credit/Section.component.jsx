const Section = ({ title, isBiography = false, children }) => (
  <div className="mb-6">
    <h2
      className={`text-center lg:text-left text-xl text-blue-800 dark:text-blue-600 ${
        isBiography ? "mb-2" : "mb-6"
      } font-medium`}
    >
      {title}
    </h2>
    {children}
  </div>
);

export default Section;
