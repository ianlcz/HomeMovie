const Section = ({ title, isBiography = false, children }) => (
  <div className="mb-6">
    <h2
      className={`text-center lg:text-left text-xl ${
        isBiography ? "mb-2" : "mb-6"
      } font-medium`}
    >
      {title}
    </h2>
    {children}
  </div>
);

export default Section;
