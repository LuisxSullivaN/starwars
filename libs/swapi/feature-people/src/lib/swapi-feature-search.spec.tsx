import { render } from '@testing-library/react';

import SwapiFeaturePeople from './swapi-feature-people';

describe('SwapiFeatureSearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SwapiFeaturePeople />);
    expect(baseElement).toBeTruthy();
  });
});
