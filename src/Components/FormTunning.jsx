import PropTypes from "prop-types";

function FormTunning({ handleSubmit, form_inputs }) {
  // Render the form item based on its configuration
  const renderItem = (input) => {
    const { id, label, type, placeholder, value, onChange, options, description } = input;

    return (
      <div className="mb-3" key={id}>
        <label htmlFor={id} className="form-label">{label}:</label>
        {type === "select" ? (
          <select
            id={id}
            name={id}
            className="form-select"
            value={value}
            onChange={onChange}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            id={id}
            name={id}
            className="form-control"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
        <small className="form-text text-muted">
          {description}
        </small>
      </div>
    );
  };

  return (
    <div className="card card-md mb-3">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {form_inputs.map((input) => renderItem(input))}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

FormTunning.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  form_inputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      value: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired
        })
      ),
      description: PropTypes.string
    })
  ).isRequired
};

export default FormTunning;
