import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

const defaultTabsStyles = theme => ({
  chip: {
    marginRight: theme.spacing.unit / 2,
  },
  mypopper: {
    '&[data-x-out-of-boundaries]': {
      display: 'none',
    },
  },
  tooltip: {
    cursor: 'pointer',
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
          <Tooltip
            title={tab.hint}
            placement={'bottom-start'}
            classes={{
              tooltip: classes.tooltip,
            }}
            enterDelay={300}
            classes={{ popper: classes.mypopper }}
            key={tab.id}
            >
            <Chip
              color={selectedId === tab.id ? 'primary' : 'default'}
              label={tab.name}
              clickable={true}
              className={classes.chip}
              onClick={this.handleClick(tab)}
            />
          </Tooltip>
        ))}
      </Grid>
    );
  }
}

export default withStyles(defaultTabsStyles, { name: 'MUIDataTableTabs' })(TableTabs);
