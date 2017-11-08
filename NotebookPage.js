import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CommonNotebookPage from '../../../Shared/entities/notebook/containers/Notebook';
import BuyNotebook from '../../../Shared/entities/notebook/containers/Buy/BuyNotebook';
import CommonShareButton from '../../../Shared/common/containers/Share/ShareButton';

class DataScientistNotebookPageContainer extends React.PureComponent {
  render() {
    const { userId } = this.props;
    return (
      <div>
        <CommonNotebookPage getControl={
          notebook =>
            (notebook.author !== userId ? (<div>
              <BuyNotebook components={notebook} />
              <CommonShareButton
                entity="notebooks"
                id={notebook && notebook.id}
                data={notebook}
              />
            </div>) : '')
        }
        />
      </div>
    );
  }
}

DataScientistNotebookPageContainer.propTypes = {
  userId: PropTypes.number.isRequired,
};


export default connect(state => ({
  userId: state.profile.data.id,
}))(DataScientistNotebookPageContainer);
