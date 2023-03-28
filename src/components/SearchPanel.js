import { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import CompanionWindow from '../containers/CompanionWindow';
import SearchPanelControls from '../containers/SearchPanelControls';
import SearchResults from '../containers/SearchResults';

/** */
export class SearchPanel extends Component {
  /** */
  constructor(props) {
    super(props);

    this.containerRef = createRef();
  }

  /** */
  render() {
    const {
      classes,
      fetchSearch,
      id,
      query,
      removeSearch,
      searchService,
      suggestedSearches,
      t,
    } = this.props;

    return (
      <CompanionWindow
        ariaLabel={t('searchTitle')}
        title={(
          <>
            {t('searchTitle')}
            {
              query && query !== '' && (
                <Chip
                  role="button"
                  className={classes.clearChip}
                  color="secondary"
                  label={t('clearSearch')}
                  onClick={removeSearch}
                  onDelete={removeSearch}
                  size="small"
                  tabIndex={0}
                  variant="outlined"
                />
              )
            }
          </>
        )}
        id={id}
        titleControls={<SearchPanelControls companionWindowId={id} />}
        ref={this.containerRef}
      >
        <SearchResults
          containerRef={this.containerRef}
          companionWindowId={id}
        />
        {
          fetchSearch && suggestedSearches && query === '' && suggestedSearches.map(search => (
            <Typography component="p" key={search} variant="body1">
              <Button className={classes.inlineButton} color="secondary" onClick={() => fetchSearch(`${searchService.id}?q=${search}`, search)}>
                {t('suggestSearch', { query: search })}
              </Button>
            </Typography>
          ))
        }
      </CompanionWindow>
    );
  }
}

SearchPanel.propTypes = {
  classes: PropTypes.shape({
    clearChip: PropTypes.string,
    inlineButton: PropTypes.string,
  }),
  fetchSearch: PropTypes.func,
  id: PropTypes.string.isRequired,
  query: PropTypes.string,
  removeSearch: PropTypes.func.isRequired,
  searchService: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  suggestedSearches: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func,
};

SearchPanel.defaultProps = {
  classes: {},
  fetchSearch: undefined,
  query: '',
  suggestedSearches: [],
  t: key => key,
};
