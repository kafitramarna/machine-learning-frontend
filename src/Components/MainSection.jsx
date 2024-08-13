// MainSection.js
import PropTypes from "prop-types";
import Footer from "./Footer";

export default function MainSection({ pretitle, title, children }) {
  return (
    <div className="page-wrapper">
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <div className="page-pretitle">{pretitle}</div>
              <h2 className="page-title">{title}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
            {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

MainSection.propTypes = {
  pretitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};
