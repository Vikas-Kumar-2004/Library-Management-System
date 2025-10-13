import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
const UserHome = () => (
  <div>
    <Navbar role="user" />
    <Sidebar role="user" />
    <h2>Welcome User</h2>
  </div>
);

export default UserHome;