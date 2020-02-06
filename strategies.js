Strategies = {
  nearest: {
    see_new: 'retarget',
    target_type: 'nearest_food'
  },
  farthest: {
    see_new: 'nothing',
    target_type: 'farthest_food'
  },
  random: {
    see_new: 'nothing',
    target_type: 'random_food'
  },
  low_turning: {
    see_new: 'retarget',
    target_type: 'least_rotation'
  },
  high_turning: {
    see_new: 'nothing',
    target_type: 'most_rotation'
  },
  top_hugger: {
    see_new: 'retarget',
    target_type: 'highest_food'
  },
  parasite: {
    see_new: 'nothing',
    target_type: 'nearest_snake'
  },
};