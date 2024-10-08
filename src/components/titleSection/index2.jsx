const TitleSection2 = ({ titleSectionData2, sectionClasses, headingClasses }) => {
    return (
      <>
        <div className={`section-title-area2 ${sectionClasses}`}>
          <h6
            className={`section-subtitle2 ${headingClasses}`}
          >
            {titleSectionData2.subTitle2}
          </h6>
          <h1 className="section-title2"> {titleSectionData2.title2}</h1>
        </div>
      </>
    );
  };
  
  export default TitleSection2;
  