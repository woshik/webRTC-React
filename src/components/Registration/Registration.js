import React, { useEffect, useRef } from 'react';
import FormWrapper from '../FormWrapper/FormWrapper';
import FormCopyRight from '../FormCopyRight/FormCopyRight';

const Registration = () => {
  const inputField = useRef(null);
  useEffect(function () {
    document.title = 'WireSquare - Register';
    inputField.current.focus();
  }, []);

  return (
    <FormWrapper>
      <form method="POST" action="#">
        <div className="field">
          <div className="columns">
            <div className="column">
              <div className="control no-margin-bottom">
                <input
                  className="input is-rounded is-large is-transparent"
                  type="text"
                  name="first-email"
                  title="first-email"
                  placeholder="First Name"
                  required
                  ref={inputField}
                />
              </div>
            </div>
            <div className="column">
              <div className="control no-margin-bottom">
                <input
                  className="input is-rounded is-large is-transparent"
                  type="text"
                  name="last-name"
                  title="last-name"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
          </div>
          <div className="control">
            <input
              className="input is-rounded is-large is-transparent"
              type="email"
              name="email"
              title="email"
              placeholder="Email"
              required
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
            <button className="button is-rounded is-large is-fullwidth authentication-button">Sign up</button>
          </div>
          <div className="control">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <p className="hint">
                    <strong>
                      By signing up, you agree to our <a href="#">Terms of Service</a> and
                      <a href="#">Privacy Policy.</a>
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <FormCopyRight />
        </div>
      </form>
    </FormWrapper>
  );
};

export default Registration;
