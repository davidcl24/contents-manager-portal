'use client';
import { ContentFormEmail, ContentFormPassword } from "../login-form";
import styles from '../form.module.css';
import { useState } from "react";
import { login } from "../login-operation";
import Link from "next/link";

/**
 * @summary An HTML form component that will let the user login into the app
 * @returns HTML component
 */
export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const ok = await login(formData);
 
    if (ok) {
      window.location.href = '/movies'; 
    } else {
      console.error("Error en login");
    }

    setLoading(false);
  };

  return(
    <div>
      <form className={styles.formWrapperLogin} onSubmit={handleSubmit}>
        <ContentFormEmail question="E-mail" value={""}/>
        <ContentFormPassword question="Password" value={""}/>
        <input 
          className={styles.button} 
          type="submit" 
          value={loading ? 'Loading...' : 'Log In'} 
          disabled={loading} 
        />
      </form>
    </div>
  );
}
