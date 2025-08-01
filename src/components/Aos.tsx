"use client";

import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function AOS({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    Aos.init({
      duration: 400,
      easing: 'ease-out-cubic',
      // once: true,
      offset: 100,
    });
  }, []);

  return <>{children}</>;
}