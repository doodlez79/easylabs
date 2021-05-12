export enum ThreasholdCriteria {
  Low = 'Low',
  Critical = 'Critical',
  Moderate = 'Moderate',
  High = 'High',
}

export const fields = {
  [ThreasholdCriteria.Low]: 'Low',
  [ThreasholdCriteria.Critical]: 'Critical',
  [ThreasholdCriteria.Moderate]: 'Moderate',
  [ThreasholdCriteria.High]: 'High',
};
