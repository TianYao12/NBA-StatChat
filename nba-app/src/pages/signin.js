import styles from "../styles/signin.module.css";

export default function Signin() {
  return (
    <>
      <div className={styles.main}>
        <p>Sign In</p>
        <input type="text" placeholder="Email"/>
        <input type="text" placeholder="Password"/>
        <p>Login</p>
        <p>Don't have an account? Register</p>
      </div>
    </>
  );
}
