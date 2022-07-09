import gif from "./error.gif";

const ErrorMessage = () => {
  return <img src={gif} alt="error message" style={{ margin: "0 auto", display: "block", objectFit: "contain", width: "250px", height: "250px" }} />;
};

export default ErrorMessage;
