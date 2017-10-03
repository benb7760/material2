import {
  CdkTree,
  CdkNode,
  CdkNodeDef,
  CdkNodePlaceholder,
  MdNodeSelectTrigger,
  CdkNodeTrigger,
  CdkNodePadding,
  CdkNestedNode
} from './tree';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatRippleModule} from '@angular/material/core';
import {FocusMonitor} from '@angular/cdk/a11y';

export * from './data-source';
export * from './tree';
export * from './tree-node';
export * from './tree-control';

let treeComponents = [
  CdkTree,
  CdkNodeDef,
  CdkNode,
  CdkNodePlaceholder,
  MdNodeSelectTrigger,
  CdkNodeTrigger,
  CdkNodePadding,
  CdkNestedNode
];

@NgModule({
  imports: [CommonModule, MatRippleModule],
  exports: treeComponents,
  declarations: treeComponents,
  providers: [FocusMonitor]
})
export class CdkTreeModule {}
