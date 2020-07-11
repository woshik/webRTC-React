import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import FormWrapper from '../FormWrapper/FormWrapper';
import FormCopyRight from '../FormCopyRight/FormCopyRight';

const ForgotPassword = () => {
  const inputRef = useRef(null);
  useEffect(function () {
    document.title = 'WireSquare - Forgot Password';
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
            <button className="button is-rounded is-large is-fullwidth authentication-button">Submit</button>
          </div>
          <div className="control">
            <div className="level">
              <Link className="authentication-link" to="/">
                <strong>Back To Login</strong>
              </Link>
            </div>
          </div>

          <FormCopyRight />
        </div>
      </form>
    </FormWrapper>
  );
};

export default ForgotPassword;
