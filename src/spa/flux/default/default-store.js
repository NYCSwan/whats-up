import {BaseStore} from '../base-store';
import {mainViews} from '../../enums/main-views';


clss DefaultStores extends BaseStore {
	constructor() {
		super('default-store-change');
		const modifier = new StateModifier(this.state);
	}

}