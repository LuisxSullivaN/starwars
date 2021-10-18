import { render } from '@testing-library/react';

import SwapiFeatureSpecies from './swapi-feature-species';

describe('SwapiFeatureSpecies', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SwapiFeatureSpecies />);
    expect(baseElement).toBeTruthy();
  });
});
