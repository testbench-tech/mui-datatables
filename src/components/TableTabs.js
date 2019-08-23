import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';

const defaultTabsStyles = theme => ({
  chip: {
    marginRight: theme.spacing.unit / 2,
  },
});

class TableTabs extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    tabs: PropTypes.array.isRequired,
    onTabSelected: PropTypes.func.isRequired,
    getTabSelectedId: PropTypes.func.isRequired,
  };

  handleClick = tabSelected => () => {
    const { onTabSelected } = this.props;
    onTabSelected(tabSelected);
    this.forceUpdate();
  };

  render() {
    const { classes, tabs, getTabSelectedId } = this.props;
    const selectedId = getTabSelectedId();
    return (
      <Grid>
        {tabs.map(tab => (
          <Chip
            key={tab.id}
            color={selectedId === tab.id ? 'primary' : 'default'}
            label={tab.name}
            clickable={true}
            className={classes.chip}
            onClick={this.handleClick(tab)}
          />
        ))}
      </Grid>
    );
  }
}

export default withStyles(defaultTabsStyles, { name: 'MUIDataTableTabs' })(TableTabs);
