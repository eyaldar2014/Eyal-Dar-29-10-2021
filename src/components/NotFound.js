import { Redirect } from "react-router-dom";


function NotFound(props) {
  
  
  return (
    <div>
      <Redirect to="/" />
    </div>
  );
}

export default NotFound;