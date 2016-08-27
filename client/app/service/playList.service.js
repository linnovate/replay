import _ from 'lodash';

export default class PlayListService {

  constructor() {
    this.list = {
      '57c1d7f0a11062c5694de9b8': {
        'name': 'Favourites',
        'items': [
          { '_id': 123, 'name': 'Video 1' },
          { '_id': 123, 'name': 'Video 2' },
          { '_id': 123, 'name': 'Video 3' },
          { '_id': 123, 'name': 'Video 4' },
          { '_id': 123, 'name': 'Video 5' },
        ]
      },
      '57c1d7fca11062c5694de9b9': {
        'name': 'Watched',
        'items': [
          { '_id': 123, 'name': 'Video 6' },
          { '_id': 123, 'name': 'Video 7' },
          { '_id': 123, 'name': 'Video 8' },
          { '_id': 123, 'name': 'Video 9' },
          { '_id': 123, 'name': 'Video 10' },
        ]
      },
      '57c1d7fea11062c5694de9ba': {
        'name': 'List 1',
        'items': [
          { '_id': 123, 'name': 'Video 11' },
          { '_id': 123, 'name': 'Video 12' },
          { '_id': 123, 'name': 'Video 13' },
          { '_id': 123, 'name': 'Video 14' },
          { '_id': 123, 'name': 'Video 15' },
        ]
      },
      '57c1d7ffa11062c5694de9bb': {
        'name': 'List 2',
        'items': [
          { '_id': 123, 'name': 'Video 16' },
          { '_id': 123, 'name': 'Video 17' },
          { '_id': 123, 'name': 'Video 18' },
          { '_id': 123, 'name': 'Video 19' },
          { '_id': 123, 'name': 'Video 20' },
        ]
      },
      '57c1d800a11062c5694de9bc': {
        'name': 'List 3',
        'items': [
          { '_id': 123, 'name': 'Video 21' },
          { '_id': 123, 'name': 'Video 22' },
          { '_id': 123, 'name': 'Video 23' },
          { '_id': 123, 'name': 'Video 24' },
          { '_id': 123, 'name': 'Video 25' },
        ]
      },
    };
  }

  add(video) {
    if (!this.isAdded(video)) this.list[video.id] = video;
  }

  remove(video) {
    if (this.isAdded(video)) delete this.list[video.id];
  }

  isAdded(video) {
    return !_.isUndefined(this.list[video.id]);
  }

  count() {
    return _.size(this.list);
  }
}
