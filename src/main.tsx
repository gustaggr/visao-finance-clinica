
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Definição de variáveis CSS globais para tema
document.documentElement.style.setProperty('--vision', '#8B5CF6');
document.documentElement.style.setProperty('--vision-dark', '#7C3AED');
document.documentElement.style.setProperty('--vision-accent', '#EDE9FE');

createRoot(document.getElementById("root")!).render(<App />);
