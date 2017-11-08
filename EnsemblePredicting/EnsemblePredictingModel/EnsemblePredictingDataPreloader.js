import { DATA_HOLDERS } from './EnsemblePredictingModel';
import API from '../../../../../../../api';

export default () => API.get('/categories/', { limit: 1000 }, 5)
  .then(res => Promise.resolve({
    [DATA_HOLDERS.solutionCategories]: res.data.results,
  }));
