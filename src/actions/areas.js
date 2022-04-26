export const GET_AREAS = 'GET_AREAS';
export const GET_AREAS_SUCCESS = 'GET_AREAS_SUCCESS';
export const GET_AREAS_ERROR = 'GET_AREAS_ERROR';

const areasUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

const getAreas = () => ({
  type: GET_AREAS,
});

const getAreasSuccess = (payload) => ({
  type: GET_AREAS_SUCCESS,
  payload,
});

const getAreasError = (error) => ({
  type: GET_AREAS_ERROR,
  payload: error,
});

export function fetchAreas() {
  return (dispatch) => {
    dispatch(getAreas());

    return fetch(areasUrl)
      .then((response) => response.json())
      .then(({ meals }) => dispatch(getAreasSuccess(meals)))
      .catch((error) => dispatch(getAreasError(error)));
  };
}
