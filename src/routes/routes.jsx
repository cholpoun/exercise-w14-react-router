import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import SongInfo from '../pages/SongInfo';

const routes = [
  <Route path="/" element={<Home />} key="home" />,
  <Route path="/song/:songTitle" element={<SongInfo />} key="songInfo" />
];

export default routes;
