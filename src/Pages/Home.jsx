import { Link } from 'react-router-dom';
import Base from '../Components/Base';
import comparison from '../assets/dif.png';

export default function Home() {
  return (
    <Base pretitle="Home" title="Dashboard">
      <div className="card card-md">
        <div className="card-body">
          <h2 className="mb-4">Welcome to the Machine Learning Dashboard</h2>
          <p className="mb-4">Explore various machine learning algorithms and their applications. Click on the links below to learn more about each algorithm.</p>
          
          {/* Regression Card */}
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title">Regression Algorithms</h4>
              <p className="card-text">
                Regression algorithms are used to predict a continuous outcome based on one or more predictor variables. They help in understanding relationships between variables and making forecasts.
              </p>
              <ul className="list-unstyled">
                {[
                  { name: "Linear Regression", path: "/regression/linear-regression" },
                  { name: "Polynomial Regression", path: "/regression/polynomial-regression" },
                  { name: "Support Vector Regression", path: "/regression/support-vector-regression" },
                  { name: "K-Nearest Neighbors", path: "/regression/k-nearest-neighbors" },
                  { name: "Decision Tree Regression", path: "/regression/decision-tree-regression" },
                  { name: "Random Forest Regression", path: "/regression/random-forest-regression" },
                  { name: "Gradient Boosting Regression", path: "/regression/gradient-boosting-regression" },
                ].map((algo) => (
                  <li key={algo.path}>
                    <Link to={algo.path} className="text-decoration-none text-primary">
                      {algo.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Classification Card */}
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title">Classification Algorithms</h4>
              <p className="card-text">
                Classification algorithms are used to categorize data into predefined classes or categories. They are useful in problems where the output is a discrete label.
              </p>
              <ul className="list-unstyled">
                {[
                  { name: "Logistic Regression", path: "/classification/logistic-regression" },
                  { name: "K-Nearest Neighbors", path: "/classification/k-nearest-neighbors" },
                  { name: "Decision Tree", path: "/classification/decision-tree" },
                  { name: "Random Forest", path: "/classification/random-forest" },
                  { name: "Support Vector Machine", path: "/classification/support-vector-machine" },
                  { name: "Naive Bayes", path: "/classification/naive-bayes" },
                ].map((algo) => (
                  <li key={algo.path}>
                    <Link to={algo.path} className="text-decoration-none text-primary">
                      {algo.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Clustering Card */}
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title">Clustering Algorithms</h4>
              <p className="card-text">
                Clustering algorithms are used to group similar data points into clusters. They help in identifying patterns and structures within the data.
              </p>
              <ul className="list-unstyled">
                {[
                  { name: "K-Means Clustering", path: "/clustering/k-means-clustering" },
                  { name: "Hierarchical Clustering", path: "/clustering/hierarchical-clustering" },
                  { name: "DBSCAN", path: "/clustering/dbscan" },
                  { name: "Mean Shift", path: "/clustering/mean-shift" },
                  { name: "Gaussian Mixture Models", path: "/clustering/gaussian-mixture-models" },
                  { name: "Agglomerative Clustering", path: "/clustering/agglomerative-clustering" },
                  { name: "Birch Clustering", path: "/clustering/birch-clustering" },
                ].map((algo) => (
                  <li key={algo.path}>
                    <Link to={algo.path} className="text-decoration-none text-primary">
                      {algo.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Comparison Image */}
          <div className="text-center">
            <h3 className="mb-3">Comparison of Algorithms</h3>
            <img src={comparison} alt="Comparison of Regression, Classification, and Clustering" className="img-fluid" />
            <p className="mt-2">An illustration showing the differences between Regression, Classification, and Clustering.</p>
          </div>
        </div>
      </div>
    </Base>
  );
}
