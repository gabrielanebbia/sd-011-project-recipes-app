import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRecipes, fetchRecipesCategories, setSelectedCategory } from '../../actions';
import { getXFirstElementsFromArray, translate } from '../../helpers/utils';
import Loading from '../Loading';

const filtersQuantity = 5;

const RecipesFilterButtons = ({
  pathname, categories, type, loading, error, selectedCategory,
  dispatchFetchRecipesCategories, dispatchFetchRecipes, dispatchSetSelectedCategory,
}) => {
  React.useEffect(() => {
    if (!pathname.includes(type)) {
      dispatchFetchRecipesCategories(pathname.replace(/\//g, ''));
    }
  }, [pathname, type, dispatchFetchRecipesCategories]);

  const handleCategoryClick = (category) => {
    if (category === 'All' && selectedCategory === 'All') return;

    dispatchSetSelectedCategory(category);

    if (category !== 'All' && category !== selectedCategory) {
      dispatchFetchRecipes(translate(type), category);
    } else dispatchFetchRecipes(translate(type));
  };

  if (error) return <span>{`${error}`}</span>;

  return (
    <section>
      {
        loading
          ? <Loading />
          : (
            <>
              <button
                type="button"
                onClick={ () => handleCategoryClick('All') }
                data-testid="All-category-filter"
              >
                All
              </button>
              {
                getXFirstElementsFromArray(categories, filtersQuantity)
                  .map((category) => (
                    <button
                      type="button"
                      key={ category }
                      onClick={ () => handleCategoryClick(category) }
                      data-testid={ `${category}-category-filter` }
                    >
                      {category}
                    </button>
                  ))
              }
            </>
          )
      }
    </section>
  );
};

const mapStateToProps = ({
  recipesCategoriesReducer: { categories, type, loading, error, selectedCategory },
}) => ({
  categories,
  type,
  loading,
  error,
  selectedCategory,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchRecipesCategories: (type) => dispatch(fetchRecipesCategories(type)),
  dispatchFetchRecipes:
    (type, category) => dispatch(fetchRecipes(type, category)),
  dispatchSetSelectedCategory: (category) => dispatch(setSelectedCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipesFilterButtons);

RecipesFilterButtons.propTypes = {
  pathname: PropTypes.string,
  categories: PropTypes.any,
  type: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  selectedCategory: PropTypes.string,
  dispatchFetchRecipesCategories: PropTypes.func,
  dispatchFetchRecipes: PropTypes.func,
  dispatchSetSelectedCategory: PropTypes.func,
}.isRequired;
