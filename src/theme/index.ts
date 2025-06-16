export const theme = {
  colors: {
    primary: '#4CAF50',
    primaryDark: '#388E3C',
    overlay: 'rgba(0, 0, 0, 0.05)',
    text: '#000',
    textSecondary: '#666',
    background: '#fff',
    error: '#FF0000',
    success: '#4CAF50',
    warning: '#FFC107',
    info: '#2196F3',
  } as const,
  spacing: {
    tiny: 4,
    small: 8,
    medium: 12,
    large: 16,
    xLarge: 20,
  },
  typography: {
    title: {
      fontSize: 24,
      fontWeight: 'bold' as const,
    },
    fontSizes: {
      small: 14,
    },
    description: {
      fontSize: 16,
      color: '#666',
    },
  },
  header: {
    title: 'Putzmeiser Flicker Gallery',
  },
} as const;
