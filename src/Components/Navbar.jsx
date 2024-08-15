import { Link } from "react-router-dom";

export default function Navbar() {
  const regression = [
    { name: "Linear Regression", path: "/regression/linear-regression" },
    {
      name: "Polynomial Regression",
      path: "/regression/polynomial-regression",
    },
    {
      name: "Support Vector Regression",
      path: "/regression/support-vector-regression",
    },
    { name: "K-Nearest Neighbors", path: "/regression/k-nearest-neighbors" },
    {
      name: "Decision Tree Regression",
      path: "/regression/decision-tree-regression",
    },
    {
      name: "Random Forest Regression",
      path: "/regression/random-forest-regression",
    },
    {
      name: "Gradient Boosting Regression",
      path: "/regression/gradient-boosting-regression",
    },
  ];
  const classification = [
    {
      name: "Logistic Regression",
      path: "/classification/logistic-regression",
    },
    {
      name: "K-Nearest Neighbors",
      path: "/classification/k-nearest-neighbors",
    },
    { name: "Decision Tree", path: "/classification/decision-tree" },
    { name: "Random Forest", path: "/classification/random-forest" },
    {
      name: "Support Vector Machine",
      path: "/classification/support-vector-machine",
    },
    { name: "Naive Bayes", path: "/classification/naive-bayes" },
  ];

  const clustering = [
    { name: "K-Means Clustering", path: "/clustering/k-means-clustering" },
    {
      name: "Hierarchical Clustering",
      path: "/clustering/hierarchical-clustering",
    },
    { name: "DBSCAN", path: "/clustering/dbscan" },
    { name: "Mean Shift", path: "/clustering/mean-shift" },
    {
      name: "Gaussian Mixture Models",
      path: "/clustering/gaussian-mixture-models",
    },
    {
      name: "Agglomerative Clustering",
      path: "/clustering/agglomerative-clustering",
    },
    { name: "Birch Clustering", path: "/clustering/birch-clustering" },
  ];

  return (
    <>
      <header className="navbar navbar-expand-md d-print-none">
        <div className="container-xl">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
            aria-controls="navbar-menu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="navbar-brand d-none d-md-flex pe-0 pe-md-3">
            <a
              href="/"
              className="navbar-title text-decoration-none text-dark fs-1 fw-bold"
            >
              Kaf Machine Learning
            </a>
          </div>

          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-item d-none d-md-flex me-3">
              {/* <div className="btn-list">
                <a
                  href="https://github.com/sponsors/codecalm"
                  className="btn"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon text-pink"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                  </svg>
                  Sponsor
                </a>
              </div> */}
            </div>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link d-flex lh-1 text-reset p-0"
                data-bs-toggle="dropdown"
                aria-label="Open user menu"
              >
                <span
                  className="avatar avatar-sm"
                  style={{ backgroundImage: "url(./static/avatars/000m.jpg)" }}
                />
                <div className="d-none d-xl-block ps-2">
                  <div>Kafitra Marna</div>
                  <div className="mt-1 small text-secondary">Data Scientist</div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <a href="#" className="dropdown-item">
                  Status
                </a>
                <a href="./profile.html" className="dropdown-item">
                  Profile
                </a>
                <a href="#" className="dropdown-item">
                  Feedback
                </a>
                <div className="dropdown-divider" />
                <a href="./settings.html" className="dropdown-item">
                  Settings
                </a>
                <a href="./sign-in.html" className="dropdown-item">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="navbar-expand-md">
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="navbar">
            <div className="container-xl">
              <div className="row flex-fill align-items-center">
                <div className="col">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          {/* Download SVG icon from http://tabler-icons.io/i/home */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                          </svg>
                        </span>
                        <span className="nav-link-title">Home</span>
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#navbar-base"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        role="button"
                        aria-expanded="false"
                      >
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          {/* Download SVG icon from http://tabler-icons.io/i/package */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
                            <path d="M12 12l8 -4.5" />
                            <path d="M12 12l0 9" />
                            <path d="M12 12l-8 -4.5" />
                            <path d="M16 5.25l-8 4.5" />
                          </svg>
                        </span>
                        <span className="nav-link-title">Regression</span>
                      </a>
                      <div className="dropdown-menu">
                        <div className="dropdown-menu-columns">
                          <div className="dropdown-menu-column">
                            {regression.map((item) => (
                              <Link
                                className="dropdown-item"
                                to={item.path}
                                key={item.name}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#navbar-extra"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        role="button"
                        aria-expanded="false"
                      >
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          {/* Download SVG icon from http://tabler-icons.io/i/star */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                          </svg>
                        </span>
                        <span className="nav-link-title">Classification</span>
                      </a>
                      <div className="dropdown-menu">
                        <div className="dropdown-menu-columns">
                          <div className="dropdown-menu-column">
                            {classification.map((item) => (
                              <Link
                                className="dropdown-item"
                                to={item.path}
                                key={item.name}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#navbar-layout"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        role="button"
                        aria-expanded="false"
                      >
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          {/* Download SVG icon from http://tabler-icons.io/i/layout-2 */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                            <path d="M4 13m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                            <path d="M14 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                            <path d="M14 15m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          </svg>
                        </span>
                        <span className="nav-link-title">Clustering</span>
                      </a>
                      <div className="dropdown-menu">
                        <div className="dropdown-menu-columns">
                          <div className="dropdown-menu-column">
                            {clustering.map((item) => (
                              <Link
                                className="dropdown-item"
                                to={item.path}
                                key={item.name}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
