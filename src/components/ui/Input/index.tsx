import styles from "./styles.module.scss";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

interface TexteAreaProps extends TextareaHTMLAttributes<HTMLAreaElement> {}

export function Input({ ...props }: InputProps) {
  return <input type="text" className={styles["input"]} {...props} />;
}

export function TextArea({ ...props }: TexteAreaProps) {
  return <textarea className={styles["input"]}></textarea>;
}
