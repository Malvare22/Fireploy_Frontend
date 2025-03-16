import styles from "./AtomicModel.module.css"; // Importa el módulo CSS

const AtomicModel = () => {
  return (
    <div className={styles.atom}>
      <div className={styles.sun}></div>
      <div className={styles.orbit1}>
        <div className={styles.asteroid}></div>
      </div>
      <div className={styles.orbit2}>
        <div className={styles.asteroid}></div>
      </div>
      <div className={styles.orbit3}>
        <div className={styles.asteroid}></div>
      </div>
    </div>
  );
};

export default AtomicModel;
