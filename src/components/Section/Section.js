import PropTypes from "prop-types";
import S from "./Section.module.css";
const Section = ({ title, children }) => (
  <div className={S.section}>
    <h2 className={S.title}>{title}</h2>
    {children}
  </div>
);

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Section;
