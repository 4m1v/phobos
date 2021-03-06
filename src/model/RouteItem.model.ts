import { ComponentType, FC } from 'react';

// RouteItem is an interface for defining the application routes
interface RouteItem {
  key: string;
  title: string;
  tooltip?: string;
  path?: string;
  component?: FC<Record<string, never>>;
  enabled: boolean;
  icon?: ComponentType;
  subRoutes?: Array<RouteItem>;
  appendDivider?: boolean;
}

export default RouteItem;
