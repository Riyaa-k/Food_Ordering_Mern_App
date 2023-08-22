


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Signup = () => {
//     let navigate = useNavigate();
//     const [first, setFirst] = useState({ name: "", email: "", password: "", Geolocation: "" });
//     const [successMessage, setSuccessMessage] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch("http://localhost:5000/api/Createuser", {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     name: first.name,
//                     email: first.email,
//                     password: first.password,
//                     location: first.Geolocation
//                 })

//             });

//             const json = await response.json();
//             console.log(json);
//             if (json.success) {
//                 setSuccessMessage("Signup successful!"); // Set success message here
//                 navigate("/login");
//             }

//             if (!json.success) {
//                 alert("Enter valid credentials");
//             }
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };


//     const onChange = (event) => {
//         setFirst({ ...first, [event.target.name]: event.target.value })
//     };

//     return (
//         <>
//             <div className="container">
//                 {successMessage && (
//                     <div className="alert alert-success" role="alert">
//                         {successMessage}
//                     </div>
//                 )}
//                 <form onSubmit={handleSubmit}>
//                     {/* Your form inputs */}
//                     <div className="mb-3">
//                         <label htmlFor="exampleInputPassword1" className="form-label">
//                             Name
//                         </label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             name="name"
//                             value={first.name}
//                             onChange={onChange}

//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="exampleInputEmail1" className="form-label">
//                             Email address
//                         </label>
//                         <input
//                             type="email"
//                             className="form-control"
//                             name="email"
//                             value={first.email}
//                             onChange={onChange}
//                             id="exampleInputEmail1"
//                             aria-describedby="emailHelp"
//                         />
//                         <div id="emailHelp" className="form-text">
//                             We'll never share your email with anyone else.
//                         </div>
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="exampleInputPassword1" className="form-label">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             id="exampleInputPassword1"
//                             name="password"
//                             value={first.password}
//                             onChange={onChange}
//                         />
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="exampleInputPassword1" className="form-label">
//                             Location
//                         </label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="exampleInputPassword1"
//                             name="Geolocation"
//                             value={first.Geolocation}
//                             onChange={onChange}
//                         />
//                     </div>
//                     <button type="submit" className="btn btn-success">
//                         Submit
//                     </button>
//                     <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default Signup;


// ********8888888888888888888888888888888888888

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();
  const [first, setFirst] = useState({
    name: "",
    email: "",
    password: "",
    Geolocation: ""
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/Createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: first.name,
          email: first.email,
          password: first.password,
          location: first.Geolocation
        })
      });

      const json = await response.json();
      if (json.success) {
        setSuccessMessage("Signup successful!");
        navigate("/login");
      }

      if (!json.success) {
        alert("Enter valid credentials");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onChange = (event) => {
    setFirst({ ...first, [event.target.name]: event.target.value });
  };

  return (
    <div className="container mt-5">
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={first.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={first.email}
            onChange={onChange}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={first.password}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Geolocation" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            name="Geolocation"
            value={first.Geolocation}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Sign Up
        </button>
        <Link to="/login" className="btn btn-danger ms-2">
          Already a user? Log In
        </Link>
      </form>
    </div>
  );
};

export default Signup;
