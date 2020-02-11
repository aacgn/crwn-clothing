import React from 'react';
import { connect } from 'react-redux';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

function Directory({ sections }) {
  return (
      <div className='directory-menu'>
          {
              sections.map(({ id, ...otherSectionProps }) => {
                  return (<MenuItem key={id} {...otherSectionProps}></MenuItem>);
              })
          }
      </div>
  );
}

const mapStateToProps = state => ({
  sections: selectDirectorySections(state)
});

export default connect(mapStateToProps)(Directory);