import { Route, Redirect, BrowserRouter } from 'react-router-dom';

import { SwapiFeaturePeople } from '@starwars/swapi-feature-people';

import { SwapiFeatureSpecies } from '@starwars/swapi/feature-species';

export function App() {
  return (
    <BrowserRouter>
      <div className="px-24">
        <Redirect from="/" to="/people" />
        <Route path="/people" component={SwapiFeaturePeople} />
        <Route path="/species" component={SwapiFeatureSpecies} />
      </div>
    </BrowserRouter>
  );
}

export default App;
