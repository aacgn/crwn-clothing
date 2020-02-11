import React from 'react';
import { connect } from 'react-redux';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

import CollectionPreview from '../../components/collection-preview/collection-preview.component.jsx';

import './collections-overview.styles.scss';

function CollectionsOverview({ collections }) {
    return (
        <div className="collections-overview">
            {
                collections.map( ({ id, ...otherCollectionProps }) => (
                    <CollectionPreview key={id} {...otherCollectionProps}></CollectionPreview>
                ))
            }
        </div>
    );
}

const mapStateToProps = state => ({
    collections: selectCollectionsForPreview(state)
});

export default connect(mapStateToProps)(CollectionsOverview);
