import {CollectionViewer, TreeDataSource, TreeAdapter, TreeControl} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/combineLatest';
import {PeopleDatabase, UserData} from './person-database';
import {
  IterableDiffers,
  IterableDiffer,
} from '@angular/core';

export class JsonNode {
  key: string;
  value: any;
  children: any[];
}

export class JsonDataSource extends TreeDataSource<any> {
  dottedLineLevels = new Map<any, number[]>();
  flat: boolean = false;

  _renderedData: any[] = [];

  _filteredData = new BehaviorSubject<any>([]);
  get filteredData(): any { return this._filteredData.value; }


  set data(value: any) {
    let tree = this.buildJsonTree(value);
    this._filteredData.next(tree);
  }

  constructor(public treeAdapter: TreeAdapter<any>) {
    super();
  }

  connectTree(viewChange: CollectionViewer): Observable<UserData[]> {

    return Observable.combineLatest([viewChange, this.treeAdapter.flattenNodes(this._filteredData)]).map((result: any[]) => {
      const [view, displayData] = result;
      console.log(displayData);
      // Set the rendered rows length to the virtual page size. Fill in the data provided
      // from the index start until the end index or pagination size, whichever is smaller.
      this._renderedData.length = displayData.length;

      const buffer = 20;
      const rangeStart = Math.max(0, view.start - buffer);
      const rangeEnd = Math.min(displayData.length, view.end + buffer);
      for (let i = rangeStart; i < rangeEnd; i++) {
        this._renderedData[i] = displayData[i];
      }
      return this._renderedData; // Currently ignoring the view
    });
  }

  getChildren(node: any): any[] {
    return node.children;
  }

  buildJsonTree(value: any) {
    let data: any[] = [];
    for (let k in value) {
      let v = value[k];
      let node = new JsonNode();
      node.key = `${k}`;
      if (v === null || v === undefined) {
        // no action
      } else if (typeof v === 'object') {
        node.children = this.buildJsonTree(v);
        console.log(`json key value ${k}: ${v} with children ${node.children}`)
      } else {
        console.log(`json key value ${k}: ${v}`)
        node.value = v;
      }
      data.push(node);
    }
    return data;
  }

  addChild(key: string, value: string, node: JsonNode) {
    console.log(node.children);
    if (!node.children) {
      node.children = [];
    }
    let child = new JsonNode();
    child.key = key;
    child.value = value;
    node.children.push(child);
    console.log(node);
    console.log(this.filteredData);
    this._filteredData.next(this._filteredData.value);
  }
}
