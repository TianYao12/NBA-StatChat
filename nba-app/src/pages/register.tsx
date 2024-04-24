import styles from "../styles/login.module.css";
import { useFormik } from "formik";
import { registerValidate } from "../../lib/validate";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn } from "next-auth/react";

interface Submission {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
// Register registers a new user
const Register = () => {
  const router = useRouter();

  /**
   * Formik calls 'validate' function whenever form values change or on submission
   * It returns an object where the keys correspond to form field names, and the values are
   * error messages (or undefined if there are no errors).
   * OnSubmit function is called upon submission of form
   */
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: registerValidate,
    onSubmit,
  });

  // onSubmit(values) handles form submission
  async function onSubmit(values: Submission) {
    // if there are no validation errors
    if (Object.keys(formik.errors).length === 0) {
      // send POST request to Next.js signup API endpoint
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        // Registration was successful, now sign in the user
        const signInResponse = await signIn("credentials", {
          redirect: false, // Ensure that it doesn't automatically redirect
          email: values.email,
          password: values.password,
          callbackUrl: "http://localhost:3000", // Redirect URL after login
        });

        if (signInResponse && signInResponse.ok && signInResponse.url != null) {
          router.push(signInResponse.url);
        } else {
          console.error("Sign-in after registration failed");
        }
      } else {
        console.error("Registration failed");
      }
    } else {
      console.log(formik.errors);
    }
  }

  return (
    <div className={styles.title}>
      <h1>Register to NBAExplorer</h1>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.small}>
          <input
            className={styles.inputBox}
            placeholder="Username"
            type="string"
            {...formik.getFieldProps("username")} // does many props automatically
          />
          {formik.errors.username && formik.touched.username ? (
            formik.errors.username
          ) : (
            <></>
          )}
        </div>
        <div className={styles.small}>
          {/* Email */}
          <input
            className={styles.inputBox}
            placeholder="Email"
            type="email"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email ? (
            formik.errors.email
          ) : (
            <></>
          )}
        </div>
        {/* Password */}
        <div className={styles.small}>
          <input
            className={styles.inputBox}
            placeholder="Password"
            type="password"
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password && formik.touched.password ? (
            formik.errors.password
          ) : (
            <></>
          )}
        </div>
        {/* Confirm Password */}
        <div className={styles.small}>
          <input
            className={styles.inputBox}
            placeholder="Confirm Password"
            type="password"
            {...formik.getFieldProps("confirmPassword")}
          />
        </div>
        {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
          formik.errors.confirmPassword
        ) : (
          <></>
        )}
        <button type="submit" className={styles.button}>
          Register
        </button>
        <p className={styles.end}>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
