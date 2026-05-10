import { hydrateRoot } from 'react-dom/client';
import { App } from './App';

export default (): void => {
  const root = document.getElementById('app');
  if (root) {
    hydrateRoot(root, <App />);
  }
};
