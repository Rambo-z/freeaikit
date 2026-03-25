// GA4 Event Tracking for FreeAIKit tools
// Usage: trackToolEvent('image-compress', 'process', { fileCount: 3 })

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventAction = 'upload' | 'process' | 'download' | 'reset' | 'error';

export function trackToolEvent(
  toolSlug: string,
  action: EventAction,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', `tool_${action}`, {
      tool_name: toolSlug,
      ...params,
    });
  }
}
