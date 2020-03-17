//Routes
import Dashboard from '../Containers/AdminContainer/Dashboard';
import UserDashboard from '../Containers/UserContainer/Dashboard';

//common
// import EventDetails from '../Containers/Common/EventDetails';

//admin routes
import Events from '../Containers/AdminContainer/Events';
import AddEvent from '../Containers/AdminContainer/Events/AddEvent';
import EventEdit from '../Containers/AdminContainer/Events/EventEdit';

//user routes
import Event from '../Containers/UserContainer/Event';
// import EventDetail from '../Containers/Home/Events/EventDetail';
// import EntryList from '../Containers/AdminContainer/Entry/EntryList';
import EventDetails from '../Containers/AdminContainer/Events/EventDetails';
import UserList from '../Containers/AdminContainer/User/UserList';
import EntryForm from '../Containers/AdminContainer/Events/EntryForm';
import ProfileView from '../Containers/Settings/Profile/ProfileView';
import CategoryList from '../Containers/AdminContainer/Category/CategoryList';
import EntrantList from '../Containers/AdminContainer/Entrant/EntrantList';
import EntryList from '../Containers/AdminContainer/EntryList/EntryList';

const routes = [
    { path: '/Home', exact: true, name: 'Home', component: Dashboard },
    { path: '/Home/Events',exact: true,  name: 'Dashboard', component: Events },
    { path: '/Home/Events/AddEvent',exact: true,  name: 'Add Event', component: AddEvent },
    { path: '/Home/Events/EventEdit',exact: true,  name: 'Event Edit', component: EventEdit },
    { path: '/Home/Event/EntryForm',exact: true,  name: 'Entry Form', component: EntryForm },
    { path: '/Home/EntryList',exact: true,  name: 'Event Edit', component: EntryList },
    { path: '/Home/UserList',exact: true,  name: 'User List', component: UserList },
    // { path: '/Home/Event/:eventseo',exact: true,  name: 'Single Event', component: SingleEvent },
    { path: '/Home/Profile',exact: true,  name: 'Profile', component: ProfileView },
    { path: '/Home/Events/Details/',exact: true,  name: 'Event Details', component: EventDetails },
    { path: '/Home/Category/CategoryList/',exact: true,  name: 'Category List', component: CategoryList },
    { path: '/Home/Entrant/EntrantList/',exact: true,  name: 'Entrant List', component: EntrantList },
    // { path: '/Home/Events/Form/:id',exact: true,  name: 'Setup Form', component: EventForm },
  ];

const userRoutes = [
    { path: '/Home', exact: true, name: 'Home', component: UserDashboard },
    { path: '/Home/Events',exact: true,  name: 'Events', component: Event },
    { path: '/Home/Profile',exact: true,  name: 'Profile', component: ProfileView },
    // { path: '/Home/Event/:eventseo',exact: true,  name: 'Single Event', component: SingleEvent },
    // { path: '/Home/Events/Details/:id',exact: true,  name: 'Details', component: EventDetail },
  ];

export {routes,userRoutes};