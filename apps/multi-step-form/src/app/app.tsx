import styles from './app.module.scss';
import { MultiStepForm } from '../components';

export function App() {
  return (
    <div className={styles.app}>
      <main className={styles['wrapper']}>
        <MultiStepForm />
      </main>
    </div>
  );
}

export default App;
