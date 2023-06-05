import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  get addedfile() {
    console.debug('addedFile happened');
    return undefined;
  }
}
