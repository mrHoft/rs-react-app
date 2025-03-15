import styles from './file.module.css';

export function InputFile({ name, accept }: { name: string; accept: string }) {
  return (
    <div className={styles.file}>
      <label htmlFor="files" className={styles.file__upload}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          height="1.5rem"
          fill="none"
          stroke="currentColor"
          strokeWidth="16"
        >
          <rect x="32" y="48" width="192" height="160" rx="8" />
          <circle cx="156" cy="100" r="12" />
          <path d="M147.31,164,173,138.34a8,8,0,0,1,11.31,0L224,178.06" />
          <path d="M32,168.69l54.34-54.35a8,8,0,0,1,11.32,0L191.31,208" />
        </svg>
      </label>
      <input type="file" name={name} id="files" accept={accept} />
    </div>
  );
}
