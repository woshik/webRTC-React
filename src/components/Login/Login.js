import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import FormWrapper from '../FormWrapper/FormWrapper';
import FormCopyRight from '../FormCopyRight/FormCopyRight';

const Login = () => {
  const [check, setCheck] = useState(true);
  const inputRef = useRef(null);
  useEffect(function () {
    document.title = 'WireSquare - Login';
    inputRef.current.focus();
  }, []);

  return (
    <FormWrapper>
      <form method="POST" action="#">
        <div className="field">
          <div className="control">
            <input
              className="input is-rounded is-large is-transparent"
              type="email"
              name="email"
              title="email"
              placeholder="Email"
              required
              ref={inputRef}
            />
          </div>
          <div className="control">
            <input
              className="input is-rounded is-large is-transparent"
              type="password"
              name="password"
              title="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="control">
            <div className="level">
              <div className="level-left"></div>
              <div className="level-right">
                <div className="level-item">
                  <Link className="authentication-link" to="/forgot-password">
                    <strong>Forgot password?</strong>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="control">
            <div className="level slider-checkbox authentication-checkbox">
              <div className="level-left">
                <div className="level-item">
                  <label className="switch">
                    <input type="checkbox" checked={check} onChange={() => setCheck((preCheck) => !preCheck)} />
                    <div></div>
                  </label>
                  <span className="slider-checkbox-label">Keep me logged in</span>
                </div>
              </div>
              <div className="level-right"></div>
            </div>
          </div>
          <div className="control">
            <button className="button is-rounded is-large is-fullwidth authentication-button">Login</button>
          </div>
          <div className="form-textual-divider">OR</div>
          <div className="control">
            <div className="columns">
              <div className="column is-one-third">
                <button className="button is-rounded is-medium is-transparent">
                  <ion-icon className="icon" size="small" name="logo-linkedin"></ion-icon>
                </button>
              </div>
              <div className="column is-one-third">
                <button className="button is-rounded is-medium is-transparent">
                  <ion-icon className="icon" size="small" name="logo-facebook"></ion-icon>
                </button>
              </div>
              <div className="column is-one-third">
                <button className="button is-rounded is-medium is-transparent">
                  <ion-icon className="icon" size="small" name="logo-google"></ion-icon>
                </button>
              </div>
            </div>
          </div>
          <FormCopyRight />
        </div>
      </form>
    </FormWrapper>
  );
};

export default Login;
