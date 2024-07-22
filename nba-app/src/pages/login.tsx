import styles from "../styles/login.module.css";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import loginValidate from "../../lib/validate";
import { useRouter } from "next/router";
import Link from "next/link";

interface Submission {
  email: string;
  password: string;
}

// Login is the login page
const Login = () => {
  const router = useRouter();

  /**
   * Formik calls 'validate' function whenever form values change or on submission
   * It returns an object where the keys correspond to form field names, and the values are
   * error messages (or undefined if there are no errors).
   * OnSubmit function is called upon submission of form
   */
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate: loginValidate,
    onSubmit,
  });

  // onSubmit(values) redirects to URL after successful login using email and password attributes from values parameter
  async function onSubmit(values: Submission) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "http://localhost:3000",
    });
    if (status && status.ok && status.url !== null) router.push(status.url);
  }

  // signin is NextAuth function that takes in login option and where to redirect after login
  async function handleGoogleSignIn() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }
  async function handleGithubLogIn() {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  }
  return (
    <div className={styles.title}>
      <h1 className={styles.h1}>Login to NBA StatChat</h1>

      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.small}>
          <input
            className={styles.inputBox}
            placeholder="Email"
            type="email"
            {...formik.getFieldProps("email")}
          />
          {/* formik.touched.email is if the email was typed and you click off */}
          {formik.errors.email && formik.touched.email ? (
            <span>{formik.errors.email}</span>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.small}>
          <input
            className={styles.inputBox}
            placeholder="Password"
            type="password"
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password && formik.touched.password ? (
            <span>{formik.errors.password}</span>
          ) : (
            <></>
          )}
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>

      <button className={styles.button} onClick={handleGithubLogIn}>
        Login Using Github
      </button>
      <button className={styles.button} onClick={handleGoogleSignIn}>
        Login Using Google
      </button>
      <p className={styles.end}>
        No account? <Link href="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
