import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import { HashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <NextUIProvider>
        <ThemeProvider attribute='class' defaultTheme='system'>
          <main className="text-foreground bg-background">
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </main>
        </ThemeProvider>
      </NextUIProvider>
    </HashRouter>
  </React.StrictMode>,
)
