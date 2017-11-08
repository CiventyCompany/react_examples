import React from 'react';

import SelectInput from '../../../../../Shared/common/components/Select/SelectInput';

import {
  SELECT_ORIGINAL_DATASET,
  SELECT_OTHER_RESULT,
} from '../../names';

export default props => (<SelectInput
  {...props}
  placeholder="Source"
  className="a-sections-select"
  multi={false}
  clearable={false}
  options={[{
    value: SELECT_ORIGINAL_DATASET,
    label: 'Original dataset',
  }, {
    id: SELECT_OTHER_RESULT,
    name: 'Other result',
  }]}
/>);
