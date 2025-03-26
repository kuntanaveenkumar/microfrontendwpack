import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../slices/auth";
import { useNavigate } from "react-router-dom";
import { clearMessage } from "../slices/message";
import Logo from "./logo";
var md5 = require("md5")
const style = {	paddingBottom: '71px'}	
const Login = (props) => {
	 console.log(window.location.origin+"origin")
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);  
  //const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const initialValues = {
    username: "",
    password: "",
    deviceUID:""
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),    
  });
  const handleLogin = (formValue) => {       
    const { username, password} = formValue;
    setLoading(true);          
   dispatch(login({ username, password}))
      .unwrap()
      .then((response) => 
      {       
		  console.log("dispatch")
		  console.log(response.user.status.message)		
        if(localStorage.getItem("token"))
	      navigate("/groups", { replace: true });		
			window.location.reload(false);
      })
      .catch(() => {
        setLoading(false);
      });      
	  
  };
  return (
    <div class="wrapper"> <div class="col-md-4"></div><div class="col-md-4"><div className="sidebar-header" >
                <div style={style}>
                   <Logo />
                </div>			
            </div>           
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form  className="form-signin">
			
			<div>
			Welcome Back !
			<h6>Sign In to Enter into your account</h6>
			</div>
			{message && (
			<div className="form-group">
			<div className="alert alert-danger" role="alert">
			{message}
			</div>
			</div>
			)}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-lg btn-primary btn-block btn-signin" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
                <Field type="hidden" name="deviceUID" id="deviceUID" value="{deviceUID}"/>
              </button>
            </div>
          </Form>
        </Formik>
      </div>
	 <div class="col-md-4"></div>       
    </div>
  );
};
export default Login;
