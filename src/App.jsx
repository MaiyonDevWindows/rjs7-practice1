import { useState } from "react";
import "./App.css";

const App = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    isRead: false,
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (event) => {
    if (event.target.name === 'isRead') {
      setValues({
        ...values,
        [event.target.name]: !values.isRead,
      });
    } else {
      event.preventDefault();
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    }
  };

  const validate = () => {
    const { email, password, isRead, confirmPassword } = values;
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];
    if (email.length < 5) {
      errors.push("Email should be at least 5 characters long");
    }
    if (email.split("").filter((x) => x === "@").length !== 1) {
      errors.push("Email should contain a @");
    }
    if (email.indexOf(".") === -1) {
      errors.push("Email should contain at least one dot");
    }
    if (password.length < 6) {
      errors.push("Password should be at least 6 characters long");
    }
    if (password !== confirmPassword) {
      errors.push("Password should be at least 6 characters long");
    }
    if (!isRead) {
      errors.push("You must be accepted privacy policy");
    }
    return errors;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }
  };

  const stringJson = JSON.stringify(values);
  return (
    <div className="container">
      <h1>Đăng ký</h1>
      {errors.map((error) => (
        <p key={error}>Error: {error}</p>
      ))}
      <form onSubmit={handleSubmit}>
        <p>Nhập email:</p>
        <input
          name="email"
          type="text"
          defaultValue={values.email}
          onChange={handleChange}
        />
        <p>Nhập password:</p>
        <input
          name="password"
          type="password"
          defaultValue={values.password}
          onChange={handleChange}
        />
        <p>Nhập lại password:</p>
        <input
          name="confirmPassword"
          type="password"
          defaultValue={values.confirmPassword}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>
          <input
            name="isRead"
            type="checkbox"
            checked={values.isRead}
            onChange={handleChange} />
        </label>
        <button>Submit Form</button>
      </form>
      <div className="show-json-string-setValues">{stringJson}</div>
    </div>
  );
}
export default App;