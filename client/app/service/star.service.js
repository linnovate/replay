import endPoint from '../config/endpoint';
import _ from 'lodash';

export default class starService {

  constructor() {
    this.list = {};
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
}
