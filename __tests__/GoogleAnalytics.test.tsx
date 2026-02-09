import React from 'react';
import { render } from '@testing-library/react';
import GoogleAnalytics from '@/components/GoogleAnalytics';

jest.mock('next/navigation', () => ({
  usePathname: () => '/mock-path',
  useSearchParams: () => new URLSearchParams(''),
}));

describe('GoogleAnalytics', () => {
  it('renders the GA script', () => {
    render(<GoogleAnalytics />);
    const script = document.querySelector('script[src*="googletagmanager.com"]');
    expect(script).toBeInTheDocument();
  });

  it('calls gtag when window.gtag exists', () => {
    window.gtag = jest.fn();
    render(<GoogleAnalytics />);
    expect(window.gtag).toHaveBeenCalledWith('config', expect.any(String), expect.objectContaining({
      page_path: expect.any(String),
    }));
  });

  it('does not throw when window.gtag is undefined', () => {
    window.gtag = undefined;
    expect(() => render(<GoogleAnalytics />)).not.toThrow();
  });
});
