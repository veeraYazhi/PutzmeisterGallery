import { Platform, StyleSheet } from 'react-native';
import { theme } from '../theme/index';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.small,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: Platform.OS === 'ios' ? 20 : 0, // Add margin top for iOS status bar
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    marginBottom: theme.spacing.medium,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    marginBottom: theme.spacing.small,
  },
  description: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
  },
  section: {
    marginVertical: theme.spacing.small,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: Platform.select({
      android: theme.spacing.medium,
      ios: theme.spacing.large,
    }),
    paddingBottom: theme.spacing.tiny,
  },
  infoContainer: {
    padding: theme.spacing.small,
    backgroundColor: theme.colors.background,
    marginHorizontal: theme.spacing.small,
    marginTop: theme.spacing.small,
  }
});
