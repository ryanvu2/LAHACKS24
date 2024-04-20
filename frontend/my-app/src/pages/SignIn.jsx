import React from 'react';
import "./SignIn.css"

function SignInPage() {
  // Handle the form submission
  function handleSubmit(event) {
    event.preventDefault();
    // Handle sign in
  }

  return (
    <div style={{ margin: 'auto' }}>
      <form onSubmit={handleSubmit}>
        <h1>MindScope</h1>

        {/* <button type="button">CONTINUE WITH FACEBOOK</button>
        <button type="button">CONTINUE WITH APPLE</button>
        <button type="button">CONTINUE WITH GOOGLE</button> */}

        <hr />

        <div>
          <label htmlFor="username">Email Address or Username</label>
          <input type="text" id="username" name="username" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>

        <div>
          <label>
            <input type="checkbox" name="remember" /> Remember me
          </label>
        </div>

        <button type="submit">LOG IN</button>

        {/* <div>
          <a href="/reset-password">Forgot your password?</a>
        </div> */}

        <hr />

        <div>
          <p>Don't have an account?</p>
          <button type="button">SIGN UP FOR MINDSCOPE</button>
        </div>
      </form>
    </div>
  );
}

export default SignInPage;
