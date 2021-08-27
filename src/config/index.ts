// icons
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/BarChartOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';

// components
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings';

// interface
import RouteItem from '../model/RouteItem.model';

// define app routes
export const routes: Array<RouteItem> = [
    {
        key: 'router-home',
        title: 'Home',
        tooltip: 'Home',
        path: '/',
        enabled: true,
        component: Home,
        icon: HomeIcon,
        appendDivider: true,
    },
    {
        key: 'router-dashboard',
        title: 'Dashboard',
        tooltip: 'Dashboard',
        path: '/dashboard',
        enabled: true,
        component: Dashboard,
        icon: DashboardIcon,
    },
    {
        key: 'router-settings',
        title: 'Settings',
        tooltip: 'Settings',
        path: '/settings',
        enabled: true,
        component: Settings,
        icon: SettingsIcon,
    },
];
