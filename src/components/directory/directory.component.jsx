import React from "react";
import { connect } from "react-redux";
import MenuItem from "../menu-item/menu-item.component";

import { selectDirectorySections } from "../../redux/directory/directory.selectors";

import "./directory.styles.scss";

const Directory = (props) => {
  const { sections } = props;
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sections: selectDirectorySections(state),
  };
};
export default connect(mapStateToProps)(Directory);
