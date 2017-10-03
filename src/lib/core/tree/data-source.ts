import {Observable} from 'rxjs/Observable';
import {CollectionViewer} from '@angular/cdk/collections';


export interface CdkTreeContext {
  $implicit: any;
  level: number;
  expandable: boolean;
}

export interface TreeDataSource<T extends Object> {
  /** Connect the data source with the tree component */
  connect(collectionViewer: CollectionViewer): Observable<T[]>;

  /** Get the observable children */
  getChildren(node: T): Observable<T[]>;

  /**
   * Get the children from a single node. This is a function to
   *  extract children from a given parent
   */
  getChildrenFunc(node: T): T[];
}
