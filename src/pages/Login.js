import React from 'react';
import '../Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:4000/user/login', values);
        toast.success("Login Successful");
        navigate('/');
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      }
    }
  });

  return (
    <MDBContainer fluid className='background-radial-gradient'>
      <ToastContainer />
      <MDBCard className='form-card'>
        <div className='form-header'>
          <h2>Library Management System</h2>
          <p>Login to access the library</p>
        </div>
        <MDBCardBody className='form-body'>
          <form onSubmit={formik.handleSubmit}>
            {/* <MDBRow className='input-group'> */}
              {/* <MDBCol>
                <MDBInput
                  label='Name'
                  id='name'
                  name='name'
                  type='text'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.errors.name && formik.touched.name ? 'is-invalid' : ''}
                />
                {formik.errors.name && formik.touched.name ? <div className="invalid-feedback">{formik.errors.name}</div> : null}
              </MDBCol> */}
            {/* </MDBRow> */}
            <MDBRow className='input-group'>
              <MDBCol>
                <MDBInput
                  label='Email'
                  id='email'
                  name='email'
                  type='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.errors.email && formik.touched.email ? 'is-invalid' : ''}
                />
                {formik.errors.email && formik.touched.email ? <div className="invalid-feedback">{formik.errors.email}</div> : null}
              </MDBCol>
            </MDBRow>
            <MDBRow className='input-group'>
              <MDBCol>
                <MDBInput
                  label='Password'
                  id='password'
                  name='password'
                  type='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.errors.password && formik.touched.password ? 'is-invalid' : ''}
                />
                {formik.errors.password && formik.touched.password ? <div className="invalid-feedback">{formik.errors.password}</div> : null}
              </MDBCol>
            </MDBRow>
            <div className='form-footer'>
              <MDBBtn className='btn' size='md' type='submit'>Sign In</MDBBtn>
              <div className='form-link-container'>
                <span>New User?</span><br />
                <Link to="/register" className='form-link'>Click here to Register</Link>
              </div>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
