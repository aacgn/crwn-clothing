import React from 'react';
import { connect } from 'react-redux';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

import CollectionPreview from '../../components/collection-preview/collection-preview.component.jsx';

import { CollectionsOverviewContainer } from './collections-overview.styles';

function CollectionsOverview({ collections }) {
    return (
        <CollectionsOverviewContainer>
        {collections.map(({ id, ...otherCollectionProps }) => (
          <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
      </CollectionsOverviewContainer>
    );
}

const mapStateToProps = state => ({
    collections: selectCollectionsForPreview(state)
});

export default connect(mapStateToProps)(CollectionsOverview);
