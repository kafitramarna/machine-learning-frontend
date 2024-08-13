import Navbar from "./Navbar";
import MainSection from "./MainSection";
import PropTypes from 'prop-types';

export default function Base({ children, pretitle, title }) {
  return (
    <div className="page">
      <Navbar />
      <MainSection pretitle={pretitle} title={title}>
        {children}
      </MainSection>
    </div>
  );
}

Base.propTypes = {
  children: PropTypes.node.isRequired,
  pretitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};