import React from 'react';
import logo from '../../images/authentication_forms_logo.png';

export default function FormWrapper({ children }) {
  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-5-tablet is-5-desktop is-4-widescreen">
            <div className="authentication-form-wrapper" id="login">
              <div className="card-title card-image has-text-centered">
                <figure className="image is-inline-block">
                  <img className="login-logo" src={logo} alt="logo" />
                </figure>
              </div>
              <h1>Login to WireSquare</h1>
              <div className="form-dash-divider"></div>
              <div className="content"></div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
