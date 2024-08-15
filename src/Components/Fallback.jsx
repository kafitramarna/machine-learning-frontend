export default function Fallback() {
  return (
    <div className="card card-md">
      <div className="card-body">
        <div className="container container-slim py-4">
          <div className="text-center">
            <div className="text-secondary mb-3">Loading...</div>
            <div className="progress progress-sm">
              <div className="progress-bar progress-bar-indeterminate" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
